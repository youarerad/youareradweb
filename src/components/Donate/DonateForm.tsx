import { Form } from '@unform/web'
import { SubmitHandler, FormHandles } from '@unform/core'
import DonationOptions from './DonationOptions'

interface DonateOptions {
  priceString: string
  priceLabel: string
  priceId: number
  message: string
}

type SelectDonateOption = {
  options: Array<DonateOptions>
}

const handleSubmit: SubmitHandler<{ amount: number }> = async (data) => {
  console.log(data)
}

export default function DonateForm({ options }: SelectDonateOption) {
  const selectedOption = options

  return (
    <Form onSubmit={handleSubmit}>
      <DonationOptions options={options} />
    </Form>
  )
}
