<template>
  <div class="step">

    <!-- Loading -->
    <div v-if="loading" class="state-loading" aria-live="polite" aria-busy="true">
      <div class="spinner" aria-hidden="true"></div>
      <p>Calcul en cours…</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="state-error" role="alert">
      <p class="error-msg">{{ error }}</p>
      <button type="button" class="btn-outline" @click="emit('back')">Retour</button>
    </div>

    <!-- Hors zone : pas d'estimation, formulaire de contact direct -->
    <template v-else-if="hors_zone">
      <p class="out-of-zone-msg">
        Votre bien est situé hors de mon secteur d'intervention (Vendée – 85). Laissez-moi vos coordonnées, je vous proposerai une estimation personnalisée.
      </p>
      <div v-if="leadSent" class="lead-success" role="alert">
        <div class="success-check" aria-hidden="true">✓</div>
        <p class="success-title">Merci !</p>
        <p class="success-body">Je vous recontacterai sous 24 h pour affiner cette estimation.</p>
      </div>
      <LeadForm v-else :formData="formData" @leadSent="emit('leadSent')" />
      <div class="back-row">
        <button type="button" class="btn-back" @click="emit('back')">Modifier mes informations</button>
      </div>
    </template>

    <!-- Résultat en zone -->
    <template v-else-if="result">

      <!-- Prix : section hero -->
      <div class="price-section">
        <span class="price-label">Fourchette d'estimation</span>
        <div class="price-range">
          <span class="price-value">{{ formatPrice(result.estimation_min) }}</span>
          <span class="price-dash" aria-hidden="true">–</span>
          <span class="price-value">{{ formatPrice(result.estimation_max) }}</span>
        </div>
        <p class="price-note">Estimation indicative et non contractuelle.</p>
      </div>

      <!-- Stats -->
      <div class="stats-row">
        <div class="stat">
          <span class="stat-label">Prix médian / m²</span>
          <span class="stat-value">{{ formatPriceM2(result.prix_m2_median) }} €/m²</span>
        </div>
        <div v-if="result.nb_comparables" class="stat">
          <span class="stat-label">Transactions analysées</span>
          <span class="stat-value">{{ result.nb_comparables }}</span>
        </div>
      </div>

      <!-- Séparateur -->
      <hr class="divider" />

      <!-- Section CTA contact -->
      <div class="cta-section">

        <!-- Succès après envoi du formulaire -->
        <div v-if="leadSent" class="lead-success" role="alert">
          <div class="lead-success-icon" aria-hidden="true">✓</div>
          <div>
            <p class="lead-success-title">Merci !</p>
            <p class="lead-success-body">Je vous recontacterai sous 24 h pour affiner cette estimation.</p>
          </div>
        </div>

        <!-- Formulaire affiché après clic -->
        <template v-else-if="showContactForm">
          <p class="cta-form-intro">Renseignez vos coordonnées et je vous rappelle rapidement.</p>
          <LeadForm :formData="formDataWithResult" @leadSent="emit('leadSent')" />
        </template>

        <!-- CTA initial -->
        <template v-else>
          <p class="cta-lead">Vous souhaitez affiner cette estimation ou connaître la valeur réelle de votre bien sur le marché ?</p>
          <p class="cta-sub">Notre équipe peut vous accompagner et vous proposer une estimation personnalisée gratuite.</p>
          <button type="button" class="btn-cta" @click="showContactForm = true">
            Être recontacté gratuitement
          </button>
        </template>

      </div>

      <!-- Action secondaire -->
      <div class="back-row">
        <button type="button" class="btn-back" @click="emit('back')">Modifier mes informations</button>
      </div>

      <!-- Disclaimer complet -->
      <p class="disclaimer">
        Estimation indicative et non contractuelle, basée sur les transactions DVF (DGFiP) de votre secteur.
        Elle ne remplace pas une visite ni un avis de valeur professionnel.
      </p>

    </template>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import LeadForm from './LeadForm.vue'

const props = defineProps({
  loading:   { type: Boolean, default: false },
  error:     { type: String,  default: null },
  result:    { type: Object,  default: null },
  hors_zone: { type: Boolean, default: false },
  formData:  { type: Object,  required: true },
  leadSent:  { type: Boolean, default: false },
})

