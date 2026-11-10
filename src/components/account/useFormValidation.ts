import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { validate, type Validator } from './validators'

/**
 * Small form helper: holds the values, validates on submit and then live after the first submit,
 * and exposes translated error messages per field.
 */
export function useFormValidation<T extends Record<string, string>>(
  initial: T,
  rules: Partial<Record<keyof T, Validator[]>>,
) {
  const { t } = useI18n()
  const values = reactive({ ...initial }) as T
  const submitted = ref(false)

  const errors = computed(() => {
    const result: Partial<Record<keyof T, string>> = {}
    if (!submitted.value) {
      return result
    }
    for (const field of Object.keys(rules) as Array<keyof T>) {
      const error = validate(String(values[field] ?? ''), rules[field] ?? [])
      if (error) {
        result[field] = t(error.key, error.params ?? {})
      }
    }
    return result
  })

  /** Marks the form as submitted; returns true when every field is valid. */
  function check(): boolean {
    submitted.value = true
    return Object.keys(errors.value).length === 0
  }

  function reset(next: T = initial): void {
    Object.assign(values, next)
    submitted.value = false
  }

  return { values, errors, check, reset }
}
