import { useEffect, useRef } from 'react'

export const IntegratedTerminal = () => {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    // const config = {
    //   defaultSwapPair: {
    //     dataPay: {
    //       type: '0x6dae8ca14311574fdfe555524ea48558e3d1360d1607d1c7f98af867e3b7976c::flx::FLX',
    //       symbol: 'FLX',
    //       iconUrl:
    //         'https://ipfs.io/ipfs/bafkreig53olo3ewrkph3hfrhjuwvuj53pmbntl2cwxd4zlyfnj5eznoxcu',
    //       decimals: 8,
    //       name: 'FlowX Token',
    //     },
    //     dataReceive: {
    //       decimals: 9,
    //       iconUrl:
    //         'https://assets.coingecko.com/coins/images/26375/small/sui_asset.jpeg',
    //       name: 'Sui',
    //       symbol: 'SUI',
    //       type: '0x2::sui::SUI',
    //     },
    //   },
    // }
    const root = window.FlowXInitial(ref.current)
    return () => {
      root.unmount()
    }
  }, [])

  return <div ref={ref} />
}
