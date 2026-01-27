import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const category = query.category as string | undefined

  const skills = await prisma.skill.findMany({
    where: category ? { category } : undefined,
    orderBy: { order: 'asc' },
  })
  
  return skills
})
