# .gitignore

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

```

# .prettierrc

```
{
    "singleQuote": true,
    "tabWidth": 2,
    "semi": false
}
```

# .vscode/extensions.json

```json
{
  "recommendations": ["Vue.volar"]
}

```

# index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"
      rel="stylesheet"
    />
    <title>DnD Sounds</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>

```

# package.json

```json
{
  "name": "dnd",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@primevue/themes": "^4.2.5",
    "primevue": "^4.2.5",
    "vue": "^3.5.13"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.1",
    "@vue/tsconfig": "^0.7.0",
    "typescript": "~5.7.2",
    "vite": "^6.1.0",
    "vue-tsc": "^2.2.0"
  }
}

```

# public/door_effect.wav

This is a binary file of the type: Binary

# public/dungeon_bg.mp3

This is a binary file of the type: Binary

# public/dungeon_music.wav

This is a binary file of the type: Binary

# public/fantasy_music.mp3

This is a binary file of the type: Binary

# public/fight_start_effect.mp3

This is a binary file of the type: Binary

# public/forest_bg.wav

This is a binary file of the type: Binary

# public/forest_wolves_effect.mp3

This is a binary file of the type: Binary

# public/harbor_bg.mp3

This is a binary file of the type: Binary

# public/library_medieval.mp3

This is a binary file of the type: Binary

# public/market_bg.wav

This is a binary file of the type: Binary

# public/medieval_city_bg.wav

This is a binary file of the type: Binary

# public/mystic_music.mp3

This is a binary file of the type: Binary

# public/tavern_music.mp3

This is a binary file of the type: Binary

# public/walking_road_gravy.wav

This is a binary file of the type: Binary

# README.md

```md
# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

```

# src/App.vue

```vue
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

```

# src/components/AudioCard.vue

```vue
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

```

# src/constants/index.ts

```ts
import type { Sound } from '../types'

export const music: Sound[] = [
  {
    src: 'tavern_music.mp3',
    title: 'Звуки таверны',
    type: 'music',
  },
  {
    src: 'fantasy_music.mp3',
    title: 'Фэнтези темная',
    type: 'music',
  },
  {
    src: 'mystic_music.mp3',
    title: 'Мистическая детекив',
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
    src: 'dungeon_bg.mp3',
    title: 'Подземелье',
    type: 'bg',
  },
  {
    src: 'medieval_city_bg.wav',
    title: 'Средневековый город',
    type: 'bg',
  },
  {
    src: 'forest_bg.wav',
    title: 'Лес',
    type: 'bg',
  },
  {
    src: 'market_bg.wav',
    title: 'Средневековый маркет',
    type: 'bg',
  },
  {
    src: 'library_medieval.mp3',
    title: 'Библиотека',
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
  {
    src: 'forest_wolves_effect.mp3',
    title: 'Волки лес',
    type: 'effect',
  },
  {
    src: 'walking_road_gravy.wav',
    title: 'Шаги по гравию',
    type: 'effect',
  },
]

```

# src/hooks/useAudio.hook.ts

```ts
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

```

# src/main.ts

```ts
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

createApp(App).use(PrimeVue)

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.mount('#app')

```

# src/style.css

```css
body,
html {
  background-color: #1a1a1a;
  font-family: 'Noto Sans';
}

```

# src/types/index.ts

```ts
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

```

# src/vite-env.d.ts

```ts
/// <reference types="vite/client" />

```

# tsconfig.app.json

```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"]
}

```

# tsconfig.json

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}

```

# tsconfig.node.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}

```

# vite.config.ts

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
})

```

