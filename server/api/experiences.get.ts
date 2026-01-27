import prisma from '~/server/utils/prisma'

export default defineEventHandler(async () => {
  const experiences = await prisma.experience.findMany({
    orderBy: { order: 'asc' },
  })

  return experiences.map((exp) => ({
    ...exp,
    technologies: exp.technologies ? JSON.parse(exp.technologies) : [],
  }))
})
