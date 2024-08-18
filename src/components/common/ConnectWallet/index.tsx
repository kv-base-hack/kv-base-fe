import { ConnectButton } from '@rainbow-me/rainbowkit'

export const ButtonConnectWallet = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated')
        const handelOpenModal = () => {
          if (!connected) {
            openConnectModal()
          }
          if (chain?.unsupported) {
            openChainModal()
          }
          openAccountModal()
        }
        if (!connected || chain?.unsupported) {
          return (
            <div
              onClick={handelOpenModal}
              className="relative z-50 flex cursor-pointer flex-row items-center justify-center"
            >
              {(() => {
                if (!connected) {
                  return (
                    <div className="flex flex-1 flex-col items-stretch justify-center whitespace-nowrap rounded-full bg-[#0C68E9] text-[15px] font-bold leading-6 tracking-wide">
                      <div
                        id="connect-button"
                        className="items-stretch justify-center rounded-[360px] px-4 py-2"
                      >
                        Connect Wallet
                      </div>
                    </div>
                  )
                }
                if (chain.unsupported) {
                  return (
                    <div className="z-20 text-[15px] font-bold leading-6 text-white">
                      Wrong network
                    </div>
                  )
                }
              })()}
            </div>
          )
        } else {
          return (
            <div
              onClick={handelOpenModal}
              className="relative z-50 flex items-center justify-center gap-x-1.5 rounded-full bg-[#0C68E9] hover:cursor-pointer md:gap-x-[10px] md:px-4 md:py-3"
            >
              <div className="text-neutral-7 z-20 font-bold">
                {account.address.substring(0, 6)}...
                {account.address.substring(
                  account.address.length - 4,
                  account.address.length,
                )}
              </div>
            </div>
          )
        }
      }}
    </ConnectButton.Custom>
  )
}
