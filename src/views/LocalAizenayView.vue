<template>
  <main class="local-page">
    <section class="section section--hero">
      <div class="container">
        <p class="page-eyebrow">Vendée · 85190</p>
        <h1>Immobilier à Aizenay</h1>
        <p class="page-intro">
          Ville de bocage à 20 km de La Roche-sur-Yon et 25 km des Sables-d'Olonne,
          Aizenay bénéficie d'une position centrale appréciée. Un marché résidentiel
          actif, avec une forte demande en maisons individuelles.
        </p>
        <RouterLink to="/estimation" class="btn-primary">Estimer mon bien gratuitement</RouterLink>
      </div>
    </section>

    <section class="section section--white">
      <div class="container">
        <h2>Aizenay : entre préfecture et littoral vendéen</h2>
        <div class="content-grid">
          <div class="content-text">
            <p>
              Aizenay est l'un des principaux bourgs du bocage vendéen, avec environ
              8 000 habitants. Sa situation géographique entre La Roche-sur-Yon et
              Les Sables-d'Olonne en fait un point d'équilibre apprécié : à mi-chemin
              de deux marchés immobiliers distincts, elle bénéficie d'une attractivité
              croissante auprès des familles et des actifs.
            </p>
            <p>
              La commune dispose de tous les services du quotidien — écoles, commerces,
              médecins — et d'un cadre de vie agréable. Le marché immobilier y est
              essentiellement composé de maisons individuelles avec terrain. Les délais
              de vente restent maîtrisés pour les biens bien positionnés.
            </p>
          </div>
          <div class="content-highlights">
            <div class="highlight-card">
              <p class="highlight-number">~8 000</p>
              <p class="highlight-label">habitants</p>
            </div>
            <div class="highlight-card">
              <p class="highlight-number">85190</p>
              <p class="highlight-label">code postal</p>
            </div>
            <div class="highlight-card">
              <p class="highlight-number">20 km</p>
              <p class="highlight-label">de La Roche-sur-Yon</p>
            </div>
            <div class="highlight-card">
              <p class="highlight-number">25 km</p>
              <p class="highlight-label">des Sables-d'Olonne</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2>Le marché immobilier à Aizenay</h2>
        <div class="market-grid">
          <div class="market-card">
            <h3>Maisons individuelles</h3>
            <p>Le marché est dominé par les maisons. Les prix se situent entre <strong>1 600 et 2 100 €/m²</strong> selon l'état, le terrain et l'emplacement. Les biens récents ou rénovés se négocient moins.</p>
          </div>
          <div class="market-card">
            <h3>Position géographique</h3>
            <p>L'accès à la fois à La Roche-sur-Yon et aux Sables-d'Olonne en moins de 30 minutes est un argument fort pour les acquéreurs qui travaillent dans l'une ou l'autre ville.</p>
          </div>
          <div class="market-card">
            <h3>Profil des acquéreurs</h3>
            <p>Familles primo-accédantes, actifs en mobilité, personnes cherchant un premier achat dans un bourg dynamique avec tous les services, à prix accessible.</p>
          </div>
          <div class="market-card">
            <h3>Critères de valeur</h3>
            <p>Terrain, état général et plain-pied sont les principaux leviers de valeur. La proximité du centre-bourg et des écoles joue également sur le prix.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--cta">
      <div class="container cta-inner">
        <h2>Estimez votre bien à Aizenay</h2>
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
  title: 'Estimation immobilière Aizenay – Vendée',
  description: 'Marché immobilier à Aizenay (85190) : prix au m² et estimation gratuite. Alexandre Coutant, conseiller SAFTI, à mi-chemin de La Roche-sur-Yon et des Sables-d\'Olonne.',
  canonical: `${SITE.url}/immobilier-aizenay`,
  jsonLd: [{ '@context': 'https://schema.org', '@type': 'RealEstateAgent', name: 'Alexandre Coutant – Conseiller SAFTI', url: `${SITE.url}/immobilier-aizenay`, telephone: SITE.phone, email: SITE.email, areaServed: { '@type': 'City', name: 'Aizenay', containedInPlace: { '@type': 'AdministrativeArea', name: 'Vendée' } }, address: { '@type': 'PostalAddress', addressLocality: 'La Roche-sur-Yon', postalCode: '85000', addressRegion: 'Vendée', addressCountry: 'FR' } }],
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
