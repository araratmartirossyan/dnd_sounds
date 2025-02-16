import { ref, nextTick } from 'vue'
import type { PlayInput } from '../types'

export function useAudioPlayer() {
  const currentAudio = ref<HTMLAudioElement | null>(null)
  const currentSrc = ref<string | null>(null)

  const playAudio = async ({ src, type = 'music' }: PlayInput) => {
    if (type === 'music' || type === 'bg') {
      if (currentAudio.value) {
        if (currentSrc.value === src) {
          currentAudio.value.pause()
          currentAudio.value.currentTime = 0
          currentAudio.value = null

          currentSrc.value = null
          await nextTick() // 🔥 Принудительно обновляем Vue
          return
        } else {
          currentAudio.value.pause()
          currentAudio.value.currentTime = 0
        }
      }

      const audio = new Audio(src)
      audio.loop = true
      audio.play().catch((err) => console.error('Ошибка воспроизведения:', err))

      currentAudio.value = audio
      currentSrc.value = src
    } else if (type === 'effect') {
      const effectAudio = new Audio(src)
      effectAudio
        .play()
        .catch((err) => console.error('Ошибка воспроизведения:', err))
    }
  }

  return {
    playAudio,
    currentSrc,
  }
}
