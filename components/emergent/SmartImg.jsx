// SEO fix: SEOmator flagged (a) 22 images missing explicit width/height
// and (b) all local images being legacy PNG/JPG with no WebP/AVIF
// alternative. This wraps local assets in a <picture> that serves the
// pre-generated .webp version first (see /public — every referenced PNG
// now has a same-named .webp sibling) and falls back to the original PNG
// for any browser that doesn't support it, while always emitting explicit
// width/height so the browser can reserve layout space (helps CLS too).
//
// For remote images (Unsplash/Pexels stock photos used for team/project
// placeholders) we can't generate a local WebP file, so instead we ask
// the source CDN for one directly via its own `fm=webp` format param —
// both Unsplash's and Pexels' image CDNs support this — and still emit
// explicit width/height.
// SEO fix: SEOmator flagged (a) 22 images missing explicit width/height,
// (b) all local images being legacy PNG/JPG, and (c) DOM size being over
// budget. Originally this used a <picture><source webp>+<img png> pair,
// but the audit's "Modern Image Formats" check inspects the <img src>
// itself (the fallback), not the sibling <source>, so it still counted
// as "legacy" — and the wrapper added an extra DOM node per image.
// WebP has near-universal browser support today, so we now serve it
// directly as the only src (no fallback needed), which fixes both the
// format check and trims DOM size back down.
function localWebp(src) {
  return src.replace(/\.(png|jpe?g)$/i, ".webp");
}

function withRemoteWebp(src) {
  if (!/^https?:\/\//.test(src)) return src;
  const isImageCdn = /images\.unsplash\.com|images\.pexels\.com/.test(src);
  if (!isImageCdn) return src;
  // Unsplash/Pexels source URLs in this project already hardcode
  // `&fm=jpg` — replace it rather than appending a second `fm=` param
  // (imgix-based CDNs generally honor the last one, but this avoids
  // relying on that and keeps the URL clean).
  if (/[?&]fm=/.test(src)) {
    return src.replace(/([?&])fm=[^&]*/, "$1fm=webp");
  }
  return src.includes("?") ? `${src}&fm=webp` : `${src}?fm=webp`;
}

export default function SmartImg({ src, alt, width, height, className, loading = "lazy", fetchPriority, srcSet, sizes, ...rest }) {
  const isRemote = /^https?:\/\//.test(src);
  const finalSrc = isRemote ? withRemoteWebp(src) : localWebp(src);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={finalSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      className={className}
      {...rest}
    />
  );
}
