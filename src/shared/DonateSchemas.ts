export type DonationFrequency = 'one-time' | 'monthly'

export interface DonorDetailProps {
	name: { fname: string; lname: string }
	contact: { email: string; phone: string }
	address: {
		line1: string
		line2: string
		city: string
		state: string
		zip: string
		country: string
	}
	frequency: DonationFrequency
	amount: number
}
