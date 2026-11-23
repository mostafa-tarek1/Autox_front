<script setup lang="ts">
import LogoAccent from '@/assets/brand/logo-accent.svg'
import LogoPrimary from '@/assets/brand/logo-primary.svg'

withDefaults(defineProps<{ tone?: 'primary' | 'accent' }>(), { tone: 'primary' })
</script>

<template>
  <LogoPrimary v-if="tone === 'primary'" role="img" aria-label="Parts X" />
  <LogoAccent v-else role="img" aria-label="Parts X" />
</template>
