<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import MailIcon from '@/assets/icons/mail-01--stroke-rounded.svg'
import SentIcon from '@/assets/icons/sent--stroke-standard.svg'
import UserIcon from '@/assets/icons/user--stroke-rounded.svg'
import TextField from '@/components/form/TextField.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { contactSender } from '@/mocks/public'

const { t } = useI18n()

/** Name and email come prefilled from the signed-in account, as in the design. */
const form = reactive({ ...contactSender, subject: '', message: '' })
const submitted = ref(false)
const isSending = ref(false)
const isSent = ref(false)

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const errors = computed(() => {
  if (!submitted.value) {
    return {}
  }
  return {
    name: form.name.trim() ? undefined : t('public.contact.errors.required'),
    email: !form.email.trim()
      ? t('public.contact.errors.required')
      : EMAIL_PATTERN.test(form.email.trim())
        ? undefined
        : t('public.contact.errors.email'),
    subject: form.subject.trim() ? undefined : t('public.contact.errors.required'),
    message: form.message.trim() ? undefined : t('public.contact.errors.required'),
  }
})

const hasErrors = computed(() => Object.values(errors.value).some(Boolean))

/** Mock submit for the UI phase; replaced by the contact API call. */
async function submit(): Promise<void> {
  submitted.value = true
  isSent.value = false
  if (hasErrors.value) {
    return
  }
  isSending.value = true
  await new Promise((resolve) => setTimeout(resolve, 600))
  isSending.value = false
  isSent.value = true
  Object.assign(form, { subject: '', message: '' })
  submitted.value = false
}
</script>

<template>
  <form class="flex flex-col gap-6 p-6 sm:p-12" novalidate @submit.prevent="submit">
    <h2 class="text-h2 text-ink">{{ t('public.contact.formTitle') }}</h2>

    <div class="flex flex-col gap-5 [&_label]:leading-5">
      <TextField
        v-model="form.name"
        :label="t('public.contact.fields.name')"
        :placeholder="t('public.contact.placeholders.name')"
        :icon="UserIcon"
        :error="errors.name"
        class="placeholder:text-ink/50!"
        autocomplete="name"
      />
      <TextField
        v-model="form.email"
        type="email"
        :label="t('public.contact.fields.email')"
        :placeholder="t('public.contact.placeholders.email')"
        :icon="MailIcon"
        :error="errors.email"
        class="placeholder:text-ink/50!"
        autocomplete="email"
      />
      <TextField
        v-model="form.subject"
        :label="t('public.contact.fields.subject')"
        :placeholder="t('public.contact.placeholders.subject')"
        :error="errors.subject"
        class="placeholder:text-ink/50!"
      />
      <TextField
        v-model="form.message"
        multiline
        :rows="4"
        :label="t('public.contact.fields.message')"
        :placeholder="t('public.contact.placeholders.subject')"
        :error="errors.message"
        class="h-[97px] placeholder:text-ink/50!"
      />

      <div class="flex flex-wrap items-center gap-4">
        <BaseButton type="submit" :loading="isSending">
          <template #icon><SentIcon class="size-5" aria-hidden="true" /></template>
          {{ t('public.contact.submit') }}
        </BaseButton>
        <p v-if="isSent" class="text-body-sm text-success" role="status">
          {{ t('public.contact.sent') }}
        </p>
      </div>
    </div>
  </form>
</template>
