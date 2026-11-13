<template>
  <main class="local-page">

    <!-- Hero local -->
    <section class="section section--hero">
      <div class="container">
        <p class="page-eyebrow">Vendée · 85000</p>
        <h1>Immobilier à La Roche-sur-Yon</h1>
        <p class="page-intro">
          Préfecture de la Vendée, La Roche-sur-Yon est une ville dynamique où le marché
          immobilier reste actif et accessible. Découvrez les tendances du marché local
          et comment vendre ou acheter votre bien dans les meilleures conditions.
        </p>
        <RouterLink to="/estimation" class="btn-primary">Estimer mon bien gratuitement</RouterLink>
      </div>
    </section>

    <!-- Présentation de la ville -->
    <section class="section section--white">
      <div class="container">
        <h2>La Roche-sur-Yon : une ville à part en Vendée</h2>
        <div class="content-grid">
          <div class="content-text">
            <p>
              Fondée par Napoléon Bonaparte en 1804 et conçue selon un plan en étoile,
              La Roche-sur-Yon est une ville atypique, à la croisée de l'histoire et
              de la modernité. Avec ses 60 000 habitants, elle est la plus grande ville
              de Vendée et concentre l'essentiel des services, commerces, établissements
              scolaires et structures de santé du département.
            </p>
            <p>
              Sa position géographique est un vrai atout&nbsp;: à moins d'une heure
              des Sables-d'Olonne et de son littoral, à 1 h 30 de Nantes, elle offre
              un équilibre rare entre qualité de vie, accessibilité et services urbains.
              Cette situation explique en partie l'attractivité soutenue de son marché
              immobilier.
            </p>
            <p>
              La ville attire aussi bien des familles cherchant à s'établir durablement
              que des actifs en mobilité professionnelle, des primo-accédants et des
              investisseurs locatifs, notamment grâce à la présence d'un pôle
              universitaire et d'un bassin d'emploi diversifié.
            </p>
          </div>
          <div class="content-highlights">
            <div class="highlight-card">
              <p class="highlight-number">~60 000</p>
              <p class="highlight-label">habitants</p>
            </div>
            <div class="highlight-card">
              <p class="highlight-number">85000</p>
              <p class="highlight-label">code postal</p>
            </div>
            <div class="highlight-card">
              <p class="highlight-number">&lt; 1 h</p>
              <p class="highlight-label">des Sables-d'Olonne</p>
            </div>
            <div class="highlight-card">
              <p class="highlight-number">1 h 30</p>
              <p class="highlight-label">de Nantes</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Marché immobilier -->
    <section class="section">
      <div class="container">
        <h2>Le marché immobilier à La Roche-sur-Yon</h2>
        <p class="section-intro">
          Aperçu des tendances basées sur les données DVF (transactions enregistrées).
          Ces informations sont indicatives et peuvent évoluer.
        </p>

        <div class="market-grid">
          <div class="market-card">
            <h3>Appartements anciens</h3>
            <p>
              Les appartements se situent généralement entre <strong>1 700 et 2 200 €/m²</strong>
              selon le quartier, l'étage, l'état et la présence d'un parking ou d'une
              terrasse. Les biens rénovés et bien situés se négocient moins.
            </p>
          </div>
          <div class="market-card">
            <h3>Maisons individuelles</h3>
            <p>
              Les maisons s'échangent dans une fourchette de <strong>1 900 à 2 500 €/m²</strong>
              en moyenne. Le terrain, l'état général, l'exposition et la proximité
              des écoles influencent fortement la valeur. Les maisons avec jardin
              restent très demandées.
            </p>
          </div>
          <div class="market-card">
            <h3>Quartiers et secteurs</h3>
            <p>
              Le centre-ville et les secteurs proches des axes principaux affichent
              les valeurs les plus élevées. Les quartiers résidentiels périphériques
              offrent un meilleur rapport surface/prix, avec un accès rapide aux
              services urbains.
            </p>
          </div>
          <div class="market-card">
            <h3>Tendances 2025</h3>
            <p>
              Le marché yonnais reste actif, avec des délais de vente maîtrisés
              pour les biens correctement positionnés. La performance énergétique
              (DPE) prend une importance croissante dans la décision d'achat.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pourquoi vendre avec AC -->
    <section class="section section--white">
      <div class="container">
        <h2>Vendre votre bien à La Roche-sur-Yon avec Alexandre Coutant</h2>
        <div class="services-grid">
          <div class="service-item">
            <h3>Estimation basée sur les données réelles</h3>
            <p>
              J'utilise la base DVF et ma connaissance du marché local pour vous
              fournir une estimation honnête, ni sur- ni sous-évaluée.
            </p>
          </div>
          <div class="service-item">
            <h3>Accompagnement complet</h3>
            <p>
              De l'estimation à la signature chez le notaire, je vous guide à chaque
              étape&nbsp;: conseil, mise en valeur du bien, diffusion de l'annonce,
              organisation des visites, négociation, suivi administratif.
            </p>
          </div>
          <div class="service-item">
            <h3>Disponibilité et réactivité</h3>
            <p>
              En tant que conseiller indépendant, je suis disponible en semaine
              comme le week-end, et je gère personnellement chaque dossier.
              Pas d'intermédiaire, pas de perte d'information.
            </p>
          </div>
          <div class="service-item">
            <h3>Réseau SAFTI</h3>
            <p>
              Affilié au réseau SAFTI, je diffuse votre bien sur les grands portails
              immobiliers et bénéficie d'outils professionnels pour accélérer la vente.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section section--cta">
      <div class="container cta-inner">
        <h2>Prêt à estimer votre bien à La Roche-sur-Yon ?</h2>
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
  title: 'Immobilier à La Roche-sur-Yon – Estimation et vente',
  description:
    'Marché immobilier à La Roche-sur-Yon (85000) : prix au m², tendances 2025 et accompagnement vente. Alexandre Coutant, conseiller SAFTI, vous accompagne pour estimer et vendre votre bien en Vendée.',
  canonical: `${SITE.url}/immobilier-la-roche-sur-yon`,
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      name: 'Alexandre Coutant – Conseiller SAFTI',
      url: `${SITE.url}/immobilier-la-roche-sur-yon`,
      telephone: SITE.phone,
      email: SITE.email,
      areaServed: {
        '@type': 'City',
        name: 'La Roche-sur-Yon',
        containedInPlace: {
          '@type': 'AdministrativeArea',
          name: 'Vendée',
        },
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
.local-page {
  padding-top: 64px;
}

.section {
  padding: 4.5rem 0;
  border-bottom: 1px solid var(--color-border);
}

.section:last-child {
  border-bottom: none;
}

.section--hero {
  padding-top: 5rem;
  background-color: var(--color-bg);
}

.section--white {
  background-color: var(--color-white);
}

.page-eyebrow {
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 0.75rem;
}

h1 {
  margin-bottom: 1.25rem;
}

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

/* Content grid */
.content-grid {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

@media (min-width: 768px) {
  .content-grid {
    flex-direction: row;
    align-items: flex-start;
    gap: 3rem;
  }
}

.content-text {
  flex: 1;
}

.content-text p {
  color: var(--color-muted);
  font-size: 0.95rem;
  line-height: 1.7;
}

.content-highlights {
  flex-shrink: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .content-highlights {
    width: 260px;
  }
}

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

.highlight-label {
  font-size: 0.75rem;
  color: var(--color-muted);
  margin-bottom: 0;
}

/* Market grid */
.market-grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .market-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.market-card {
  padding: 1.5rem;
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}

.market-card h3 {
  font-size: 1rem;
  margin-bottom: 0.6rem;
  color: var(--color-primary);
}

.market-card p {
  font-size: 0.88rem;
  color: var(--color-muted);
  line-height: 1.65;
  margin-bottom: 0;
}

.market-card strong {
  color: var(--color-primary);
}

/* Services grid */
.services-grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.service-item {
  padding: 1.5rem;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}

.service-item h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--color-primary);
}

.service-item p {
  font-size: 0.88rem;
  color: var(--color-muted);
  line-height: 1.65;
  margin-bottom: 0;
}

/* CTA */
.section--cta {
  background-color: var(--color-primary);
  border-bottom: none;
}

.cta-inner {
  text-align: center;
}

.cta-inner h2 {
  color: var(--color-white);
  margin-bottom: 0.75rem;
}

.cta-inner p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
  font-size: 1rem;
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.cta-actions .btn-outline {
  color: var(--color-white);
  border-color: rgba(255, 255, 255, 0.35);
}

.cta-actions .btn-outline:hover {
  border-color: var(--color-white);
  background-color: transparent;
}
</style>
