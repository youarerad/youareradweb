import { DonateMonthlyConfig } from './DonateConfig'
import { useState } from 'react'
import DonateTwitchSub from './DonateTwitchSub'
import getStripe from '@utils/hooks/getStripe'
import { trpc } from '@libs/trpc'
import PrimaryButton from '@components/PrimaryButton'
import AppRadioGroup from './AppRadioGroup'

export default function DonateMonthly() {
  const [currentOption, setCurrentOption] = useState<number>(0)
  const selectedOption = DonateMonthlyConfig[currentOption]
  const { isLoading, ...createCheckout } = trpc.useMutation('create-monthly-donation')

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
        <div className="grid grid-cols-3 gap-4 mb-4">
          <AppRadioGroup
            value={currentOption}
            onChange={setCurrentOption}
            options={DonateMonthlyConfig.map((option, index) => ({
              label: option.priceLabel,
              value: index,
            }))}
            className="contents"
          />
          <DonateTwitchSub />
          <p className="col-span-3">
            Your donation of <span className="font-bold">{selectedOption.priceLabel}</span>{' '}
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
