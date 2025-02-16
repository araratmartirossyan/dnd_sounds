<script setup lang="ts">
import { computed, ref } from 'vue'

// Components
import { SelectButton } from 'primevue'
import AudioCard from './components/AudioCard.vue'

// Hooks
import { useAudioPlayer } from './hooks/useAudio.hook'

// Constants
import { effects, music, bg } from './constants'
import type { Sound } from './types'

const { playAudio, currentSrc } = useAudioPlayer()
const activeTab = ref('Музыка')
const options = ref(['Музыка', 'Эффекты', 'Фоны'])

const input = computed(() => {
  const mapper: Record<string, Sound[]> = {
    Музыка: music,
    Фоны: bg,
    Эффекты: effects,
  }

  return mapper[activeTab.value]
})

const layout = computed(() =>
  activeTab.value === 'Музыка' || 'Фоны' ? 'list' : 'grid'
)
</script>

<template>
  <div class="app">
    <SelectButton class="w-full" v-model="activeTab" :options="options" />

    <div class="audio-list" :class="layout">
      <AudioCard
        v-for="{ title, src, type } in input"
        :audio="src"
        :title="title"
        :type="type"
        :is-playing="src === currentSrc"
        :key="src"
        @handle-play="playAudio({ src, type })"
      />
    </div>
  </div>
</template>

<style>
.audio-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
}

.audio-list.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(150px, 1fr)); /* 3 колонки */
  gap: 12px;
}

.audio-list.list {
  display: flex;
  flex-direction: column;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.p-togglebutton,
.p-selectbutton {
  width: 100%;
}
</style>
