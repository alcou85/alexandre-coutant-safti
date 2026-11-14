<template>
  <main class="about-page">

    <!-- Portrait -->
    <section class="section section--first">
      <div class="container portrait-inner">
        <!-- Photo -->
        <div class="photo-wrap">
          <div class="photo-frame">
            <img v-if="!photoError" :src="photoSrc"
              alt="Alexandre Coutant, conseiller immobilier SAFTI à La Roche-sur-Yon" class="photo-img"
              @error="photoError = true" />
            <div v-else class="photo-placeholder" aria-hidden="true">
              <span class="photo-initials">AC</span>
            </div>
          </div>
          <div class="photo-caption">
            <p class="photo-name">Alexandre Coutant</p>
            <p class="photo-role">Conseiller immobilier indépendant</p>
            <p class="photo-network">Réseau SAFTI</p>
          </div>
        </div>

        <!-- Bio -->
        <div class="bio-content">
          <h1>Alexandre Coutant, conseiller immobilier à La Roche-sur-Yon</h1>
          <p class="bio-tagline">Conseiller immobilier indépendant – Réseau SAFTI – Vendée</p>

          <div class="bio-text">
            <p>
              Basé à La Roche-sur-Yon, j'accompagne les particuliers dans leurs projets
              immobiliers en Vendée : vente, achat, estimation. Mon objectif est de rendre
              chaque transaction simple, transparente et adaptée à votre situation.
            </p>
            <p>
              En tant que conseiller indépendant affilié au réseau SAFTI, je bénéficie
              des outils et de la notoriété d'un grand réseau national, tout en conservant
              la proximité et la réactivité d'un professionnel qui connaît son territoire.
              Que vous vendiez une maison, un appartement en centre-ville ou un terrain
              en périphérie de La Roche-sur-Yon, je vous accompagne à chaque étape.
            </p>
            <p>
              La relation de confiance est au cœur de mon approche : je vous apporte
              une estimation honnête basée sur les données réelles du marché, des conseils
              clairs et un suivi personnalisé jusqu'à la signature chez le notaire.
            </p>
          </div>

          <div class="bio-actions">
            <RouterLink to="/estimation" class="btn-primary">Estimer mon bien</RouterLink>
            <RouterLink to="/contact" class="btn-outline">Me contacter</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- SAFTI -->
    <section class="section">
      <div class="container safti-inner">
        <div class="safti-logo-placeholder" aria-label="Logo SAFTI">
          <span class="safti-logo-text">SAFTI</span>
        </div>

        <div class="safti-content">
          <h2>Le réseau SAFTI</h2>
          <p>
            SAFTI est l'un des premiers réseaux nationaux de conseillers immobiliers
            indépendants en France. En tant que conseiller indépendant affilié SAFTI,
            je bénéficie des outils, de la formation et de la notoriété du réseau,
            tout en conservant la proximité et la réactivité d'un professionnel local.
          </p>
          <p>
            <strong>N° RSAC :</strong> 105 775 613 RSAC La Roche-sur-Yon
          </p>
          <p>
            <strong>Carte professionnelle :</strong>
            CPI 3101 2018 000 025 936 — délivrée par la CCI de Toulouse (réseau SAFTI)
          </p>
        </div>
      </div>
    </section>

    <!-- CTA final -->
    <section class="section section--cta">
      <div class="container cta-inner">
        <h2>Prêt à estimer votre bien ?</h2>
        <p>
          Utilisez notre simulateur gratuit ou contactez-moi directement pour
          un échange personnalisé.
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
import { ref } from 'vue'
import { useSeo } from '../composables/useSeo.js'
import { SITE } from '../config/seo.js'

const photoError = ref(false)
const photoSrc = '/images/alexandre-coutant.jpeg'

