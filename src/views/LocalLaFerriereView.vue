<template>
  <main class="local-page">

    <section class="section section--hero">
      <div class="container">
        <p class="page-eyebrow">Vendée · 85280</p>
        <h1>Immobilier à La Ferrière</h1>
        <p class="page-intro">
          Commune résidentielle prisée à 15 km de La Roche-sur-Yon, La Ferrière offre
          un cadre de vie calme et verdoyant très recherché des familles. Découvrez
          le marché local et comment vendre ou acheter votre bien dans les meilleures
          conditions.
        </p>
        <RouterLink to="/estimation" class="btn-primary">Estimer mon bien gratuitement</RouterLink>
      </div>
    </section>

    <section class="section section--white">
      <div class="container">
        <h2>La Ferrière : le cadre de vie vendéen à 15 minutes de la préfecture</h2>
        <div class="content-grid">
          <div class="content-text">
            <p>
              Nichée à une quinzaine de kilomètres de La Roche-sur-Yon, La Ferrière est
              une commune vendéenne qui a su conserver son caractère rural tout en
              bénéficiant de la proximité de la préfecture. Cette situation géographique
              en fait l'un des secteurs les plus attractifs pour les familles souhaitant
              s'installer dans un cadre spacieux sans s'éloigner des services.
            </p>
            <p>
              La commune dispose d'un tissu scolaire de qualité et d'un accès rapide
              aux axes routiers principaux, à la gare de La Roche-sur-Yon et aux zones
              commerciales. Le tout en conservant une densité faible et un environnement
              verdoyant apprécié par ses habitants.
            </p>
            <p>
              Pour les vendeurs comme pour les acquéreurs, connaître les spécificités
              du marché local est indispensable. Les valeurs à La Ferrière ne suivent
              pas exactement celles du centre-ville yonnais : surface, terrain et état
              général ont un poids particulièrement fort ici.
            </p>
          </div>
          <div class="content-highlights">
            <div class="highlight-card">
              <p class="highlight-number">~5 000</p>
              <p class="highlight-label">habitants</p>
            </div>
            <div class="highlight-card">
              <p class="highlight-number">85280</p>
              <p class="highlight-label">code postal</p>
            </div>
            <div class="highlight-card">
              <p class="highlight-number">15 km</p>
              <p class="highlight-label">de La Roche-sur-Yon</p>
            </div>
            <div class="highlight-card">
              <p class="highlight-number">20 min</p>
              <p class="highlight-label">en voiture</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2>Le marché immobilier à La Ferrière</h2>
        <p class="section-intro">
          Aperçu des tendances basées sur les données DVF. Ces informations sont
          indicatives et peuvent évoluer selon les biens et le marché.
        </p>
        <div class="market-grid">
          <div class="market-card">
            <h3>Maisons individuelles</h3>
            <p>
              La Ferrière est un marché quasi exclusivement composé de maisons. Les
              prix se situent généralement entre <strong>1 600 et 2 100 €/m²</strong>
              selon la surface du terrain, l'état général et les prestations. Les
              maisons récentes ou rénovées se négocient moins.
            </p>
          </div>
          <div class="market-card">
            <h3>Terrain et plain-pied</h3>
            <p>
              La présence d'un terrain généreux est un atout fort sur ce marché.
              Les maisons de plain-pied sont particulièrement recherchées par les
              familles et les seniors. Un beau jardin peut justifier un prix
              nettement supérieur aux moyennes départementales.
            </p>
          </div>
          <div class="market-card">
            <h3>Profil des acquéreurs</h3>
            <p>
              La Ferrière attire essentiellement des familles et des actifs en
              primo-accession cherchant à maximiser la surface habitable pour un
              budget maîtrisé, avec un cadre de vie rural et de bonnes écoles à
              proximité.
            </p>
          </div>
          <div class="market-card">
            <h3>Comparaison avec La Roche-sur-Yon</h3>
            <p>
              Les prix y sont généralement un peu inférieurs au centre-ville de
              La Roche-sur-Yon, ce qui représente une opportunité pour les
              acquéreurs souhaitant plus d'espace pour un budget équivalent.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--white">
      <div class="container">
        <h2>Vendre votre bien à La Ferrière avec Alexandre Coutant</h2>
        <div class="services-grid">
          <div class="service-item">
            <h3>Connaissance du marché local</h3>
            <p>
              Intervenant régulièrement sur La Ferrière et ses communes voisines,
              je connais les tendances de prix et les critères qui font la valeur
              d'un bien dans ce secteur.
            </p>
          </div>
          <div class="service-item">
            <h3>Estimation basée sur les données réelles</h3>
            <p>
              J'utilise la base DVF et les transactions récentes de votre commune
              pour vous fournir une estimation honnête, cohérente avec le marché
              vendéen.
            </p>
          </div>
          <div class="service-item">
            <h3>Accompagnement complet</h3>
            <p>
              De la première visite à la signature chez le notaire, je vous guide
              à chaque étape : conseil, photos, annonce, visites, négociation,
              suivi administratif.
            </p>
          </div>
          <div class="service-item">
            <h3>Réseau SAFTI</h3>
            <p>
              Votre bien est diffusé sur les principaux portails immobiliers
              nationaux. Je bénéficie des outils et de la notoriété du réseau
              SAFTI tout en conservant une relation directe et personnalisée.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--cta">
      <div class="container cta-inner">
        <h2>Prêt à estimer votre bien à La Ferrière ?</h2>
        <p>
          Utilisez notre simulateur gratuit pour obtenir une première fourchette
          de prix en 2 minutes, basée sur les ventes réelles de votre secteur.
        </p>
        <div class="cta-actions">
          <RouterLink to="/estimation" class="btn-primary">Estimer mon bien</RouterLink>
          <RouterLink to="/contact" class="btn-outline">Me contacter</RouterLink>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup>
