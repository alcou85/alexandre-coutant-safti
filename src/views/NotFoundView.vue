<template>
  <main class="not-found-page">
    <div class="container not-found-inner">
      <p class="not-found-code" aria-hidden="true">404</p>
      <h1>Page introuvable</h1>
      <p class="not-found-desc">
        Cette page n'existe pas ou a été déplacée. Revenez à l'accueil
        ou estimez directement votre bien.
      </p>
      <div class="not-found-actions">
        <RouterLink to="/" class="btn-outline">Retour à l'accueil</RouterLink>
        <RouterLink to="/estimation" class="btn-primary">Estimer mon bien</RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useHead } from '@unhead/vue'

useHead({
  title: 'Page introuvable – Alexandre Coutant SAFTI',
  meta: [{ name: 'robots', content: 'noindex, follow' }],
})
</script>

<style scoped>
.not-found-page {
  padding-top: 64px;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.not-found-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 4rem;
  padding-bottom: 4rem;
  gap: 1.25rem;
}

.not-found-code {
  font-family: var(--font-heading);
  font-size: clamp(5rem, 20vw, 10rem);
  font-weight: 500;
  line-height: 1;
  color: var(--color-border);
  margin-bottom: 0;
  letter-spacing: -0.02em;
}

.not-found-inner h1 {
  margin-bottom: 0;
}

.not-found-desc {
  color: var(--color-muted);
  max-width: 420px;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.not-found-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 0.5rem;
}
</style>
