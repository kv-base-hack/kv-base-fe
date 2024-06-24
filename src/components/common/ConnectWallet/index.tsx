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
              className="z-50 relative flex flex-row justify-center items-center cursor-pointer"
            >
              {(() => {
                if (!connected) {
                  return (
                    <div className="flex flex-col flex-1 justify-center items-stretch text-[15px] leading-6 font-bold tracking-wide  whitespace-nowrap bg-[#0C68E9] rounded-full">
                      <div
                        id="connect-button"
                        className="justify-center items-stretch px-4 py-2 rounded-[360px]"
                      >
                        Connect Wallet
                      </div>
                    </div>
                  )
                }
                if (chain.unsupported) {
                  return (
                    <div className="z-20 text-[15px] leading-6 font-bold text-white">
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
              className="z-50 relative md:px-4 md:py-3 hover:cursor-pointer flex items-center justify-center md:gap-x-[10px] gap-x-1.5 bg-[#0C68E9] rounded-full"
            >
              <div className="z-20 font-bold text-neutral-7">
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
