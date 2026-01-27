import prisma from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { name, email, subject, message } = body

  if (!name || !email || !message) {
    throw createError({
      statusCode: 400,
      message: 'Nom, email et message sont requis.',
    })
  }

  // Validation email simple
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      message: 'Email invalide.',
    })
  }

  const contact = await prisma.contactMessage.create({
    data: {
      name,
      email,
      subject: subject || null,
      message,
    },
  })

  return {
    success: true,
    message: 'Message envoyé avec succès !',
    id: contact.id,
  }
})
