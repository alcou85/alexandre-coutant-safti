<template>
  <main class="home">

    <!-- ══════════════════════════════════════════
         HERO — adresse en hero, redirige vers /estimation
         ══════════════════════════════════════════ -->
    <section class="hero">
      <div class="container hero-inner">

        <!-- Contenu éditorial -->
        <div class="hero-content">
          <p class="hero-identity">Alexandre Coutant · Conseiller SAFTI · Vendée</p>
          <h1 class="hero-heading">Estimez votre bien immobilier en Vendée</h1>
          <p class="hero-sub">
            Une fourchette de prix basée sur les ventes réelles enregistrées dans votre
            secteur. Gratuit, sans inscription, résultat en 2&nbsp;minutes.
          </p>
          <a v-if="gbpUrl" :href="gbpUrl" class="hero-rating" target="_blank" rel="noopener noreferrer">
            ★ 4,8 / 5 · Google
          </a>
        </div>

        <!-- Carte simulateur -->
        <div class="hero-card" role="search" aria-label="Démarrer une estimation">
          <p class="hero-card-label">Quelle est la valeur de votre bien&nbsp;?</p>
          <p class="hero-card-sub">Entrez l'adresse pour obtenir votre estimation.</p>

          <div class="hero-card-field">
            <AddressAutocomplete
              :modelValue="heroAddress"
              placeholder="Ex : 12 rue de la Paix, La Roche-sur-Yon"
              @update:modelValue="onHeroInput"
              @select="onHeroSelect"
            />
          </div>

          <button
            class="btn-primary hero-card-btn"
            :disabled="!heroSelected"
            @click="goToEstimation"
          >
            Voir mon estimation
          </button>
          <p class="hero-card-trust">Gratuit&nbsp;· 2 minutes&nbsp;· Sans inscription</p>
        </div>

      </div>
    </section>

    <!-- ══════════════════════════════════════════
         TRUST BAR
         ══════════════════════════════════════════ -->
    <div class="trust-bar" aria-label="Garanties du service">
      <div class="container trust-inner">
        <span class="trust-item">Données DVF officielles</span>
        <span class="trust-sep" aria-hidden="true">·</span>
        <span class="trust-item">Résultat en 2&nbsp;minutes</span>
        <span class="trust-sep" aria-hidden="true">·</span>
        <span class="trust-item">Gratuit et sans inscription</span>
        <span class="trust-sep" aria-hidden="true">·</span>
        <span class="trust-item">Vendée – département 85</span>
      </div>
    </div>

    <!-- ══════════════════════════════════════════
         COMMENT ÇA MARCHE — traitement éditorial
         ══════════════════════════════════════════ -->
    <section class="section how-section">
      <div class="container">
        <h2 class="section-heading">Comment ça marche&nbsp;?</h2>
        <p class="section-intro">Une estimation sérieuse en trois étapes simples.</p>

        <ol class="steps-editorial" role="list">
          <li class="step-editorial">
            <span class="step-ghost-num" aria-hidden="true">1</span>
            <div class="step-editorial-content">
              <h3>Renseignez votre bien</h3>
              <p>
                Indiquez l'adresse, le type et les caractéristiques de votre bien :
                surface, état général, terrain, garage…
              </p>
            </div>
          </li>
          <li class="step-editorial">
            <span class="step-ghost-num" aria-hidden="true">2</span>
            <div class="step-editorial-content">
              <h3>Recevez une fourchette de prix</h3>
              <p>
                L'outil analyse les ventes réelles enregistrées dans votre secteur
                (base DVF) pour vous donner une estimation fiable et argumentée.
              </p>
            </div>
          </li>
          <li class="step-editorial">
            <span class="step-ghost-num" aria-hidden="true">3</span>
            <div class="step-editorial-content">
              <h3>Échangez avec moi</h3>
              <p>
                Je vous recontacte pour affiner l'estimation lors d'une visite
                gratuite et sans engagement, et vous accompagne dans votre projet.
              </p>
            </div>
          </li>
        </ol>

        <div class="how-cta">
          <RouterLink to="/estimation" class="btn-primary">Lancer mon estimation</RouterLink>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════
         ALEXANDRE — présentation conseiller
         ══════════════════════════════════════════ -->
    <section class="section about-section">
      <div class="container about-inner">

        <div class="about-photo-col">
          <div class="about-photo-frame">
            <img
              src="/images/alexandre-coutant.jpeg"
              alt="Alexandre Coutant, conseiller immobilier SAFTI à La Roche-sur-Yon"
              class="about-photo"
            />
          </div>
          <p class="about-photo-name">Alexandre Coutant</p>
          <p class="about-photo-role">Conseiller immobilier indépendant · SAFTI</p>
        </div>

        <div class="about-content">
          <h2 class="section-heading">Votre conseiller immobilier en Vendée</h2>
          <p>
            Basé à La Roche-sur-Yon, j'accompagne les particuliers dans leurs projets
            immobiliers en Vendée : vente, achat, estimation. Mon objectif est de rendre
            chaque transaction simple, transparente et adaptée à votre situation.
          </p>
          <p>
            En tant que conseiller indépendant affilié au réseau SAFTI, je bénéficie
            des outils et de la notoriété d'un grand réseau national, tout en conservant
            la proximité et la réactivité d'un professionnel qui connaît son territoire.
          </p>
          <div class="about-actions">
            <RouterLink to="/contact" class="btn-outline">Me contacter</RouterLink>
            <RouterLink to="/qui-suis-je" class="about-link-more">Mon parcours →</RouterLink>
          </div>
        </div>

      </div>
    </section>

    <!-- ══════════════════════════════════════════
         ACTUALITÉS — grille éditoriale
         ══════════════════════════════════════════ -->
    <section class="section articles-section">
      <div class="container">
        <div class="articles-header">
          <h2 class="section-heading">Actualités immobilières</h2>
          <RouterLink to="/actualites" class="articles-all-link">Tous les articles →</RouterLink>
        </div>

        <div class="articles-grid">
          <RouterLink
            v-for="article in latestArticles"
            :key="article.id"
            :to="`/actualites/${article.slug}`"
            class="article-item"
          >
            <div class="article-img-wrap">
              <div
                class="article-img"
                :style="article.image ? `background-image:url('${article.image}')` : ''"
              >
                <span class="article-category">{{ article.category }}</span>
              </div>
            </div>
            <time class="article-date" :datetime="article.date">{{ formatDate(article.date) }}</time>
            <h3 class="article-title">{{ article.title }}</h3>
            <p class="article-excerpt">{{ article.excerpt }}</p>
          </RouterLink>
        </div>

      </div>
    </section>

  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AddressAutocomplete from '../components/AddressAutocomplete.vue'
