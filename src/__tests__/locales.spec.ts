import { createHead } from '@unhead/vue/client'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'

import { useDocumentLocale, useLocale } from '@/composables/useLocale'
import { useLocalizedText } from '@/composables/useLocalizedText'
import { brandNames, supplierName } from '@/mocks/names'
import { directionFor, i18n, SUPPORTED_LOCALES } from '@/plugins/i18n'

type Messages = Record<string, unknown>

const files = import.meta.glob<Messages>('@/locales/*/*.json', { eager: true, import: 'default' })

function flatten(value: unknown, prefix = ''): Record<string, string> {
  if (typeof value === 'string') {
    return { [prefix]: value }
  }
  return Object.entries(value as Messages).reduce<Record<string, string>>(
    (all, [key, child]) => ({ ...all, ...flatten(child, prefix ? `${prefix}.${key}` : key) }),
    {},
  )
}

function messagesFor(locale: string): Record<string, string> {
  return Object.entries(files)
    .filter(([path]) => path.split('/').at(-2) === locale)
    .reduce<Record<string, string>>((all, [path, content]) => {
      const file = path.split('/').at(-1)!.replace('.json', '')
      return { ...all, ...flatten(content, file) }
    }, {})
}

const placeholders = (text: string) => [...text.matchAll(/\{\w+\}/g)].map((m) => m[0]).sort()

describe('locales', () => {
  const arabic = messagesFor('ar')

  it.each(SUPPORTED_LOCALES.filter((locale) => locale !== 'ar'))(
    '%s has every Arabic key with the same placeholders',
    (locale) => {
      const other = messagesFor(locale)
      const missing = Object.keys(arabic).filter((key) => !(key in other))
      const wrongPlaceholders = Object.keys(arabic).filter(
        (key) =>
          key in other && placeholders(arabic[key]!).join() !== placeholders(other[key]!).join(),
      )

      expect(missing).toEqual([])
      expect(wrongPlaceholders).toEqual([])
    },
  )

  it('switches the document to Urdu right-to-left', async () => {
    const Probe = defineComponent({
      setup() {
        useDocumentLocale()
        return useLocale()
      },
      render: () => h('span'),
    })
    const wrapper = mount(Probe, { global: { plugins: [i18n, createHead()] } })

    wrapper.vm.setLocale('ur')
    await nextTick()

    expect(directionFor('ur')).toBe('rtl')
    await vi.waitFor(() => {
      expect(document.documentElement.lang).toBe('ur')
      expect(document.documentElement.dir).toBe('rtl')
    })

    wrapper.vm.setLocale('ar')
    wrapper.unmount()
  })

  it('shows brand and supplier names in the current locale', async () => {
    const Probe = defineComponent({
      setup() {
        const { setLocale } = useLocale()
        const localized = useLocalizedText()
        return { setLocale, localized }
      },
      render: () => h('span'),
    })
    const wrapper = mount(Probe, { global: { plugins: [i18n] } })
    const names = () => [
      wrapper.vm.localized(brandNames.hyundai),
      wrapper.vm.localized(supplierName(1)),
      wrapper.vm.localized('فهد العتيبي'),
    ]

    expect(names()).toEqual(['هيونداي', 'الشركة رقم 1', 'فهد العتيبي'])

    wrapper.vm.setLocale('en')
    expect(names()).toEqual(['Hyundai', 'Company 1', 'فهد العتيبي'])

    wrapper.vm.setLocale('ur')
    expect(names()).toEqual(['ہنڈائی', 'کمپنی نمبر 1', 'فهد العتيبي'])

    wrapper.vm.setLocale('ar')
    wrapper.unmount()
  })
})
