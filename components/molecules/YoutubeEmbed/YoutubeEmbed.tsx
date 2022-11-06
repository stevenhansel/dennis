type Props = {
  youtubeUrl: string;
}

const regex = /\s*[a-zA-Z\/\/:\.]*youtube.com\/watch\?v=([a-zA-Z0-9\-_]+)([a-zA-Z0-9\/\*\-\_\?\&\;\%\=\.]*)/i
const getYoutubeId = (youtubeUrl: string) => {
  const youtubeIdMatch = youtubeUrl.match(regex)
  if (youtubeIdMatch && youtubeIdMatch.length > 1) {
    return youtubeIdMatch[1]
  }
  return ''
}
const getYoutubeEmbed = (youtubeId: string) => `https://youtube.com/embed/${youtubeId}`

const YoutubeEmbed = (props: Props) => (
  <>
    <div className="w-full md:hidden">
      <iframe className="rounded-md" width="100%" height="352" src={getYoutubeEmbed(getYoutubeId(props.youtubeUrl))} />
    </div>
    <div className="hidden w-full md:block">
      <iframe className="rounded-md" width="100%" height="576" src={getYoutubeEmbed(getYoutubeId(props.youtubeUrl))} />
    </div>
  </>
);

export default YoutubeEmbed;