useSeo({
  title: 'Conseiller immobilier SAFTI – La Roche-sur-Yon, Vendée',
  description:
    "Découvrez le profil d'Alexandre Coutant, conseiller immobilier indépendant SAFTI basé à La Roche-sur-Yon (Vendée). Vente, achat, estimation : un accompagnement personnalisé à La Roche-sur-Yon et en Vendée.",
  canonical: `${SITE.url}/qui-suis-je`,
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Alexandre Coutant',
      jobTitle: 'Conseiller immobilier indépendant',
      worksFor: {
        '@type': 'Organization',
        name: 'SAFTI',
        url: 'https://www.safti.fr',
      },
      url: `${SITE.url}/qui-suis-je`,
      email: SITE.email,
      telephone: SITE.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE.city,
        postalCode: SITE.postalCode,
        addressRegion: SITE.department,
        addressCountry: SITE.country,
      },
      sameAs: [SITE.saftiProfileUrl],
    },
  ],
})
</script>

<style scoped>
.about-page {
  padding-top: 64px;
}

.section {
  padding: 4.5rem 0;
  border-bottom: 1px solid var(--color-border);
}

.section:last-child {
  border-bottom: none;
}

.section--first {
  padding-top: 5rem;
}

.section--alt {
  background-color: var(--color-white);
}

/* Portrait */
.portrait-inner {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

@media (min-width: 768px) {
  .portrait-inner {
    flex-direction: row;
    align-items: flex-start;
    gap: 3.5rem;
  }
}

.photo-wrap {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.photo-frame {
  width: 180px;
  height: 220px;
  border-radius: var(--radius);
  overflow: hidden;
  flex-shrink: 0;
}

@media (min-width: 768px) {
  .photo-frame {
    width: 220px;
    height: 280px;
  }
}

.photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.photo-placeholder {
  width: 100%;
  height: 100%;
  background-color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-initials {
  font-family: var(--font-heading);
  font-size: 3rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.1em;
}

.photo-caption {
  text-align: center;
}

.photo-name {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.15rem;
}

.photo-role {
  font-size: 0.85rem;
  color: var(--color-muted);
  margin-bottom: 0.1rem;
}

.photo-network {
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0;
}

/* Bio */
.bio-content {
  flex: 1;
}

.bio-content h1 {
  margin-bottom: 0.25rem;
}

.bio-tagline {
  font-size: 0.95rem;
  color: var(--color-accent);
  font-weight: 500;
  margin-bottom: 1.5rem;
}

.bio-text {
  margin-bottom: 2rem;
}

.bio-text p {
  color: var(--color-muted);
  font-size: 0.95rem;
}

.bio-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

/* Territory */
.territory-inner {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 768px) {
  .territory-inner {
    flex-direction: row;
    align-items: flex-start;
    gap: 3rem;
  }
}

.territory-text {
  flex: 1;
}

.territory-text h2 {
  margin-bottom: 0.75rem;
}

.territory-text p {
  color: var(--color-muted);
  font-size: 0.95rem;
}

.territory-text strong {
  color: var(--color-primary);
  font-weight: 500;
}

.territory-highlights {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.territory-card {
  padding: 1.1rem 1.25rem;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}

.territory-card h3 {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.territory-card p {
  font-size: 0.85rem;
  color: var(--color-muted);
  margin-bottom: 0;
}

/* SAFTI */
.safti-inner {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 640px) {
  .safti-inner {
    flex-direction: row;
    align-items: flex-start;
    gap: 3rem;
  }
}

.safti-logo-placeholder {
  flex-shrink: 0;
  width: 120px;
  height: 80px;
  border: 2px solid var(--color-border);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-white);
}

.safti-logo-text {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-accent);
  letter-spacing: 0.08em;
}

.safti-content h2 {
  margin-bottom: 0.75rem;
}

.safti-content p {
  color: var(--color-muted);
  font-size: 0.95rem;
}

.safti-content strong {
  color: var(--color-primary);
}

.placeholder-value {
  color: var(--color-accent);
  font-style: italic;
}

/* CTA section */
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
