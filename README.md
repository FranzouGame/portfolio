# Portfolio François Barlic

Un portfolio moderne et interactif construit avec Nuxt 3, TailwindCSS, Three.js et Prisma.

![Portfolio Preview](./preview.png)

## ✨ Fonctionnalités

- 🎨 **Design moderne** - Dark mode avec effets glassmorphism et néon
- 🌐 **Scene 3D interactive** - Particules animées avec Three.js qui réagissent à la souris
- ⚡ **Animations fluides** - Transitions smooth avec @vueuse/motion
- 📱 **Responsive** - Adapté à tous les écrans
- 🔧 **CMS intégré** - Backend Prisma pour modifier facilement le contenu
- 📧 **Formulaire de contact** - Messages stockés en base de données
- 🚀 **Performance optimisée** - SSR avec Nuxt 3

## 🛠️ Technologies

- **Frontend**: Nuxt 3, Vue 3, TypeScript
- **Styling**: TailwindCSS
- **3D**: Three.js
- **Animations**: @vueuse/motion
- **Backend**: Nuxt Server API
- **Database**: Prisma + SQLite (facilement migreable vers PostgreSQL)

## 📦 Installation

### Prérequis

- Node.js 18+
- npm ou pnpm

### Étapes

1. **Cloner le projet**
```bash
git clone <repo-url>
cd portfolio-barlic
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer l'environnement**
```bash
cp .env.example .env
# Éditer .env si nécessaire
```

4. **Initialiser la base de données**
```bash
npx prisma db push
npm run db:seed
```

5. **Lancer le serveur de développement**
```bash
npm run dev
```

Le site sera accessible sur `http://localhost:3000`

## 📝 Modification du contenu

### Via Prisma Studio

Lance l'interface d'administration :
```bash
npm run db:studio
```

Tu pourras modifier :
- **Profile** - Nom, bio, contacts
- **Skills** - Compétences et pourcentages
- **Projects** - Projets avec descriptions
- **Experiences** - Parcours professionnel
- **Education** - Formation

### Via le code

Les données initiales sont dans `prisma/seed.ts`. Modifie ce fichier puis relance :
```bash
npm run db:seed
```

## 🚀 Déploiement

### Vercel (Recommandé)

1. Push ton code sur GitHub
2. Importe le repo sur Vercel
3. Configure les variables d'environnement
4. Deploy !

### Autres plateformes

```bash
npm run build
npm run preview # Pour tester le build
```

## 🗂️ Structure du projet

```
portfolio-barlic/
├── assets/
│   └── css/
│       └── main.css        # Styles globaux
├── components/
│   ├── 3d/
│   │   └── ParticleField.vue    # Scene Three.js
│   ├── sections/
│   │   ├── HeroSection.vue
│   │   ├── AboutSection.vue
│   │   ├── SkillsSection.vue
│   │   ├── ProjectsSection.vue
│   │   ├── TimelineSection.vue
│   │   └── ContactSection.vue
│   └── ui/
│       ├── TheNavbar.vue
│       └── TheFooter.vue
├── pages/
│   └── index.vue           # Page principale
├── prisma/
│   ├── schema.prisma       # Schéma de la DB
│   └── seed.ts             # Données initiales
├── server/
│   ├── api/                # API routes
│   └── utils/
│       └── prisma.ts       # Client Prisma
├── nuxt.config.ts
├── tailwind.config.ts
└── package.json
```

## 🎨 Personnalisation

### Couleurs

Modifie `tailwind.config.ts` pour changer la palette :

```ts
colors: {
  neon: {
    cyan: '#00f5ff',    // Couleur principale
    purple: '#bf00ff',  // Accent secondaire
    // ...
  }
}
```

### Polices

Les polices sont chargées depuis Google Fonts dans `nuxt.config.ts` :
- **Syne** - Titres et display
- **Space Mono** - Code et labels

### Animations

Les animations sont définies dans `assets/css/main.css` et `tailwind.config.ts`.

## 📄 Licence

MIT - Libre d'utilisation et de modification.

---

Créé avec ❤️ par François Barlic
