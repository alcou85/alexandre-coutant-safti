<template>
  <main class="local-page">

    <section class="section section--hero">
      <div class="container">
        <p class="page-eyebrow">Vendée · 85600</p>
        <h1>Immobilier à Montaigu-Vendée</h1>
        <p class="page-intro">
          Pôle économique dynamique de l'est vendéen, Montaigu-Vendée connaît
          une croissance démographique soutenue. Un marché immobilier actif,
          porté par un bassin d'emploi solide et une qualité de vie appréciée.
        </p>
        <RouterLink to="/estimation" class="btn-primary">Estimer mon bien gratuitement</RouterLink>
      </div>
    </section>

    <section class="section section--white">
      <div class="container">
        <h2>Montaigu-Vendée : dynamisme économique et qualité de vie</h2>
        <div class="content-grid">
          <div class="content-text">
            <p>
              Commune nouvelle créée en 2016, Montaigu-Vendée regroupe plusieurs
              communes de l'est du département et compte aujourd'hui plus de
              25 000 habitants. Situé à mi-chemin entre La Roche-sur-Yon et Nantes,
              le territoire bénéficie d'une position géographique stratégique
              et d'un accès rapide à l'autoroute A83.
            </p>
            <p>
              Le tissu économique local est l'un des plus actifs du département,
              avec notamment la présence du groupe Bénéteau et d'un large réseau
              de PME et d'artisans. Cette vitalité économique entretient une
              demande immobilière soutenue, notamment de la part d'actifs mutés
              ou cherchant à se rapprocher de leur lieu de travail.
            </p>
            <p>
              Montaigu-Vendée attire également des familles primo-accédantes
              qui trouvent ici un bon équilibre entre prix accessibles, services
              de qualité et cadre de vie agréable, à une heure de Nantes.
            </p>
          </div>
          <div class="content-highlights">
            <div class="highlight-card">
              <p class="highlight-number">~25 000</p>
              <p class="highlight-label">habitants</p>
            </div>
            <div class="highlight-card">
              <p class="highlight-number">85600</p>
              <p class="highlight-label">code postal</p>
            </div>
            <div class="highlight-card">
              <p class="highlight-number">40 km</p>
              <p class="highlight-label">de La Roche-sur-Yon</p>
            </div>
            <div class="highlight-card">
              <p class="highlight-number">1 h</p>
              <p class="highlight-label">de Nantes</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2>Le marché immobilier à Montaigu-Vendée</h2>
        <p class="section-intro">
          Aperçu des tendances basées sur les données DVF. Ces informations sont
          indicatives et peuvent évoluer selon les biens et le marché.
        </p>
        <div class="market-grid">
          <div class="market-card">
            <h3>Maisons individuelles</h3>
            <p>
              Les maisons représentent l'essentiel des transactions. Les prix
              se situent entre <strong>1 800 et 2 300 €/m²</strong> selon
              l'état, le terrain et la localisation au sein de la commune nouvelle.
              Les biens récents ou rénovés se négocient moins.
            </p>
          </div>
          <div class="market-card">
            <h3>Appartements</h3>
            <p>
              L'offre en appartements est plus limitée qu'à La Roche-sur-Yon.
              Les prix varient entre <strong>1 500 et 1 900 €/m²</strong>.
              La demande locative est soutenue par la présence de nombreux
              actifs et de jeunes ménages.
            </p>
          </div>
          <div class="market-card">
            <h3>Profil des acquéreurs</h3>
            <p>
              Essentiellement des actifs et des familles, souvent primo-accédants,
              attirés par le bassin d'emploi local et la proximité de Nantes.
              Montaigu-Vendée est également prisé des cadres qui télétravaillent
              tout en restant accessibles.
            </p>
          </div>
          <div class="market-card">
            <h3>Dynamique de marché</h3>
            <p>
              Le marché montacutain est l'un des plus dynamiques de Vendée
              hors littoral. La croissance démographique soutient les prix
              à la hausse, tout en restant plus accessible que La Roche-sur-Yon
              ou Nantes.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--white">
      <div class="container">
        <h2>Vendre votre bien à Montaigu-Vendée avec Alexandre Coutant</h2>
        <div class="services-grid">
          <div class="service-item">
            <h3>Connaissance du marché est-vendéen</h3>
            <p>
              J'interviens sur Montaigu-Vendée et les communes de l'est du
              département. Je connais les tendances de prix et les critères
              qui font la valeur d'un bien dans ce secteur en croissance.
            </p>
          </div>
          <div class="service-item">
            <h3>Estimation basée sur les données réelles</h3>
            <p>
              J'utilise la base DVF et les transactions récentes de votre commune
              pour vous fournir une estimation honnête, cohérente avec
              le dynamisme du marché local.
            </p>
          </div>
          <div class="service-item">
            <h3>Accompagnement complet</h3>
            <p>
              De la première visite à la signature chez le notaire, je vous guide
              à chaque étape : conseil, photos, annonce, visites, négociation
              et suivi administratif.
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
        <h2>Prêt à estimer votre bien à Montaigu-Vendée ?</h2>
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
  title: 'Estimation immobilière Montaigu-Vendée',
  description:
    'Marché immobilier à Montaigu-Vendée (85600) : prix au m², tendances et accompagnement vente. Alexandre Coutant, conseiller SAFTI, vous aide à estimer et vendre votre bien dans l\'est vendéen.',
  canonical: `${SITE.url}/immobilier-montaigu-vendee`,
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      name: 'Alexandre Coutant – Conseiller SAFTI',
      url: `${SITE.url}/immobilier-montaigu-vendee`,
      telephone: SITE.phone,
      email: SITE.email,
      areaServed: {
        '@type': 'City',
        name: 'Montaigu-Vendée',
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
.section-intro { color: var(--color-muted); margin-bottom: 2rem; font-size: 0.9rem; }

.content-grid { display: flex; flex-direction: column; gap: 2.5rem; }
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
