<template>
  <main class="estimation-page">
    <div class="container">
      <div class="estimation-header">
        <h1>Estimation immobilière gratuite en Vendée</h1>
        <p class="estimation-intro">
          Renseignez les caractéristiques de votre bien et obtenez une fourchette de prix en 2 minutes, sans engagement.
        </p>
      </div>

      <SimulatorWizard />
    </div>
  </main>
</template>

<script setup>
import SimulatorWizard from '../components/simulator/SimulatorWizard.vue'
import { useSeo } from '../composables/useSeo.js'
import { SITE } from '../config/seo.js'

useSeo({
  title: 'Estimation immobilière gratuite en Vendée',
  description:
    'Estimez gratuitement votre bien immobilier en Vendée. Résultat en 2 minutes, sans engagement. Alexandre Coutant, conseiller SAFTI.',
  canonical: `${SITE.url}/estimation`,
})
</script>

<style scoped>
.estimation-page {
  padding-top: calc(64px + 3rem);
  padding-bottom: 5rem;
  min-height: 100vh;
}

.estimation-header {
  max-width: 680px;
  margin-bottom: 2.5rem;
}

.estimation-intro {
  color: var(--color-muted);
  font-size: 1rem;
  margin-bottom: 0;
}
</style>
