import { atom } from 'jotai'

export const gemFilterAtom = atom({
  min24hPrice: 0,
  max24hPrice: 0,
  minMarketcap: 0,
  maxMarketcap: 0,
  minTVL: 0,
  maxTVL: 0,
  minFDV: 0,
  maxFDV: 0,
  min24hVolumn: 0,
  max24hVolumn: 0,
  minCexNetflow: 0,
  maxCexNetflow: 0,
})
