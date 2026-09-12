<template>
  <div class="step">
    <div class="step-header">
      <h2 class="step-title">Votre bien</h2>
      <p class="step-subtitle">Renseignez les caractéristiques de votre bien pour obtenir une estimation précise.</p>
    </div>

    <form class="step-body" novalidate @submit.prevent="handleNext">

      <!-- Type toggle -->
      <div class="form-field">
        <span class="form-label">Type de bien <span class="required" aria-hidden="true">*</span></span>
        <div class="toggle-group" role="group" aria-label="Type de bien">
          <button
            type="button"
            class="toggle-btn"
            :class="{ 'toggle-btn--active': localType === 'maison' }"
            @click="localType = 'maison'"
          >
            Maison
          </button>
          <button
            type="button"
            class="toggle-btn"
            :class="{ 'toggle-btn--active': localType === 'appartement' }"
            @click="localType = 'appartement'"
          >
            Appartement
          </button>
        </div>
      </div>

      <!-- Surface -->
      <div class="form-field">
        <label class="form-label" for="surface">
          Surface habitable (m²) <span class="required" aria-hidden="true">*</span>
        </label>
        <input
          id="surface"
          v-model.number="localSurface"
          type="number"
          class="form-input field-narrow"
          min="9"
          max="5000"
          placeholder="Ex : 95"
          :class="{ 'form-input--error': errors.surface }"
        />
        <p v-if="errors.surface" class="form-error">{{ errors.surface }}</p>
      </div>

      <!-- Chambres -->
      <div class="form-field">
        <label class="form-label" for="chambres">
          Nombre de chambres <span class="required" aria-hidden="true">*</span>
        </label>
        <select
          id="chambres"
          v-model.number="localChambres"
          class="form-input field-narrow"
          :class="{ 'form-input--error': errors.chambres }"
        >
          <option value="" disabled>Sélectionner</option>
          <option v-for="n in 11" :key="n - 1" :value="n - 1">{{ n - 1 }}</option>
        </select>
        <p v-if="errors.chambres" class="form-error">{{ errors.chambres }}</p>
      </div>

      <!-- État -->
      <div class="form-field">
        <span class="form-label">État général <span class="required" aria-hidden="true">*</span></span>
        <div class="btn-group" role="group" aria-label="État général du bien">
          <button
            v-for="opt in etatOptions"
            :key="opt.value"
            type="button"
            class="state-btn"
            :class="{ 'state-btn--active': localEtat === opt.value }"
            @click="localEtat = opt.value"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>

      <!-- Maison-specific fields -->
      <template v-if="localType === 'maison'">
        <div class="form-field">
          <label class="form-label" for="terrain">Surface du terrain (m²) <span class="form-optional">optionnel</span></label>
          <input
            id="terrain"
            v-model.number="localTerrain"
            type="number"
            class="form-input field-narrow"
            min="0"
            placeholder="Ex : 450"
          />
        </div>

        <div class="form-field">
          <span class="form-label">Plain-pied ?</span>
          <div class="toggle-group" role="group" aria-label="Plain-pied">
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'toggle-btn--active': localPlainPied === true }"
              @click="localPlainPied = true"
            >
              Oui
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'toggle-btn--active': localPlainPied === false }"
              @click="localPlainPied = false"
            >
              Non
            </button>
          </div>
        </div>

        <div class="form-field">
          <span class="form-label">Garage ?</span>
          <div class="toggle-group" role="group" aria-label="Garage">
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'toggle-btn--active': localGarage === true }"
              @click="localGarage = true"
            >
              Oui
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'toggle-btn--active': localGarage === false }"
              @click="localGarage = false"
            >
              Non
            </button>
          </div>
        </div>
      </template>

      <!-- Appartement-specific fields -->
      <template v-if="localType === 'appartement'">
        <div class="form-field">
          <label class="form-label" for="etage">
            Étage <span class="form-optional">optionnel</span>
          </label>
          <input
            id="etage"
            v-model.number="localEtage"
            type="number"
            class="form-input field-narrow"
            min="0"
            max="50"
            placeholder="Ex : 2"
          />
        </div>

        <div class="form-field">
          <span class="form-label">Ascenseur ?</span>
          <div class="toggle-group" role="group" aria-label="Ascenseur">
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'toggle-btn--active': localAscenseur === true }"
              @click="localAscenseur = true"
            >
              Oui
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'toggle-btn--active': localAscenseur === false }"
              @click="localAscenseur = false"
            >
              Non
            </button>
          </div>
        </div>
      </template>

      <div class="step-actions">
        <button type="button" class="btn-outline" @click="emit('back')">Retour</button>
        <button type="submit" class="btn-primary">
          Calculer mon estimation
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const props = defineProps({
  type: { type: String, default: 'maison' },
  surface: { type: [Number, String], default: '' },
  chambres: { type: [Number, String], default: '' },
  etat: { type: String, default: 'bon' },
  plain_pied: { type: Boolean, default: false },
  garage: { type: Boolean, default: false },
  terrain: { type: [Number, String], default: '' },
  etage: { type: [Number, String], default: '' },
  ascenseur: { type: Boolean, default: false },
  hors_zone: { type: Boolean, default: false },
})

