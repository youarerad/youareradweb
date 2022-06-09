import prisma from '@libs/prisma'

/* create-contact contains our core router functions for sending contact data to our database. Each function outlines what information is expected from the database, as well as what the type definition for this information is. To work correctly, the variable within the .insert function of supabase must match the name of the column contained within the targeted supabase database. For example, there is a table named contactform, which has the following columns: name, email, department, and message. Any mismatch of column name or type definition will result in an error. */

export async function createNewsletterForm(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })
  if (user) {
    return user
  }
  await prisma.user.create({
    data: {
      email: email,
      newsletter: true,
    },
  })
}
