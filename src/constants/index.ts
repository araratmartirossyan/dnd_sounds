import type { Sound } from '../types'

export const music: Sound[] = [
  {
    src: 'tavern_music.mp3', // Указываем путь, если файлы в public/audio
    title: 'Звуки таверны',
    type: 'music',
  },
  {
    src: 'fantasy_music.mp3',
    title: 'Фэнтези темная',
    type: 'music',
  },
]

export const bg: Sound[] = [
  {
    src: 'harbor_bg.mp3',
    title: 'Порт',
    type: 'bg',
  },
  {
    src: 'dungeon_bg.wav',
    title: 'Подземелье',
    type: 'bg',
  },
]

export const effects: Sound[] = [
  {
    src: 'fight_start_effect.mp3',
    title: 'Сражение старт',
    type: 'effect',
  },
  {
    src: 'door_effect.wav',
    title: 'Тяжелая дверь открытие',
    type: 'effect',
  },
]
