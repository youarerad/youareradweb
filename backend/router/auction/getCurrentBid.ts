import { supabase } from '@libs/supabase'

export default async function getCurrentBid(item: string) {
	const data = await supabase.from('Bids').select(`item, amount`).eq('item', item).single()
	return data
}
