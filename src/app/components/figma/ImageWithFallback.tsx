import React, { useState } from 'react'

const ERROR_IMG_SRC =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

// Rewrites Cloudinary delivery URLs to request an auto format (WebP/AVIF) and
// auto quality version instead of the untouched original. Cuts delivered
// bytes dramatically with no visible quality loss and no layout change, since
// no width/height is forced. See CLAUDE.md - all images are hosted on
// res.cloudinary.com/dfvjhslxp.
function optimizeCloudinaryUrl(url?: string): string | undefined {
    if (!url || !url.includes('res.cloudinary.com/')) return url
    if (url.includes('/upload/f_auto')) return url
    return url.replace('/upload/', '/upload/f_auto,q_auto/')
}

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    const [didError, setDidError] = useState(false)

  const handleError = () => {
        setDidError(true)
  }

  const { src, alt, style, className, ...rest } = props
    const optimizedSrc = optimizeCloudinaryUrl(src as string | undefined)

  return didError ? (
        <div className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`} style={style}><div className="flex items-center justify-center w-full h-full"><img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} /></div>
        </div>
      ) : (
        <img src={optimizedSrc} alt={alt} className={className} style={style} {...rest} onError={handleError} />
      )
}