const emit = defineEmits(['back', 'leadSent'])

const showContactForm = ref(false)

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
    style: 'currency', currency: 'EUR', maximumFractionDigits: 0,
  }).format(value)
}

function formatPriceM2(value) {
  if (value == null) return '–'
  return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(value)
}
</script>

<style scoped>
.step {
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* ── Loading ─────────────────────────────── */
.state-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 3rem 1rem;
  color: var(--color-muted);
  font-size: 0.9rem;
}

.spinner {
  width: 36px;
  height: 36px;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* ── Error ───────────────────────────────── */
.state-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 1rem;
  text-align: center;
}

.error-msg {
  color: var(--color-error);
  font-size: 0.9rem;
  margin-bottom: 0;
}

/* ── Hors zone ───────────────────────────── */
.out-of-zone-msg {
  font-size: 0.9rem;
  color: var(--color-muted);
  margin-bottom: 1.25rem;
  line-height: 1.6;
}

/* ── Prix (section hero) ─────────────────── */
.price-section {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding-bottom: 1.25rem;
}

.price-label {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.price-range {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.price-value {
  font-family: var(--font-heading);
  font-size: clamp(1.75rem, 8vw, 2.6rem);
  font-weight: 600;
  color: var(--color-accent);
  line-height: 1;
}

.price-dash {
  font-family: var(--font-heading);
  font-size: clamp(1.2rem, 5vw, 1.8rem);
  color: var(--color-border);
  line-height: 1;
}

.price-note {
  font-style: italic;
  font-size: 0.75rem;
  color: var(--color-muted);
  margin-bottom: 0;
}

/* ── Stats ───────────────────────────────── */
.stats-row {
  display: flex;
  gap: 1.5rem;
  padding-bottom: 1.25rem;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.stat-label {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--color-muted);
  font-weight: 500;
}

.stat-value {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-primary);
}

/* ── Divider ─────────────────────────────── */
.divider {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 0 0 1.5rem;
}

/* ── CTA section ─────────────────────────── */
.cta-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1.5rem;
}

.cta-lead {
  font-size: 0.95rem;
  color: var(--color-primary);
  font-weight: 500;
  margin-bottom: 0;
  line-height: 1.5;
}

.cta-sub {
  font-size: 0.875rem;
  color: var(--color-muted);
  margin-bottom: 0;
  line-height: 1.5;
}

.btn-cta {
  align-self: flex-start;
  background-color: var(--color-accent);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius);
  padding: 0.75rem 1.5rem;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color var(--transition), opacity var(--transition);
}

.btn-cta:hover {
  opacity: 0.88;
}

.cta-form-intro {
  font-size: 0.875rem;
  color: var(--color-muted);
  margin-bottom: 0;
}

/* ── Lead success inline ─────────────────── */
.lead-success {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  background-color: var(--color-success-bg);
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
}

.lead-success-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--color-success);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  flex-shrink: 0;
}

.lead-success-title {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 0.1rem;
}

.lead-success-body {
  font-size: 0.875rem;
  color: var(--color-muted);
  margin-bottom: 0;
}

/* ── Success hors zone (plein écran) ─────── */
.success-check {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--color-success-bg);
  color: var(--color-success);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 auto 0.25rem;
}

.success-title {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 0;
}

.success-body {
  color: var(--color-muted);
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 0;
}

/* ── Action secondaire ───────────────────── */
.back-row {
  display: flex;
  justify-content: center;
  padding: 0.5rem 0 1.25rem;
}

.btn-back {
  background: none;
  border: none;
  color: var(--color-muted);
  font-family: var(--font-body);
  font-size: 0.8rem;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
  padding: 0.5rem;
}

.btn-back:hover {
  color: var(--color-primary);
}

/* ── Disclaimer ──────────────────────────── */
.disclaimer {
  font-style: italic;
  font-size: 0.72rem;
  color: var(--color-muted);
  text-align: center;
  line-height: 1.6;
  margin-bottom: 0;
  padding-top: 0.25rem;
}
</style>
