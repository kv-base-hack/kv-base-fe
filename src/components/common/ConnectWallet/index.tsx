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
              className="z-50 relative flex flex-row justify-center items-center cursor-pointer gap-6 md:px-4 md:py-3 px-2 py-1 rounded-full md:gap-2.5 text-white md:text-paragraph-1 text-paragraph-2 font-bold">
              {(() => {
                if (!connected) {
                  return (
                    <div className="flex flex-col flex-1 justify-center items-stretch text-base font-bold tracking-wide leading-6 uppercase whitespace-nowrap bg-yellow-200 rounded-xl text-zinc-800">
                      <div
                        id="connect-button"
                        className="justify-center font-source-sans-pro items-stretch px-4 py-3 bg-white bg-opacity-10 rounded-[360px]">
                        Connect Wallet
                      </div>
                    </div>
                  )
                }
                if (chain.unsupported) {
                  return (
                    <div className="z-20 text-base font-bold text-white font-inter">
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
              className="z-50 relative md:px-4 md:py-3 hover:cursor-pointer flex items-center justify-center md:gap-x-[10px] gap-x-1.5">
              <div className="z-20 font-bold text-neutral-7">
                {account.address.substring(0, 6)}...
                {account.address.substring(account.address.length - 4, account.address.length)}
              </div>
            </div>
          )
        }
      }}
    </ConnectButton.Custom>
  )
}
