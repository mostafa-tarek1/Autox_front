<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import CallingIcon from '@/assets/icons/calling--stroke-rounded.svg'
import SupportIcon from '@/assets/icons/customer-service-02--solid-standard.svg'
import WhatsappIcon from '@/assets/icons/whatsapp--stroke-rounded.svg'

const { t } = useI18n()
const isOpen = ref(false)

/** Placeholder contact details until the backend settings are wired. */
const actions = [
  { key: 'whatsapp', href: 'https://wa.me/966500000000', icon: WhatsappIcon },
  { key: 'call', href: 'tel:+966500000000', icon: CallingIcon },
] as const
</script>

<template>
  <div class="fixed right-4 bottom-6 z-30 flex flex-col items-center gap-2 xl:right-8">
    <Transition
      enter-active-class="transition duration-200"
      enter-from-class="opacity-0 translate-y-2"
      leave-active-class="transition duration-150"
      leave-to-class="opacity-0 translate-y-2"
    >
      <ul v-if="isOpen" id="support-actions" class="flex flex-col gap-2">
        <li v-for="action in actions" :key="action.key">
          <a
            :href="action.href"
            :aria-label="t(`support.${action.key}`)"
            target="_blank"
            rel="noopener noreferrer"
            class="grid size-10 place-items-center rounded-2xl bg-accent p-2 text-primary shadow-soft"
          >
            <component :is="action.icon" class="size-6" aria-hidden="true" />
          </a>
        </li>
      </ul>
    </Transition>
    <button
      type="button"
      class="grid size-12 place-items-center rounded-2xl p-3 shadow-soft transition-colors"
      :class="isOpen ? 'bg-primary text-accent' : 'bg-accent text-primary'"
      :aria-label="t('support.open')"
      :aria-expanded="isOpen"
      aria-controls="support-actions"
      @click="isOpen = !isOpen"
    >
      <SupportIcon class="size-6" aria-hidden="true" />
    </button>
  </div>
</template>
