<template>
  <main class="contact-page">
    <div class="container">
      <div class="page-header">
        <h1>Me contacter – Conseiller immobilier à La Roche-sur-Yon</h1>
        <p class="page-intro">
          Vous avez une question, un projet de vente ou d'achat ? Je suis disponible
          pour en discuter sans engagement.
        </p>
      </div>

      <div class="contact-layout">

        <!-- Coordinates column -->
        <aside
          class="coords-col"
          itemscope
          itemtype="https://schema.org/RealEstateAgent"
        >
          <h2 class="coords-title">Coordonnées</h2>

          <ul class="coords-list">
            <li class="coords-item">
              <span class="coords-icon" aria-hidden="true">📞</span>
              <div>
                <p class="coords-label">Téléphone</p>
                <a
                  href="tel:+33665087707"
                  class="coords-value"
                  itemprop="telephone"
                >06 65 08 77 07</a>
              </div>
            </li>

            <li class="coords-item">
              <span class="coords-icon" aria-hidden="true">✉</span>
              <div>
                <p class="coords-label">Email</p>
                <a
                  href="mailto:alexandre.coutant@safti.fr"
                  class="coords-value"
                  itemprop="email"
                >
                  alexandre.coutant@safti.fr
                </a>
              </div>
            </li>

            <li class="coords-item">
              <span class="coords-icon" aria-hidden="true">📍</span>
              <div
                itemprop="address"
                itemscope
                itemtype="https://schema.org/PostalAddress"
              >
                <p class="coords-label">Zone d'intervention</p>
                <p class="coords-value">
                  Basé à
                  <span itemprop="addressLocality">La Roche-sur-Yon</span>
                  (<span itemprop="postalCode">85000</span>),
                  disponible sur La Roche-sur-Yon et en Vendée.
                  <meta itemprop="addressRegion" content="Vendée" />
                  <meta itemprop="addressCountry" content="FR" />
                </p>
              </div>
            </li>

            <li class="coords-item">
              <span class="coords-icon" aria-hidden="true">🏠</span>
              <div>
                <p class="coords-label">Mini-site SAFTI</p>
                <a
                  :href="listingsUrl"
                  class="coords-value"
                  target="_blank"
                  rel="noopener noreferrer"
                  itemprop="url"
                >
                  Voir mes biens à vendre
                </a>
              </div>
            </li>
          </ul>

          <div class="coords-note">
            <p>
              <span itemprop="name">Alexandre Coutant</span> —
              Réseau SAFTI — Conseiller immobilier indépendant<br />
              N° RSAC : 105 775 613 RSAC La Roche-sur-Yon
            </p>
          </div>
        </aside>

        <!-- Contact form column -->
        <section class="form-col">
          <h2 class="form-title">Envoyer un message</h2>

          <!-- Success state -->
          <div v-if="submitted" class="success-msg" role="alert">
            <div class="success-icon" aria-hidden="true">✓</div>
            <div>
              <strong>Message envoyé !</strong>
              <p>Je vous répondrai dans les plus brefs délais.</p>
            </div>
          </div>

          <!-- Form -->
          <form v-else novalidate @submit.prevent="handleSubmit">
            <!-- Honeypot -->
            <input
              type="text"
              name="honeypot"
              style="display:none"
              tabindex="-1"
              autocomplete="off"
              v-model="honeypot"
            />

            <div class="form-grid">
              <div class="form-field">
                <label class="form-label" for="c-nom">
                  Nom <span class="required" aria-hidden="true">*</span>
                </label>
                <input
                  id="c-nom"
                  v-model="form.nom"
                  type="text"
                  class="form-input"
                  :class="{ 'form-input--error': errors.nom }"
                  autocomplete="name"
                  placeholder="Votre nom complet"
                />
                <p v-if="errors.nom" class="form-error">{{ errors.nom }}</p>
              </div>

              <div class="form-field">
                <label class="form-label" for="c-email">
                  Email <span class="required" aria-hidden="true">*</span>
                </label>
                <input
                  id="c-email"
                  v-model="form.email"
                  type="email"
                  class="form-input"
                  :class="{ 'form-input--error': errors.email }"
                  autocomplete="email"
                  placeholder="votre@email.fr"
                />
                <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
              </div>

              <div class="form-field">
                <label class="form-label" for="c-tel">
                  Téléphone <span class="form-optional">optionnel</span>
                </label>
                <input
                  id="c-tel"
                  v-model="form.telephone"
                  type="tel"
                  class="form-input"
                  autocomplete="tel"
                  placeholder="06 12 34 56 78"
                />
              </div>

              <div class="form-field form-field--full">
                <label class="form-label" for="c-msg">
                  Message <span class="required" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="c-msg"
                  v-model="form.message"
                  class="form-input form-textarea"
                  :class="{ 'form-input--error': errors.message }"
                  rows="5"
                  placeholder="Décrivez votre projet ou votre question…"
                ></textarea>
                <p v-if="errors.message" class="form-error">{{ errors.message }}</p>
              </div>
            </div>

            <div v-if="apiError" class="alert-error" role="alert">
              {{ apiError }}
            </div>

            <button
              type="submit"
              class="btn-primary submit-btn"
              :disabled="submitting"
            >
              <span v-if="submitting" class="btn-spinner" aria-hidden="true"></span>
              {{ submitting ? 'Envoi en cours…' : 'Envoyer mon message' }}
            </button>
          </form>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useSeo } from '../composables/useSeo.js'
