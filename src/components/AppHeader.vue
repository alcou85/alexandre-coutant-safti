<template>
  <header class="header">
    <div class="container header-inner">
      <!-- Logo -->
      <RouterLink to="/" class="logo" aria-label="Alexandre Coutant – Accueil">
        <span class="logo-name">Alexandre Coutant</span>
        <span class="logo-subtitle">Conseiller SAFTI · Vendée</span>
      </RouterLink>

      <!-- Desktop Nav -->
      <nav class="nav-desktop" aria-label="Navigation principale">
        <RouterLink to="/" class="nav-link" :class="{ active: route.name === 'home' }">
          Accueil
        </RouterLink>
        <RouterLink to="/qui-suis-je" class="nav-link" :class="{ active: route.name === 'about' }">
          Qui suis-je
        </RouterLink>
        <a
          :href="listingsUrl"
          class="nav-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mes biens à vendre
        </a>
        <RouterLink to="/contact" class="nav-link" :class="{ active: route.name === 'contact' }">
          Contact
        </RouterLink>
        <RouterLink to="/estimation" class="btn-primary nav-cta">
          Estimez votre bien
        </RouterLink>
      </nav>

      <!-- Mobile hamburger -->
      <button
        class="hamburger"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        aria-label="Ouvrir le menu"
        @click="toggleMenu"
      >
        <span class="hamburger-line" :class="{ open: menuOpen }"></span>
        <span class="hamburger-line" :class="{ open: menuOpen }"></span>
        <span class="hamburger-line" :class="{ open: menuOpen }"></span>
      </button>
    </div>

    <!-- Mobile Nav -->
    <nav
      id="mobile-menu"
      class="nav-mobile"
      :class="{ 'nav-mobile--open': menuOpen }"
      aria-label="Navigation mobile"
    >
      <div class="nav-mobile-inner">
        <RouterLink to="/" class="nav-mobile-link" @click="closeMenu">Accueil</RouterLink>
        <RouterLink to="/estimation" class="nav-mobile-link nav-mobile-cta" @click="closeMenu">
          Estimez votre bien
        </RouterLink>
        <RouterLink to="/qui-suis-je" class="nav-mobile-link" @click="closeMenu">Qui suis-je</RouterLink>
        <a
          :href="listingsUrl"
          class="nav-mobile-link"
          target="_blank"
          rel="noopener noreferrer"
          @click="closeMenu"
        >
          Mes biens à vendre
        </a>
        <RouterLink to="/contact" class="nav-mobile-link" @click="closeMenu">Contact</RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const menuOpen = ref(false)
const listingsUrl = import.meta.env.VITE_SAFTI_LISTINGS_URL || '/'

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  height: 64px;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

/* Logo */
.logo {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  line-height: 1.2;
}

.logo-name {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary);
  transition: color var(--transition);
}

.logo:hover .logo-name {
  color: var(--color-accent);
}

.logo-subtitle {
  font-size: 0.7rem;
  color: var(--color-muted);
  font-weight: 400;
  letter-spacing: 0.04em;
}

/* Desktop Nav */
.nav-desktop {
  display: none;
  align-items: center;
  gap: 0.25rem;
}

@media (min-width: 768px) {
  .nav-desktop {
    display: flex;
  }
}

.nav-link {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--color-primary);
  text-decoration: none;
  padding: 0.4rem 0.75rem;
  border-radius: var(--radius);
  transition: color var(--transition), background-color var(--transition);
}

.nav-link:hover,
.nav-link.active {
  color: var(--color-accent);
  background-color: rgba(186, 155, 106, 0.06);
}

.nav-cta {
  margin-left: 0.75rem;
  font-size: 0.85rem;
  padding: 0.5rem 1.1rem;
}

/* Hamburger */
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: var(--radius);
  transition: background-color var(--transition);
}

.hamburger:hover {
  background-color: rgba(28, 43, 58, 0.05);
}

@media (min-width: 768px) {
  .hamburger {
    display: none;
  }
}

.hamburger-line {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--color-primary);
  border-radius: 2px;
  transition: transform var(--transition), opacity var(--transition);
  transform-origin: center;
}

.hamburger-line:nth-child(1).open {
  transform: translateY(7px) rotate(45deg);
}

.hamburger-line:nth-child(2).open {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger-line:nth-child(3).open {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile Nav */
.nav-mobile {
  display: none;
  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: opacity var(--transition);
  opacity: 0;
  pointer-events: none;
}

.nav-mobile--open {
  display: block;
  opacity: 1;
  pointer-events: auto;
}

@media (min-width: 768px) {
  .nav-mobile {
    display: none !important;
  }
}

.nav-mobile-inner {
  display: flex;
  flex-direction: column;
  padding: 0.75rem 1.5rem 1rem;
  gap: 0.25rem;
}

.nav-mobile-link {
  display: block;
  font-size: 1rem;
  color: var(--color-primary);
  text-decoration: none;
  padding: 0.65rem 0.5rem;
  border-bottom: 1px solid var(--color-border);
  transition: color var(--transition);
}

.nav-mobile-link:last-child {
  border-bottom: none;
}

.nav-mobile-link:hover {
  color: var(--color-accent);
}

.nav-mobile-cta {
  font-weight: 500;
  color: var(--color-accent);
}
</style>
