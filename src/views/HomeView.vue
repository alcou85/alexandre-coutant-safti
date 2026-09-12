<template>
  <main class="home">

    <!-- Hero -->
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-content">
          <p class="hero-eyebrow">Estimation immobilière · Vendée</p>
          <h1 class="hero-heading">
            Votre bien immobilier en Vendée&nbsp;—&nbsp;quelle est sa valeur&nbsp;?
          </h1>
          <p class="hero-sub">
            Obtenez une estimation gratuite et personnalisée en 2 minutes.
            Sans engagement.
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

        <!-- Decorative accent shape -->
        <div class="hero-deco" aria-hidden="true">
          <div class="hero-deco-inner">
            <div class="deco-line deco-line--1"></div>
            <div class="deco-line deco-line--2"></div>
            <div class="deco-badge">
              <span class="deco-badge-text">Réseau</span>
              <span class="deco-badge-name">SAFTI</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="section how-section">
      <div class="container">
        <h2 class="section-title">Comment ça marche</h2>
        <p class="section-intro">
          Une estimation sérieuse en trois étapes simples.
        </p>

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

    <!-- Zone d'intervention -->
    <section class="section zone-section">
      <div class="container zone-inner">
        <div class="zone-text">
          <h2 class="section-title">Ma zone d'intervention</h2>
          <p>
            Conseiller immobilier basé en Vendée, j'interviens principalement sur
            <strong>La Roche-sur-Yon</strong>, <strong>Les Sables-d'Olonne</strong>
            et leurs communes alentours (département 85).
          </p>
          <p>
            Ma connaissance du marché local me permet de vous proposer une estimation
            au plus proche de la réalité de votre secteur.
          </p>
          <RouterLink to="/qui-suis-je" class="btn-outline" style="margin-top:0.5rem">
            En savoir plus sur mon parcours
          </RouterLink>
        </div>

        <div class="zone-map-placeholder" aria-label="Carte schématique – Vendée (85)">
          <div class="zone-map-inner">
            <p class="zone-dept">Vendée</p>
            <p class="zone-code">85</p>
            <ul class="zone-cities" aria-label="Villes couvertes">
              <li>La Roche-sur-Yon</li>
              <li>Les Sables-d'Olonne</li>
              <li>Et alentours</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup>
// No dynamic data needed for HomeView
</script>

<style scoped>
/* ---- Shared ---- */
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

/* ---- Hero ---- */
.hero {
  padding-top: calc(64px + 4rem); /* header offset */
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
  max-width: 580px;
}

.hero-eyebrow {
  font-size: 0.8rem;
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
  font-size: 1.1rem;
  color: var(--color-muted);
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

/* Decorative element */
.hero-deco {
  display: none;
  flex-shrink: 0;
}

@media (min-width: 860px) {
  .hero-deco {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.hero-deco-inner {
  position: relative;
  width: 260px;
  height: 260px;
}

.deco-line {
  position: absolute;
  border-radius: 50%;
  border: 1px solid var(--color-border);
}

.deco-line--1 {
  inset: 0;
}

.deco-line--2 {
  inset: 24px;
  border-color: rgba(186, 155, 106, 0.3);
}

.deco-badge {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
}

.deco-badge-text {
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.deco-badge-name {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--color-accent);
  line-height: 1;
}

/* ---- How it works ---- */
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
  background-color: rgba(186, 155, 106, 0.1);
  border: 1px solid rgba(186, 155, 106, 0.3);
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
  font-size: 1.1rem;
  margin-bottom: 0.4rem;
}

.step-desc {
  font-size: 0.9rem;
  color: var(--color-muted);
  margin-bottom: 0;
}

.how-cta {
  display: flex;
  justify-content: center;
}

/* ---- Zone d'intervention ---- */
.zone-section {
  background-color: var(--color-bg);
}

.zone-inner {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

@media (min-width: 768px) {
  .zone-inner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 3rem;
  }
}

.zone-text {
  flex: 1;
  max-width: 520px;
}

.zone-text p {
  color: var(--color-muted);
  font-size: 0.95rem;
}

.zone-text strong {
  color: var(--color-primary);
  font-weight: 500;
}

.zone-map-placeholder {
  flex-shrink: 0;
  width: 220px;
  height: 220px;
  border: 2px solid var(--color-border);
  border-radius: var(--radius);
  background-color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
}

.zone-map-inner {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
}

.zone-dept {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-primary);
  margin-bottom: 0;
}

.zone-code {
  font-size: 2.5rem;
  font-family: var(--font-heading);
  font-weight: 600;
  color: var(--color-accent);
  line-height: 1;
  margin-bottom: 0.5rem;
}

.zone-cities {
  list-style: none;
  padding: 0;
  font-size: 0.78rem;
  color: var(--color-muted);
  line-height: 1.8;
}
</style>
