<template>
  <main class="local-page">
    <section class="section section--hero">
      <div class="container">
        <p class="page-eyebrow">Vendée · 85430</p>
        <h1>Immobilier à Aubigny-Les Clouzeaux</h1>
        <p class="page-intro">
          Commune nouvelle née de la fusion d'Aubigny et des Clouzeaux, à une vingtaine
          de kilomètres de La Roche-sur-Yon. Un marché résidentiel calme, apprécié
          des familles cherchant de l'espace à prix raisonnable.
        </p>
        <RouterLink to="/estimation" class="btn-primary">Estimer mon bien gratuitement</RouterLink>
      </div>
    </section>

    <section class="section section--white">
      <div class="container">
        <h2>Aubigny-Les Clouzeaux : entre bocage et préfecture</h2>
        <div class="content-grid">
          <div class="content-text">
            <p>
              Aubigny-Les Clouzeaux est une commune vendéenne à dominante résidentielle,
              idéalement positionnée entre la préfecture et le bocage. Elle attire
              principalement des familles souhaitant s'installer dans un cadre rural
              tout en restant à une distance raisonnable des services de La Roche-sur-Yon.
            </p>
            <p>
              Le marché y est essentiellement composé de maisons individuelles avec
              terrain. Les transactions sont moins nombreuses qu'en ville, ce qui
              rend l'estimation locale plus sensible aux caractéristiques précises
              du bien.
            </p>
          </div>
          <div class="content-highlights">
            <div class="highlight-card">
              <p class="highlight-number">~6 000</p>
              <p class="highlight-label">habitants</p>
            </div>
            <div class="highlight-card">
              <p class="highlight-number">85430</p>
              <p class="highlight-label">code postal</p>
            </div>
            <div class="highlight-card">
              <p class="highlight-number">20 km</p>
              <p class="highlight-label">de La Roche-sur-Yon</p>
            </div>
            <div class="highlight-card">
              <p class="highlight-number">25 min</p>
              <p class="highlight-label">en voiture</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2>Le marché immobilier à Aubigny-Les Clouzeaux</h2>
        <div class="market-grid">
          <div class="market-card">
            <h3>Maisons individuelles</h3>
            <p>Le marché est quasi exclusivement composé de maisons. Les prix se situent entre <strong>1 500 et 1 900 €/m²</strong> selon l'état, la surface du terrain et les prestations.</p>
          </div>
          <div class="market-card">
            <h3>Terrain et extérieurs</h3>
            <p>La surface du terrain est un facteur déterminant ici. Les maisons de plain-pied avec grand jardin sont particulièrement recherchées par les familles et les seniors.</p>
          </div>
          <div class="market-card">
            <h3>Profil des acquéreurs</h3>
            <p>Essentiellement des familles primo-accédantes attirées par le calme, l'espace et la proximité de La Roche-sur-Yon pour les services et le travail.</p>
          </div>
          <div class="market-card">
            <h3>Comparaison avec La Roche</h3>
            <p>Les prix y sont inférieurs au centre de La Roche-sur-Yon, ce qui représente une opportunité pour les acquéreurs souhaitant plus d'espace pour un budget équivalent.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--cta">
      <div class="container cta-inner">
        <h2>Estimez votre bien à Aubigny-Les Clouzeaux</h2>
        <p>Obtenez une fourchette de prix en 2 minutes, basée sur les ventes réelles de votre secteur.</p>
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
  title: 'Estimation immobilière Aubigny-Les Clouzeaux – Vendée',
  description: 'Marché immobilier à Aubigny-Les Clouzeaux (85430) : prix au m² et estimation gratuite. Alexandre Coutant, conseiller SAFTI à 20 km de La Roche-sur-Yon.',
  canonical: `${SITE.url}/immobilier-aubigny-les-clouzeaux`,
  jsonLd: [{ '@context': 'https://schema.org', '@type': 'RealEstateAgent', name: 'Alexandre Coutant – Conseiller SAFTI', url: `${SITE.url}/immobilier-aubigny-les-clouzeaux`, telephone: SITE.phone, email: SITE.email, areaServed: { '@type': 'City', name: 'Aubigny-Les Clouzeaux', containedInPlace: { '@type': 'AdministrativeArea', name: 'Vendée' } }, address: { '@type': 'PostalAddress', addressLocality: 'La Roche-sur-Yon', postalCode: '85000', addressRegion: 'Vendée', addressCountry: 'FR' } }],
})
</script>

<style scoped>
.local-page { padding-top: 64px; }
.section { padding: 4.5rem 0; border-bottom: 1px solid var(--color-border); }
.section:last-child { border-bottom: none; }
.section--hero { padding-top: 5rem; background-color: var(--color-bg); }
.section--white { background-color: var(--color-white); }
.page-eyebrow { font-size: 0.78rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-accent); margin-bottom: 0.75rem; }
h1 { margin-bottom: 1.25rem; }
.page-intro { font-size: 1rem; color: var(--color-muted); max-width: 640px; margin-bottom: 2rem; line-height: 1.7; }
.content-grid { display: flex; flex-direction: column; gap: 2.5rem; }
@media (min-width: 768px) { .content-grid { flex-direction: row; align-items: flex-start; gap: 3rem; } }
.content-text { flex: 1; }
.content-text p { color: var(--color-muted); font-size: 0.95rem; line-height: 1.7; }
.content-highlights { flex-shrink: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
@media (min-width: 768px) { .content-highlights { width: 260px; } }
.highlight-card { padding: 1.25rem; background-color: var(--color-bg); border: 1px solid var(--color-border); border-radius: var(--radius); text-align: center; }
.highlight-number { font-family: var(--font-heading); font-size: 1.5rem; font-weight: 600; color: var(--color-accent); margin-bottom: 0.25rem; }
.highlight-label { font-size: 0.75rem; color: var(--color-muted); margin-bottom: 0; }
.market-grid { display: grid; gap: 1.5rem; }
@media (min-width: 640px) { .market-grid { grid-template-columns: repeat(2, 1fr); } }
.market-card { padding: 1.5rem; background-color: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius); }
.market-card h3 { font-size: 1rem; margin-bottom: 0.6rem; color: var(--color-primary); }
.market-card p { font-size: 0.88rem; color: var(--color-muted); line-height: 1.65; margin-bottom: 0; }
.market-card strong { color: var(--color-primary); }
.section--cta { background-color: var(--color-primary); border-bottom: none; }
.cta-inner { text-align: center; }
.cta-inner h2 { color: var(--color-white); margin-bottom: 0.75rem; }
.cta-inner p { color: rgba(255,255,255,0.7); margin-bottom: 2rem; font-size: 1rem; }
.cta-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; }
.cta-actions .btn-outline { color: var(--color-white); border-color: rgba(255,255,255,0.35); }
.cta-actions .btn-outline:hover { border-color: var(--color-white); background-color: transparent; }
</style>
