export type SoundType = 'music' | 'effect' | 'bg'

export interface Sound {
  src: string
  title: string
  type: SoundType
}

export interface PlayInput {
  src: string
  type: SoundType
}
