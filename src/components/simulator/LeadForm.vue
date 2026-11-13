<template>
  <form class="lead-form" novalidate @submit.prevent="handleSubmit">
    <!-- Honeypot -->
    <input
      type="text"
      name="honeypot"
      style="display:none"
      tabindex="-1"
      autocomplete="off"
      v-model="honeypot"
    />

    <div class="form-field">
      <label class="form-label" for="lead-phone">
        Téléphone <span class="required" aria-hidden="true">*</span>
      </label>
      <input
        id="lead-phone"
        v-model="phone"
        type="tel"
        class="form-input"
        placeholder="Ex : 06 12 34 56 78"
        autocomplete="tel"
        :class="{ 'form-input--error': errors.phone }"
      />
      <p v-if="errors.phone" class="form-error">{{ errors.phone }}</p>
    </div>

    <div class="form-field">
      <label class="form-label" for="lead-email">
        Email <span class="form-optional">optionnel</span>
      </label>
      <input
        id="lead-email"
        v-model="email"
        type="email"
        class="form-input"
        placeholder="Ex : contact@exemple.fr"
        autocomplete="email"
        :class="{ 'form-input--error': errors.email }"
      />
      <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
    </div>

    <!-- RGPD consent -->
    <div class="form-field consent-field">
      <label class="consent-label" :class="{ 'consent-label--error': errors.consent }">
        <input
          type="checkbox"
          class="consent-checkbox"
          v-model="consent"
          :class="{ 'consent-checkbox--error': errors.consent }"
        />
        <span>
          J'accepte que mes données soient utilisées pour me recontacter dans le cadre de ma
          demande d'estimation.
          <RouterLink to="/politique-confidentialite" class="consent-link" target="_blank">
            Politique de confidentialité
          </RouterLink>
        </span>
      </label>
      <p v-if="errors.consent" class="form-error">{{ errors.consent }}</p>
    </div>

    <!-- API error -->
    <div v-if="apiError" class="alert-error" role="alert">
      {{ apiError }}
    </div>

    <button
      type="submit"
      class="btn-primary submit-btn"
      :disabled="submitting"
    >
      <span v-if="submitting" class="btn-spinner" aria-hidden="true"></span>
      {{ submitting ? 'Envoi en cours…' : 'Être recontacté' }}
    </button>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  formData: { type: Object, required: true },
})

const emit = defineEmits(['leadSent'])

const phone = ref('')
const email = ref('')
const consent = ref(false)
const honeypot = ref('')
const submitting = ref(false)
const apiError = ref('')

const errors = reactive({
  phone: '',
  email: '',
  consent: '',
})

const PHONE_RE = /^(\+33|0033|0)[1-9]([ .\-]?\d{2}){4}$/

function validate() {
  errors.phone = ''
  errors.email = ''
  errors.consent = ''
  let valid = true

  const cleanPhone = phone.value.replace(/\s/g, '')
  if (!cleanPhone) {
    errors.phone = 'Le numéro de téléphone est requis.'
    valid = false
  } else if (!PHONE_RE.test(cleanPhone)) {
    errors.phone = 'Numéro de téléphone invalide.'
    valid = false
  }

  if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.email = 'Adresse email invalide.'
    valid = false
  }

  if (!consent.value) {
    errors.consent = 'Vous devez accepter la politique de confidentialité pour continuer.'
    valid = false
  }

  return valid
}

async function handleSubmit() {
  if (!validate()) return
  if (honeypot.value) return // silently block bots

  submitting.value = true
  apiError.value = ''

  try {
    const body = {
      ...props.formData,
      source: props.formData.hors_zone ? 'hors_zone' : 'estimation',
      telephone: phone.value,
      email: email.value || null,
      consentement: true,
      honeypot: '',
    }

    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(data.error || `Erreur serveur (${response.status})`)
    }

    emit('leadSent')
  } catch (err) {
    apiError.value = err.message || 'Une erreur est survenue. Veuillez réessayer.'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.lead-form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.required {
  color: var(--color-accent);
}

.form-optional {
  font-size: 0.78rem;
  color: var(--color-accent);
  font-weight: 500;
}

.form-input--error {
  border-color: var(--color-error);
}

/* Consent */
.consent-field {
  gap: 0.4rem;
}

.consent-label {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  font-size: 0.85rem;
  color: var(--color-muted);
  cursor: pointer;
  line-height: 1.5;
}

.consent-label--error {
  color: var(--color-error);
}

.consent-checkbox {
  margin-top: 0.2rem;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  cursor: pointer;
  accent-color: var(--color-accent);
}

.consent-link {
  color: var(--color-accent);
  text-decoration: underline;
  font-size: inherit;
}

/* Alert */
.alert-error {
  background-color: var(--color-error-bg);
  color: var(--color-error);
  border: 1px solid rgba(155, 35, 53, 0.2);
  border-radius: var(--radius);
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
}

/* Submit button */
.submit-btn {
  width: 100%;
  justify-content: center;
  padding: 0.9rem 1.5rem;
  font-size: 1rem;
  letter-spacing: 0.01em;
  margin-top: 0.25rem;
}

.btn-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: var(--color-white);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
