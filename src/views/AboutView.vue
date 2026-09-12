<template>
  <main class="about-page">

    <!-- Portrait -->
    <section class="section section--first">
      <div class="container portrait-inner">
        <!-- Photo placeholder -->
        <div class="photo-wrap">
          <div class="photo-placeholder" role="img" aria-label="Photo d'Alexandre Coutant">
            <span class="photo-initials">AC</span>
          </div>
          <div class="photo-caption">
            <p class="photo-name">Alexandre Coutant</p>
            <p class="photo-role">Conseiller immobilier indépendant</p>
            <p class="photo-network">Réseau SAFTI</p>
          </div>
        </div>

        <!-- Bio -->
        <div class="bio-content">
          <h1>Alexandre Coutant</h1>
          <p class="bio-tagline">Conseiller immobilier indépendant – Réseau SAFTI</p>

          <div class="bio-text">
            <p>
              [Votre biographie ici — parcours professionnel, motivations, expertise locale…]
            </p>
            <p>
              [Décrivez votre expérience, votre connaissance du marché vendéen, les raisons
              qui vous ont amené à rejoindre le réseau SAFTI, et ce qui vous distingue
              dans votre accompagnement des vendeurs et acquéreurs.]
            </p>
          </div>

          <div class="bio-actions">
            <RouterLink to="/estimation" class="btn-primary">Estimer mon bien</RouterLink>
            <RouterLink to="/contact" class="btn-outline">Me contacter</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Mon territoire -->
    <section class="section section--alt">
      <div class="container territory-inner">
        <div class="territory-text">
          <h2>Mon territoire</h2>
          <p>
            J'interviens principalement sur <strong>La Roche-sur-Yon</strong>,
            <strong>Les Sables-d'Olonne</strong> et leurs communes alentours,
            en département de la <strong>Vendée (85)</strong>.
          </p>
          <p>
            Ma connaissance fine du tissu local — des quartiers, des prix pratiqués,
            des délais de vente — me permet de vous accompagner efficacement,
            que vous soyez vendeur ou acquéreur.
          </p>
        </div>

        <div class="territory-highlights">
          <div class="territory-card">
            <h3>La Roche-sur-Yon</h3>
            <p>Préfecture de la Vendée, marché dynamique centre-ville et périphérie.</p>
          </div>
          <div class="territory-card">
            <h3>Les Sables-d'Olonne</h3>
            <p>Marché côtier, résidences principales et secondaires, secteur prisé.</p>
          </div>
          <div class="territory-card">
            <h3>Les communes alentours</h3>
            <p>Challans, Fontenay-le-Comte, Luçon, l'Île-d'Olonne et les communes rurales du 85.</p>
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
            <strong>N° RSAC :</strong> <span class="placeholder-value">[À COMPLÉTER]</span>
          </p>
          <p>
            <strong>Carte professionnelle :</strong>
            <span class="placeholder-value">[À COMPLÉTER — délivrée par CCI]</span>
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
// No dynamic data
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

.photo-placeholder {
  width: 180px;
  height: 220px;
  background-color: var(--color-primary);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 768px) {
  .photo-placeholder {
    width: 220px;
    height: 280px;
  }
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
