<script setup lang="ts">
/** Square brand logo tile shown at the start of cart lines. */
withDefaults(
  defineProps<{ logo: string; name?: string; size?: 'sm' | 'md'; tone?: 'white' | 'surface' }>(),
  {
    size: 'md',
    tone: 'white',
  },
)
</script>

<template>
  <span
    class="grid shrink-0 place-items-center rounded-xl"
    :class="[
      size === 'md' ? 'size-24' : 'size-[68px]',
      tone === 'white' ? 'bg-white' : 'bg-surface',
    ]"
  >
    <span class="flex flex-col items-center gap-0.5">
      <img
        :src="logo"
        :alt="name ?? ''"
        :width="size === 'md' ? 55 : 38"
        :height="size === 'md' ? 28 : 20"
        class="object-contain"
        :class="size === 'md' ? 'h-7 w-[55px]' : 'h-5 w-[38px]'"
        loading="lazy"
      />
      <span v-if="name && size === 'sm'" class="text-[10px] leading-[14px] text-muted">{{
        name
      }}</span>
    </span>
  </span>
</template>
