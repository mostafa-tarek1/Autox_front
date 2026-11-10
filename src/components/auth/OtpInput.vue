<script setup lang="ts">
/** Codes read left to right in every locale. */
import { nextTick, onMounted, ref, useTemplateRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = withDefaults(
  defineProps<{ length?: number; invalid?: boolean; describedBy?: string; autofocus?: boolean }>(),
  { length: 4, autofocus: true },
)

const code = defineModel<string>({ default: '' })
const { t } = useI18n()
const inputs = useTemplateRef<HTMLInputElement[]>('inputs')

function split(value: string): string[] {
  return Array.from({ length: props.length }, (_, index) => value[index] ?? '')
}

/**
 * Local copy of the boxes: the v-model prop only updates after the parent re-renders, so fast
 * typing (or autofill) would otherwise read a stale value between keystrokes.
 */
const digits = ref<string[]>(split(code.value))

watch(code, (value) => {
  if (value !== digits.value.join('')) {
    digits.value = split(value)
  }
})

function commit(next: string[]): void {
  digits.value = next
  code.value = next.join('')
}

/** Moves focus synchronously so fast typing never lands in the previous box. */
function focusAt(index: number): void {
  inputs.value?.[Math.max(0, Math.min(props.length - 1, index))]?.focus()
}

onMounted(() => props.autofocus && nextTick(() => focusAt(0)))

function setDigit(index: number, digit: string): void {
  const next = digits.value.slice()
  next[index] = digit
  commit(next)
}

function onInput(index: number, event: Event): void {
  const target = event.target as HTMLInputElement
  const typed = target.value.replace(/\D/g, '')
  if (typed.length > 1) {
    fill(typed, index)
    return
  }
  setDigit(index, typed)
  target.value = typed
  if (typed) {
    focusAt(index + 1)
  }
}

/** Spreads a pasted or autofilled code across the boxes. */
function fill(value: string, from = 0): void {
  const next = digits.value.slice()
  value
    .replace(/\D/g, '')
    .slice(0, props.length - from)
    .split('')
    .forEach((digit, offset) => (next[from + offset] = digit))
  commit(next)
  const firstEmpty = next.findIndex((digit) => !digit)
  focusAt(firstEmpty === -1 ? props.length - 1 : firstEmpty)
}

function onKeydown(index: number, event: KeyboardEvent): void {
  if (event.key === 'Backspace' && !digits.value[index] && index > 0) {
    event.preventDefault()
    setDigit(index - 1, '')
    focusAt(index - 1)
  } else if (event.key === 'ArrowLeft') {
    focusAt(index - 1)
  } else if (event.key === 'ArrowRight') {
    focusAt(index + 1)
  }
}

function onPaste(event: ClipboardEvent): void {
  event.preventDefault()
  fill(event.clipboardData?.getData('text') ?? '')
}
</script>

<template>
  <div
    dir="ltr"
    class="flex items-center gap-4 sm:gap-6"
    role="group"
    :aria-label="t('auth.otp.groupLabel')"
  >
    <input
      v-for="(digit, index) in digits"
      ref="inputs"
      :key="index"
      :value="digit"
      type="text"
      inputmode="numeric"
      pattern="[0-9]*"
      maxlength="1"
      :autocomplete="index === 0 ? 'one-time-code' : 'off'"
      :aria-label="t('auth.otp.digitLabel', { position: index + 1, total: length })"
      :aria-invalid="invalid || undefined"
      :aria-describedby="describedBy"
      class="h-12 w-14 rounded-xl border bg-white p-3 text-center text-body-md text-ink outline-none transition-colors focus:border-accent focus-visible:outline-none"
      :class="invalid ? 'border-error' : digit ? 'border-accent' : 'border-transparent'"
      @input="onInput(index, $event)"
      @keydown="onKeydown(index, $event)"
      @paste="onPaste"
      @focus="($event.target as HTMLInputElement).select()"
    />
  </div>
</template>