import { useSeo } from '../composables/useSeo.js'
import { SITE } from '../config/seo.js'

useSeo({
  title: 'Estimation immobilière La Ferrière – Vendée',
  description:
    'Marché immobilier à La Ferrière (85280), Vendée : prix au m², tendances et accompagnement vente. Alexandre Coutant, conseiller SAFTI à 15 km de La Roche-sur-Yon, vous accompagne pour estimer et vendre votre maison.',
  canonical: `${SITE.url}/immobilier-la-ferriere`,
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      name: 'Alexandre Coutant – Conseiller SAFTI',
      url: `${SITE.url}/immobilier-la-ferriere`,
      telephone: SITE.phone,
      email: SITE.email,
      areaServed: {
        '@type': 'City',
        name: 'La Ferrière',
        containedInPlace: { '@type': 'AdministrativeArea', name: 'Vendée' },
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'La Roche-sur-Yon',
        postalCode: '85000',
        addressRegion: 'Vendée',
        addressCountry: 'FR',
      },
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
.section-intro {
  color: var(--color-muted);
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.content-grid {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}
@media (min-width: 768px) {
  .content-grid { flex-direction: row; align-items: flex-start; gap: 3rem; }
}
.content-text { flex: 1; }
.content-text p { color: var(--color-muted); font-size: 0.95rem; line-height: 1.7; }
.content-highlights {
  flex-shrink: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
@media (min-width: 768px) { .content-highlights { width: 260px; } }

.highlight-card {
  padding: 1.25rem;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  text-align: center;
}
.highlight-number {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-accent);
  margin-bottom: 0.25rem;
}
.highlight-label { font-size: 0.75rem; color: var(--color-muted); margin-bottom: 0; }

.market-grid { display: grid; gap: 1.5rem; }
@media (min-width: 640px) { .market-grid { grid-template-columns: repeat(2, 1fr); } }
.market-card {
  padding: 1.5rem;
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}
.market-card h3 { font-size: 1rem; margin-bottom: 0.6rem; color: var(--color-primary); }
.market-card p { font-size: 0.88rem; color: var(--color-muted); line-height: 1.65; margin-bottom: 0; }
.market-card strong { color: var(--color-primary); }

.services-grid { display: grid; gap: 1.5rem; }
@media (min-width: 640px) { .services-grid { grid-template-columns: repeat(2, 1fr); } }
.service-item {
  padding: 1.5rem;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}
.service-item h3 { font-size: 1rem; margin-bottom: 0.5rem; color: var(--color-primary); }
.service-item p { font-size: 0.88rem; color: var(--color-muted); line-height: 1.65; margin-bottom: 0; }

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
