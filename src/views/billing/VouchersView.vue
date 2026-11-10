<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import CardValidationIcon from '@/assets/icons/credit-card-validation--duotone-rounded.svg'
import SupportIcon from '@/assets/icons/customer-service-01--duotone-rounded.svg'
import SupportLargeIcon from '@/assets/icons/customer-service-02--duotone-rounded.svg'
import CartCheckIcon from '@/assets/icons/shopping-cart-check-out-01--duotone-rounded.svg'
import UserStarIcon from '@/assets/icons/user-star-01--duotone-rounded.svg'
import heroImage from '@/assets/images/billing/installments-hero.webp'
import ArrowLeftIcon from '@/assets/images/billing/steps/step-arrow-left.svg'
import CheckIcon from '@/assets/images/billing/steps/step-check-circle.svg'
import CardIcon from '@/assets/images/billing/steps/step-credit-card.svg'
import UserIcon from '@/assets/images/billing/steps/step-user.svg'
import IconBox from '@/components/billing/IconBox.vue'
import PageHero from '@/components/layout/PageHero.vue'
import SectionHeading from '@/components/billing/SectionHeading.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const { t } = useI18n()

const advantages = [
  { key: 'customers', icon: UserStarIcon },
  { key: 'sales', icon: CartCheckIcon },
  { key: 'commission', icon: CardValidationIcon },
  { key: 'speed', icon: SupportIcon },
] as const

const steps = [
  { key: 'create', icon: UserIcon },
  { key: 'customer', icon: CardIcon },
  { key: 'payment', icon: CheckIcon },
] as const

/** Opens the support chat; the request flow is handled by customer service. */
const contactLink = '/contact'
</script>

<template>
  <PageHero
    :title="t('billing.vouchers')"
    :breadcrumbs="[
      { label: t('nav.home'), to: { name: 'home' } },
      { label: t('billing.vouchers') },
    ]"
  />

  <section class="page-container pt-12" aria-labelledby="installments-title">
    <div class="relative isolate overflow-hidden rounded-3xl shadow-card">
      <img
        :src="heroImage"
        alt=""
        width="1200"
        height="534"
        class="absolute inset-0 -z-20 size-full object-cover object-[center_25%] xl:inset-auto xl:top-[-112px] xl:left-[3px] xl:h-[798px] xl:w-[1197px] xl:max-w-none"
      />
      <div
        class="absolute inset-0 -z-10 bg-linear-to-b from-success/10 to-black xl:inset-auto xl:top-0 xl:left-[3px] xl:h-[562px] xl:w-[1197px]"
        aria-hidden="true"
      />
      <div
        class="flex min-h-[420px] flex-col items-center justify-end gap-8 px-4 pt-24 pb-16 text-center sm:min-h-[534px]"
      >
        <div class="flex max-w-[794px] flex-col gap-4">
          <h2
            id="installments-title"
            class="text-[28px]/[44px] font-bold text-white sm:text-display"
          >
            {{ t('billing.installments.heroTitle') }}
          </h2>
          <p class="text-h3 text-white">{{ t('billing.installments.heroSubtitle') }}</p>
        </div>
        <BaseButton :to="contactLink" class="w-[238px] max-w-full">{{
          t('billing.installments.requestService')
        }}</BaseButton>
      </div>
    </div>
  </section>

  <section class="mt-20 bg-white py-20" aria-labelledby="advantages-title">
    <div class="page-container flex flex-col gap-10">
      <SectionHeading
        id="advantages-title"
        :title="t('billing.installments.advantagesTitle')"
        :subtitle="t('billing.installments.advantagesSubtitle')"
      />
      <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <li
          v-for="advantage in advantages"
          :key="advantage.key"
          class="flex flex-col items-start gap-4 rounded-2xl bg-surface p-6 shadow-card"
        >
          <IconBox :icon="advantage.icon" size="xl" tone="white" />
          <div class="flex flex-col gap-2">
            <h3 class="text-h3 text-ink">
              {{ t(`billing.installments.advantages.${advantage.key}.title`) }}
            </h3>
            <p class="text-body-sm text-secondary">
              {{ t(`billing.installments.advantages.${advantage.key}.text`) }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </section>

  <section class="mt-[76px] bg-surface py-16" aria-labelledby="steps-title">
    <div class="page-container flex flex-col gap-12">
      <SectionHeading
        id="steps-title"
        :title="t('billing.installments.stepsTitle')"
        :subtitle="t('billing.installments.stepsSubtitle')"
      />
      <ol
        class="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center lg:gap-0"
      >
        <template v-for="(step, index) in steps" :key="step.key">
          <li
            v-if="index > 0"
            class="hidden h-[72px] w-10 shrink-0 place-items-center text-line lg:grid"
            aria-hidden="true"
          >
            <ArrowLeftIcon class="size-6 ltr:-scale-x-100" />
          </li>
          <li class="flex w-full max-w-[373px] flex-col items-center gap-5 px-4 text-center">
            <div class="flex flex-col items-center">
              <span class="grid size-[72px] place-items-center rounded-full bg-primary text-accent">
                <component :is="step.icon" class="size-8" aria-hidden="true" />
              </span>
              <span class="h-6 w-0.5 bg-line" aria-hidden="true" />
              <span
                class="rounded-full bg-accent px-4 py-1.5 text-[13px] leading-5 font-bold text-primary"
              >
                {{ t('billing.installments.step', { number: index + 1 }) }}
              </span>
            </div>
            <div class="flex flex-col gap-2">
              <h3 class="text-h3 text-ink">
                {{ t(`billing.installments.steps.${step.key}.title`) }}
              </h3>
              <p class="text-body-sm text-secondary">
                {{ t(`billing.installments.steps.${step.key}.text`) }}
              </p>
            </div>
          </li>
        </template>
      </ol>
    </div>
  </section>

  <section class="mt-[76px] bg-primary py-20" aria-labelledby="cta-title">
    <div class="page-container flex flex-col items-center gap-8 text-center">
      <span class="grid size-20 place-items-center rounded-full bg-accent p-5 text-primary">
        <SupportLargeIcon class="size-10" aria-hidden="true" />
      </span>
      <div class="flex max-w-[800px] flex-col gap-4">
        <h2 id="cta-title" class="text-[26px]/9 font-bold text-white sm:text-h1">
          {{ t('billing.installments.ctaTitle') }}
        </h2>
        <p class="mx-auto max-w-[720px] text-body-lg text-white/80">
          {{ t('billing.installments.ctaText') }}
        </p>
      </div>
      <BaseButton :to="contactLink" class="w-[238px] max-w-full">{{
        t('billing.installments.requestService')
      }}</BaseButton>
    </div>
  </section>
</template>
