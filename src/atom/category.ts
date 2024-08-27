import { ActiveTab } from '@/components/pages/gem-analytics/tabs/types'
import { atom } from 'jotai'

export const categoryAtom = atom<ActiveTab>('ST New Listing Buys')