import { getLatestArticles } from '../data/articles.js'
import { useSeo } from '../composables/useSeo.js'
import { SITE } from '../config/seo.js'

useSeo({
  title: 'Estimation immobilière Vendée – Simulateur gratuit en ligne',
  description:
    'Obtenez une estimation précise de votre bien en Vendée en 2 minutes. Simulateur basé sur les ventes réelles de votre secteur. Gratuit, sans inscription – Alexandre Coutant, conseiller SAFTI à La Roche-sur-Yon.',
  canonical: SITE.url,
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
      description: SITE.defaultDescription,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      name: 'Alexandre Coutant',
      description: SITE.defaultDescription,
      url: SITE.url,
      telephone: SITE.phone,
      email: SITE.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE.city,
        postalCode: SITE.postalCode,
        addressRegion: SITE.department,
        addressCountry: SITE.country,
      },
      areaServed: SITE.areaServed.map((area) => ({
        '@type': 'City',
        name: area,
      })),
      memberOf: {
        '@type': 'Organization',
        name: 'SAFTI',
        url: 'https://www.safti.fr',
      },
      sameAs: [SITE.saftiProfileUrl],
    },
  ],
})

const router = useRouter()
const gbpUrl = SITE.gbpUrl
const heroAddress = ref('')
const heroSelected = ref(null)
const latestArticles = getLatestArticles(3)

