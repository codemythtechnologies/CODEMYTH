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

export default function SmartImg({ src, alt, width, height, className, loading = "lazy", fetchPriority, ...rest }) {
  const isRemote = /^https?:\/\//.test(src);

  if (isRemote) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={withRemoteWebp(src)}
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

  const webpSrc = src.replace(/\.(png|jpe?g)$/i, ".webp");

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        className={className}
        {...rest}
      />
    </picture>
  );
}
