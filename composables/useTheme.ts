export const useTheme = () => {
  const colorMode = useState<'dark' | 'light'>('theme', () => 'dark')

  const isDark = computed(() => colorMode.value === 'dark')

  const toggleTheme = () => {
    colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
    updateTheme()
  }

  const updateTheme = () => {
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', colorMode.value === 'dark')
      document.documentElement.classList.toggle('light', colorMode.value === 'light')
      localStorage.setItem('theme', colorMode.value)
    }
  }

  const initTheme = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem('theme') as 'dark' | 'light' | null
      colorMode.value = saved || 'dark'
      updateTheme()
    }
  }

  return {
    colorMode,
    isDark,
    toggleTheme,
    initTheme
  }
}