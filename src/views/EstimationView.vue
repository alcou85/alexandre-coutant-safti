<template>
  <main class="estimation-page">
    <div class="container">
      <div class="estimation-header">
        <h1>Estimation immobilière gratuite à La Roche-sur-Yon</h1>
        <p class="estimation-intro">
          Renseignez l'adresse et les caractéristiques de votre bien. Notre outil analyse
          les transactions réelles enregistrées dans votre secteur pour vous fournir
          une fourchette d'estimation fiable — en moins de 2 minutes, gratuitement
          et sans engagement.
        </p>
      </div>

      <SimulatorWizard />

      <!-- Pourquoi cette estimation ? -->
      <div class="why-section">
        <h2 class="why-title">Pourquoi cette estimation ?</h2>
        <div class="why-grid">
          <div class="why-card">
            <h3>Basée sur des données réelles</h3>
            <p>
              Notre simulateur s'appuie sur la base DVF (Demandes de Valeurs Foncières),
              qui recense toutes les transactions immobilières enregistrées en France.
              Pour votre bien à La Roche-sur-Yon ou ses communes voisines, vous obtenez
              une fourchette de prix ancrée dans la réalité du marché vendéen.
            </p>
          </div>
          <div class="why-card">
            <h3>Le marché vendéen en 2025</h3>
            <p>
              La Vendée (85) affiche un marché immobilier dynamique, soutenu par
              l'attractivité de son littoral, la qualité de vie et un tissu économique
              solide. À La Roche-sur-Yon, les prix varient selon les quartiers,
              le type de bien et son état général. Cette estimation vous donne une
              première lecture objective avant d'échanger avec un professionnel.
            </p>
          </div>
          <div class="why-card">
            <h3>Un professionnel local pour aller plus loin</h3>
            <p>
              Cette estimation en ligne est une première étape. Pour affiner la
              valeur de votre bien, je vous propose une visite gratuite et sans
              engagement. Je connais le marché local à La Roche-sur-Yon et en Vendée,
              et je peux vous apporter une analyse personnalisée.
            </p>
          </div>
        </div>
      </div>

      <!-- FAQ -->
      <div class="faq-section">
        <h2 class="faq-title">Questions fréquentes</h2>
        <dl class="faq-list">
          <div v-for="item in faq" :key="item.q" class="faq-item">
            <dt class="faq-question">{{ item.q }}</dt>
            <dd class="faq-answer">{{ item.a }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </main>
</template>

<script setup>
import SimulatorWizard from '../components/simulator/SimulatorWizard.vue'
import { useSeo } from '../composables/useSeo.js'
import { SITE } from '../config/seo.js'

const faq = [
  {
    q: 'Comment fonctionne le simulateur d\'estimation ?',
    a: 'Le simulateur analyse votre adresse, le type de bien et ses caractéristiques (surface, état, terrain…). Il les compare avec les transactions immobilières enregistrées dans votre secteur via la base DVF (Demandes de Valeurs Foncières) pour vous fournir une fourchette de prix représentative du marché local.',
  },
  {
    q: 'L\'estimation en ligne est-elle gratuite ?',
    a: 'Oui, le simulateur est entièrement gratuit et sans engagement. Il vous fournit une première fourchette de prix en moins de 2 minutes. Si vous souhaitez aller plus loin, je vous propose une estimation professionnelle lors d\'une visite sur place, également gratuite.',
  },
  {
    q: 'Quelle est la précision de l\'estimation en ligne ?',
    a: 'La fourchette fournie repose sur des données DVF réelles. Elle est indicative : la valeur exacte de votre bien dépend de critères que l\'outil ne peut pas mesurer (état précis, aménagements, vue, luminosité…). Une visite professionnelle permet d\'affiner cette première estimation.',
  },
  {
    q: 'Mon bien est hors de la zone couverte, puis-je tout de même être accompagné ?',
    a: 'Oui. Si votre bien est situé en dehors de ma zone principale (La Roche-sur-Yon et alentours en Vendée), laissez vos coordonnées via le simulateur et je vous recontacterai pour une estimation personnalisée.',
  },
  {
    q: 'Combien de temps faut-il pour vendre un bien en Vendée ?',
    a: 'Pour un bien correctement positionné au prix du marché, le délai moyen tourne autour de 60 à 90 jours. Un bien surestimé peut rester plusieurs mois sans trouver preneur. Une estimation juste dès le départ est la clé d\'une vente rapide et au meilleur prix.',
  },
]

useSeo({
  title: 'Estimation immobilière gratuite La Roche-sur-Yon',
  description:
    'Estimez gratuitement votre bien immobilier à La Roche-sur-Yon et en Vendée. Outil basé sur les données DVF réelles. Résultat en 2 minutes, sans engagement. Alexandre Coutant, conseiller SAFTI.',
  canonical: `${SITE.url}/estimation`,
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ],
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

/* Pourquoi section */
.why-section {
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid var(--color-border);
}

.why-title {
  margin-bottom: 1.5rem;
}

.why-grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .why-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 960px) {
  .why-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.why-card {
  padding: 1.5rem;
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}

.why-card h3 {
  font-size: 1rem;
  margin-bottom: 0.6rem;
  color: var(--color-primary);
}

.why-card p {
  font-size: 0.88rem;
  color: var(--color-muted);
  line-height: 1.65;
  margin-bottom: 0;
}

/* FAQ */
.faq-section {
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid var(--color-border);
}

.faq-title {
  margin-bottom: 1.75rem;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 760px;
}

.faq-item {
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--color-border);
}

.faq-item:first-child {
  border-top: 1px solid var(--color-border);
}

.faq-question {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--color-primary);
  margin-bottom: 0.6rem;
}

.faq-answer {
  font-size: 0.9rem;
  color: var(--color-muted);
  line-height: 1.7;
  margin: 0;
}
</style>
