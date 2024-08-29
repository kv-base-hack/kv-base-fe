export interface DataTokenInfo {
  info: TokenInfo
}

export interface TokenInfo {
  name: string
  symbol: string
  circulating_supply: number
  total_supply: number
  max_supply: number
  usd_price: number
  market_cap: number
  tags: any
  volume_24h: number
  fully_diluted_valuation: number
  percent_change_1h: number
  percent_change_24h: number
  percent_change_7d: number
  token_address: string
  liquidity: number
  pair_address: string
  image_url: string
  avg_price_smart_money: number
  number_of_smart_money_hold: number
  number_of_unusual_buy: number
  buy_volume: number
  sell_volume: number
  trade_1h: Trade1h
  trade_2h: Trade2h
  trade_6h: Trade6h
  trade_24h: Trade24h
  websites: string[]
  discord_url: string
  telegram_handle: string
  twitter_handle: string
  price_change_m5: number
  price_change_h2: number
  price_change_h4: number
  price_change_h6: number
  token_age: string
  source_price: string
  score: number
  token_action: string
}

export interface Trade1h {
  buy_volume: number
  sell_volume: number
  number_of_unusual_buy: number
}

export interface Trade2h {
  buy_volume: number
  sell_volume: number
  number_of_unusual_buy: number
}

export interface Trade6h {
  buy_volume: number
  sell_volume: number
  number_of_unusual_buy: number
}

export interface Trade24h {
  buy_volume: number
  sell_volume: number
  number_of_unusual_buy: number
}

export interface TokenInfoResponse {
  data: DataTokenInfo
}
