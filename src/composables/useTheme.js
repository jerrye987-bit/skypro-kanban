import { useDark, useToggle } from '@vueuse/core'
import { watchEffect } from 'vue'

const isDark = useDark({
  selector: 'html',
  attribute: 'data-theme',
  valueDark: 'dark',
  valueLight: '',
  storageKey: 'theme',
})

const toggleTheme = useToggle(isDark)

watchEffect(() => {
  const existing = document.getElementById('dark-theme-styles')
  if (isDark.value) {
    if (!existing) {
      const link = document.createElement('link')
      link.id = 'dark-theme-styles'
      link.rel = 'stylesheet'
      link.href = '/assets/main_dark.css'
      document.head.appendChild(link)
    }
  } else {
    if (existing) {
      existing.remove()
    }
  }
})

export function useTheme() {
  return {
    isDark,
    toggleTheme,
  }
}
