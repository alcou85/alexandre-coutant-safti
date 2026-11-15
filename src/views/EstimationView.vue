<template>
  <main class="estimation-page">
    <div class="container estimation-inner">

      <!-- Colonne gauche : valeur + confiance -->
      <aside class="estimation-left" aria-label="Pourquoi estimer avec nous">

        <h1 class="estimation-heading">Estimation immobilière gratuite en Vendée</h1>
        <p class="estimation-sub">
          Renseignez les caractéristiques de votre bien et obtenez une fourchette
          de prix en 2&nbsp;minutes, basée sur les ventes réelles de votre secteur.
        </p>

        <ul class="trust-list">
          <li class="trust-list-item">
            <span class="trust-check" aria-hidden="true">✓</span>
            Données DVF officielles (DGFiP)
          </li>
          <li class="trust-list-item">
            <span class="trust-check" aria-hidden="true">✓</span>
            Résultat en moins de 2&nbsp;minutes
          </li>
          <li class="trust-list-item">
            <span class="trust-check" aria-hidden="true">✓</span>
            Gratuit, sans inscription ni engagement
          </li>
          <li class="trust-list-item">
            <span class="trust-check" aria-hidden="true">✓</span>
            Conseiller local disponible pour affiner
          </li>
        </ul>

        <div class="advisor-block">
          <div class="advisor-photo-wrap">
            <img
              v-if="!photoError"
              src="/images/alexandre-coutant.jpeg"
              alt="Alexandre Coutant"
              class="advisor-photo"
              @error="photoError = true"
            />
            <div v-else class="advisor-photo-fallback" aria-hidden="true">AC</div>
          </div>
          <div class="advisor-info">
            <p class="advisor-name">Alexandre Coutant</p>
            <p class="advisor-role">Conseiller immobilier SAFTI · Vendée</p>
            <a href="tel:+33665087707" class="advisor-phone">06 65 08 77 07</a>
          </div>
        </div>

      </aside>

      <!-- Colonne droite : wizard -->
      <div class="estimation-right">
        <SimulatorWizard :initialData="initialData" />
      </div>

    </div>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import SimulatorWizard from '../components/simulator/SimulatorWizard.vue'
import { useSeo } from '../composables/useSeo.js'
import { SITE } from '../config/seo.js'

useSeo({
  title: 'Estimation immobilière gratuite en Vendée',
  description:
    'Estimez gratuitement votre bien immobilier en Vendée. Résultat en 2 minutes, sans engagement. Alexandre Coutant, conseiller SAFTI.',
  canonical: `${SITE.url}/estimation`,
})

const route = useRoute()
const photoError = ref(false)

const initialData = computed(() => {
  const q = route.query
  if (!q.address) return null
  return {
    address:      String(q.address),
    lat:          q.lat          ? parseFloat(q.lat)  : null,
    lon:          q.lon          ? parseFloat(q.lon)  : null,
    code_commune: q.code_commune ? String(q.code_commune) : '',
    code_postal:  q.code_postal  ? String(q.code_postal)  : '',
    nom_commune:  q.nom_commune  ? String(q.nom_commune)  : '',
  }
})
</script>

<style scoped>
.estimation-page {
  padding-top: 64px;
  min-height: 100svh;
  background-color: var(--color-bg);
}

.estimation-inner {
  display: flex;
  gap: 4rem;
  align-items: flex-start;
  padding-top: 4rem;
  padding-bottom: 5rem;
}

/* Sur mobile : wizard en premier, aside en dessous */
@media (max-width: 899px) {
  .estimation-inner {
    flex-direction: column;
    gap: 2.5rem;
  }

  .estimation-left {
    order: 2;
  }

  .estimation-right {
    order: 1;
    width: 100%;
  }
}

.estimation-left {
  flex: 0 0 300px;
  max-width: 300px;
  position: sticky;
  top: calc(64px + 2.5rem);
}

@media (max-width: 899px) {
  .estimation-left {
    flex: none;
    max-width: none;
    position: static;
  }
}

.estimation-right {
  flex: 1;
  min-width: 0;
}

/* Titre SEO — Cormorant, assez grand mais pas trop pour l'aside */
.estimation-heading {
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.2;
  margin-bottom: 1rem;
}

.estimation-sub {
  font-size: 0.875rem;
  color: var(--color-muted);
  line-height: 1.65;
  margin-bottom: 1.75rem;
}

/* Liste de confiance */
.trust-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-bottom: 2rem;
}

.trust-list-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.875rem;
  color: var(--color-primary);
  line-height: 1.4;
}

.trust-check {
  color: var(--color-accent);
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 0.05em;
}

/* Bloc conseiller */
.advisor-block {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.advisor-photo-wrap {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.advisor-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.advisor-photo-fallback {
  width: 100%;
  height: 100%;
  background-color: var(--color-primary);
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-size: 1.1rem;
}

.advisor-info {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.advisor-name {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 0;
}

.advisor-role {
  font-size: 0.72rem;
  color: var(--color-muted);
  margin-bottom: 0;
  line-height: 1.4;
}

.advisor-phone {
  font-size: 0.82rem;
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition);
}

.advisor-phone:hover {
  color: var(--color-accent-dark);
}
</style>
