import { Form } from '@unform/web'
import { SubmitHandler, FormHandles } from '@unform/core'
import DonationOptions from './DonationOptions'
import PrimaryButton from '@components/PrimaryButton'

interface DonateOptions {
  priceString: string
  priceLabel: string
  priceId: number
  message: string
}

type SelectDonateOption = {
  options: Array<DonateOptions>
}

const handleSubmit: SubmitHandler<{ priceId: number }> = async (data) => {
  console.log(data)
}

export default function DonateForm({ options }: SelectDonateOption) {
  const selectedOption = options

  return (
    <Form onSubmit={handleSubmit} className="space-y-4">
      <DonationOptions options={options} />
      <PrimaryButton type="submit" buttonText="Donate Now" />
    </Form>
  )
}
