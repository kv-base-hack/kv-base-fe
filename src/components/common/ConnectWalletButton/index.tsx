import { ConnectButton, useWallet } from '@suiet/wallet-kit'

const renderAddress = (address: string) => {
  return (
    <>
      {address.substring(0, 4)}...{address.substring(address.length - 4)}
    </>
  )
}

export const ConnectSuiWalletButton = () => {
  const { disconnect } = useWallet()
  const wallet = useWallet()

  return (
    <div>
      {wallet.connected ? (
        <div
          onClick={() => disconnect()}
          className="bg-[#0080FF] px-6 py-2.5 rounded-[48px]"
          role="button"
        >
          {renderAddress(wallet.address as string)}
        </div>
      ) : (
        <div className="max-w-[130px] flex items-center justify-center overflow-hidden rounded-[48px] h-8 lg:h-auto">
          <ConnectButton>
            <p className="text-[15px] font-bold text-neutral-01 ">
              Connect Wallet
            </p>
          </ConnectButton>
        </div>
      )}
    </div>
  )
}
