<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import SelectField from '@/components/form/SelectField.vue'
import TextField from '@/components/form/TextField.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useLocalizedText } from '@/composables/useLocalizedText'
import { productBrands, productOrigins } from '@/mocks/dashboard-products'
import type { PartOrigin } from '@/types/catalog'

import type { ProductDraft } from './useSupplierProducts'

/** Manual add / edit form (884:15299): part number, name, type, car brand, price. */
const props = defineProps<{ initial?: ProductDraft; submitLabel: string }>()
const emit = defineEmits<{ submit: [draft: ProductDraft] }>()
const { t } = useI18n()
const localized = useLocalizedText()

const form = reactive({
  partNumber: props.initial?.partNumber ?? '',
  name: props.initial ? localized(props.initial.name) : '',
  origin: (props.initial?.origin ?? 'original') as PartOrigin | null,
  brandId: (props.initial?.brandId ?? 'toyota') as string | null,
  price: props.initial ? String(props.initial.price) : '0',
})
const submitted = ref(false)

const originOptions = computed(() =>
  productOrigins.map((origin) => ({ value: origin, label: t(`catalog.origins.${origin}`) })),
)
const brandOptions = computed(() =>
  productBrands.map((brand) => ({ value: brand.id, label: localized(brand.name) })),
)

const errors = computed(() => {
  if (!submitted.value) {
    return {}
  }
  const price = Number(form.price)
  return {
    partNumber: form.partNumber.trim() ? '' : t('dashboard.products.errors.partNumber'),
    name: form.name.trim() ? '' : t('dashboard.products.errors.name'),
    origin: form.origin ? '' : t('dashboard.products.errors.origin'),
    brandId: form.brandId ? '' : t('dashboard.products.errors.brand'),
    price: Number.isFinite(price) && price > 0 ? '' : t('dashboard.products.errors.price'),
  }
})

function submit(): void {
  submitted.value = true
  if (Object.values(errors.value).some(Boolean)) {
    return
  }
  emit('submit', {
    partNumber: form.partNumber.trim(),
    name: form.name.trim(),
    origin: form.origin!,
    brandId: form.brandId!,
    price: Number(form.price),
  })
}

function sanitizePrice(value: string): string {
  return value.replace(/[^\d.]/g, '')
}
</script>

<template>
  <form class="flex flex-col gap-4 [&_label]:text-muted" novalidate @submit.prevent="submit">
    <TextField
      surface
      v-model="form.partNumber"
      :label="t('dashboard.products.columns.partNumber')"
      placeholder="04465-0K240"
      sample-placeholder
      dir="ltr"
      class="rtl:text-right placeholder:text-ink/60!"
      :error="errors.partNumber"
    />
    <TextField
      surface
      v-model="form.name"
      :label="t('dashboard.products.columns.name')"
      :placeholder="t('dashboard.products.namePlaceholder')"
      sample-placeholder
      class="placeholder:text-ink/60!"
      :error="errors.name"
    />
    <SelectField
      v-model="form.origin"
      :options="originOptions"
      :label="t('dashboard.products.columns.type')"
      :placeholder="t('form.choose')"
      :error="errors.origin"
      surface
    />
    <SelectField
      v-model="form.brandId"
      :options="brandOptions"
      :label="t('dashboard.products.carBrand')"
      :placeholder="t('form.choose')"
      :error="errors.brandId"
      surface
    />
    <TextField
      surface
      :model-value="form.price"
      :label="t('dashboard.products.columns.price')"
      inputmode="decimal"
      dir="ltr"
      class="rtl:text-right"
      :error="errors.price"
      @update:model-value="form.price = sanitizePrice($event)"
    />
    <BaseButton type="submit" class="w-[115px] self-start px-10">{{ submitLabel }}</BaseButton>
  </form>
</template>
