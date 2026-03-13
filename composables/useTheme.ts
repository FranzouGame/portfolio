export const useTheme = () => {
  const colorMode = useState<'dark' | 'light'>('theme', () => 'light')

  const isDark = computed(() => colorMode.value === 'dark')

  const getPreferredTheme = (): 'dark' | 'light' => {
    if (!import.meta.client) {
      return colorMode.value
    }

    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || saved === 'light') {
      return saved
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const updateTheme = () => {
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', colorMode.value === 'dark')
      document.documentElement.classList.toggle('light', colorMode.value === 'light')
      document.documentElement.dataset.theme = colorMode.value
      localStorage.setItem('theme', colorMode.value)
    }
  }

  const toggleTheme = () => {
    colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
    updateTheme()
  }

  const initTheme = () => {
    if (import.meta.client) {
      colorMode.value = getPreferredTheme()
      updateTheme()
    }
  }

  return {
    colorMode,
    isDark,
    toggleTheme,
    initTheme,
  }
}
