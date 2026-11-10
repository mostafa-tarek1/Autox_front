<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import type { LegalSection } from '@/mocks/public'

const props = defineProps<{ sections: LegalSection[] }>()
const { t } = useI18n()

const activeId = ref(props.sections[0]?.id ?? '')
let observer: IntersectionObserver | null = null

/** Highlights the table-of-contents entry for the section currently at the top of the viewport. */
function observe(): void {
  observer?.disconnect()
  if (typeof IntersectionObserver === 'undefined') {
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
      const first = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (first) {
        activeId.value = first.target.id
      }
    },
    { rootMargin: '-96px 0px -60% 0px' },
  )
  for (const section of props.sections) {
    const element = document.getElementById(section.id)
    if (element) {
      observer.observe(element)
    }
  }
}

onMounted(observe)
watch(
  () => props.sections,
  () => requestAnimationFrame(observe),
)
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="page-container flex flex-col gap-8 pt-12 lg:flex-row lg:items-start">
    <nav
      :aria-label="t('public.legal.contents')"
      class="rounded-2xl bg-white py-2 shadow-card lg:sticky lg:top-24 lg:w-[282px] lg:shrink-0"
    >
      <ol>
        <li v-for="(section, index) in sections" :key="section.id">
          <a
            :href="`#${section.id}`"
            class="flex min-h-11 items-center p-3 transition-colors hover:text-primary"
            :class="
              activeId === section.id ? 'text-button text-ink' : 'text-body-sm text-secondary'
            "
            :aria-current="activeId === section.id ? 'true' : undefined"
            @click="activeId = section.id"
          >
            {{ index + 1 }}. {{ section.title }}
          </a>
        </li>
      </ol>
    </nav>

    <article class="flex min-w-0 flex-1 flex-col gap-8">
      <section
        v-for="(section, index) in sections"
        :id="section.id"
        :key="section.id"
        class="flex scroll-mt-24 flex-col gap-4"
        :aria-labelledby="`${section.id}-title`"
      >
        <h2 :id="`${section.id}-title`" class="text-h2 text-ink">
          {{ index + 1 }}. {{ section.title }}
        </h2>
        <div class="text-body-sm text-ink">
          <template v-for="(block, blockIndex) in section.blocks" :key="blockIndex">
            <p v-if="block.type === 'paragraph'">{{ block.text }}</p>
            <h3 v-else-if="block.type === 'subheading'" class="text-body-sm">{{ block.text }}</h3>
            <component
              :is="block.ordered ? 'ol' : 'ul'"
              v-else
              class="ps-6"
              :class="block.ordered ? 'list-decimal' : 'list-disc'"
            >
              <li v-for="(item, itemIndex) in block.items" :key="itemIndex">
                <template v-if="typeof item === 'string'">{{ item }}</template>
                <template v-else>
                  {{ item.text }}
                  <ul class="list-disc ps-6">
                    <li v-for="(child, childIndex) in item.items" :key="childIndex">{{ child }}</li>
                  </ul>
                </template>
              </li>
            </component>
          </template>
        </div>
      </section>
    </article>
  </div>
</template>
