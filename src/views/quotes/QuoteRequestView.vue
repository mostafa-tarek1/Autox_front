<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import AddIcon from '@/assets/icons/add-01--stroke-standard.svg'
import DeleteIcon from '@/assets/icons/delete-01--stroke-standard.svg'
import PageHero from '@/components/layout/PageHero.vue'
import QuoteSuccessModal from '@/components/quotes/QuoteSuccessModal.vue'
import TextField from '@/components/form/TextField.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import QuantityStepper from '@/components/ui/QuantityStepper.vue'

/** Request a quotation from suppliers (Figma 669:17145). */
const { t } = useI18n()

interface RequestRow {
  id: number
  part: string
  quantity: number
}

let nextId = 1
const rows = reactive<RequestRow[]>([{ id: nextId++, part: '', quantity: 1 }])
const submitted = ref(false)
const isSubmitting = ref(false)
const showSuccess = ref(false)

const rowErrors = computed(() =>
  rows.map((row) =>
    submitted.value && !row.part.trim() ? t('quotes.request.errors.part') : undefined,
  ),
)

function addRow(): void {
  rows.push({ id: nextId++, part: '', quantity: 1 })
}

function removeRow(index: number): void {
  rows.splice(index, 1)
}

async function submit(): Promise<void> {
  submitted.value = true
  if (rowErrors.value.some(Boolean)) {
    return
  }
  isSubmitting.value = true
  // UI phase: simulate sending the request to suppliers.
  await new Promise((resolve) => setTimeout(resolve, 600))
  isSubmitting.value = false
  showSuccess.value = true
}
</script>

<template>
  <PageHero
    :title="t('quotes.request.title')"
    :breadcrumbs="[
      { label: t('nav.home'), to: { name: 'home' } },
      { label: t('nav.quoteRequest') },
    ]"
  />

  <form
    class="mx-auto mt-10 flex w-full max-w-[767px] flex-col gap-8 px-4 sm:mt-16 sm:px-6 lg:px-4"
    novalidate
    @submit.prevent="submit"
  >
    <section
      class="flex flex-col items-start gap-8 rounded-xl border border-line bg-white px-4 py-4 sm:px-6"
      aria-labelledby="quote-request-heading"
    >
      <h2 id="quote-request-heading" class="text-h3 text-pretty text-ink">
        {{ t('quotes.request.heading') }}
      </h2>

      <ul class="flex w-full flex-col gap-6">
        <li
          v-for="(row, index) in rows"
          :key="row.id"
          class="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8"
        >
          <div class="min-w-0 flex-1">
            <TextField
              v-model="row.part"
              :label="t('quotes.request.part')"
              :placeholder="t('quotes.request.partPlaceholder')"
              :error="rowErrors[index]"
            />
          </div>
          <div class="flex items-end gap-3">
            <div class="flex flex-col gap-2">
              <span :id="`quote-qty-${row.id}`" class="text-body-sm text-ink">
                {{ t('quotes.request.quantity') }}
              </span>
              <QuantityStepper
                v-model="row.quantity"
                variant="surface"
                :min="1"
                :label="`${t('quotes.request.quantity')} ${index + 1}`"
                class="h-12! border-line! px-2! py-1!"
              />
            </div>
            <button
              v-if="rows.length > 1"
              type="button"
              class="grid size-12 place-items-center rounded-xl text-secondary transition-colors hover:bg-error/10 hover:text-error"
              :aria-label="t('quotes.request.removeRow', { index: index + 1 })"
              @click="removeRow(index)"
            >
              <DeleteIcon class="size-5" aria-hidden="true" />
            </button>
          </div>
        </li>
      </ul>

      <BaseButton variant="soft" @click="addRow">
        <template #icon><AddIcon class="size-5" aria-hidden="true" /></template>
        {{ t('quotes.request.more') }}
      </BaseButton>
    </section>

    <BaseButton type="submit" block :loading="isSubmitting">
      {{ t('quotes.request.submit') }}
    </BaseButton>
  </form>

  <QuoteSuccessModal
    v-model:open="showSuccess"
    :message="t('quotes.request.success')"
    :action-label="t('quotes.request.track')"
    :to="{ name: 'quotes' }"
  />
</template>
