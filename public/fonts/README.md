# Self-hosted fonts

The site uses normal-style Latin subsets of Inter (Google Fonts v20) and
JetBrains Mono (v24), downloaded on 2026-09-25. Their SIL Open Font Licenses
are included alongside the files.

- `inter-latin-normal.woff2`: variable weights 300–900, 46,604 bytes.
- `jetbrains-mono-latin-normal.woff2`: variable weights 400–600, 29,764 bytes.

The upstream WOFF2 weight axes were restricted with fontTools
`instantiateVariableFont` to those ranges. No italic or unused family assets
are included. Latin coverage and unicode ranges match the original Google
stylesheet; unsupported characters continue to use system fallback fonts.

`src/index.css` registers the existing family names with `font-display: swap`.
Tailwind 3 maps `font-sans` to Inter and `font-mono` to JetBrains Mono.
Only Inter is preloaded because the initial header, hero, and resume button
use weights 400, 600, and 500 respectively. TextReveal already waits for
`document.fonts.ready` before splitting and measuring text.

To verify: build with `npm run build`, serve with `npm run preview`, open
Chrome DevTools Network, disable cache, and reload. Filter by Font: both
WOFF2 requests should use the site's own origin and return 200. There should
be no Google Fonts stylesheet or font requests. In Elements > Computed >
Rendered Fonts, check Inter for body/hero text and JetBrains Mono for project
metadata. Use a throttled Performance recording to inspect layout shifts;
preloading shortens the fallback period but does not guarantee zero CLS.