function onHeroInput(value) {
  heroAddress.value = value
  heroSelected.value = null
}

function onHeroSelect(payload) {
  heroAddress.value = payload.label
  heroSelected.value = payload
}

function goToEstimation() {
  if (!heroSelected.value) return
  router.push({
    path: '/estimation',
    query: {
      address: heroSelected.value.label,
      lat: heroSelected.value.lat,
      lon: heroSelected.value.lon,
      code_commune: heroSelected.value.citycode,
      code_postal: heroSelected.value.postcode,
      nom_commune: heroSelected.value.city || '',
    },
  })
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}
</script>

<style scoped>
/* ══ Hero ══════════════════════════════════════════════════════ */

.hero {
  padding-top: 64px;
  min-height: calc(100svh - 0px);
  background-color: var(--color-bg);
  display: flex;
  align-items: center;
}

.hero-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  padding-top: 4rem;
  padding-bottom: 4rem;
  width: 100%;
}

@media (max-width: 899px) {
  .hero-inner {
    flex-direction: column;
    align-items: stretch;
    gap: 2rem;
  }
}

.hero-content {
  flex: 1;
  max-width: 560px;
}

@media (max-width: 899px) {
  .hero-content {
    max-width: none;
    order: 1;
  }
}

.hero-identity {
  font-size: 0.78rem;
  color: var(--color-muted);
  margin-bottom: 1.25rem;
  font-weight: 400;
  letter-spacing: 0.03em;
}

.hero-heading {
  font-size: var(--font-size-display);
  margin-bottom: 1.5rem;
  line-height: 1.08;
  letter-spacing: -0.015em;
}

.hero-sub {
  font-size: 1.025rem;
  color: var(--color-muted);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  max-width: 46ch;
}

.hero-rating {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: var(--color-muted);
  text-decoration: none;
  transition: color var(--transition);
  font-weight: 400;
}

.hero-rating:hover {
  color: var(--color-primary);
}

/* Carte estimation */
.hero-card {
  flex-shrink: 0;
  width: 100%;
  max-width: 400px;
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  animation: hero-card-in 400ms ease both;
  animation-delay: 100ms;
}

@media (max-width: 899px) {
  .hero-card {
    max-width: none;
    order: -1;
  }
}

@keyframes hero-card-in {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero-card-label {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-primary);
  margin-bottom: 0;
  line-height: 1.25;
}

.hero-card-sub {
  font-size: 0.82rem;
  color: var(--color-muted);
  margin-bottom: 0.25rem;
}

.hero-card-field {
  position: relative;
}

.hero-card-btn {
  width: 100%;
  justify-content: center;
  padding: 0.9rem 1.5rem;
  font-size: 0.95rem;
  transition: background-color var(--transition), border-color var(--transition),
              transform var(--transition), box-shadow var(--transition), opacity var(--transition);
}

.hero-card-btn:disabled {
  transform: none;
  box-shadow: none;
}

.hero-card-trust {
  font-size: 0.72rem;
  color: var(--color-muted);
  text-align: center;
  margin-bottom: 0;
  letter-spacing: 0.03em;
}

/* ══ Trust bar ═════════════════════════════════════════════════ */

.trust-bar {
  background-color: var(--color-primary);
  padding: 1rem 0;
}

.trust-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.4rem 1.25rem;
}

