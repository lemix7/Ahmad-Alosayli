import { gsap } from 'gsap';

export const EMPTY_BOTTOM = 'M 0 100 V 100 Q 50 100 100 100 V 100 z';
const EMPTY_TOP = 'M 0 0 V 0 Q 50 0 100 0 V 0 z';
const paths = {
  up: {
    empty: EMPTY_BOTTOM,
    cover: ['M 0 100 V 50 Q 50 0 100 50 V 100 z', 'M 0 100 V 0 Q 50 0 100 0 V 100 z'],
    filled: 'M 0 0 V 100 Q 50 100 100 100 V 0 z',
    reveal: ['M 0 0 V 50 Q 50 0 100 50 V 0 z', EMPTY_TOP],
  },
  down: {
    empty: EMPTY_TOP,
    cover: ['M 0 0 V 50 Q 50 100 100 50 V 0 z', 'M 0 0 V 100 Q 50 100 100 100 V 0 z'],
    filled: 'M 0 100 V 0 Q 50 0 100 0 V 100 z',
    reveal: ['M 0 100 V 50 Q 50 100 100 50 V 100 z', EMPTY_BOTTOM],
  },
} as const;

export interface CurveTransitionOptions {
  direction?: 'up' | 'down';
  duration?: number;
  respectReducedMotion?: boolean;
}
export type PageUpdate = (signal: AbortSignal) => void | Promise<void>;
const aborted = () => new DOMException('Page transition cancelled.', 'AbortError');

// Original Works wipe: https://codepen.io/GreenSock/full/EaKpEpJ
export function createCurveTransition(overlay: HTMLDivElement, path: SVGPathElement) {
  let active: AbortController | null = null;
  let covered = false;
  let destroyed = false;
  let lastDirection: 'up' | 'down' = 'up';

  function reset() {
    overlay.style.visibility = 'hidden';
    overlay.style.pointerEvents = 'none';
    path.setAttribute('d', EMPTY_BOTTOM);
    covered = false;
  }

  function settings(options: CurveTransitionOptions = {}) {
    const { direction = lastDirection, duration = 0.5, respectReducedMotion = true } = options;
    if (!paths[direction]) throw new Error('direction must be "up" or "down".');
    if (!Number.isFinite(duration) || duration < 0) throw new Error('duration must be a non-negative number.');
    const reduce = respectReducedMotion && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return { direction, duration: reduce ? 0 : duration };
  }

  function animate(values: readonly [string, string], duration: number, signal: AbortSignal) {
    if (signal.aborted) return Promise.reject(aborted());
    if (duration === 0) {
      path.setAttribute('d', values[1]);
      return Promise.resolve();
    }
    return new Promise<void>((resolve, reject) => {
      const timeline = gsap.timeline({ paused: true, onComplete: () => {
        signal.removeEventListener('abort', cancel);
        resolve();
      } });
      function cancel() {
        timeline.kill();
        reject(aborted());
      }
      signal.addEventListener('abort', cancel, { once: true });
      timeline.to(path, { attr: { d: values[0] }, duration, ease: 'sine.in' })
        .to(path, { attr: { d: values[1] }, duration, ease: 'sine.out' })
        .play();
    });
  }

  async function cover(config: ReturnType<typeof settings>, signal: AbortSignal) {
    if (covered) throw new Error('The transition is already covered. Call reveal() first.');
    lastDirection = config.direction;
    path.setAttribute('d', paths[config.direction].empty);
    overlay.style.visibility = 'visible';
    overlay.style.pointerEvents = 'auto';
    await animate(paths[config.direction].cover, config.duration, signal);
    if (signal.aborted) throw aborted();
    covered = true;
  }

  async function reveal(config: ReturnType<typeof settings>, signal: AbortSignal) {
    if (!covered) throw new Error('Call cover() before reveal().');
    path.setAttribute('d', paths[config.direction].filled);
    await animate(paths[config.direction].reveal, config.duration, signal);
    reset();
  }

  async function exclusive(task: (signal: AbortSignal) => Promise<void>) {
    if (destroyed) throw aborted();
    if (active) throw new Error('A page transition is already running.');
    const controller = new AbortController();
    active = controller;
    let onAbort = () => {};
    const cancellation = new Promise<never>((_, reject) => {
      onAbort = () => reject(aborted());
      controller.signal.addEventListener('abort', onAbort, { once: true });
    });
    try {
      return await Promise.race([task(controller.signal), cancellation]);
    } catch (error) {
      reset();
      throw error;
    } finally {
      controller.signal.removeEventListener('abort', onAbort);
      active = null;
    }
  }

  reset();
  return {
    cover: (options?: CurveTransitionOptions) => exclusive((signal) => cover(settings(options), signal)),
    reveal: (options?: CurveTransitionOptions) => exclusive((signal) => reveal(settings(options), signal)),
    transition: (update: PageUpdate, options?: CurveTransitionOptions) => exclusive(async (signal) => {
      if (typeof update !== 'function') throw new TypeError('transition() requires a page update callback.');
      const config = settings({ direction: 'up', ...options });
      await cover(config, signal);
      if (signal.aborted) throw aborted();
      await update(signal);
      if (signal.aborted) throw aborted();
      await reveal(config, signal);
    }),
    cancel() {
      active?.abort();
      reset();
    },
    destroy() {
      destroyed = true;
      active?.abort();
      reset();
    },
  };
}
