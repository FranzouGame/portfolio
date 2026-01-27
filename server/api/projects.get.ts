import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const featured = query.featured === 'true'
  const category = query.category as string | undefined

  const projects = await prisma.project.findMany({
    where: {
      ...(featured ? { featured: true } : {}),
      ...(category ? { category } : {}),
    },
    orderBy: { order: 'asc' },
  })

  // Parse technologies JSON
  return projects.map((project) => ({
    ...project,
    technologies: JSON.parse(project.technologies),
  }))
})
