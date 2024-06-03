export interface PriceWithTransferData {
  price_with_transfer: PriceWithTransfer
}

export interface PriceWithTransfer {
  [key: string]: Data
}

export interface Data {
  date: string
  deposit: number
  withdraw: number
  price: number
}

export interface PriceWithTransferResponse {
  data: PriceWithTransferData
}
