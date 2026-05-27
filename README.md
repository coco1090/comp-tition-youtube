# Les Héros de l'Ombre — Site Web

Site vitrine pour la chaîne YouTube **Les Héros de l'Ombre**, dédiée aux personnages secondaires du cinéma et des séries. Développé en HTML / CSS / JavaScript vanilla, sans framework, sans dépendance externe.

---

## Sommaire

1. [Aperçu du projet](#aperçu-du-projet)
2. [Structure des fichiers](#structure-des-fichiers)
3. [Technologies utilisées](#technologies-utilisées)
4. [Design system](#design-system)
5. [Pages et contenu](#pages-et-contenu)
6. [Fonctionnalités JavaScript](#fonctionnalités-javascript)
7. [Responsive design](#responsive-design)
8. [Accessibilité](#accessibilité)
9. [Modifier le contenu](#modifier-le-contenu)
10. [Déploiement](#déploiement)

---

## Aperçu du projet

| Propriété | Valeur |
|-----------|--------|
| Nom de la chaîne | Les Héros de l'Ombre |
| URL YouTube | [youtube.com/@LHerosDeLOmbre](https://youtube.com/@LHerosDeLOmbre) |
| Email de contact | lesoublies8@gmail.com |
| Format des vidéos | YouTube Shorts (~4 min) |
| Langues | Français |
| Compatibilité | Chrome, Firefox, Safari, Edge — mobile & desktop |

---

## Structure des fichiers

```
dossier youtube/
│
├── index.html          → Page d'accueil principale
├── contact.html        → Page de contact avec formulaire
├── mentions-legales.html → Mentions légales
│
├── app.js              → Tout le JavaScript de la page d'accueil
│
└── README.md           → Ce fichier
```

> **Note :** Il n'y a pas de fichier CSS séparé. Chaque page embarque ses styles dans une balise `<style>` dans le `<head>`. Le JS de `contact.html` et `mentions-legales.html` est inline dans les pages.

---

## Technologies utilisées

| Technologie | Usage |
|-------------|-------|
| HTML5 sémantique | Structure des pages |
| CSS3 (custom properties, grid, flexbox, clamp) | Mise en page et design |
| JavaScript ES6+ (vanilla) | Interactivité, animations |
| Google Fonts | Polices : Bebas Neue, Inter, Playfair Display |
| IntersectionObserver API | Scroll reveal et animation des compteurs |
| Web Share API / Clipboard API | Bouton de partage |
| Git | Versionnement |

Aucun framework CSS (pas de Bootstrap, Tailwind…), aucun framework JS (pas de Vue, React…), aucune dépendance npm.

---

## Design system

### Palette de couleurs

Définie via des variables CSS dans `:root` sur chaque page.

| Variable | Valeur | Usage |
|----------|--------|-------|
| `--red` | `#e84c3d` | Couleur d'accent principale (boutons, badges, survols) |
| `--red-dk` | `#c0392b` | Rouge foncé (état hover des boutons) |
| `--black` | `#1c1c1c` | Texte principal |
| `--dark` | `#111` | Fond des sections sombres |
| `--dark-2` | `#181818` | Fond section "Notre Concept" |
| `--grey` | `#777` | Texte secondaire |
| `--grey-lt` | `#bbb` | Labels, métadonnées |
| `--cream` | `#f0ede7` | Fond de la citation, zones légères |
| `--white` | `#fff` | Fond général |
| `--border` | `#e3e0db` | Séparateurs et bordures légères |

### Typographie

| Police | Famille | Usage |
|--------|---------|-------|
| **Bebas Neue** | Display | Titres, logos, boutons, numéros |
| **Inter** | Sans-serif | Corps de texte, labels, métadonnées |
| **Playfair Display** | Serif italique | Citations, sous-titres éditoriaux |

### Espacements

Variable `--section-p` utilisée pour la cohérence du padding entre sections :

```css
--section-p: clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)
```

Toutes les valeurs de taille utilisent `clamp()` pour un responsive fluide sans media queries superflues.

### Animations

| Nom | Effet |
|-----|-------|
| `fadeUp` | Apparition de bas en haut (hero captions) |
| `fadeIn` | Fondu simple |
| `bounce` | Rebond vertical (scroll hint) |
| `barGrow` | Croissance horizontale de gauche à droite |

Les classes `.reveal`, `.d1`, `.d2`, `.d3`, `.d4` gèrent le scroll reveal avec délais échelonnés (0.12s, 0.24s, 0.36s, 0.48s).

---

## Pages et contenu

### `index.html` — Page d'accueil

Structure des sections dans l'ordre d'affichage :

#### 1. Hero
- Image de fond avec effet **parallaxe** au scroll (via `requestAnimationFrame`)
- Navigation superposée (logo centré + icônes en haut à droite)
- Titre animé, sous-titre, CTA "Voir les vidéos"
- Indicateur de scroll animé

```
Hauteur hero : 540px
Image : 145% de hauteur pour permettre le parallaxe
P_INIT  = -189px  (= -(540 × 0.35))
P_SPEED = 0.35
```

#### 2. La Chaîne (`#about`)
- En-tête avec titre, tags (Cinéma / Séries / Analyse), étoiles, boutons d'action
- Bande de méta-infos : Format, Durée moyenne, Abonnés, Depuis
- Grille 3 colonnes : affiche poster | description | miniature dernière vidéo

#### 3. Statistiques
- 4 compteurs animés : Abonnés, Épisodes, Vues totales, Durée par épisode
- Animation déclenchée à l'entrée dans le viewport via `IntersectionObserver`
- Fonction d'easing cubique pour un défilement naturel

#### 4. Citation
- Fond `--cream`
- Guillemet décoratif géant en opacité réduite
- Texte en Playfair Display italique

#### 5. Notre Concept (`#concept`)
- Fond sombre `--dark-2`
- 3 cartes : Le personnage ignoré / L'analyse narrative / La passion cinéphile
- Hover : élévation + barre rouge animée en haut de carte

#### 6. Les Vidéos (`#videos`)
- 3 cartes YouTube Shorts en **format portrait 9:16**
- Grille centrée `max-width: 820px`
- Titre + badge intégrés dans la miniature via dégradé
- Numéro d'épisode en filigrane
- Bouton play circulaire rouge au survol
- Barre rouge animée en bas de carte au survol

#### 7. CTA YouTube
- Bande rouge pleine largeur
- Bouton "S'abonner" blanc → lien YouTube

#### 8. Footer
- 2 colonnes : Branding (logo + description + réseaux sociaux) | Navigation
- Barre de bas de page sombre avec copyright

---

### `contact.html` — Page de contact

#### Sections

| Section | Contenu |
|---------|---------|
| Nav sticky | Logo + liens + burger mobile |
| Page header | Titre "Nous Contacter" sur fond sombre |
| Infos rapides | 3 blocs : Email / YouTube / Délai de réponse |
| Formulaire | Prénom, Nom, Email, Téléphone (optionnel), Sujet, Message, RGPD |
| Citation | Même style qu'index.html |
| Footer | Identique à index.html |

#### Fonctionnement du formulaire

Le formulaire utilise `mailto:` — à la soumission, le client mail de l'utilisateur s'ouvre avec les champs pré-remplis (destinataire, sujet, corps du message formaté). Aucun serveur ni API requis.

Validations côté client :
- Prénom + Nom obligatoires
- Email valide (présence du `@`)
- Sujet obligatoire (select)
- Message minimum 10 caractères
- Checkbox RGPD obligatoire

En cas de succès : le formulaire est masqué et un message de confirmation apparaît.

---

### `mentions-legales.html` — Mentions légales

Page simple avec navigation de retour. Contient les mentions légales standard (éditeur, hébergeur, propriété intellectuelle, données personnelles).

---

## Fonctionnalités JavaScript

Tout le JS de la page d'accueil est dans `app.js` (chargé avec `defer`). Le JS des autres pages est inline.

### `app.js` — Structure

```
app.js
├── showToast()           → Notification temporaire en bas de page
├── Menu burger           → Ouverture/fermeture du menu mobile (slide-in)
├── Recherche             → Overlay de recherche YouTube
├── Partager              → Web Share API + fallback clipboard
├── Lire plus / moins     → Expansion du texte de description
├── Scroll                → Parallaxe hero + affichage bouton retour en haut
├── Scroll reveal         → IntersectionObserver + filet de sécurité (2.5s)
└── Compteurs             → Animation des chiffres avec easing cubique
```

### Détail des fonctionnalités

#### Menu burger (mobile)
- Ouvre un panneau latéral gauche avec overlay semi-transparent
- Fermeture : clic sur ✕, clic sur l'overlay, touche `Escape`, clic sur un lien
- Gestion `aria-expanded` pour l'accessibilité

#### Overlay de recherche
- S'ouvre sur le bouton loupe dans la nav
- La soumission redirige vers `youtube.com/results?search_query=...+Les héros de l ombre`
- Fermeture : bouton, touche `Escape`

#### Parallaxe hero
```javascript
const P_INIT  = -189;   // offset initial en px (= -(540 × 0.35))
const P_SPEED = 0.35;   // vitesse du déplacement (0 = aucun, 1 = scroll normal)
// Actif uniquement si scrollY < 700px (hero hors vue = inutile)
```
Optimisé avec `requestAnimationFrame` et flag anti-doublon.

#### Animation des compteurs
- Durée : 1 500 ms
- Easing : `1 - (1-p)³` (cubic ease-out)
- Déclenchement : entrée dans le viewport d'un `.stat-item`
- Ne se rejoue pas (`countersDone = true`)

#### Scroll reveal
- `IntersectionObserver` avec `threshold: 0.1`
- Filet de sécurité : toutes les `.reveal` passent en `visible` après 2,5 s (en cas de navigateur non supporté ou de scroll rapide)

---

## Responsive design

### Breakpoints

| Breakpoint | Largeur | Changements principaux |
|------------|---------|------------------------|
| Desktop | > 1024px | Mise en page complète 3 colonnes |
| Tablette large | ≤ 1024px | Colonne trailer masquée, profile 2 colonnes |
| Tablette | ≤ 860px | Menu burger actif, grilles → 2 colonnes, stats → 2×2 |
| Mobile | ≤ 680px | Hero réduit (420px), profile 1 colonne, poster masqué |
| Petit mobile | ≤ 400px | Typographie réduite, grilles → 2 colonnes centrées |

### Stratégie

- Pas de breakpoints fixes rigides : les tailles utilisent `clamp()` pour une fluidité maximale
- La variable `--section-p` assure un padding cohérent et adaptatif sur toutes les sections
- Les sections à fond coloré s'étendent sur **toute la largeur** de l'écran (pas de max-width sur le wrapper principal)
- Les sections à fond blanc ont un `max-width: 1360px; margin: 0 auto` pour rester lisibles sur grands écrans

---

## Accessibilité

- **Skip link** : "Aller au contenu principal" en tête de page (visible au focus)
- **ARIA** : `aria-label`, `aria-expanded`, `aria-controls`, `aria-modal`, `aria-live` sur les éléments interactifs
- **Focus visible** : outline `2px solid var(--red)` sur tous les éléments focusables
- **`prefers-reduced-motion`** : désactive toutes les transitions et animations (scroll reveal, parallaxe)
- **Formulaire contact** : labels explicites, `autocomplete`, attributs `required` sémantiques
- **Images** : attributs `alt` descriptifs sur toutes les images
- **Liens externes** : `target="_blank" rel="noopener"` + `aria-label` avec "(nouvel onglet)"

---

## Modifier le contenu

### Changer les vrais liens YouTube

Dans `index.html` et `contact.html`, remplacer toutes les occurrences de :
```
https://youtube.com/@LHerosDeLOmbre
```
par l'URL réelle de votre chaîne.

### Modifier les statistiques

Dans `index.html`, section `<!-- ── STATS ── -->` :

```html
<span class="stat-num" data-target="1000">0</span>   <!-- Abonnés -->
<span class="stat-num" data-target="4" data-suffix="+">0</span>  <!-- Épisodes -->
<span class="stat-num" data-target="30000">0</span>  <!-- Vues -->
```
Changer la valeur de `data-target`. Le suffixe optionnel se définit avec `data-suffix`.

### Ajouter / modifier une vidéo

Dans `index.html`, chaque carte vidéo suit ce modèle :

```html
<a class="related-card reveal d1"
   href="LIEN_VERS_LE_SHORT"
   target="_blank" rel="noopener"
   aria-label="Regarder « TITRE » sur YouTube Shorts">
    <div class="related-card-thumb">
        <img src="URL_MINIATURE" alt="TITRE — Short">
        <div class="card-overlay">
            <span class="card-ep">01</span>          <!-- Numéro d'épisode -->
            <div class="card-info">
                <h3>TITRE</h3>
                <span class="shorts-badge">Short · 2026</span>
            </div>
        </div>
        <div class="play-overlay" aria-hidden="true">
            <div class="play-circle-sm">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
        </div>
    </div>
</a>
```

### Modifier la recherche YouTube

Dans `app.js` ligne ~67, la chaîne ajoutée à chaque recherche :

```javascript
`https://www.youtube.com/results?search_query=${encodeURIComponent(q + ' Les héros de l ombre')}`
```

### Changer l'email de contact

Deux endroits à mettre à jour :
1. `contact.html` — balise `<a href="mailto:...">` dans les infos rapides
2. `contact.html` — variable `mailtoURL` dans le script JS

### Modifier les couleurs

Dans `:root` de chaque fichier HTML :
```css
:root {
    --red:    #e84c3d;   /* Couleur principale */
    --red-dk: #c0392b;   /* Hover */
    --dark:   #111;      /* Sections sombres */
    /* ... */
}
```

---

## Déploiement

Le site est 100% statique : aucun backend, aucun build requis.

### Options d'hébergement gratuit

| Hébergeur | Commande / Méthode |
|-----------|-------------------|
| **GitHub Pages** | Push sur branche `main`, activer Pages dans les settings |
| **Netlify** | Glisser-déposer le dossier sur netlify.com/drop |
| **Vercel** | `vercel deploy` depuis le dossier |
| **Cloudflare Pages** | Connecter le repo GitHub, aucune config de build |

### Checklist avant mise en ligne

- [ ] Remplacer les images Unsplash par les vraies miniatures des vidéos
- [ ] Mettre à jour les liens YouTube avec la vraie URL de la chaîne
- [ ] Mettre à jour les vrais chiffres dans les statistiques
- [ ] Vérifier l'adresse email dans `contact.html`
- [ ] Compléter les `mentions-legales.html` avec les vraies informations
- [ ] Ajouter un `favicon.ico` à la racine du projet
- [ ] Tester sur mobile (iOS Safari + Chrome Android)
- [ ] Vérifier que les liens réseaux sociaux (Instagram, Twitter/X) pointent vers les bons comptes

---

## Historique des versions

| Version | Description |
|---------|-------------|
| v1.0 | Structure initiale, macOS window mock |
| v1.1 | Ajout icône Instagram dans la navigation |
| v2.0 | Refonte complète : pleine page, suppression du contour macOS |
| v2.1 | Externalisation du JS dans `app.js`, correction section "Notre Concept" |
| v2.2 | Suppression newsletter, refonte design professionnelle |
| v2.3 | Adaptation page contact au nouveau design |
| v2.4 | Section vidéos : format Shorts 9/16, titre intégré dans la miniature |
| v2.5 | Suppression des bordures épaisses, full-width sans bords blancs |

---

*Site développé avec [Claude Code](https://claude.ai/code) — © 2026 Les Héros de l'Ombre*
