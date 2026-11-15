<template>
  <main class="local-page">

    <section class="section section--hero">
      <div class="container">
        <p class="page-eyebrow">Conseiller immobilier SAFTI · Vendée</p>
        <h1>Vendre votre bien immobilier en Vendée</h1>
        <p class="page-intro">
          De l'estimation au prix juste jusqu'à la signature chez le notaire,
          je vous accompagne à chaque étape de votre vente à La Roche-sur-Yon
          et dans toute la Vendée.
        </p>
        <div class="hero-actions">
          <RouterLink to="/estimation" class="btn-primary">Estimer mon bien gratuitement</RouterLink>
          <RouterLink to="/contact" class="btn-outline">Me contacter</RouterLink>
        </div>
      </div>
    </section>

    <!-- Étapes -->
    <section class="section section--white">
      <div class="container">
        <h2>Comment se déroule une vente avec moi ?</h2>
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

    <!-- Pourquoi choisir un indépendant -->
    <section class="section">
      <div class="container">
        <h2>Pourquoi choisir un conseiller indépendant SAFTI ?</h2>
        <div class="services-grid">
          <div class="service-item">
            <h3>Un seul interlocuteur du début à la fin</h3>
            <p>
              Pas de rotation d'agents, pas de perte d'information entre collègues.
              Je suis personnellement responsable de votre dossier et vous avez
              mon contact direct à tout moment.
            </p>
          </div>
          <div class="service-item">
            <h3>Une estimation honnête, pas une promesse</h3>
            <p>
              Certaines agences sur-estiment pour décrocher le mandat, puis
              demandent une baisse de prix quelques semaines plus tard. Je préfère
              vous donner une fourchette réaliste dès le départ pour vendre dans
              les meilleurs délais.
            </p>
          </div>
          <div class="service-item">
            <h3>Disponible en semaine et le week-end</h3>
            <p>
              La plupart des visites se font en soirée ou le week-end. En tant
              qu'indépendant, j'adapte mes disponibilités aux contraintes des
              acquéreurs et aux vôtres.
            </p>
          </div>
          <div class="service-item">
            <h3>La puissance du réseau SAFTI</h3>
            <p>
              SAFTI est l'un des premiers réseaux de conseillers immobiliers
              indépendants en France. Votre bien bénéficie de la visibilité
              des grands portails nationaux et des outils professionnels du réseau.
            </p>
          </div>
        </div>
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
.section--hero { padding-top: 5rem; background-color: var(--color-bg); }
.section--white { background-color: var(--color-white); }

.page-eyebrow {
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 0.75rem;
}
h1 { margin-bottom: 1.25rem; }
.page-intro {
  font-size: 1rem;
  color: var(--color-muted);
  max-width: 640px;
  margin-bottom: 2rem;
  line-height: 1.7;
}
.hero-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; }
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

/* Services */
.services-grid { display: grid; gap: 1.5rem; }
@media (min-width: 640px) { .services-grid { grid-template-columns: repeat(2, 1fr); } }
.service-item {
  padding: 1.5rem;
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}
.service-item h3 { font-size: 1rem; margin-bottom: 0.5rem; color: var(--color-primary); }
.service-item p { font-size: 0.88rem; color: var(--color-muted); line-height: 1.65; margin-bottom: 0; }

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