const emit = defineEmits(['update', 'next', 'back'])

const etatOptions = [
  { value: 'a_renover', label: 'À rénover' },
  { value: 'correct', label: 'Correct' },
  { value: 'bon', label: 'Bon' },
  { value: 'renove_recent', label: 'Rénové ou récent' },
]

// Local state (uncontrolled, synced on submit)
const localType = ref(props.type)
const localSurface = ref(props.surface)
const localChambres = ref(props.chambres === '' ? '' : props.chambres)
const localEtat = ref(props.etat)
const localPlainPied = ref(props.plain_pied)
const localGarage = ref(props.garage)
const localTerrain = ref(props.terrain)
const localEtage = ref(props.etage)
const localAscenseur = ref(props.ascenseur)

const errors = reactive({
  surface: '',
  chambres: '',
})

function validate() {
  errors.surface = ''
  errors.chambres = ''
  let valid = true

  if (!localSurface.value || Number(localSurface.value) < 9) {
    errors.surface = 'La surface doit être supérieure à 9 m².'
    valid = false
  }
  if (localChambres.value === '' || localChambres.value === null || localChambres.value === undefined) {
    errors.chambres = 'Veuillez indiquer le nombre de chambres.'
    valid = false
  }
  return valid
}

function buildPayload() {
  return {
    type: localType.value,
    surface: localSurface.value,
    chambres: localChambres.value,
    etat: localEtat.value,
    plain_pied: localType.value === 'maison' ? localPlainPied.value : false,
    garage: localType.value === 'maison' ? localGarage.value : false,
    terrain: localType.value === 'maison' && localTerrain.value !== '' ? Number(localTerrain.value) : null,
    etage: localType.value === 'appartement' && localEtage.value !== '' ? Number(localEtage.value) : null,
    ascenseur: localType.value === 'appartement' ? localAscenseur.value : false,
  }
}

function handleNext() {
  if (!validate()) return
  const payload = buildPayload()
  emit('update', payload)
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
  gap: 1.25rem;
}

.required {
  color: var(--color-accent);
}

.form-optional {
  font-size: 0.78rem;
  color: var(--color-muted);
  font-weight: 400;
}

.field-narrow {
  max-width: 220px;
}

.form-input--error {
  border-color: var(--color-error);
}

/* Toggle group (two options: Maison/Appartement, Oui/Non) */
.toggle-group {
  display: inline-flex;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
}

.toggle-btn {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 400;
  padding: 0.55rem 1.25rem;
  background-color: var(--color-white);
  color: var(--color-primary);
  border: none;
  cursor: pointer;
  transition: background-color var(--transition), color var(--transition);
}

.toggle-btn + .toggle-btn {
  border-left: 1px solid var(--color-border);
}

.toggle-btn--active {
  background-color: var(--color-primary);
  color: var(--color-white);
}

/* État multi-button group */
.btn-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.state-btn {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 400;
  padding: 0.45rem 1rem;
  background-color: var(--color-white);
  color: var(--color-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  cursor: pointer;
  transition: border-color var(--transition), background-color var(--transition), color var(--transition);
}

.state-btn--active {
  border-color: var(--color-accent);
  background-color: rgba(186, 155, 106, 0.08);
  color: var(--color-accent);
  font-weight: 500;
}

.step-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  gap: 1rem;
}
</style>
