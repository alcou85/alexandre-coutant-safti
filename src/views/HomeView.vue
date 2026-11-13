<template>
  <main class="home">

    <!-- Hero -->
    <section class="hero">
      <div class="container hero-inner">

        <div class="hero-content">
          <p class="hero-eyebrow">Conseiller immobilier · La Roche-sur-Yon</p>
          <h1 class="hero-heading">Estimez votre bien immobilier à La Roche-sur-Yon</h1>
          <p class="hero-sub">
            Une fourchette de prix basée sur les ventes réelles de votre secteur.
            Gratuit, en 2 minutes, sans engagement.
          </p>
          <p class="hero-geo">
            Conseiller immobilier indépendant SAFTI basé à La Roche-sur-Yon, j'accompagne
            les vendeurs et acquéreurs à La Roche-sur-Yon et en Vendée.
          </p>
          <div class="hero-actions">
            <RouterLink to="/estimation" class="btn-primary hero-cta">
              Estimer mon bien
            </RouterLink>
            <RouterLink to="/qui-suis-je" class="btn-outline">
              Qui suis-je&nbsp;?
            </RouterLink>
          </div>
        </div>

        <!--
          Photo hero : ajoutez votre propre image dans /public/images/hero-la-roche.jpg
          Le bloc s'affiche en desktop uniquement (hidden sur mobile)
        -->
        <div class="hero-photo" aria-hidden="true">
          <div class="hero-photo-label">
            <span>La Roche-sur-Yon</span>
            <span class="hero-photo-dept">Vendée · 85</span>
          </div>
        </div>

      </div>
    </section>

    <!-- Comment ça marche -->
    <section class="section how-section">
      <div class="container">
        <h2 class="section-title">Comment ça marche</h2>
        <p class="section-intro">Une estimation sérieuse en trois étapes simples.</p>

        <ol class="steps-list" role="list">
          <li class="step-card">
            <div class="step-number" aria-hidden="true">1</div>
            <div class="step-content">
              <h3 class="step-name">Renseignez votre bien</h3>
              <p class="step-desc">
                Indiquez l'adresse, le type et les caractéristiques de votre bien
                (surface, état général, terrain…).
              </p>
            </div>
          </li>
          <li class="step-card">
            <div class="step-number" aria-hidden="true">2</div>
            <div class="step-content">
              <h3 class="step-name">Recevez une fourchette d'estimation</h3>
              <p class="step-desc">
                Notre outil analyse les ventes réelles enregistrées dans votre secteur
                (base DVF) pour vous donner une fourchette de prix fiable.
              </p>
            </div>
          </li>
          <li class="step-card">
            <div class="step-number" aria-hidden="true">3</div>
            <div class="step-content">
              <h3 class="step-name">Échangez avec moi</h3>
              <p class="step-desc">
                Je vous recontacte pour affiner l'estimation lors d'une visite gratuite
                et sans engagement, et vous accompagner dans votre projet.
              </p>
            </div>
          </li>
        </ol>

        <div class="how-cta">
          <RouterLink to="/estimation" class="btn-primary">
            Lancer mon estimation
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Témoignages -->
    <section class="section testimonials-section">
      <div class="container">
        <header class="testimonials-header">
          <h2 class="section-title">Ce que disent mes clients</h2>
          <p class="section-intro">
            4,8 / 5 · 6 avis Google
          </p>
        </header>
        <div class="testimonials-grid">
          <blockquote class="testimonial-card" v-for="t in testimonials" :key="t.name">
            <div class="testimonial-stars" aria-label="5 étoiles sur 5">★★★★★</div>
            <p class="testimonial-text">{{ t.text }}</p>
            <footer class="testimonial-footer">
              <span class="testimonial-name">{{ t.name }}</span>
              <span class="testimonial-location">{{ t.location }}</span>
            </footer>
          </blockquote>
        </div>
        <p class="testimonials-source">
          <a href="https://www.safti.fr/votre-conseiller-safti/alexandre-coutant" target="_blank"
            rel="noopener noreferrer" class="testimonials-link">Voir tous les avis</a>
        </p>
      </div>
    </section>

    <!-- Actualités immobilières -->
    <section class="section articles-section">
      <div class="container">
        <header class="articles-header">
          <div class="articles-header-top">
            <div>
              <h2 class="section-title">Actualités immobilières</h2>
              <p class="section-intro">
                Le marché à La Roche-sur-Yon, conseils et tendances du secteur.
              </p>
            </div>
            <RouterLink to="/actualites" class="btn-outline articles-all-link">
              Voir tous les articles
            </RouterLink>
          </div>
        </header>

        <div class="articles-grid">
          <RouterLink v-for="article in latestArticles" :key="article.id" :to="`/actualites/${article.slug}`"
            class="article-card">
            <div class="article-img" :style="article.image ? `background-image:url('${article.image}')` : ''">
              <span class="article-category">{{ article.category }}</span>
            </div>
            <div class="article-body">
              <time class="article-date" :datetime="article.date">{{ formatDate(article.date) }}</time>
              <h3 class="article-title">{{ article.title }}</h3>
              <p class="article-excerpt">{{ article.excerpt }}</p>
            </div>
          </RouterLink>
        </div>

        <div class="articles-footer">
          <RouterLink to="/actualites" class="btn-outline">
            Voir tous les articles
          </RouterLink>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup>
import { getLatestArticles } from '../data/articles.js'
import { useSeo } from '../composables/useSeo.js'
import { SITE } from '../config/seo.js'

