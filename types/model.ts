export type Maybe<T> = T | null

export type Episode = {
  id: number
  episode: number
  episodeName: Maybe<string> 
  episodeDate: string
  isCurrent: boolean
  thumbnailUrl: string | null
  releasedSong: Song | null
}

export type CurrentEpisode = {
  id: number
  episode: number
  episodeName: Maybe<string> 
  episodeDate: string
  isCurrent: boolean
  thumbnailUrl: string | null
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