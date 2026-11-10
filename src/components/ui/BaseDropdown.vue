<script setup lang="ts">
import { onClickOutside, onKeyStroke } from '@vueuse/core'
import { useId, useTemplateRef } from 'vue'

withDefaults(defineProps<{ align?: 'start' | 'end'; width?: string }>(), {
  align: 'start',
  width: 'w-[132px]',
})

const open = defineModel<boolean>('open', { default: false })
const root = useTemplateRef<HTMLElement>('root')
const menuId = useId()

function close(): void {
  open.value = false
}

onClickOutside(root, close)
onKeyStroke('Escape', () => open.value && close())
</script>

<template>
  <div ref="root" class="relative">
    <slot name="trigger" :open="open" :toggle="() => (open = !open)" :menu-id="menuId" />
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      leave-active-class="transition duration-100 ease-in"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="open"
        :id="menuId"
        role="menu"
        class="absolute top-full z-30 mt-2 flex flex-col gap-3 rounded-2xl bg-white p-2 shadow-card"
        :class="[width, align === 'start' ? 'start-0' : 'end-0']"
        @click="close"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>
