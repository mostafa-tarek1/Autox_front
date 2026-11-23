<script setup lang="ts">
/**
 * Supplier dashboard footer (Figma "Dashboard" frames): a 40px strip under the content with the
 * copyright at the start and the studio credit at the end. The design keeps both lines in English
 * in every locale, so they are not translated.
 */
const year = new Date().getFullYear()
</script>

<template>
  <footer
    class="flex min-h-10 flex-col items-center justify-center gap-1 bg-white/50 px-6 py-2 text-body-sm text-secondary sm:flex-row sm:justify-between sm:py-0"
  >
    <p dir="ltr">© {{ year }} Parts X, All Rights Reserved</p>
    <p dir="ltr">Created By Elryad Team</p>
  </footer>
</template>
