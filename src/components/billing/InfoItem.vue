<script setup lang="ts">
import type { Component } from 'vue'

import IconBox from './IconBox.vue'

defineProps<{ label: string; icon: Component }>()
</script>

<template>
  <div class="flex items-center gap-2">
    <IconBox :icon="icon" />
    <dl class="flex flex-col gap-2">
      <dt class="text-body-sm text-black">{{ label }}</dt>
      <dd class="text-h4 text-ink"><slot /></dd>
    </dl>
  </div>
</template>
