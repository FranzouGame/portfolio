export interface ProfileData {
  name: string
  title: string
  subtitle: string | null
  bio: string
  email: string
  location: string | null
  phone: string | null
  githubUrl: string | null
  linkedinUrl: string | null
  instagramUrl: string | null
}

export interface SkillData {
  id: number
  name: string
  percentage: number
  category: string
}

export interface ProjectData {
  id: number
  title: string
  slug: string
  description: string
  longDescription: string | null
  imageUrl: string | null
  githubUrl: string | null
  liveUrl: string | null
  technologies: string[]
  category: string
  featured: boolean
}

export interface ExperienceData {
  id: number
  title: string
  company: string
  location: string | null
  type: string
  startDate: string
  endDate: string | null
  current: boolean
  description: string
  technologies: string[]
}

export interface EducationData {
  id: number
  degree: string
  school: string
  location: string | null
  startDate: string
  endDate: string | null
  current: boolean
  description: string
}
