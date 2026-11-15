<template>
  <main class="local-page">
    <section class="section section--hero">
      <div class="container">
        <p class="page-eyebrow">Vendée · 85340</p>
        <h1>Immobilier à l'Île-d'Olonne</h1>
        <p class="page-intro">
          Ancienne commune désormais intégrée à la ville des Sables-d'Olonne,
          l'Île-d'Olonne conserve son identité résidentielle et son cadre de vie
          préservé. Un marché attractif entre littoral et bocage, à quelques minutes
          de la plage.
        </p>
        <RouterLink to="/estimation" class="btn-primary">Estimer mon bien gratuitement</RouterLink>
      </div>
    </section>

    <section class="section section--white">
      <div class="container">
        <h2>L'Île-d'Olonne : résidentiel et préservé à l'ouest des Sables</h2>
        <div class="content-grid">
          <div class="content-text">
            <p>
              Depuis la création de la commune nouvelle des Sables-d'Olonne en 2019,
              l'Île-d'Olonne constitue l'un des secteurs résidentiels les plus appréciés
              du territoire. À l'écart de l'agitation du front de mer, elle offre
              un cadre de vie plus calme, avec des maisons individuelles, des jardins
              et une proximité immédiate avec la plage et les services sablais.
            </p>
            <p>
              Le marché immobilier y est soutenu par une double demande : résidences
              principales de familles sablaises et résidences secondaires d'acquéreurs
              attirés par le littoral vendéen. Les prix sont plus accessibles que
              le centre des Sables tout en restant dans un secteur très recherché.
            </p>
          </div>
          <div class="content-highlights">
            <div class="highlight-card">
              <p class="highlight-number">~8 000</p>
              <p class="highlight-label">habitants</p>
            </div>
            <div class="highlight-card">
              <p class="highlight-number">85340</p>
              <p class="highlight-label">code postal</p>
            </div>
            <div class="highlight-card">
              <p class="highlight-number">5 min</p>
              <p class="highlight-label">de la plage</p>
            </div>
            <div class="highlight-card">
              <p class="highlight-number">50 min</p>
              <p class="highlight-label">de La Roche-sur-Yon</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2>Le marché immobilier à l'Île-d'Olonne</h2>
        <div class="market-grid">
          <div class="market-card">
            <h3>Maisons individuelles</h3>
            <p>Le marché est dominé par les maisons. Les prix varient entre <strong>2 000 et 3 000 €/m²</strong> selon la proximité de la mer, l'état et la surface du terrain. Les maisons récentes avec jardin sont très demandées.</p>
          </div>
          <div class="market-card">
            <h3>Résidences secondaires</h3>
            <p>La demande en résidences de vacances est significative et soutient les prix. Les acquéreurs viennent souvent de régions parisienne ou des grandes métropoles.</p>
          </div>
          <div class="market-card">
            <h3>Profil des acquéreurs</h3>
            <p>Familles sablaises cherchant à s'installer, couples retraités, investisseurs locatifs saisonniers. L'Île-d'Olonne attire des profils variés grâce à son équilibre entre calme et proximité du littoral.</p>
          </div>
          <div class="market-card">
            <h3>Comparaison avec Les Sables</h3>
            <p>Des prix généralement inférieurs au front de mer des Sables-d'Olonne, pour un cadre de vie similaire. Un excellent rapport qualité/prix pour les acquéreurs littoraux avec un budget maîtrisé.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--cta">
      <div class="container cta-inner">
        <h2>Estimez votre bien à l'Île-d'Olonne</h2>
        <p>Obtenez une fourchette de prix en 2 minutes, basée sur les ventes réelles de votre secteur.</p>
        <div class="cta-actions">
          <RouterLink to="/estimation" class="btn-primary">Estimer mon bien</RouterLink>
          <RouterLink to="/immobilier-les-sables-dolonne" class="btn-outline">Marché Les Sables-d'Olonne</RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useSeo } from '../composables/useSeo.js'
import { SITE } from '../config/seo.js'
useSeo({
  title: "Estimation immobilière L'Île-d'Olonne – Vendée",
  description: "Marché immobilier à l'Île-d'Olonne (85340) : prix au m² et estimation gratuite. Alexandre Coutant, conseiller SAFTI, à proximité des Sables-d'Olonne.",
  canonical: `${SITE.url}/immobilier-ile-dolonne`,
  jsonLd: [{ '@context': 'https://schema.org', '@type': 'RealEstateAgent', name: 'Alexandre Coutant – Conseiller SAFTI', url: `${SITE.url}/immobilier-ile-dolonne`, telephone: SITE.phone, email: SITE.email, areaServed: { '@type': 'City', name: "L'Île-d'Olonne", containedInPlace: { '@type': 'AdministrativeArea', name: 'Vendée' } }, address: { '@type': 'PostalAddress', addressLocality: 'La Roche-sur-Yon', postalCode: '85000', addressRegion: 'Vendée', addressCountry: 'FR' } }],
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
