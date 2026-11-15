<template>
  <main class="local-page">
    <section class="section section--hero">
      <div class="container">
        <p class="page-eyebrow">Vendée · 85170</p>
        <h1>Immobilier à Mouilleron-le-Captif</h1>
        <p class="page-intro">
          Commune périurbaine à seulement 8 km de La Roche-sur-Yon, Mouilleron-le-Captif
          offre un cadre de vie résidentiel calme avec un accès rapide à la préfecture.
          Un marché dynamique, prisé des familles et des actifs yonnais.
        </p>
        <RouterLink to="/estimation" class="btn-primary">Estimer mon bien gratuitement</RouterLink>
      </div>
    </section>

    <section class="section section--white">
      <div class="container">
        <h2>Mouilleron-le-Captif : la périphérie résidentielle de La Roche-sur-Yon</h2>
        <div class="content-grid">
          <div class="content-text">
            <p>
              Mouilleron-le-Captif est l'une des communes périurbaines les plus proches
              de La Roche-sur-Yon. Sa proximité immédiate avec la préfecture en fait
              un choix naturel pour les familles et les actifs souhaitant bénéficier
              d'un cadre de vie plus calme et spacieux, tout en restant à quelques
              minutes des services, commerces et zones d'emploi.
            </p>
            <p>
              Le marché immobilier y est soutenu et les délais de vente sont maîtrisés
              pour les biens correctement estimés. La demande porte essentiellement sur
              les maisons individuelles avec jardin, type de bien dominant dans la commune.
            </p>
          </div>
          <div class="content-highlights">
            <div class="highlight-card">
              <p class="highlight-number">~5 000</p>
              <p class="highlight-label">habitants</p>
            </div>
            <div class="highlight-card">
              <p class="highlight-number">85170</p>
              <p class="highlight-label">code postal</p>
            </div>
            <div class="highlight-card">
              <p class="highlight-number">8 km</p>
              <p class="highlight-label">de La Roche-sur-Yon</p>
            </div>
            <div class="highlight-card">
              <p class="highlight-number">10 min</p>
              <p class="highlight-label">en voiture</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2>Le marché immobilier à Mouilleron-le-Captif</h2>
        <div class="market-grid">
          <div class="market-card">
            <h3>Maisons individuelles</h3>
            <p>Marché dominé par les maisons pavillonnaires. Les prix se situent entre <strong>1 700 et 2 100 €/m²</strong>, proches des valeurs yonnaises, avec l'avantage de terrains plus généreux.</p>
          </div>
          <div class="market-card">
            <h3>Proximité de La Roche</h3>
            <p>La faible distance avec la préfecture est le principal atout : mêmes services, mêmes axes de transport, mais prix légèrement inférieurs et cadre plus calme.</p>
          </div>
          <div class="market-card">
            <h3>Profil des acquéreurs</h3>
            <p>Familles avec enfants, actifs travaillant à La Roche, couples souhaitant un premier achat en périphérie. Délais de vente courts pour les biens bien positionnés.</p>
          </div>
          <div class="market-card">
            <h3>Critères de valeur</h3>
            <p>Surface du terrain, état général, plain-pied, exposition du jardin : ces éléments ont un fort impact sur la valeur dans ce secteur résidentiel.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--cta">
      <div class="container cta-inner">
        <h2>Estimez votre bien à Mouilleron-le-Captif</h2>
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
  title: 'Estimation immobilière Mouilleron-le-Captif – Vendée',
  description: 'Marché immobilier à Mouilleron-le-Captif (85170) : prix au m² et estimation gratuite. Alexandre Coutant, conseiller SAFTI à 8 km de La Roche-sur-Yon.',
  canonical: `${SITE.url}/immobilier-mouilleron-le-captif`,
  jsonLd: [{ '@context': 'https://schema.org', '@type': 'RealEstateAgent', name: 'Alexandre Coutant – Conseiller SAFTI', url: `${SITE.url}/immobilier-mouilleron-le-captif`, telephone: SITE.phone, email: SITE.email, areaServed: { '@type': 'City', name: 'Mouilleron-le-Captif', containedInPlace: { '@type': 'AdministrativeArea', name: 'Vendée' } }, address: { '@type': 'PostalAddress', addressLocality: 'La Roche-sur-Yon', postalCode: '85000', addressRegion: 'Vendée', addressCountry: 'FR' } }],
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
