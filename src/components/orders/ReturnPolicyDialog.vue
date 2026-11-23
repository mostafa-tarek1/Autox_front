<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import BaseModal from '@/components/ui/BaseModal.vue'

interface PolicySection {
  title: string
  intro: string
  points: string[]
}

/** "سياسة الاسترجاع" dialog (Figma 696:9786), opened from each order card. */
const open = defineModel<boolean>('open', { default: false })
const { t, tm, rt } = useI18n()

function sections(): PolicySection[] {
  const raw = tm('orders.returnPolicy.sections') as unknown as Array<Record<string, unknown>>
  return raw.map((section) => ({
    title: rt(section.title as never),
    intro: rt(section.intro as never),
    points: (section.points as unknown[]).map((point) => rt(point as never)),
  }))
}
</script>

<template>
  <BaseModal
    v-model:open="open"
    :title="t('orders.returnPolicy.title')"
    panel-class="max-w-[952px] px-6 pt-[72px] pb-10 sm:px-10"
    title-class="mb-6 text-h2"
  >
    <div class="flex flex-col gap-6">
      <section v-for="section in sections()" :key="section.title" class="flex flex-col gap-3">
        <h3 class="text-h4 text-ink">{{ section.title }}</h3>
        <div class="text-body-sm text-ink">
          <p v-if="section.intro">{{ section.intro }}</p>
          <ul>
            <li v-for="point in section.points" :key="point">{{ point }}</li>
          </ul>
        </div>
      </section>
    </div>
  </BaseModal>
</template>
