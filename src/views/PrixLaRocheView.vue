<template>
  <main class="local-page">

    <section class="section section--hero">
      <div class="container">
        <p class="page-eyebrow">La Roche-sur-Yon · 85000 · Vendée</p>
        <h1>Prix immobilier à La Roche-sur-Yon</h1>
        <p class="page-intro">
          Données de prix au m² à La Roche-sur-Yon basées sur les transactions DVF
          enregistrées. Fourchettes indicatives par type de bien et secteur,
          régulièrement actualisées.
        </p>
        <RouterLink to="/estimation" class="btn-primary">Estimer mon bien gratuitement</RouterLink>
      </div>
    </section>

    <!-- Prix par type -->
    <section class="section section--white">
      <div class="container">
        <h2>Prix au m² à La Roche-sur-Yon par type de bien</h2>
        <p class="section-intro">
          Fourchettes indicatives basées sur les données DVF (Demandes de Valeurs
          Foncières). Ces valeurs peuvent évoluer selon les biens et le marché.
        </p>
        <div class="prices-grid">
          <div class="price-card price-card--main">
            <h3>Maisons individuelles</h3>
            <p class="price-range">1 900 – 2 500 €/m²</p>
            <ul class="price-details">
              <li>Bon état, terrain standard : <strong>2 000 – 2 300 €/m²</strong></li>
              <li>Rénové récemment : <strong>2 300 – 2 500 €/m²</strong></li>
              <li>À rénover : <strong>1 600 – 1 900 €/m²</strong></li>
              <li>Plain-pied avec jardin : <strong>+3 à 5 %</strong></li>
            </ul>
          </div>
          <div class="price-card price-card--main">
            <h3>Appartements</h3>
            <p class="price-range">1 700 – 2 200 €/m²</p>
            <ul class="price-details">
              <li>Bon état, sans parking : <strong>1 700 – 1 950 €/m²</strong></li>
              <li>Avec parking ou garage : <strong>+5 à 8 %</strong></li>
              <li>Rénové, étage élevé : <strong>2 000 – 2 200 €/m²</strong></li>
              <li>Rez-de-chaussée ou à rénover : <strong>1 500 – 1 700 €/m²</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Prix par secteur -->
    <section class="section">
      <div class="container">
        <h2>Prix par secteur à La Roche-sur-Yon</h2>
        <p class="section-intro">
          Les prix varient sensiblement d'un quartier à l'autre. Ces fourchettes
          sont indicatives et dépendent fortement des caractéristiques du bien.
        </p>
        <div class="market-grid">
          <div class="market-card">
            <h3>Centre-ville</h3>
            <p>
              Secteur le plus valorisé : commerces, services et vie urbaine à pied.
              Les appartements y sont plus présents que les maisons.
              <strong>Prix : 1 950 – 2 300 €/m²</strong> en appartement ancien.
            </p>
          </div>
          <div class="market-card">
            <h3>Saint-Jean-de-Croix / Les Pyramides</h3>
            <p>
              Quartiers résidentiels recherchés, bien desservis. Mixité
              appartements/maisons. Écoles et commerces à proximité.
              <strong>Prix : 2 000 – 2 400 €/m²</strong> pour les maisons.
            </p>
          </div>
          <div class="market-card">
            <h3>Périphérie nord et est</h3>
            <p>
              Secteurs pavillonnaires offrant plus de surface pour un budget
              équivalent. Idéal pour les familles avec enfants.
              <strong>Prix : 1 800 – 2 100 €/m²</strong> pour les maisons.
            </p>
          </div>
          <div class="market-card">
            <h3>Communes limitrophes</h3>
            <p>
              La Ferrière, Les Clouzeaux, Dompierre-sur-Yon : prix légèrement
              inférieurs avec plus de terrain. Bon rapport qualité/prix pour
              les primo-accédants. <strong>Prix : 1 600 – 2 000 €/m²</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Facteurs -->
    <section class="section section--white">
      <div class="container">
        <h2>Ce qui influence le prix de votre bien</h2>
        <div class="services-grid">
          <div class="service-item">
            <h3>L'état général et le DPE</h3>
            <p>
              Un bien rénové se vend plus vite et se négocie moins. Le diagnostic
              de performance énergétique (DPE) pèse de plus en plus sur la décision
              d'achat : une étiquette F ou G peut entraîner une décote de 5 à 15 %.
            </p>
          </div>
          <div class="service-item">
            <h3>Le terrain et les extérieurs</h3>
            <p>
              Un jardin bien exposé, une terrasse ou une piscine sont des arguments
              forts à La Roche-sur-Yon. Le plain-pied est particulièrement recherché
              par les familles et les seniors.
            </p>
          </div>
          <div class="service-item">
            <h3>La localisation précise</h3>
            <p>
              Deux maisons de même surface dans des rues voisines peuvent valoir
              10 à 15 % de différence selon la proximité des écoles, des axes
              routiers et des commerces.
            </p>
          </div>
          <div class="service-item">
            <h3>Le positionnement au prix juste</h3>
            <p>
              Un bien surestimé de 10 % peut rester 6 mois sur le marché et finir
              par se vendre en dessous de ce qu'un bon positionnement initial
              aurait permis. L'estimation juste dès le départ est clé.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--cta">
      <div class="container cta-inner">
        <h2>Connaître le prix de votre bien spécifique</h2>
        <p>
          Ces fourchettes sont des moyennes. Votre bien a ses propres
          caractéristiques. Le simulateur les prend en compte pour vous donner
          une estimation personnalisée en 2 minutes.
        </p>
        <div class="cta-actions">
          <RouterLink to="/estimation" class="btn-primary">Estimer mon bien</RouterLink>
          <RouterLink to="/immobilier-la-roche-sur-yon" class="btn-outline">Marché La Roche-sur-Yon</RouterLink>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup>
import { useSeo } from '../composables/useSeo.js'
import { SITE } from '../config/seo.js'

useSeo({
  title: 'Prix immobilier La Roche-sur-Yon 2025',
  description:
    'Prix au m² à La Roche-sur-Yon : maisons 1 900–2 500 €/m², appartements 1 700–2 200 €/m². Données DVF par quartier, facteurs de valeur et estimation gratuite en ligne.',
  canonical: `${SITE.url}/prix-immobilier-la-roche-sur-yon`,
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Prix immobilier à La Roche-sur-Yon',
      author: {
        '@type': 'Person',
        name: 'Alexandre Coutant',
        url: `${SITE.url}/qui-suis-je`,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE.name,
        url: SITE.url,
      },
      about: {
        '@type': 'City',
        name: 'La Roche-sur-Yon',
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
.section-intro { color: var(--color-muted); margin-bottom: 2rem; font-size: 0.9rem; }

.prices-grid {
  display: grid;
  gap: 1.5rem;
}
@media (min-width: 768px) { .prices-grid { grid-template-columns: repeat(2, 1fr); } }

.price-card {
  padding: 2rem;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}
.price-card h3 { font-size: 1.1rem; margin-bottom: 0.75rem; color: var(--color-primary); }
.price-range {
  font-family: var(--font-heading);
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--color-accent);
  margin-bottom: 1.25rem;
}
.price-details {
  padding-left: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.price-details li {
  font-size: 0.875rem;
  color: var(--color-muted);
  line-height: 1.5;
}
.price-details strong { color: var(--color-primary); }

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
