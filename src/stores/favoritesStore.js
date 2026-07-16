import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref(JSON.parse(localStorage.getItem('mentorMatch_favorites')) || [])

  watch(favorites, (newVal) => {
    localStorage.setItem('mentorMatch_favorites', JSON.stringify(newVal))
  }, { deep: true })

  const toggleFavorite = (mentor) => {
    const index = favorites.value.findIndex(m => m._id === mentor._id)
    if (index === -1) {
      favorites.value.push(mentor)
    } else {
      favorites.value.splice(index, 1)
    }
  }

  const isFavorite = (mentorId) => {
    return favorites.value.some(m => m._id === mentorId)
  }

  return { favorites, toggleFavorite, isFavorite }
})
