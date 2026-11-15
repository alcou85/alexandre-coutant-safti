<template>
  <main class="local-page">

    <section class="section section--hero">
      <div class="container">
        <p class="page-eyebrow">Département 85 · Pays de la Loire</p>
        <h1>Immobilier en Vendée</h1>
        <p class="page-intro">
          Marché dynamique et diversifié, la Vendée offre des opportunités immobilières
          variées : littoral, bocage, villes moyennes. Découvrez les tendances par secteur
          et estimez gratuitement votre bien en 2 minutes.
        </p>
        <RouterLink to="/estimation" class="btn-primary">Estimer mon bien gratuitement</RouterLink>
      </div>
    </section>

    <!-- Vue d'ensemble -->
    <section class="section section--white">
      <div class="container">
        <h2>Le marché immobilier en Vendée</h2>
        <div class="content-grid">
          <div class="content-text">
            <p>
              La Vendée (85) est l'un des départements les plus attractifs des Pays de
              la Loire. Son littoral, sa qualité de vie, son tissu économique solide et
              sa démographie dynamique entretiennent une demande immobilière soutenue
              tout au long de l'année.
            </p>
            <p>
              Le marché vendéen est multiple : les prix varient sensiblement selon que
              vous êtes sur le littoral, en ville préfecture ou en bocage rural. Un bien
              aux Sables-d'Olonne n'a pas le même positionnement qu'une maison à
              Aizenay ou à Montaigu-Vendée. Cette diversité est à la fois une
              opportunité pour les acquéreurs et un paramètre essentiel pour les vendeurs.
            </p>
            <p>
              Conseiller immobilier indépendant SAFTI basé à La Roche-sur-Yon,
              j'interviens sur l'ensemble du département 85 pour accompagner les
              propriétaires dans leur projet de vente, de l'estimation initiale
              jusqu'à la signature chez le notaire.
            </p>
          </div>
          <div class="content-highlights">
            <div class="highlight-card">
              <p class="highlight-number">~690 000</p>
              <p class="highlight-label">habitants</p>
            </div>
            <div class="highlight-card">
              <p class="highlight-number">282</p>
              <p class="highlight-label">communes</p>
            </div>
            <div class="highlight-card">
              <p class="highlight-number">250 km</p>
              <p class="highlight-label">de littoral</p>
            </div>
            <div class="highlight-card">
              <p class="highlight-number">Dept. 85</p>
              <p class="highlight-label">Pays de la Loire</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Secteurs -->
    <section class="section">
      <div class="container">
        <h2>Les principaux marchés immobiliers vendéens</h2>
        <p class="section-intro">
          Chaque secteur a ses propres dynamiques de prix. Cliquez sur une ville pour
          découvrir le marché local.
        </p>
        <div class="cities-grid">

          <RouterLink to="/immobilier-la-roche-sur-yon" class="city-card">
            <div class="city-header">
              <span class="city-code">85000</span>
              <span class="city-badge city-badge--primary">Préfecture</span>
            </div>
            <h3 class="city-name">La Roche-sur-Yon</h3>
            <p class="city-desc">Premier marché du département. Ville services, marché actif et délais de vente maîtrisés.</p>
            <p class="city-price">1 900 – 2 500 €/m²</p>
            <span class="city-link">Voir le marché →</span>
          </RouterLink>

          <RouterLink to="/immobilier-les-sables-dolonne" class="city-card">
            <div class="city-header">
              <span class="city-code">85100</span>
              <span class="city-badge city-badge--ocean">Littoral</span>
            </div>
            <h3 class="city-name">Les Sables-d'Olonne</h3>
            <p class="city-desc">Marché balnéaire premium. Forte demande en résidences principales et secondaires.</p>
            <p class="city-price">2 500 – 4 500 €/m²</p>
            <span class="city-link">Voir le marché →</span>
          </RouterLink>

          <RouterLink to="/immobilier-aizenay" class="city-card">
            <div class="city-header">
              <span class="city-code">85190</span>
              <span class="city-badge">Bocage</span>
            </div>
            <h3 class="city-name">Aizenay</h3>
            <p class="city-desc">Bourg central entre La Roche-sur-Yon et Les Sables, dynamique et bien équipé.</p>
            <p class="city-price">1 600 – 2 100 €/m²</p>
            <span class="city-link">Voir le marché →</span>
          </RouterLink>

          <RouterLink to="/immobilier-ile-dolonne" class="city-card">
            <div class="city-header">
              <span class="city-code">85340</span>
              <span class="city-badge city-badge--ocean">Littoral</span>
            </div>
            <h3 class="city-name">L'Île-d'Olonne</h3>
            <p class="city-desc">Secteur résidentiel intégré aux Sables, plus calme et plus accessible que le front de mer.</p>
            <p class="city-price">2 000 – 3 000 €/m²</p>
            <span class="city-link">Voir le marché →</span>
          </RouterLink>

          <RouterLink to="/immobilier-mouilleron-le-captif" class="city-card">
            <div class="city-header">
              <span class="city-code">85170</span>
              <span class="city-badge">Périurbain</span>
            </div>
            <h3 class="city-name">Mouilleron-le-Captif</h3>
            <p class="city-desc">Première périphérie de La Roche-sur-Yon, prisée des familles pour son calme et sa proximité.</p>
            <p class="city-price">1 700 – 2 100 €/m²</p>
            <span class="city-link">Voir le marché →</span>
          </RouterLink>

          <RouterLink to="/immobilier-montaigu-vendee" class="city-card">
            <div class="city-header">
              <span class="city-code">85600</span>
              <span class="city-badge">Est Vendée</span>
            </div>
            <h3 class="city-name">Montaigu-Vendée</h3>
            <p class="city-desc">Pôle économique en croissance, attractif pour les actifs et les familles primo-accédantes.</p>
            <p class="city-price">1 800 – 2 300 €/m²</p>
            <span class="city-link">Voir le marché →</span>
          </RouterLink>

          <RouterLink to="/immobilier-la-ferriere" class="city-card">
            <div class="city-header">
              <span class="city-code">85280</span>
              <span class="city-badge">Périurbain</span>
            </div>
            <h3 class="city-name">La Ferrière</h3>
            <p class="city-desc">Commune résidentielle prisée à 15 km de La Roche. Idéale pour les familles cherchant de l'espace.</p>
            <p class="city-price">1 600 – 2 100 €/m²</p>
            <span class="city-link">Voir le marché →</span>
          </RouterLink>

          <div class="city-card city-card--cta">
            <p class="city-cta-text">Votre commune n'est pas listée ?</p>
            <p class="city-cta-sub">Le simulateur couvre l'ensemble du département 85.</p>
            <RouterLink to="/estimation" class="btn-primary city-cta-btn">Estimer mon bien</RouterLink>
          </div>

        </div>
      </div>
    </section>

    <!-- Pourquoi AC -->
    <section class="section section--white">
      <div class="container">
        <h2>Vendre en Vendée avec Alexandre Coutant</h2>
        <div class="services-grid">
          <div class="service-item">
            <h3>Couverture de tout le département 85</h3>
            <p>
              J'interviens sur l'ensemble de la Vendée, de La Roche-sur-Yon au littoral,
              du bocage nord au sud du département. Quelle que soit votre commune,
              je peux vous accompagner.
            </p>
          </div>
          <div class="service-item">
            <h3>Estimation basée sur les données DVF</h3>
            <p>
              Mon simulateur s'appuie sur les transactions réelles enregistrées dans
              votre commune (base DVF). Pas de moyenne régionale approximative :
              une fourchette ancrée dans votre marché local.
            </p>
          </div>
          <div class="service-item">
            <h3>Conseiller indépendant SAFTI</h3>
            <p>
              La force d'un réseau national (diffusion, outils, notoriété) avec
              la réactivité d'un professionnel local qui gère personnellement chaque
              dossier, sans intermédiaire.
            </p>
          </div>
          <div class="service-item">
            <h3>Accompagnement complet</h3>
            <p>
              De l'estimation initiale à la signature chez le notaire : conseil,
              mise en valeur, annonce, visites, négociation et suivi administratif.
              Un seul interlocuteur du début à la fin.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--cta">
      <div class="container cta-inner">
        <h2>Estimez votre bien en Vendée gratuitement</h2>
        <p>
          Renseignez l'adresse de votre bien et obtenez une fourchette de prix
          en 2 minutes, basée sur les ventes réelles de votre secteur.
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
  title: 'Immobilier en Vendée – prix et estimation gratuite',
  description:
    'Marché immobilier en Vendée (85) : prix au m² par commune, tendances et estimation gratuite en ligne. Alexandre Coutant, conseiller SAFTI, intervient sur tout le département.',
  canonical: `${SITE.url}/immobilier-vendee`,
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      name: 'Alexandre Coutant – Conseiller SAFTI',
      url: `${SITE.url}/immobilier-vendee`,
      telephone: SITE.phone,
      email: SITE.email,
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'Vendée',
        containedInPlace: { '@type': 'AdministrativeArea', name: 'Pays de la Loire' },
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

