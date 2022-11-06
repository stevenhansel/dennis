type Props = {
  spotifyUrl: string
}

const regex = /\s*[a-zA-Z\/\/:\.]*open.spotify.com\/track\/([a-zA-Z0-9\-_]+)([a-zA-Z0-9\/\*\-\_\?\&\;\%\=\.]*)/i
const getSpotifyId = (spotifyUrl: string) => {
  const spotifyIdMatch = spotifyUrl.match(regex)
  if (spotifyIdMatch && spotifyIdMatch.length > 1) {
    return spotifyIdMatch[1]
  }
  return ''
}
const getSpotifyEmbed = (spotifyId: string) => `https://open.spotify.com/embed/track/${spotifyId}?utm_source=generator`

const SpotifyEmbed = (props: Props) => {
  const { spotifyUrl } = props
  return (
    <>
      <div className="w-full md:hidden">
        <iframe
          className='rounded-md'
          src={getSpotifyEmbed(getSpotifyId(spotifyUrl))}
          width="100%"
          height="80"
          allowFullScreen={false}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"
        />
      </div>
      <div className="hidden w-full md:block">
        <iframe
          className='rounded-md'
          src={getSpotifyEmbed(getSpotifyId(spotifyUrl))}
          width="100%"
          height="352"
          allowFullScreen={false}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"
        />
      </div>
    </>
  )
}

export default SpotifyEmbed