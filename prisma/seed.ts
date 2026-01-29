import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ===== PROFILE =====
  await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'François Barlic',
      title: 'Développeur Fullstack',
      subtitle: 'Alternant passionné par le web moderne',
      bio: `Étudiant en informatique à l'IUT de Bayonne et alternant chez Optera depuis septembre 2025, je développe des applications web avec Nuxt.js, Angular, Laravel et Django. Curieux et motivé, j'aime apprendre de nouvelles technologies et m'adapter aux besoins des projets.`,
      email: 'francois.barlic57@gmail.com',
      location: 'Anglet - 64',
      githubUrl: 'https://github.com/FranzouGame',
      instagramUrl: '@franzou57',
      linkedinUrl: null,
    },
  })

  // ===== SKILLS =====
  const skills = [
    { name: 'JavaScript', percentage: 95, category: 'frontend', order: 1 },
    { name: 'Nuxt.js', percentage: 90, category: 'frontend', order: 2 },
    { name: 'Vue.js', percentage: 90, category: 'frontend', order: 3 },
    { name: 'TypeScript', percentage: 75, category: 'frontend', order: 4 },
    { name: 'Angular', percentage: 70, category: 'frontend', order: 5 },
    { name: 'HTML/CSS', percentage: 95, category: 'frontend', order: 6 },
    { name: 'TailwindCSS', percentage: 85, category: 'frontend', order: 7 },
    { name: 'Bootstrap', percentage: 80, category: 'frontend', order: 8 },
    { name: 'Python', percentage: 80, category: 'backend', order: 1 },
    { name: 'Django', percentage: 75, category: 'backend', order: 2 },
    { name: 'PHP', percentage: 80, category: 'backend', order: 3 },
    { name: 'Laravel', percentage: 70, category: 'backend', order: 4 },
    { name: 'C++', percentage: 80, category: 'backend', order: 5 },
    { name: 'C', percentage: 75, category: 'backend', order: 6 },
    { name: 'SQL', percentage: 85, category: 'backend', order: 7 },
    { name: 'NoSQL', percentage: 70, category: 'backend', order: 8 },
    { name: 'Git', percentage: 90, category: 'tools', order: 1 },
    { name: 'Scrum/Agile', percentage: 85, category: 'tools', order: 2 },
    { name: 'Docker', percentage: 70, category: 'tools', order: 3 },
    { name: 'Kubernetes', percentage: 60, category: 'tools', order: 4 },
    { name: 'Curieux', percentage: 100, category: 'soft', order: 1 },
    { name: 'Travail en équipe', percentage: 95, category: 'soft', order: 2 },
    { name: 'Autonome', percentage: 90, category: 'soft', order: 3 },
    { name: 'Adaptatif', percentage: 95, category: 'soft', order: 4 },
  ]

  for (const skill of skills) {
    await prisma.skill.create({ data: skill })
  }

  // ===== EXPERIENCES =====
  await prisma.experience.create({
    data: {
      title: 'Développeur Fullstack',
      company: 'Optera',
      type: 'alternance',
      location: 'Pays Basque',
      startDate: new Date('2025-09-01'),
      current: true,
      description: `Après un stage concluant au sein d'Optera, j'ai été recruté en alternance pour contribuer à l'intégration et à l'amélioration de leur application web interne. J'interviens sur le développement front-end et back-end en utilisant Nuxt.js et Django. Mon rôle inclut l'optimisation des fonctionnalités existantes, l'intégration de nouvelles interfaces et la participation active aux rituels agiles de l'équipe.`,
      technologies: JSON.stringify(['Nuxt.js', 'Django', 'Python', 'JavaScript', 'Scrum']),
      order: 1,
    },
  })

  await prisma.experience.create({
    data: {
      title: 'Développeur Fullstack',
      company: 'Optera',
      type: 'stage',
      location: 'Pays Basque',
      startDate: new Date('2025-04-01'),
      endDate: new Date('2025-06-15'),
      current: false,
      description: `Stage de 10 semaines en tant que développeur fullstack. J'ai participé à l'amélioration de leur application web interne, en intervenant aussi bien sur le back-end que sur le front-end. J'ai également été intégré au fonctionnement de l'équipe en prenant part aux différents rituels Scrum, ce qui m'a permis de développer mes compétences techniques et ma compréhension des méthodologies agiles.`,
      technologies: JSON.stringify(['Nuxt.js', 'Django', 'Python', 'JavaScript', 'Scrum']),
      order: 2,
    },
  })

  // ===== EDUCATION =====
  await prisma.education.create({
    data: {
      degree: 'BUT Informatique - Parcours Développement',
      school: 'IUT de Bayonne et du Pays Basque',
      location: 'Anglet',
      startDate: new Date('2023-09-01'),
      current: true,
      description: `Formation complète en informatique couvrant la gestion de projet, les réseaux, les bases de données et le développement. Découverte d'une véritable passion pour le développement web à travers de nombreux projets pratiques.`,
      order: 1,
    },
  })

  await prisma.education.create({
    data: {
      degree: 'Baccalauréat Général - Mathématiques & NSI',
      school: 'Lycée Les Iscles',
      location: 'Manosque',
      startDate: new Date('2020-09-01'),
      endDate: new Date('2023-06-30'),
      current: false,
      description: `Parcours général avec options Mathématiques, NSI (Numérique et Sciences Informatiques) et SI (Sciences de l'Ingénieur). Acquisition de bases solides en mathématiques, algorithmique et développement Python. Baccalauréat obtenu avec mention.`,
      order: 2,
    },
  })

  // ===== PROJECTS =====
  await prisma.project.create({
    data: {
      title: 'VHS | Vidéo Home Share',
      slug: 'vhs-video-home-share',
      description: 'Application web responsive complète sur le thème des films et séries, réalisée en équipe de cinq.',
      longDescription: `Pour notre projet principal du 3ème semestre, j'ai participé à la création d'une application web responsive complète sur le thème des films et séries. Réalisé en équipe de cinq, nous avons utilisé de nombreuses technologies et bibliothèques pour créer une plateforme sociale permettant aux utilisateurs de partager leurs avis et découvrir de nouveaux contenus.`,
      imageUrl: '/images/projects/vhs.png',
      githubUrl: 'https://github.com/maximeBourciez/SAE3.01',
      technologies: JSON.stringify(['PHP', 'Twig', 'Bootstrap', 'HTML', 'CSS', 'JavaScript']),
      category: 'web',
      featured: true,
      order: 1,
    },
  })

  await prisma.project.create({
    data: {
      title: 'Paradi de l\'aspi',
      slug: 'paradi-de-laspi',
      description: 'Site e-commerce entièrement fonctionnel avec panier, back-office et optimisation.',
      longDescription: `Dans le cadre de l'apprentissage du langage PHP, j'ai réalisé en duo avec un collègue de l'IUT un site e-commerce entièrement fonctionnel. Le projet inclut un système de panier complet, un back-office pour la gestion des produits et des optimisations de performance.`,
      imageUrl: '/images/projects/paradi.png',
      githubUrl: 'https://github.com/FranzouGame/R3.01_ProjetPhp',
      technologies: JSON.stringify(['PHP', 'Bootstrap', 'CSS', 'HTML']),
      category: 'web',
      featured: false,
      order: 2,
    },
  })

  await prisma.project.create({
    data: {
      title: 'Lecteur de Diaporama',
      slug: 'lecteur-diaporama',
      description: 'Application desktop en C++ avec Qt pour la lecture de diaporamas.',
      longDescription: `Projet réalisé en groupe de 3 où nous avons développé entièrement en C++ une application pour lire des diaporamas en utilisant la programmation orientée objet. Nous avons utilisé la bibliothèque Qt pour l'interface graphique.`,
      imageUrl: '/images/projects/diaporama.png',
      githubUrl: 'https://github.com/FranzouGame/SAE1.01-LecteurDiaporama',
      technologies: JSON.stringify(['C++', 'Qt']),
      category: 'desktop',
      featured: false,
      order: 3,
    },
  })

  await prisma.project.create({
    data: {
      title: 'Application GMAO',
      slug: 'application-gmao',
      description: 'Application de ticketing pour la gestion des réparations de machines.',
      longDescription: `Conception et développement d'une application de ticketing pour la gestion des réparations de machines du département GIM de l'IUT, dans le cadre de ma formation. Cette application permet de suivre l'état des machines et de gérer les demandes de maintenance.`,
      imageUrl: '/images/projects/gmao.png',
      technologies: JSON.stringify(['Python', 'Django', 'Vue.js', 'JavaScript', "HTML", "CSS"]),
      category: 'web',
      featured: true,
      order: 4,
    },
  })

  // ===== SITE SETTINGS =====
  const settings = [
    { key: 'site_title', value: 'François Barlic | Portfolio', type: 'string' },
    { key: 'site_description', value: 'Portfolio de François Barlic - Développeur Fullstack', type: 'string' },
    { key: 'primary_color', value: '#00f5ff', type: 'string' },
    { key: 'secondary_color', value: '#bf00ff', type: 'string' },
    { key: 'show_3d_hero', value: 'true', type: 'boolean' },
    { key: 'particles_count', value: '150', type: 'number' },
  ]

  for (const setting of settings) {
    await prisma.siteSetting.create({ data: setting })
  }

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