/* Cities grid */
.cities-grid {
  display: grid;
  gap: 1.25rem;
}
@media (min-width: 640px) {
  .cities-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 960px) {
  .cities-grid { grid-template-columns: repeat(3, 1fr); }
}

.city-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  text-decoration: none;
  color: inherit;
  transition: box-shadow var(--transition), border-color var(--transition);
}
.city-card:hover {
  box-shadow: 0 4px 16px rgba(28, 43, 58, 0.08);
  border-color: var(--color-accent);
}

.city-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.city-code {
  font-size: 0.72rem;
  color: var(--color-muted);
  letter-spacing: 0.04em;
}
.city-badge {
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-muted);
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  padding: 0.15rem 0.45rem;
  border-radius: 3px;
}
.city-badge--primary {
  color: var(--color-accent);
  background-color: rgba(224, 107, 31, 0.06);
  border-color: rgba(224, 107, 31, 0.2);
}
.city-badge--ocean {
  color: #2563a8;
  background-color: rgba(37, 99, 168, 0.06);
  border-color: rgba(37, 99, 168, 0.2);
}

.city-name {
  font-size: 1.1rem;
  color: var(--color-primary);
  margin-bottom: 0;
}
.city-desc {
  font-size: 0.85rem;
  color: var(--color-muted);
  line-height: 1.55;
  margin-bottom: 0;
  flex: 1;
}
.city-price {
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--color-accent);
  margin-bottom: 0;
}
.city-link {
  font-size: 0.8rem;
  color: var(--color-accent);
  font-weight: 500;
}

.city-card--cta {
  background-color: var(--color-bg);
  justify-content: center;
  align-items: flex-start;
  gap: 0.75rem;
}
.city-cta-text {
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-primary);
  margin-bottom: 0;
}
.city-cta-sub {
  font-size: 0.85rem;
  color: var(--color-muted);
  margin-bottom: 0;
}
.city-cta-btn { align-self: flex-start; }

/* Services grid */
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
