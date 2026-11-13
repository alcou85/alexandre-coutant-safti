<template>
  <main class="blog-page">
    <div class="container">

      <header class="page-header">
        <h1>Actualités immobilières – La Roche-sur-Yon et Vendée</h1>
        <p class="page-intro">
          Tendances du marché, conseils pour vendeurs et acquéreurs, actualités
          du secteur immobilier en Vendée.
        </p>
      </header>

      <div class="articles-grid">
        <RouterLink
          v-for="article in sortedArticles"
          :key="article.id"
          :to="`/actualites/${article.slug}`"
          class="article-card"
        >
          <div
            class="article-img"
            :style="article.image ? `background-image:url('${article.image}')` : ''"
          >
            <span class="article-category">{{ article.category }}</span>
          </div>
          <div class="article-body">
            <time class="article-date" :datetime="article.date">
              {{ formatDate(article.date) }}
            </time>
            <h2 class="article-title">{{ article.title }}</h2>
            <p class="article-excerpt">{{ article.excerpt }}</p>
            <span class="article-read-more">Lire l'article →</span>
          </div>
        </RouterLink>
      </div>

    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { articles } from '../data/articles.js'
import { useSeo } from '../composables/useSeo.js'
import { SITE } from '../config/seo.js'

useSeo({
  title: 'Actualités immobilières – La Roche-sur-Yon et Vendée',
  description:
    'Conseils immobiliers, tendances du marché à La Roche-sur-Yon et en Vendée. Articles rédigés par Alexandre Coutant, conseiller immobilier indépendant SAFTI.',
  canonical: `${SITE.url}/actualites`,
})

const sortedArticles = computed(() =>
  [...articles].sort((a, b) => new Date(b.date) - new Date(a.date))
)

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}
</script>

<style scoped>
.blog-page {
  padding-top: calc(64px + 3.5rem);
  padding-bottom: 5rem;
  min-height: 100vh;
}

.page-header {
  max-width: 640px;
  margin-bottom: 3rem;
}

.page-intro {
  color: var(--color-muted);
  font-size: 1rem;
  margin-bottom: 0;
}

.articles-grid {
  display: grid;
  gap: 1.5rem;
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
  flex: 1;
  margin-bottom: 0;
}

.article-read-more {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-accent);
  margin-top: 0.25rem;
}
</style>
