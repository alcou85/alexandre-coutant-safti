<template>
  <div class="step">

    <!-- Loading -->
    <div v-if="loading" class="loading-state" aria-live="polite" aria-busy="true">
      <div class="spinner" aria-hidden="true"></div>
      <p class="loading-text">Calcul en cours…</p>
      <p class="loading-sub">Nous analysons les transactions récentes de votre secteur.</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="error-state" role="alert">
      <p class="error-icon" aria-hidden="true">⚠</p>
      <h2 class="step-title">Une erreur est survenue</h2>
      <p class="error-msg">{{ error }}</p>
      <button type="button" class="btn-outline" @click="emit('back')">Retour</button>
    </div>

    <!-- Success — lead already sent -->
    <div v-else-if="leadSent" class="success-state" role="alert">
      <div class="success-icon" aria-hidden="true">✓</div>
      <h2 class="step-title">Merci !</h2>
      <p>Je vous recontacterai sous 24h pour affiner cette estimation.</p>
    </div>

    <!-- Result — hors zone (no estimate, contact form only) -->
    <template v-else-if="hors_zone">
      <div class="step-header">
        <h2 class="step-title">Estimation personnalisée</h2>
      </div>
      <div class="hors-zone-msg">
        <p>
          Votre bien se situe hors de ma zone principale. Laissez-moi vos coordonnées,
          je vous proposerai une estimation personnalisée sous 24h.
        </p>
      </div>
      <LeadForm :formData="formData" @leadSent="emit('leadSent')" />
      <div class="step-back">
        <button type="button" class="btn-outline btn-sm" @click="emit('back')">Retour</button>
      </div>
    </template>

    <!-- Result — in zone, estimation displayed -->
    <template v-else-if="result">
      <div class="step-header">
        <h2 class="step-title">Votre estimation</h2>
        <p class="step-subtitle">
          Basée sur les transactions DVF récentes de votre secteur.
        </p>
      </div>

      <!-- Estimation card -->
      <div class="estimation-card">
        <div class="estimation-range-label">Fourchette d'estimation</div>
        <div class="estimation-range">
          <span class="estimation-value">{{ formatPrice(result.estimation_min) }}</span>
          <span class="estimation-separator">–</span>
          <span class="estimation-value">{{ formatPrice(result.estimation_max) }}</span>
        </div>
        <div class="estimation-details">
          <div class="estimation-stat">
            <span class="stat-label">Prix médian / m²</span>
            <span class="stat-value">{{ formatPriceM2(result.prix_m2_median) }} €/m²</span>
          </div>
          <div v-if="result.nb_comparables" class="estimation-stat">
            <span class="stat-label">Transactions analysées</span>
            <span class="stat-value">{{ result.nb_comparables }}</span>
          </div>
        </div>
        <p class="estimation-disclaimer">
          Estimation indicative et non contractuelle, basée sur les transactions DVF de votre secteur.
          Elle ne remplace pas une visite ni un avis de valeur professionnel.
        </p>
      </div>

      <!-- Contact form -->
      <div class="contact-block">
        <h3 class="contact-block-title">Affiner avec un expert</h3>
        <p class="contact-block-intro">
          Laissez-moi vos coordonnées pour que je vous rappelle et affine cette estimation
          lors d'une visite gratuite et sans engagement.
        </p>
        <LeadForm :formData="formDataWithResult" @leadSent="emit('leadSent')" />
      </div>

      <div class="step-back">
        <button type="button" class="btn-outline btn-sm" @click="emit('back')">Modifier mes informations</button>
      </div>
    </template>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import LeadForm from './LeadForm.vue'

const props = defineProps({
  loading: { type: Boolean, default: false },
  error: { type: String, default: null },
  result: { type: Object, default: null },
  hors_zone: { type: Boolean, default: false },
  formData: { type: Object, required: true },
  leadSent: { type: Boolean, default: false },
})

const emit = defineEmits(['back', 'leadSent'])

const formDataWithResult = computed(() => ({
  ...props.formData,
  estimation_min:  props.result?.estimation_min  ?? null,
  estimation_max:  props.result?.estimation_max  ?? null,
  prix_m2_median:  props.result?.prix_m2_median  ?? null,
  nb_comparables:  props.result?.nb_comparables  ?? null,
}))

function formatPrice(value) {
  if (value == null) return '–'
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

function formatPriceM2(value) {
  if (value == null) return '–'
  return new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: 0,
  }).format(value)
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

/* Loading */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem 1rem;
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  margin-bottom: 0;
}

.loading-sub {
  color: var(--color-muted);
  font-size: 0.9rem;
  margin-bottom: 0;
}

/* Error */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
  padding: 2rem 1rem;
}

.error-icon {
  font-size: 2rem;
  color: var(--color-error);
  margin-bottom: 0;
}

.error-msg {
  color: var(--color-error);
  font-size: 0.95rem;
  margin-bottom: 0;
}

/* Success */
.success-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
  padding: 2.5rem 1rem;
}

.success-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--color-success-bg);
  color: var(--color-success);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
}

/* Hors zone */
.hors-zone-msg {
  background-color: var(--color-warning-bg);
  border: 1px solid rgba(146, 64, 14, 0.2);
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
  color: var(--color-warning);
}

.hors-zone-msg p {
  margin-bottom: 0;
  font-size: 0.95rem;
}

/* Estimation card */
.estimation-card {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: var(--shadow-sm);
}

.estimation-range-label {
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.estimation-range {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.estimation-value {
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 5vw, 2.75rem);
  font-weight: 600;
  color: var(--color-accent);
  line-height: 1;
}

.estimation-separator {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: var(--color-muted);
}

.estimation-details {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.estimation-stat {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.stat-label {
  font-size: 0.78rem;
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 500;
}

.stat-value {
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--color-primary);
}

.estimation-disclaimer {
  font-style: italic;
  font-size: 0.8rem;
  color: var(--color-muted);
  margin-bottom: 0;
  border-top: 1px solid var(--color-border);
  padding-top: 1rem;
}

/* Contact block */
.contact-block {
  background-color: rgba(186, 155, 106, 0.05);
  border: 1px solid rgba(186, 155, 106, 0.2);
  border-radius: var(--radius);
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-block-title {
  font-size: 1.25rem;
}

.contact-block-intro {
  color: var(--color-muted);
  font-size: 0.9rem;
  margin-bottom: 0;
}

.step-back {
  display: flex;
}

.btn-sm {
  padding: 0.4rem 0.9rem;
  font-size: 0.85rem;
}
</style>
