<template>
  <div class="autocomplete" ref="wrapperRef">
    <input
      ref="inputRef"
      type="text"
      class="form-input autocomplete-input"
      :placeholder="placeholder"
      :value="modelValue"
      autocomplete="off"
      aria-label="Adresse du bien"
      aria-autocomplete="list"
      :aria-expanded="suggestions.length > 0"
      aria-controls="autocomplete-listbox"
      :aria-activedescendant="activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined"
      @input="onInput"
      @keydown="onKeydown"
      @blur="onBlur"
    />

    <ul
      v-if="suggestions.length > 0"
      id="autocomplete-listbox"
      class="autocomplete-dropdown"
      role="listbox"
    >
      <li
        v-for="(item, index) in suggestions"
        :id="`suggestion-${index}`"
        :key="item.properties.id"
        class="autocomplete-item"
        :class="{ 'autocomplete-item--active': index === activeIndex }"
        role="option"
        :aria-selected="index === activeIndex"
        @mousedown.prevent="selectItem(item)"
        @mouseover="activeIndex = index"
      >
        <span class="autocomplete-item-label">{{ item.properties.label }}</span>
        <span class="autocomplete-item-city">{{ item.properties.city }}</span>
      </li>
    </ul>

    <p v-if="noResults" class="autocomplete-no-results">Aucune adresse trouvée.</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Entrez votre adresse',
  },
})

const emit = defineEmits(['update:modelValue', 'select'])

const wrapperRef = ref(null)
const inputRef = ref(null)
const suggestions = ref([])
const activeIndex = ref(-1)
const noResults = ref(false)
let debounceTimer = null

function onInput(event) {
  const query = event.target.value
  emit('update:modelValue', query)
  noResults.value = false

  clearTimeout(debounceTimer)

  if (query.trim().length < 3) {
    suggestions.value = []
    return
  }

  debounceTimer = setTimeout(() => {
    fetchSuggestions(query)
  }, 300)
}

async function fetchSuggestions(query) {
  try {
    const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5&type=housenumber`
    const response = await fetch(url)
    if (!response.ok) throw new Error('Erreur réseau')
    const data = await response.json()
    suggestions.value = data.features || []
    activeIndex.value = -1
    noResults.value = suggestions.value.length === 0
  } catch {
    suggestions.value = []
    noResults.value = false
  }
}

function selectItem(item) {
  const props_data = item.properties
  const [lon, lat] = item.geometry.coordinates

  emit('update:modelValue', props_data.label)
  emit('select', {
    label: props_data.label,
    postcode: props_data.postcode,
    citycode: props_data.citycode,
    lat,
    lon,
  })

  suggestions.value = []
  activeIndex.value = -1
  noResults.value = false
}

function onKeydown(event) {
  if (!suggestions.value.length) return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      activeIndex.value = Math.min(activeIndex.value + 1, suggestions.value.length - 1)
      break
    case 'ArrowUp':
      event.preventDefault()
      activeIndex.value = Math.max(activeIndex.value - 1, 0)
      break
    case 'Enter':
      event.preventDefault()
      if (activeIndex.value >= 0) {
        selectItem(suggestions.value[activeIndex.value])
      }
      break
    case 'Escape':
      suggestions.value = []
      activeIndex.value = -1
      noResults.value = false
      break
  }
}

function onBlur() {
  // Small delay so mousedown on suggestion fires first
  setTimeout(() => {
    suggestions.value = []
    activeIndex.value = -1
    noResults.value = false
  }, 150)
}

// Clear suggestions if modelValue is cleared externally
watch(() => props.modelValue, (val) => {
  if (!val) {
    suggestions.value = []
    noResults.value = false
  }
})
</script>

<style scoped>
.autocomplete {
  position: relative;
  width: 100%;
}

.autocomplete-input {
  width: 100%;
}

.autocomplete-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
  list-style: none;
  padding: 0.25rem 0;
  margin: 0;
  z-index: 200;
  max-height: 260px;
  overflow-y: auto;
}

.autocomplete-item {
  display: flex;
  flex-direction: column;
  padding: 0.6rem 0.9rem;
  cursor: pointer;
  transition: background-color var(--transition);
}

.autocomplete-item--active,
.autocomplete-item:hover {
  background-color: rgba(186, 155, 106, 0.08);
}

.autocomplete-item-label {
  font-size: 0.9rem;
  color: var(--color-primary);
  font-weight: 500;
}

.autocomplete-item-city {
  font-size: 0.78rem;
  color: var(--color-muted);
  margin-top: 0.1rem;
}

.autocomplete-no-results {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 0.65rem 0.9rem;
  font-size: 0.875rem;
  color: var(--color-muted);
  box-shadow: var(--shadow-sm);
}
</style>
