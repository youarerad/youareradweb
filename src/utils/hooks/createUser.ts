import { Prisma } from '@prisma/client'
interface UserBaseData
  extends Prisma.DonationDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined> {
  name: string
  email: string
  amount: number
  customer_id: string
  payment_method: 'STRIPE'
  payment_status: 'SUCCESS' | 'FAILURE'
  payment_type: 'ONETIME' | 'MONTHLY'
  User: {
    connectOrCreate: {
      where: {
        email: string
      }
      create: {
        email: string
        name: string
      }
    }
  }
}
