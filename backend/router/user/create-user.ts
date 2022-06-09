import prisma from '@libs/prisma'

export async function createUserOneTimeDonation(
  name: string,
  email: string,
  amount: number,
  customer_id: string
) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })
  if (user) {
    prisma.donation.create({
      data: {
        user: user.email,
        amount: amount,
        payment_method: 'STRIPE',
        payment_type: 'ONETIME',
      },
    })
  }
  await prisma.user.create({
    data: {
      email: email,
      customer_id: customer_id,
      name: name,
      Donation: {
        create: {
          amount: amount,
          payment_method: 'STRIPE',
          payment_type: 'ONETIME',
        },
      },
    },
  })
}
