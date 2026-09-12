<template>
  <div class="wizard">
    <!-- Progress bar -->
    <div class="progress-bar" aria-label="Progression du simulateur">
      <div
        v-for="n in 3"
        :key="n"
        class="progress-step"
        :class="{
          'progress-step--done': state.step > n,
          'progress-step--active': state.step === n,
        }"
        :aria-current="state.step === n ? 'step' : undefined"
      >
        <div class="progress-step-dot">
          <span v-if="state.step > n" class="progress-check" aria-hidden="true">✓</span>
          <span v-else>{{ n }}</span>
        </div>
        <span class="progress-step-label">{{ stepLabels[n - 1] }}</span>
      </div>
      <div class="progress-track">
        <div
          class="progress-fill"
          :style="{ width: progressWidth }"
          role="progressbar"
          :aria-valuenow="state.step"
          aria-valuemin="1"
          aria-valuemax="3"
        ></div>
      </div>
    </div>

    <!-- Step panels -->
    <div class="wizard-panel">
      <Step1Address
        v-if="state.step === 1"
        :address="state.address"
        :lat="state.lat"
        :lon="state.lon"
        :code_commune="state.code_commune"
        :code_postal="state.code_postal"
        :hors_zone="state.hors_zone"
        :horsZoneMode="HORS_ZONE_MODE"
        @update="onStep1Update"
        @next="goToStep2"
      />

      <Step2Property
        v-else-if="state.step === 2"
        :type="state.type"
        :surface="state.surface"
        :chambres="state.chambres"
        :etat="state.etat"
        :plain_pied="state.plain_pied"
        :garage="state.garage"
        :terrain="state.terrain"
        :etage="state.etage"
        :ascenseur="state.ascenseur"
        :hors_zone="state.hors_zone"
        @update="onStep2Update"
        @next="submitEstimate"
        @back="state.step = 1"
      />

      <Step3Result
        v-else-if="state.step === 3"
        :loading="state.loading"
        :error="state.error"
        :result="state.result"
        :hors_zone="state.hors_zone"
        :formData="fullFormData"
        :leadSent="state.leadSent"
        @back="state.step = 2"
        @leadSent="state.leadSent = true"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import Step1Address from './Step1Address.vue'
import Step2Property from './Step2Property.vue'
import Step3Result from './Step3Result.vue'

// 'capture' = hors-zone leads are still captured (contact form shown)
// 'block'   = hors-zone users cannot proceed past step 1
const HORS_ZONE_MODE = 'capture'

const stepLabels = ['Adresse', 'Votre bien', 'Estimation']

const state = reactive({
  step: 1,
  // Step 1
  address: '',
  lat: null,
  lon: null,
  code_commune: '',
  code_postal: '',
  hors_zone: false,
  // Step 2
  type: 'maison',
  surface: '',
  chambres: '',
  etat: 'bon',
  plain_pied: false,
  garage: false,
  terrain: '',
  etage: '',
  ascenseur: false,
  // Step 3
  loading: false,
  error: null,
  result: null,
  leadSent: false,
})

const progressWidth = computed(() => {
  const pct = ((state.step - 1) / 2) * 100
  return `${pct}%`
})

const fullFormData = computed(() => ({
  type: state.type,
  surface: state.surface ? Number(state.surface) : null,
  chambres: state.chambres,
  etat: state.etat,
  plain_pied: state.plain_pied,
  garage: state.garage,
  terrain: state.terrain !== '' && state.terrain !== null ? Number(state.terrain) : null,
  etage: state.etage !== '' && state.etage !== null ? Number(state.etage) : null,
  ascenseur: state.ascenseur,
  address: state.address,
  lat: state.lat,
  lon: state.lon,
  code_commune: state.code_commune,
  code_postal: state.code_postal,
  hors_zone: state.hors_zone,
}))

function onStep1Update(payload) {
  state.address = payload.address
  state.lat = payload.lat
  state.lon = payload.lon
  state.code_commune = payload.code_commune
  state.code_postal = payload.code_postal
  state.hors_zone = payload.hors_zone
}

function goToStep2() {
  state.step = 2
}

function onStep2Update(payload) {
  state.type = payload.type
  state.surface = payload.surface
  state.chambres = payload.chambres
  state.etat = payload.etat
  state.plain_pied = payload.plain_pied
  state.garage = payload.garage
  state.terrain = payload.terrain !== null ? payload.terrain : ''
  state.etage = payload.etage !== null ? payload.etage : ''
  state.ascenseur = payload.ascenseur
}

async function submitEstimate() {
  state.step = 3
  state.loading = true
  state.error = null
  state.result = null

  // Hors zone in capture mode: skip API call, go straight to contact form
  if (state.hors_zone && HORS_ZONE_MODE === 'capture') {
    state.loading = false
    return
  }

  try {
    const body = {
      type: state.type,
      surface: Number(state.surface),
      chambres: state.chambres,
      etat: state.etat,
      lat: state.lat,
      lon: state.lon,
      code_commune: state.code_commune,
      code_postal: state.code_postal,
      plain_pied: state.plain_pied,
      garage: state.garage,
      terrain: state.terrain !== '' && state.terrain !== null ? Number(state.terrain) : null,
      etage: state.etage !== '' && state.etage !== null ? Number(state.etage) : null,
      ascenseur: state.ascenseur,
      honeypot: '',
    }

    const response = await fetch('/api/estimate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(data.error || `Erreur serveur (${response.status})`)
    }

    const data = await response.json()
    state.result = data
  } catch (err) {
    state.error = err.message || 'Une erreur inattendue est survenue. Veuillez réessayer.'
  } finally {
    state.loading = false
  }
}
</script>

<style scoped>
.wizard {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

/* Progress bar */
.progress-bar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 0.25rem;
}

.progress-track {
  position: absolute;
  top: 18px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--color-border);
  z-index: 0;
}

.progress-fill {
  height: 100%;
  background-color: var(--color-accent);
  transition: width 300ms ease;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
}

.progress-step-dot {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 500;
  border: 2px solid var(--color-border);
  background-color: var(--color-bg);
  color: var(--color-muted);
  transition: border-color var(--transition), background-color var(--transition), color var(--transition);
}

.progress-step--active .progress-step-dot {
  border-color: var(--color-accent);
  background-color: var(--color-accent);
  color: var(--color-white);
}

.progress-step--done .progress-step-dot {
  border-color: var(--color-accent);
  background-color: var(--color-accent);
  color: var(--color-white);
}

.progress-check {
  font-size: 0.9rem;
}

.progress-step-label {
  font-size: 0.75rem;
  color: var(--color-muted);
  white-space: nowrap;
}

.progress-step--active .progress-step-label {
  color: var(--color-primary);
  font-weight: 500;
}

.progress-step--done .progress-step-label {
  color: var(--color-accent);
}

/* Wizard panel */
.wizard-panel {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
}

@media (min-width: 640px) {
  .wizard-panel {
    padding: 2.5rem;
  }
}
</style>
