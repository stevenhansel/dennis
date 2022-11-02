export type Maybe<T> = T | null

export type CurrentEpisode = {
  id: number
  episode: number
  episodeName: Maybe<string> 
  episodeDate: string
  isCurrent: boolean
  songs: Song[]
}

export type Song = {
  id: number
  episodeSongId: number
  releasedAtEpisodeId: Maybe<number>
  songNameJp: string
  songNameEn: string
  artistNameJp: string
  artistNameEn: string
  coverImageUrl: string
}

export type EpisodeVote = {
  episodeSongId: number;
  numOfVotes: number;
  rank: number;
}

export type HasVoted = {
  hasVoted: boolean;
  episodeSongId: number | null
}