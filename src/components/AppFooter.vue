<template>
  <footer
    class="footer"
    itemscope
    itemtype="https://schema.org/RealEstateAgent"
  >
    <div class="container footer-body">
      <!-- Left: Identity -->
      <div class="footer-col">
        <p class="footer-name" itemprop="name">Alexandre Coutant</p>
        <p class="footer-role" itemprop="jobTitle">Conseiller immobilier indépendant</p>
        <p class="footer-network">Réseau SAFTI</p>
        <ul class="footer-contact-list">
          <li>
            <a href="tel:+33665087707" class="footer-link" itemprop="telephone">
              06 65 08 77 07
            </a>
          </li>
          <li>
            <a
              href="mailto:alexandre.coutant@safti.fr"
              class="footer-link"
              itemprop="email"
            >
              alexandre.coutant@safti.fr
            </a>
          </li>
          <li v-if="gbpUrl">
            <a
              :href="gbpUrl"
              class="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Avis Google ★ 4,8 / 5
            </a>
          </li>
        </ul>
        <p class="footer-area">
          La Roche-sur-Yon · Vendée (85)
        </p>
      </div>

      <!-- Right: Nav links -->
      <nav class="footer-col footer-nav" aria-label="Navigation secondaire">
        <RouterLink to="/actualites" class="footer-link">Actualités immobilières</RouterLink>
        <RouterLink to="/immobilier-la-roche-sur-yon" class="footer-link">
          Immobilier La Roche-sur-Yon
        </RouterLink>
        <RouterLink to="/qui-suis-je" class="footer-link">Qui suis-je ?</RouterLink>
        <RouterLink to="/contact" class="footer-link">Contact</RouterLink>
        <RouterLink to="/mentions-legales" class="footer-link">Mentions légales</RouterLink>
        <RouterLink to="/politique-confidentialite" class="footer-link">
          Politique de confidentialité
        </RouterLink>
        <RouterLink to="/estimation" class="footer-link footer-link--accent">
          Estimer mon bien gratuitement
        </RouterLink>
      </nav>
    </div>

    <!-- Bottom bar -->
    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p>
          &copy; {{ currentYear }} Alexandre Coutant – Conseiller SAFTI. Tous droits réservés.
        </p>
        <p>Conseiller immobilier indépendant – Vendée (85)</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { SITE } from '../config/seo.js'
const currentYear = new Date().getFullYear()
const gbpUrl = SITE.gbpUrl
</script>

<style scoped>
.footer {
  background-color: var(--color-primary);
  color: rgba(255, 255, 255, 0.8);
  margin-top: auto;
}

.footer-body {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding-top: 3rem;
  padding-bottom: 2.5rem;
}

@media (min-width: 640px) {
  .footer-body {
    flex-direction: row;
    justify-content: space-between;
    gap: 2rem;
  }
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.footer-name {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--color-white);
  margin-bottom: 0.1rem;
}

.footer-role {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 0;
}

.footer-network {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.footer-contact-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.footer-area {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 0.5rem;
  margin-bottom: 0;
}

.footer-nav {
  gap: 0.6rem;
}

.footer-link {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color var(--transition);
}

.footer-link:hover {
  color: var(--color-white);
}

.footer-link--accent {
  color: var(--color-accent);
  font-weight: 500;
  margin-top: 0.5rem;
}

.footer-link--accent:hover {
  color: #d4b88a;
}

/* Bottom bar */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom-inner {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.4);
}

@media (min-width: 640px) {
  .footer-bottom-inner {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
