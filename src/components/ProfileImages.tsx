import { profile } from '@/data/profile'

type ProfileImagesProps = {
  className?: string
  alt: string
  width?: number
  height?: number
  loading?: 'eager' | 'lazy'
}

export default function ProfileImages({ className = '', alt, width, height, loading = 'lazy' }: ProfileImagesProps) {
  const classes = `profile-image ${className}`.trim()

  return (
    <>
      <img
        className={`${classes} profile-image--light`}
        src={profile.avatarLightSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
      />
      <img
        className={`${classes} profile-image--dark`}
        src={profile.avatarDarkSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
      />
    </>
  )
}
