import { useHead } from '@unhead/vue'
import { SITE } from '../config/seo.js'

/**
 * Composable utilitaire pour configurer les balises <head> SEO d'une page.
 *
 * @param {Object} options
 * @param {string} options.title        - Titre de la page (sans suffixe site)
 * @param {string} [options.description] - Meta description (160 car. max)
 * @param {string} [options.canonical]   - URL canonique complète
 * @param {string} [options.ogImage]     - URL absolue de l'image OG
 * @param {string} [options.ogType]      - Type OG (website | article)
 * @param {Array}  [options.jsonLd]      - Tableau de scripts JSON-LD
 */
export function useSeo({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  jsonLd = [],
} = {}) {
  const fullTitle = title
    ? `${title} | Alexandre Coutant SAFTI`
    : SITE.name

  const metaDescription = description || SITE.defaultDescription
  const ogImageUrl = ogImage || SITE.defaultOgImage

  useHead({
    title: fullTitle,
    meta: [
      { name: 'description', content: metaDescription },

      // Open Graph
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: metaDescription },
      { property: 'og:type', content: ogType },
      { property: 'og:url', content: canonical || SITE.url },
      { property: 'og:image', content: ogImageUrl },

      // Twitter
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: metaDescription },
      { name: 'twitter:image', content: ogImageUrl },
    ],
    link: canonical
      ? [{ rel: 'canonical', href: canonical }]
      : [],
    script: jsonLd.map((schema) => ({
      type: 'application/ld+json',
      children: JSON.stringify(schema),
    })),
  })
}
