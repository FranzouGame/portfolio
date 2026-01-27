import prisma from '~/server/utils/prisma'

export default defineEventHandler(async () => {
  const profile = await prisma.profile.findFirst()
  return profile
})
