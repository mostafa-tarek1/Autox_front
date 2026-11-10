<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import FileDropzone from '@/components/form/FileDropzone.vue'
import SelectField from '@/components/form/SelectField.vue'
import TextField from '@/components/form/TextField.vue'
import PageHero from '@/components/layout/PageHero.vue'
import ReturnItemOption from '@/components/orders/ReturnItemOption.vue'
import ReturnSuccessModal from '@/components/orders/ReturnSuccessModal.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { orderItemsFor, returnReasons } from '@/mocks/orders'

type ReturnReason = (typeof returnReasons)[number]

const props = defineProps<{ id: string }>()
const { t } = useI18n()

const items = computed(() => orderItemsFor(props.id))
const reason = ref<ReturnReason | null>(null)
const photo = ref<File | null>(null)
const notes = ref('')
const selection = reactive<Record<string, { selected: boolean; quantity: number }>>({})
const submitted = ref(false)
const isSubmitting = ref(false)
const showSuccess = ref(false)

const reasonOptions = computed(() =>
  returnReasons.map((value) => ({ value, label: t(`returns.form.reasons.${value}`) })),
)

function entryFor(itemId: string): { selected: boolean; quantity: number } {
  selection[itemId] ??= { selected: false, quantity: 1 }
  return selection[itemId]
}

const hasSelection = computed(() => Object.values(selection).some((entry) => entry.selected))
const reasonError = computed(() =>
  submitted.value && !reason.value ? t('returns.form.reasonRequired') : '',
)
const itemsError = computed(() =>
  submitted.value && !hasSelection.value ? t('returns.form.itemsRequired') : '',
)

async function submit(): Promise<void> {
  submitted.value = true
  if (!reason.value || !hasSelection.value) {
    return
  }
  isSubmitting.value = true
  // UI phase: simulate the API round-trip.
  await new Promise((resolve) => setTimeout(resolve, 400))
  isSubmitting.value = false
  showSuccess.value = true
}
</script>

<template>
  <PageHero
    :title="t('orders.titles.returnRequest')"
    :breadcrumbs="[
      { label: t('orders.home'), to: { name: 'home' } },
      { label: t('orders.orders'), to: { name: 'orders' } },
      { label: t('orders.titles.details'), to: { name: 'order-details', params: { id } } },
      { label: t('orders.titles.returnRequest') },
    ]"
  />

  <div class="page-container mt-12">
    <form
      class="mx-auto flex max-w-[792px] flex-col items-center gap-8 rounded-3xl bg-white p-6 shadow-card sm:p-12"
      novalidate
      @submit.prevent="submit"
    >
      <h2 class="text-center text-h3 text-ink">{{ t('returns.form.intro') }}</h2>

      <div class="flex w-full flex-col gap-6">
        <SelectField
          v-model="reason"
          :options="reasonOptions"
          :label="t('returns.form.reason')"
          :placeholder="t('returns.form.reasonPlaceholder')"
          :error="reasonError"
          required
        />
        <FileDropzone
          v-model="photo"
          :label="t('returns.form.photos')"
          accept=".png,.jpg,.jpeg,.pdf"
        />
        <TextField
          v-model="notes"
          :label="t('returns.form.notes')"
          :placeholder="t('returns.form.notesPlaceholder')"
        />
      </div>

      <hr class="w-full border-line" />

      <fieldset class="flex w-full flex-col gap-6">
        <legend class="mb-6 text-h4 text-ink">{{ t('returns.form.itemsTitle') }}</legend>
        <ul class="flex flex-col gap-4">
          <li v-for="item in items" :key="item.id">
            <ReturnItemOption
              v-model:selected="entryFor(item.id).selected"
              v-model:quantity="entryFor(item.id).quantity"
              :item="item"
            />
          </li>
        </ul>
        <p v-if="itemsError" class="text-caption text-error" role="alert">{{ itemsError }}</p>
      </fieldset>

      <BaseButton type="submit" block :loading="isSubmitting">{{
        t('returns.form.submit')
      }}</BaseButton>
    </form>
  </div>

  <ReturnSuccessModal v-model:open="showSuccess" />
</template>
