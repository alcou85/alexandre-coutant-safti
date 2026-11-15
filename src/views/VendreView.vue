<template>
  <main class="local-page">

    <!-- Étapes -->
    <section class="section section--white section--first">
      <div class="container">
        <h1>Comment se déroule une vente avec moi ?</h1>
        <p class="section-intro">Six étapes pour vendre sereinement et au bon prix.</p>
        <ol class="steps-list">
          <li class="step-item">
            <span class="step-num">1</span>
            <div class="step-body">
              <h3>L'estimation du bien</h3>
              <p>
                Première étape indispensable : connaître la valeur réelle de votre bien.
                Je réalise une estimation gratuite basée sur les transactions DVF récentes
                de votre secteur et ma connaissance du marché local. Ni sur-estimée
                pour séduire, ni sous-estimée pour vendre vite.
              </p>
            </div>
          </li>
          <li class="step-item">
            <span class="step-num">2</span>
            <div class="step-body">
              <h3>La préparation et la mise en valeur</h3>
              <p>
                Je vous conseille sur la présentation du bien : petites réparations
                prioritaires, dépersonnalisation, mise en scène pour les photos.
                Des photos professionnelles et un descriptif soigné font toute la
                différence pour attirer les bons acquéreurs dès le départ.
              </p>
            </div>
          </li>
          <li class="step-item">
            <span class="step-num">3</span>
            <div class="step-body">
              <h3>La diffusion de l'annonce</h3>
              <p>
                Votre bien est diffusé sur les principaux portails immobiliers
                (SeLoger, LeBonCoin, Bien'ici, Logic-Immo…) via le réseau SAFTI,
                avec une visibilité nationale et locale. Je gère la publication
                et les mises à jour pour vous.
              </p>
            </div>
          </li>
          <li class="step-item">
            <span class="step-num">4</span>
            <div class="step-body">
              <h3>Les visites</h3>
              <p>
                Je qualifie les acquéreurs avant chaque visite pour ne vous déranger
                qu'avec des profils sérieux et solvables. J'organise et accompagne
                les visites, et vous fais un retour détaillé après chaque rendez-vous.
              </p>
            </div>
          </li>
          <li class="step-item">
            <span class="step-num">5</span>
            <div class="step-body">
              <h3>La négociation et le compromis</h3>
              <p>
                Lorsqu'une offre est formulée, je vous aide à l'analyser et à
                négocier dans votre intérêt. Une fois l'accord trouvé, le compromis
                de vente est signé chez le notaire. L'acquéreur dispose d'un délai
                de rétractation de 10 jours.
              </p>
            </div>
          </li>
          <li class="step-item">
            <span class="step-num">6</span>
            <div class="step-body">
              <h3>La signature de l'acte authentique</h3>
              <p>
                Environ 3 mois après le compromis, la vente est finalisée chez le
                notaire. Je reste disponible jusqu'à la remise des clés pour
                répondre à toutes les questions et lever les derniers obstacles.
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="section section--cta">
      <div class="container cta-inner">
        <h2>Première étape : estimer votre bien</h2>
        <p>
          Obtenez une première fourchette de prix en 2 minutes grâce à notre
          simulateur gratuit, basé sur les ventes réelles de votre secteur.
        </p>
        <div class="cta-actions">
          <RouterLink to="/estimation" class="btn-primary">Estimer mon bien gratuitement</RouterLink>
          <RouterLink to="/contact" class="btn-outline">Me contacter directement</RouterLink>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup>
import { useSeo } from '../composables/useSeo.js'
import { SITE } from '../config/seo.js'

useSeo({
  title: 'Vendre son bien immobilier en Vendée',
  description:
    'Vendez votre maison ou appartement en Vendée avec Alexandre Coutant, conseiller SAFTI à La Roche-sur-Yon. Estimation gratuite, accompagnement complet de A à Z.',
  canonical: `${SITE.url}/vendre`,
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Vente immobilière en Vendée',
      provider: {
        '@type': 'RealEstateAgent',
        name: 'Alexandre Coutant – Conseiller SAFTI',
        telephone: SITE.phone,
        email: SITE.email,
        areaServed: { '@type': 'AdministrativeArea', name: 'Vendée' },
      },
      areaServed: { '@type': 'AdministrativeArea', name: 'Vendée' },
      url: `${SITE.url}/vendre`,
    },
  ],
})
</script>

<style scoped>
.local-page { padding-top: 64px; }

.section {
  padding: 4.5rem 0;
  border-bottom: 1px solid var(--color-border);
}
.section:last-child { border-bottom: none; }
.section--white { background-color: var(--color-white); }
.section--first { padding-top: 5rem; }

h1 { margin-bottom: 1.25rem; }
.section-intro { color: var(--color-muted); margin-bottom: 2rem; font-size: 0.9rem; }

/* Steps */
.steps-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.step-item {
  display: flex;
  gap: 1.5rem;
  padding: 1.75rem 0;
  border-bottom: 1px solid var(--color-border);
  align-items: flex-start;
}
.step-item:last-child { border-bottom: none; }

.step-num {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-primary);
  opacity: 0.12;
  line-height: 1;
  flex-shrink: 0;
  width: 2.5rem;
  text-align: center;
}
.step-body { flex: 1; }
.step-body h3 { font-size: 1.05rem; margin-bottom: 0.5rem; color: var(--color-primary); }
.step-body p { font-size: 0.9rem; color: var(--color-muted); line-height: 1.7; margin-bottom: 0; }

/* CTA */
.section--cta { background-color: var(--color-primary); border-bottom: none; }
.cta-inner { text-align: center; }
.cta-inner h2 { color: var(--color-white); margin-bottom: 0.75rem; }
.cta-inner p { color: rgba(255,255,255,0.7); margin-bottom: 2rem; font-size: 1rem; }
.cta-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; }
.cta-actions .btn-outline {
  color: var(--color-white);
  border-color: rgba(255,255,255,0.35);
}
.cta-actions .btn-outline:hover {
  border-color: var(--color-white);
  background-color: transparent;
}
</style>