import { SITE } from '../config/seo.js'

useSeo({
  title: 'Contact – Alexandre Coutant Conseiller SAFTI Vendée',
  description:
    "Contactez Alexandre Coutant, conseiller immobilier indépendant SAFTI à La Roche-sur-Yon (Vendée). Disponible pour tout projet de vente, d'achat ou d'estimation en Vendée.",
  canonical: `${SITE.url}/contact`,
})

const listingsUrl = import.meta.env.VITE_SAFTI_LISTINGS_URL || '/'

const honeypot = ref('')
const submitted = ref(false)
const submitting = ref(false)
const apiError = ref('')

const form = reactive({
  nom: '',
  email: '',
  telephone: '',
  message: '',
})

const errors = reactive({
  nom: '',
  email: '',
  message: '',
})

function validate() {
  errors.nom = ''
  errors.email = ''
  errors.message = ''
  let valid = true

  if (!form.nom.trim()) {
    errors.nom = 'Votre nom est requis.'
    valid = false
  }

  if (!form.email.trim()) {
    errors.email = 'Votre email est requis.'
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Adresse email invalide.'
    valid = false
  }

  if (!form.message.trim() || form.message.trim().length < 10) {
    errors.message = 'Votre message doit comporter au moins 10 caractères.'
    valid = false
  }

  return valid
}

async function handleSubmit() {
  if (!validate()) return
  if (honeypot.value) return

  submitting.value = true
  apiError.value = ''

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nom: form.nom,
        email: form.email,
        telephone: form.telephone || null,
        message: form.message,
        honeypot: '',
      }),
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(data.error || `Erreur serveur (${response.status})`)
    }

    submitted.value = true
  } catch (err) {
    apiError.value = err.message || 'Une erreur est survenue. Veuillez réessayer.'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.contact-page {
  padding-top: calc(64px + 3.5rem);
  padding-bottom: 5rem;
  min-height: 100vh;
}

.page-header {
  max-width: 600px;
  margin-bottom: 3rem;
}

.page-intro {
  color: var(--color-muted);
  font-size: 1rem;
  margin-bottom: 0;
}

/* Layout */
.contact-layout {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

@media (min-width: 768px) {
  .contact-layout {
    flex-direction: row;
    align-items: flex-start;
    gap: 4rem;
  }
}

/* Coordinates */
.coords-col {
  flex-shrink: 0;
  width: 100%;
}

@media (min-width: 768px) {
  .coords-col {
    width: 280px;
  }
}

.coords-title {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.coords-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.coords-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.coords-icon {
  font-size: 1rem;
  margin-top: 0.1rem;
  flex-shrink: 0;
}

.coords-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.15rem;
}

.coords-value {
  font-size: 0.9rem;
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition);
  margin-bottom: 0;
}

a.coords-value:hover {
  color: var(--color-accent);
}

.coords-note {
  padding: 0.9rem 1rem;
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  font-size: 0.8rem;
  color: var(--color-muted);
}

.coords-note p {
  margin-bottom: 0;
}

.placeholder {
  color: var(--color-accent);
  font-style: italic;
}

/* Form */
.form-col {
  flex: 1;
}

.form-title {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.1rem;
  margin-bottom: 1.25rem;
}

@media (min-width: 480px) {
  .form-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.form-field--full {
  grid-column: 1 / -1;
}

.form-input--error {
  border-color: var(--color-error);
}

.form-optional {
  font-size: 0.78rem;
  color: var(--color-muted);
  font-weight: 400;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.required {
  color: var(--color-accent);
}

.alert-error {
  background-color: var(--color-error-bg);
  color: var(--color-error);
  border: 1px solid rgba(155, 35, 53, 0.2);
  border-radius: var(--radius);
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.submit-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: var(--color-white);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Success */
.success-msg {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background-color: var(--color-success-bg);
  border: 1px solid rgba(45, 106, 79, 0.2);
  border-radius: var(--radius);
  padding: 1.25rem 1.5rem;
  color: var(--color-success);
}

.success-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--color-success);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 700;
  flex-shrink: 0;
}

.success-msg strong {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 1rem;
}

.success-msg p {
  margin-bottom: 0;
  font-size: 0.9rem;
}
</style>
