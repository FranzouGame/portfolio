import prisma from '~/server/utils/prisma'

export default defineEventHandler(async () => {
  const education = await prisma.education.findMany({
    orderBy: { order: 'asc' },
  })
  
  return education
})
