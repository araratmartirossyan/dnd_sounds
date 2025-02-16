<script setup lang="ts">
import { watchEffect, ref } from 'vue'
import type { SoundType } from '../types'

interface Props {
  audio: string
  title: string
  type: SoundType
  isPlaying: boolean
}

const props = defineProps<Props>()
defineEmits<{
  handlePlay: [{ src: string; type: SoundType }]
}>()

const buttonRef = ref<HTMLButtonElement | null>(null)

watchEffect(() => {
  console.log(props.isPlaying)
  console.log(props.audio)
})
</script>

<template>
  <button
    ref="buttonRef"
    class="audio-card"
    :class="{ playing: isPlaying }"
    @click="
      () => {
        $emit('handlePlay', { src: audio, type })
        buttonRef?.blur()
      }
    "
  >
    {{ title }}
  </button>
</template>

<style scoped>
.audio-card {
  width: 100%;
  margin-bottom: 12px;
  border: 1px solid;
  font-size: 18px;
  border-radius: 8px;
  padding: 24px 12px;
  cursor: pointer;
  background-color: #f0f0f0;
  color: black;
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.3s ease;
}

.playing {
  background-color: green;
  color: white;
  border-color: #646cff;
}

.audio-card:focus {
  outline: none;
  border-color: transparent;
  box-shadow: none;
  background-color: #f0f0f0;
}

.audio-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.audio-card:active {
  transform: translateY(0);
  background-color: #e0e0e0;
}
</style>
