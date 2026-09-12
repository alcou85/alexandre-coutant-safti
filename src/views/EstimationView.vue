<template>
  <main class="estimation-page">
    <div class="container">
      <div class="estimation-header">
        <h1>Estimer mon bien</h1>
        <p class="estimation-intro">
          Renseignez l'adresse et les caractéristiques de votre bien. Notre outil analyse
          les transactions réelles enregistrées dans votre secteur pour vous fournir
          une fourchette d'estimation fiable — en moins de 2 minutes, gratuitement
          et sans engagement.
        </p>
      </div>

      <SimulatorWizard />
    </div>
  </main>
</template>

<script setup>
import SimulatorWizard from '../components/simulator/SimulatorWizard.vue'
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