useSeo({
  title: 'Estimation immobilière gratuite à La Roche-sur-Yon – Vendée',
  description:
    "Estimez gratuitement votre bien immobilier en Vendée. Alexandre Coutant, conseiller SAFTI à La Roche-sur-Yon, vous fournit une fourchette de prix basée sur les ventes réelles de votre secteur.",
  canonical: SITE.url,
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
      description: SITE.defaultDescription,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE.url}/estimation`,
        'query-input': 'required name=search_term_string',
      },
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

const latestArticles = getLatestArticles(3)

// Remplacer par vos vrais avis Google / SAFTI
const testimonials = [
  {
    name: 'Sophie M.',
    location: 'La Roche-sur-Yon',
    text: "Alexandre a su estimer notre maison au juste prix. La vente s'est conclue en moins de 6 semaines, sans stress. Un vrai professionnel, disponible et à l'écoute.",
  },
  {
    name: 'Patrick L.',
    location: 'La Roche-sur-Yon',
    text: "Très sérieux et réactif. Il connaît parfaitement le marché local et nous a guidés à chaque étape. Je recommande sans hésitation.",
  },
  {
    name: 'Nathalie D.',
    location: 'La Roche-sur-Yon',
    text: "Estimation conforme aux ventes du quartier, conseils clairs sur la mise en valeur du bien. Alexandre a tenu ses engagements du début à la fin.",
  },
]

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}
</script>

<style scoped>
.section {
  padding: 5rem 0;
}

.section-title {
  margin-bottom: 0.5rem;
}

.section-intro {
  color: var(--color-muted);
  margin-bottom: 2.5rem;
}

/* ── Hero ──────────────────────────────────────────── */
.hero {
  padding-top: calc(64px + 4rem);
  padding-bottom: 5rem;
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
}

.hero-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
}

.hero-content {
  flex: 1;
  max-width: 560px;
}

.hero-eyebrow {
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 1rem;
}

.hero-heading {
  margin-bottom: 1.25rem;
  color: var(--color-primary);
}

.hero-sub {
  font-size: 1.05rem;
  color: var(--color-muted);
  margin-bottom: 1rem;
  line-height: 1.7;
}

.hero-geo {
  font-size: 0.88rem;
  color: var(--color-muted);
  line-height: 1.65;
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.hero-cta {
  font-size: 1rem;
  padding: 0.8rem 2rem;
}

/* Photo hero desktop */
.hero-photo {
  display: none;
  flex-shrink: 0;
  width: 420px;
  height: 340px;
  border-radius: var(--radius);
  /* Fond de secours tant que l'image n'est pas ajoutée */
  background-color: var(--color-primary);
  background-image: url('/images/hero-la-roche.jpeg');
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

@media (min-width: 900px) {
  .hero-photo {
    display: block;
  }
}

.hero-photo-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem 1.25rem;
  background: linear-gradient(to top, rgba(28, 43, 58, 0.85) 0%, transparent 100%);
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.85rem;
  font-weight: 500;
}

.hero-photo-dept {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.06em;
}

/* ── Comment ça marche ─────────────────────────────── */
.how-section {
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-border);
}

.steps-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

@media (min-width: 640px) {
  .steps-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

.step-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(224, 107, 31, 0.08);
  border: 1px solid rgba(224, 107, 31, 0.25);
  color: var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 600;
  flex-shrink: 0;
}

.step-name {
  font-size: 1.05rem;
  margin-bottom: 0.4rem;
}

.step-desc {
  font-size: 0.88rem;
  color: var(--color-muted);
  margin-bottom: 0;
}

.how-cta {
  display: flex;
  justify-content: center;
}

/* ── Témoignages ───────────────────────────────────── */
.testimonials-section {
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-border);
}

.testimonials-header {
  margin-bottom: 2.5rem;
}

.testimonials-grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .testimonials-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.testimonial-card {
  margin: 0;
  padding: 1.5rem;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.testimonial-stars {
  color: var(--color-accent);
  font-size: 0.9rem;
  letter-spacing: 0.05em;
}

.testimonial-text {
  font-size: 0.9rem;
  color: var(--color-muted);
  line-height: 1.65;
  font-style: italic;
  margin-bottom: 0;
  flex: 1;
}

.testimonial-footer {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.testimonial-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-primary);
}

.testimonial-location {
  font-size: 0.75rem;
  color: var(--color-muted);
}

.testimonials-source {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.85rem;
}

.testimonials-link {
  color: var(--color-accent);
  text-decoration: underline;
}

/* ── Actualités ────────────────────────────────────── */
.articles-section {
  background-color: var(--color-bg);
}

.articles-header {
  margin-bottom: 0;
}

.articles-header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.articles-all-link {
  font-size: 0.875rem;
  flex-shrink: 0;
  align-self: center;
}

.articles-grid {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (min-width: 640px) {
  .articles-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 960px) {
  .articles-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.articles-footer {
  display: flex;
  justify-content: center;
}

.article-card {
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  transition: box-shadow var(--transition), transform var(--transition);
}

.article-card:hover {
  box-shadow: 0 4px 20px rgba(28, 43, 58, 0.1);
  transform: translateY(-2px);
}

.article-img {
  height: 160px;
  background-color: var(--color-primary);
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 0.75rem 1rem;
}

.article-category {
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-white);
  background-color: var(--color-accent);
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
}

.article-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.article-date {
  font-size: 0.72rem;
  color: var(--color-muted);
  letter-spacing: 0.04em;
}

.article-title {
  font-size: 1.05rem;
  line-height: 1.35;
  color: var(--color-primary);
  margin-bottom: 0;
}

.article-excerpt {
  font-size: 0.85rem;
  color: var(--color-muted);
  line-height: 1.6;
  margin-bottom: 0;
}
</style>
