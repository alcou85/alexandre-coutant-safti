<template>
  <main class="legal-page">
    <div class="container">
      <h1>Mentions légales</h1>

      <div class="legal-content">

        <section class="legal-section">
          <h2>Éditeur du site</h2>
          <ul class="legal-list">
            <li><strong>Nom :</strong> Alexandre Coutant</li>
            <li><strong>Qualité :</strong> Conseiller immobilier indépendant</li>
            <li><strong>Réseau :</strong> SAFTI</li>
            <li><strong>Adresse :</strong> La Roche-sur-Yon (85000), Vendée</li>
            <li>
              <strong>Téléphone :</strong>
              <a href="tel:+33665087707">06 65 08 77 07</a>
            </li>
            <li>
              <strong>Email :</strong>
              <a href="mailto:alexandre.coutant@safti.fr">alexandre.coutant@safti.fr</a>
            </li>
            <li>
              <strong>N° RSAC :</strong> 105 775 613 RSAC La Roche-sur-Yon
            </li>
            <li>
              <strong>Carte professionnelle :</strong>
              CPI 3101 2018 000 025 936 — délivrée par la CCI de Toulouse (réseau SAFTI) — valable jusqu'au 28/02/2027
            </li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>Hébergement</h2>
          <ul class="legal-list">
            <li><strong>Société :</strong> Vercel Inc.</li>
            <li><strong>Adresse :</strong> 340 Pine Street Suite 701, San Francisco, CA 94104, USA</li>
            <li>
              <strong>Site web :</strong>
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>
            </li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>Responsable de la publication</h2>
          <p>Alexandre Coutant — <a href="mailto:alexandre.coutant@safti.fr">alexandre.coutant@safti.fr</a></p>
        </section>

        <section class="legal-section">
          <h2>Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu de ce site (textes, visuels, structure) est la propriété
            exclusive d'Alexandre Coutant, sauf mention contraire. Toute reproduction,
            distribution, modification ou utilisation, totale ou partielle, par quelque moyen
            que ce soit, sans autorisation préalable et écrite, est strictement interdite
            et constituerait une contrefaçon sanctionnée par les articles L.335-2 et suivants
            du Code de la propriété intellectuelle.
          </p>
        </section>

        <section class="legal-section">
          <h2>Données personnelles</h2>
          <p>
            La politique de traitement des données personnelles collectées via ce site est
            détaillée dans notre
            <RouterLink to="/politique-confidentialite">politique de confidentialité</RouterLink>.
          </p>
        </section>

        <section class="legal-section">
          <h2>Cookies</h2>
          <p>
            Ce site n'utilise actuellement aucun cookie de suivi ni traceur tiers.
            Un bandeau de consentement sera ajouté si des outils d'analyse ou de publicité
            venaient à être activés.
          </p>
        </section>

        <section class="legal-section">
          <h2>Liens hypertextes</h2>
          <p>
            Ce site peut contenir des liens vers des sites tiers. Alexandre Coutant
            n'est pas responsable du contenu de ces sites, ni de leurs pratiques
            en matière de données personnelles.
          </p>
        </section>

        <section class="legal-section">
          <h2>Droit applicable</h2>
          <p>
            Le présent site et ses mentions légales sont soumis au droit français.
            En cas de litige, les tribunaux français sont seuls compétents.
          </p>
        </section>

      </div>
    </div>
  </main>
</template>

<script setup>
// Static page — no logic
</script>

<style scoped>
.legal-page {
  padding-top: calc(64px + 3.5rem);
  padding-bottom: 5rem;
  min-height: 100vh;
}

.legal-page h1 {
  margin-bottom: 2.5rem;
}

.legal-content {
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.legal-section h2 {
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
  color: var(--color-primary);
}

.legal-section p,
.legal-section li {
  font-size: 0.95rem;
  color: var(--color-muted);
}

.legal-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.legal-list li {
  line-height: 1.6;
}

.legal-list strong {
  color: var(--color-primary);
}

.placeholder {
  color: var(--color-accent);
  font-style: italic;
}

a {
  color: var(--color-accent);
  text-decoration: underline;
}

a:hover {
  color: var(--color-accent-dark);
}
</style>
