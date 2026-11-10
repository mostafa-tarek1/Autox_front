<script setup lang="ts">
import { useId } from 'vue'

defineProps<{ error?: string }>()
const checked = defineModel<boolean>({ default: false })
const id = useId()
</script>

<template>
  <div class="flex flex-col gap-1">
    <label :for="id" class="flex w-fit cursor-pointer items-center gap-2 text-body-md text-ink">
      <input
        :id="id"
        v-model="checked"
        type="checkbox"
        class="size-5 shrink-0 cursor-pointer appearance-none rounded border border-secondary bg-surface bg-center bg-no-repeat transition-colors checked:border-primary checked:bg-primary checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2016%2016%22%3E%3Cpath%20d=%22M3.5%208.5l3%203%206-7%22%20fill=%22none%22%20stroke=%22white%22%20stroke-width=%222%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22/%3E%3C/svg%3E')]"
        :aria-invalid="error ? true : undefined"
      />
      <slot />
    </label>
    <p v-if="error" class="text-caption text-error" role="alert">{{ error }}</p>
  </div>
</template>
