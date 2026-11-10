import { useTimeoutFn } from '@vueuse/core'
import { ref } from 'vue'

const isVisible = ref(false)
const { start, stop } = useTimeoutFn(() => (isVisible.value = false), 3000, { immediate: false })

/** Shared state for the "added to cart" toast; `show()` re-arms the 3s auto-hide. */
export function useAddedToCartToast() {
  function show(): void {
    stop()
    isVisible.value = true
    start()
  }

  return { isVisible, show }
}
