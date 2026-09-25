'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { createCurveTransition, EMPTY_BOTTOM, type CurveTransitionOptions, type PageUpdate } from './curve-transition';

export interface CurvePageTransitionHandle {
  cover: (options?: CurveTransitionOptions) => Promise<void>;
  reveal: (options?: CurveTransitionOptions) => Promise<void>;
  transition: (update: PageUpdate, options?: CurveTransitionOptions) => Promise<void>;
  cancel: () => void;
}
interface Props extends CurveTransitionOptions {
  color?: string;
  zIndex?: number;
}

export const CurvePageTransition = forwardRef<CurvePageTransitionHandle, Props>(function CurvePageTransition({
  color = '#070707', duration = 0.5, direction = 'up', zIndex = 10000, respectReducedMotion = true,
}, ref) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const controllerRef = useRef<ReturnType<typeof createCurveTransition> | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (!mounted || !overlayRef.current || !pathRef.current) return;
    const controller = createCurveTransition(overlayRef.current, pathRef.current);
    controllerRef.current = controller;
    return () => {
      controller.destroy();
      controllerRef.current = null;
    };
  }, [mounted]);

  useImperativeHandle(ref, () => {
    const config = (options?: CurveTransitionOptions): CurveTransitionOptions => ({ duration, respectReducedMotion, ...options });
    const getController = () => {
      if (!controllerRef.current) throw new Error('CurvePageTransition is not mounted yet.');
      return controllerRef.current;
    };
    return {
      cover: async (options) => getController().cover({ direction, ...config(options) }),
      reveal: async (options) => getController().reveal(config(options)),
      transition: async (update, options) => getController().transition(update, { direction, ...config(options) }),
      cancel: () => controllerRef.current?.cancel(),
    };
  }, [duration, direction, respectReducedMotion]);

  if (!mounted) return null;
  return createPortal(
    <div ref={overlayRef} data-curve-page-transition="" aria-hidden="true"
      className="pointer-events-none invisible fixed inset-0" style={{ zIndex }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false" className="block h-full w-full">
        <path ref={pathRef} d={EMPTY_BOTTOM} fill={color} stroke="none" />
      </svg>
    </div>,
    document.body,
  );
});
