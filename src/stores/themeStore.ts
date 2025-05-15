import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Theme, ThemeMode } from "@/types/utils.d.ts";
import { env } from "@/helpers/app.ts";

export const useThemeStore = defineStore('theme', () => {
  // Theme state with default to 'dark'
  const theme = ref<ThemeMode>('dark')
  
  // Computed property to determine the actual theme based on system preference if 'system' is selected
  const actualTheme = ref<Theme>('dark')
  
  // Function to update the theme
  const setTheme = (newTheme: ThemeMode) => {
    if (!env('VITE_APP_ENABLE_THEMES', false)) {
      theme.value = 'dark'
    } else {
      theme.value = newTheme
    }
    applyTheme()
  }
  
  // Function to apply the theme to the document
  const applyTheme = () => {
    if (theme.value === 'system') {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      actualTheme.value = prefersDark ? 'dark' : 'light'
    } else {
      actualTheme.value = theme.value
    }
    
    // Apply theme to document
    if (actualTheme.value === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }
  
  // Initialize theme on page load
  const initTheme = () => {
    applyTheme()
    
    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme)
  }
  
  // Watch for theme changes
  watch(theme, () => {
    applyTheme()
  })
  
  return { theme, actualTheme, setTheme, initTheme }
}, { persist: true })