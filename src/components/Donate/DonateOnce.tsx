import { DonateOnceConfig } from './DonateConfig'
import { useState } from 'react'
import RadioButton from './RadioButton'
import getStripe from '@utils/hooks/getStripe'
import { trpc } from '@libs/trpc'
import PrimaryButton from '@components/PrimaryButton'
import DonateCustomInput from './DonateCustomInput'

export default function DonateOnce() {
  const [currentOption, setCurrentOption] = useState<number>(0)
  const [customAmount, setCustomAmount] = useState<number | undefined>(undefined)
  const selectedOption = customAmount
    ? {
        priceId: customAmount * 100,
        message: ` will cover ${Math.floor(customAmount / 30)} therapy sessions.`,
      }
    : DonateOnceConfig[currentOption]
  const { isLoading, ...createCheckout } = trpc.useMutation('create-onetime-donation')

  const handleDonationSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    const response = await createCheckout.mutateAsync({
      priceId: selectedOption.priceId,
    })

    const stripe = await getStripe()
    if (stripe != null) {
      await stripe.redirectToCheckout({
        sessionId: response.id,
      })
    }
  }

  return (
    <>
      <form onSubmit={handleDonationSubmit}>
        <div className="grid grid-cols-3 gap-4">
          {DonateOnceConfig.map((option, index) => (
            <RadioButton
              key={option.priceLabel}
              id={option.priceLabel}
              value={option.priceLabel}
              checked={!customAmount && currentOption === index}
              onChange={() => {
                setCurrentOption(index)
                setCustomAmount(undefined)
              }}
            />
          ))}
          <DonateCustomInput
            value={customAmount}
            onChange={(e) => setCustomAmount(e.currentTarget.valueAsNumber)}
          />
          <p className="col-span-3">
            Your donation of{' '}
            <span className="font-bold">{'$' + (selectedOption.priceId / 100).toFixed(0)}</span>
            {selectedOption.message}
          </p>
        </div>
        <PrimaryButton
          buttonText={isLoading ? 'Loading' : 'Donate Now'}
          type="submit"
          disabled={isLoading}
        />
      </form>
    </>
  )
}
