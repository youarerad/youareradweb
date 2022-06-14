import prisma from '@libs/prisma'

/* create-contact contains our core router functions for sending contact data to our database. Each function outlines what information is expected from the database, as well as what the type definition for this information is. To work correctly, the variable within the .insert function of supabase must match the name of the column contained within the targeted supabase database. For example, there is a table named contactform, which has the following columns: name, email, department, and message. Any mismatch of column name or type definition will result in an error. */

export async function createNewsletterForm(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })
  if (user) {
    return {
      message: 'You are already subscribed!',
    }
  }
  await prisma.user.create({
    data: {
      email: email,
      newsletter: true,
    },
  })
  return {
    message: 'Subscribed!',
  }
}

export async function createVolunteerForm(
  name: string,
  email: string,
  position: string,
  experience: string,
  message: string
) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })
  if (user) {
    await prisma.user.update({
      where: { email: email },
      data: {
        name: name,
        Volunteer: {
          upsert: {
            where: {
              id: user.id,
            },
            create: {
              name: name,
              email: email,
              position: position,
              experience: experience,
              message: message,
            },
            update: {
              name: name,
              email: email,
              position: position,
              experience: experience,
              message: message,
            },
          },
        },
      },
    })
  }
  if (!user) {
    await prisma.user.create({
      data: {
        name: name,
        email: email,
        newsletter: true,
        Volunteer: {
          create: {
            name: name,
            email: email,
            position: position,
            experience: experience,
            message: message,
          },
        },
      },
    })
  }
  return { message: 'Form Sent!' }
}

export async function createPartnerForm(
  name: string,
  email: string,
  company: string,
  type: string,
  message: string
) {
  await prisma.partner.create({
    data: {
      name: name,
      email: email,
      company: company,
      type: type,
      message: message,
    },
  })
  return { message: 'Form Sent!' }
}

export async function createContactForm(
  name: string,
  email: string,
  department: string,
  message: string
) {
  await prisma.contact.create({
    data: {
      name: name,
      email: email,
      department: department,
      message: message,
    },
  })
  return { message: 'Form Sent!' }
}
