<template>
  <main v-if="article" class="article-page">
    <div class="container">

      <!-- Breadcrumb -->
      <nav class="breadcrumb" aria-label="Fil d'Ariane">
        <RouterLink to="/" class="breadcrumb-link">Accueil</RouterLink>
        <span class="breadcrumb-sep" aria-hidden="true">›</span>
        <RouterLink to="/actualites" class="breadcrumb-link">Actualités</RouterLink>
        <span class="breadcrumb-sep" aria-hidden="true">›</span>
        <span class="breadcrumb-current">{{ article.title }}</span>
      </nav>

      <!-- Article header -->
      <header class="article-header">
        <span class="article-category-badge">{{ article.category }}</span>
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-meta">
          <span class="article-author">Par {{ article.author }}</span>
          <span class="article-meta-sep" aria-hidden="true">·</span>
          <time :datetime="article.date">{{ formatDate(article.date) }}</time>
        </div>
      </header>

      <!-- Article image -->
      <div
        v-if="article.image"
        class="article-cover"
        :style="`background-image:url('${article.image}')`"
        role="img"
        :aria-label="article.title"
      ></div>

      <!-- Article content -->
      <div class="article-content" v-html="renderedContent"></div>

      <!-- CTA simulateur -->
      <aside class="article-cta">
        <div class="article-cta-inner">
          <h2>Estimez votre bien gratuitement</h2>
          <p>
            Notre simulateur basé sur les données DVF vous donne une fourchette
            de prix en 2 minutes. Gratuit, sans engagement.
          </p>
          <RouterLink to="/estimation" class="btn-primary">
            Lancer mon estimation
          </RouterLink>
        </div>
      </aside>

      <!-- Retour -->
      <div class="article-back">
        <RouterLink to="/actualites" class="back-link">
          ← Retour aux actualités
        </RouterLink>
      </div>

    </div>
  </main>
</template>

<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticleBySlug } from '../data/articles.js'
import { useSeo } from '../composables/useSeo.js'
import { SITE } from '../config/seo.js'

const route = useRoute()
const router = useRouter()

const article = computed(() => {
  const found = getArticleBySlug(route.params.slug)
  if (!found) {
    router.replace('/actualites')
    return null
  }
  return found
})

// SEO réactif — watchEffect pour les side effects, pas computed
watchEffect(() => {
  if (!article.value) return

  useSeo({
    title: article.value.title,
    description: article.value.excerpt,
    canonical: `${SITE.url}/actualites/${article.value.slug}`,
    ogType: 'article',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.value.title,
        description: article.value.excerpt,
        url: `${SITE.url}/actualites/${article.value.slug}`,
        datePublished: article.value.date,
        dateModified: article.value.date,
        author: {
          '@type': 'Person',
          name: article.value.author,
          url: `${SITE.url}/qui-suis-je`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Alexandre Coutant – Conseiller Immobilier SAFTI',
          url: SITE.url,
        },
        image: article.value.image || SITE.defaultOgImage,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: 'Actualités', item: `${SITE.url}/actualites` },
          { '@type': 'ListItem', position: 3, name: article.value.title, item: `${SITE.url}/actualites/${article.value.slug}` },
        ],
      },
    ],
  })
})

// Conversion markdown → HTML : titres, paragraphes, listes, gras
const renderedContent = computed(() => {
  if (!article.value) return ''
  const bold = (s) => s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  const lines = article.value.content.split('\n')
  const result = []
  let inList = false

  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (inList) { result.push('</ul>'); inList = false }
      result.push(`<h2>${bold(line.slice(3))}</h2>`)
    } else if (line.startsWith('# ')) {
      if (inList) { result.push('</ul>'); inList = false }
      result.push(`<h3>${bold(line.slice(2))}</h3>`)
    } else if (line.startsWith('- ')) {
      if (!inList) { result.push('<ul>'); inList = true }
      result.push(`<li>${bold(line.slice(2))}</li>`)
    } else if (line.trim() === '') {
      if (inList) { result.push('</ul>'); inList = false }
    } else {
      if (inList) { result.push('</ul>'); inList = false }
      result.push(`<p>${bold(line)}</p>`)
    }
  }
  if (inList) result.push('</ul>')
  return result.join('\n')
})

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}
</script>

<style scoped>
.article-page {
  padding-top: calc(64px + 3rem);
  padding-bottom: 5rem;
  min-height: 100vh;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: var(--color-muted);
  margin-bottom: 2rem;
}

.breadcrumb-link {
  color: var(--color-muted);
  text-decoration: none;
  transition: color var(--transition);
}

.breadcrumb-link:hover {
  color: var(--color-accent);
}

.breadcrumb-sep {
  color: var(--color-border);
}

.breadcrumb-current {
  color: var(--color-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 260px;
}

/* Article header */
.article-header {
  max-width: 760px;
  margin-bottom: 2.5rem;
}

.article-category-badge {
  display: inline-block;
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-white);
  background-color: var(--color-accent);
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  margin-bottom: 0.75rem;
}

.article-title {
  margin-bottom: 0.75rem;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  color: var(--color-muted);
}

.article-meta-sep {
  opacity: 0.4;
}

/* Cover */
.article-cover {
  width: 100%;
  max-width: 760px;
  height: 320px;
  border-radius: var(--radius);
  background-color: var(--color-primary);
  background-size: cover;
  background-position: center;
  margin-bottom: 2.5rem;
}

/* Content */
.article-content {
  max-width: 700px;
  margin-bottom: 3rem;
  font-size: 1rem;
  line-height: 1.8;
  color: var(--color-muted);
}

/* scoped styles can't target rendered v-html — use :deep() */
.article-content :deep(h2) {
  font-size: 1.35rem;
  color: var(--color-primary);
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

.article-content :deep(h3) {
  font-size: 1.15rem;
  color: var(--color-primary);
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.article-content :deep(p) {
  margin-bottom: 1rem;
}

.article-content :deep(strong) {
  color: var(--color-primary);
  font-weight: 500;
}

.article-content :deep(ul) {
  padding-left: 1.25rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.article-content :deep(li) {
  list-style: disc;
  line-height: 1.65;
}

/* CTA */
.article-cta {
  max-width: 700px;
  margin-bottom: 2.5rem;
}

.article-cta-inner {
  padding: 2rem;
  background-color: var(--color-primary);
  border-radius: var(--radius);
  color: var(--color-white);
}

.article-cta-inner h2 {
  color: var(--color-white);
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.article-cta-inner p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.25rem;
  font-size: 0.92rem;
}

/* Back link */
.back-link {
  font-size: 0.875rem;
  color: var(--color-muted);
  text-decoration: none;
  transition: color var(--transition);
}

.back-link:hover {
  color: var(--color-accent);
}
</style>