.trust-item {
  font-size: 0.775rem;
  color: rgba(255, 255, 255, 0.72);
  font-weight: 400;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.trust-sep {
  color: rgba(255, 255, 255, 0.28);
  font-size: 0.75rem;
}

@media (max-width: 540px) {
  .trust-sep { display: none; }
  .trust-inner { flex-direction: column; gap: 0.3rem; text-align: center; }
}

/* ══ Sections communes ═════════════════════════════════════════ */

.section {
  padding: 5.5rem 0;
}

.section-heading {
  margin-bottom: 0.5rem;
}

.section-intro {
  color: var(--color-muted);
  margin-bottom: 3rem;
  font-size: 1rem;
}

/* ══ Comment ça marche ════════════════════════════════════════ */

.how-section {
  background-color: var(--color-white);
}

.steps-editorial {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 2rem;
  margin-bottom: 3.5rem;
}

@media (min-width: 640px) {
  .steps-editorial {
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
  }
}

.step-editorial {
  border-top: 2px solid var(--color-accent);
  padding-top: 1.5rem;
  position: relative;
  overflow: hidden;
}

.step-ghost-num {
  position: absolute;
  right: -0.05em;
  top: -0.15em;
  font-family: var(--font-heading);
  font-style: italic;
  font-size: 7.5rem;
  line-height: 1;
  color: var(--color-primary);
  opacity: 0.055;
  pointer-events: none;
  user-select: none;
  letter-spacing: -0.02em;
}

.step-editorial-content {
  position: relative;
  z-index: 1;
}

.step-editorial-content h3 {
  font-size: 1.15rem;
  margin-bottom: 0.65rem;
}

.step-editorial-content p {
  font-size: 0.875rem;
  color: var(--color-muted);
  line-height: 1.65;
  margin-bottom: 0;
}

.how-cta {
  display: flex;
  justify-content: center;
}

/* ══ Alexandre ════════════════════════════════════════════════ */

.about-section {
  background-color: var(--color-bg-deep);
}

.about-inner {
  display: flex;
  gap: 4.5rem;
  align-items: flex-start;
}

@media (max-width: 799px) {
  .about-inner {
    flex-direction: column;
    gap: 2rem;
  }
}

.about-photo-col {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.65rem;
  text-align: center;
}

@media (max-width: 799px) {
  .about-photo-col {
    flex-direction: row;
    align-items: center;
    text-align: left;
    gap: 1.25rem;
  }
}

.about-photo-frame {
  width: 190px;
  height: 230px;
  overflow: hidden;
  border-radius: 4px;
  flex-shrink: 0;
}

@media (max-width: 799px) {
  .about-photo-frame {
    width: 72px;
    height: 88px;
  }
}

.about-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.about-photo-name {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 0;
}

.about-photo-role {
  font-size: 0.72rem;
  color: var(--color-muted);
  line-height: 1.45;
  margin-bottom: 0;
}

.about-content {
  flex: 1;
  min-width: 0;
}

.about-content p {
  font-size: 0.95rem;
  color: var(--color-muted);
  line-height: 1.75;
}

.about-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.75rem;
}

.about-link-more {
  font-size: 0.875rem;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition);
}

.about-link-more:hover {
  color: var(--color-accent);
}

/* ══ Actualités ════════════════════════════════════════════════ */

.articles-section {
  background-color: var(--color-bg);
}

.articles-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.articles-all-link {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--color-primary);
  text-decoration: none;
  flex-shrink: 0;
  transition: color var(--transition);
}

.articles-all-link:hover {
  color: var(--color-accent);
}

.articles-grid {
  display: grid;
  gap: 2.25rem;
}

@media (min-width: 580px) {
  .articles-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .articles-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.article-item {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  text-decoration: none;
  color: inherit;
}

.article-img-wrap {
  overflow: hidden;
  border-radius: 4px;
  aspect-ratio: 4 / 3;
}

.article-img {
  width: 100%;
  height: 100%;
  background-color: var(--color-primary);
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  padding: 0.75rem 0.9rem;
  transition: transform 350ms ease;
}

.article-item:hover .article-img {
  transform: scale(1.03);
}

.article-category {
  font-size: 0.63rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-white);
  background-color: rgba(28, 43, 58, 0.52);
  padding: 0.2rem 0.5rem;
  border-radius: 2px;
  backdrop-filter: blur(4px);
}

.article-date {
  font-size: 0.7rem;
  color: var(--color-muted);
  letter-spacing: 0.03em;
}

.article-title {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  line-height: 1.3;
  color: var(--color-primary);
  transition: color var(--transition);
  margin-bottom: 0;
}

.article-item:hover .article-title {
  color: var(--color-accent);
}

.article-excerpt {
  font-size: 0.82rem;
  color: var(--color-muted);
  line-height: 1.6;
  margin-bottom: 0;
}
</style>
