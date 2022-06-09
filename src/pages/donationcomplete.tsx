import { trpc } from '@libs/trpc'
import { useRouter } from 'next/router'

export default function Donationcomplete() {
  const date = new Date()
  const router = useRouter()
  const session_id = router.query['session_id'] as string
  const { data } = trpc.useQuery(['get-session', { session_id }], {
    suspense: true,
  })
  return (
    <div>
      {data?.customer_details?.name}
      <div></div>
    </div>
  )
}
