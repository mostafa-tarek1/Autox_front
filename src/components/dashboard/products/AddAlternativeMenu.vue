<script setup lang="ts">
import { onClickOutside, onKeyStroke } from '@vueuse/core'
import { nextTick, useId, useTemplateRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import AddIcon from '@/assets/icons/add-01--stroke-standard.svg'
import CancelIcon from '@/assets/icons/cancel-01--stroke-rounded.svg'
import SearchListIcon from '@/assets/icons/search-list-02--stroke-standard.svg'
import BaseButton from '@/components/ui/BaseButton.vue'

/**
 * "طريقة الاضافة" (976:10645): a popover the design opens inside the alternatives panel, 90px above
 * the "اضافة بديل اخر" button, to add an alternative manually or from the catalog.
 */
const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ choose: [method: 'manual' | 'catalog'] }>()
const { t } = useI18n()
const titleId = useId()
const panel = useTemplateRef<HTMLElement>('panel')

watch(open, async (isOpen) => {
  if (isOpen) {
    await nextTick()
    panel.value?.querySelector<HTMLElement>('button')?.focus()
  }
})

onClickOutside(panel, () => (open.value = false), { ignore: ['[data-add-alternative-trigger]'] })
onKeyStroke('Escape', () => (open.value = false))

function choose(method: 'manual' | 'catalog'): void {
  open.value = false
  emit('choose', method)
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    leave-active-class="transition duration-150"
    leave-to-class="opacity-0"
  >
    <div
      v-if="open"
      ref="panel"
      role="dialog"
      :aria-labelledby="titleId"
      class="absolute inset-x-3 bottom-[calc(100%+90px)] z-10 rounded-xl bg-white pb-2 shadow-card ring-1 ring-line"
    >
      <header class="flex items-center gap-2 border-b border-line p-4">
        <button
          type="button"
          class="grid size-[26px] shrink-0 place-items-center rounded-lg border border-line p-1 text-primary hover:border-accent"
          :aria-label="t('common.close')"
          @click="open = false"
        >
          <CancelIcon class="size-4" aria-hidden="true" />
        </button>
        <h2 :id="titleId" class="text-h4 text-black">{{ t('dashboard.products.addMethod') }}</h2>
      </header>
      <div class="flex flex-col gap-4 p-4">
        <BaseButton variant="soft" block @click="choose('manual')">
          <template #icon><AddIcon class="size-5" aria-hidden="true" /></template>
          {{ t('dashboard.products.addManual') }}
        </BaseButton>
        <BaseButton variant="soft" block @click="choose('catalog')">
          <template #icon><SearchListIcon class="size-5" aria-hidden="true" /></template>
          {{ t('dashboard.products.addFromCatalog') }}
        </BaseButton>
      </div>
    </div>
  </Transition>
</template>
