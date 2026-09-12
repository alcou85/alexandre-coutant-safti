<template>
  <div class="step">
    <div class="step-header">
      <h2 class="step-title">Votre adresse</h2>
      <p class="step-subtitle">
        Indiquez l'adresse exacte du bien à estimer.
      </p>
    </div>

    <div class="step-body">
      <div class="form-field">
        <label class="form-label" for="address-input">
          Adresse du bien <span class="required" aria-hidden="true">*</span>
        </label>
        <AddressAutocomplete
          :modelValue="address"
          placeholder="Ex : 12 rue de la Paix, La Roche-sur-Yon"
          @update:modelValue="onAddressInput"
          @select="onAddressSelect"
        />
        <p v-if="showSelectionError" class="form-error">
          Veuillez sélectionner une adresse dans la liste de suggestions.
        </p>
      </div>

      <!-- Hors zone — block mode -->
      <div v-if="hors_zone && horsZoneMode === 'block'" class="alert alert--error" role="alert">
        <strong>Secteur hors zone</strong>
        <p>
          Ce secteur est en dehors de ma zone d'intervention (La Roche-sur-Yon / Les Sables-d'Olonne et alentours).
          Pour toute demande hors secteur, contactez-moi directement.
        </p>
        <RouterLink to="/contact" class="btn-outline btn-sm" style="margin-top:0.75rem">
          Me contacter
        </RouterLink>
      </div>

      <!-- Hors zone — capture mode -->
      <div v-if="hors_zone && horsZoneMode === 'capture'" class="alert alert--warning" role="alert">
        <strong>Secteur hors de ma zone principale</strong>
        <p>
          Ce secteur est hors de ma zone principale (La Roche-sur-Yon / Les Sables-d'Olonne).
          Je pourrai vous proposer une estimation personnalisée.
        </p>
      </div>
    </div>

    <div class="step-actions">
      <button
        type="button"
        class="btn-primary"
        :disabled="hors_zone && horsZoneMode === 'block'"
        @click="handleNext"
      >
        Suivant
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AddressAutocomplete from '../AddressAutocomplete.vue'

const props = defineProps({
  address: { type: String, required: true },
  lat: { type: Number, default: null },
  lon: { type: Number, default: null },
  code_commune: { type: String, default: '' },
  code_postal: { type: String, default: '' },
  hors_zone: { type: Boolean, default: false },
  horsZoneMode: { type: String, default: 'capture' },
})

const emit = defineEmits(['update', 'next'])

// Postcodes in the intervention zone
const ZONE_POSTCODES = ['85190', '85000', '85280', '85310', '85430', '85150', '85480', '85100']

const showSelectionError = ref(false)
// Track if user selected from autocomplete (not just typed)
const isSelected = ref(props.lat !== null)

function onAddressInput(value) {
  // User is typing again — reset selection state
  isSelected.value = false
  showSelectionError.value = false
  emit('update', {
    address: value,
    lat: null,
    lon: null,
    code_commune: '',
    code_postal: '',
    hors_zone: false,
  })
}

function onAddressSelect(payload) {
  const hors_zone = !ZONE_POSTCODES.includes(payload.postcode)
  isSelected.value = true
  showSelectionError.value = false
  emit('update', {
    address: payload.label,
    lat: payload.lat,
    lon: payload.lon,
    code_commune: payload.citycode,
    code_postal: payload.postcode,
    hors_zone,
  })
}

function handleNext() {
  if (!isSelected.value || !props.address) {
    showSelectionError.value = true
    return
  }
  if (props.hors_zone && props.horsZoneMode === 'block') {
    return
  }
  emit('next')
}
</script>

<style scoped>
.step {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.step-header {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.step-title {
  font-size: clamp(1.35rem, 3vw, 1.8rem);
}

.step-subtitle {
  color: var(--color-muted);
  font-size: 0.95rem;
  margin-bottom: 0;
}

.step-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.required {
  color: var(--color-accent);
}

.step-actions {
  display: flex;
  justify-content: flex-end;
}

/* Alerts */
.alert {
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.alert strong {
  font-size: 0.95rem;
}

.alert p {
  font-size: 0.875rem;
  margin-bottom: 0;
}

.alert--error {
  background-color: var(--color-error-bg);
  color: var(--color-error);
  border: 1px solid rgba(155, 35, 53, 0.2);
}

.alert--warning {
  background-color: var(--color-warning-bg);
  color: var(--color-warning);
  border: 1px solid rgba(146, 64, 14, 0.2);
}

.btn-sm {
  padding: 0.4rem 0.9rem;
  font-size: 0.8rem;
  align-self: flex-start;
}
</style>
