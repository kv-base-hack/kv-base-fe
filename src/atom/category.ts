import { ActiveTab } from '@/components/pages/gem-analytics/tabs/types'
import { atom } from 'jotai'

export const categoryAtom = atom<ActiveTab>('SM New Listing Buys')
