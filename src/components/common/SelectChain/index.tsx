type SelectChainProps = {
  name: string
}

export const SelectChain: React.FC<SelectChainProps> = ({ name }) => {
  return (
    <div className="flex gap-2 px-4 py-3 my-auto text-base font-semibold tracking-normal leading-6 text-gray-300 whitespace-nowrap border border-solid backdrop-blur-[50px] bg-neutral-07 bg-opacity-50 border-white/10 rounded-[360px]">
      <div className="flex gap-2 justify-between">
        <img
          loading="lazy"
          src="/assets/icons/chain/ethereum.svg"
          className="object-center w-6 aspect-square"
        />
        <div className="grow">{name}</div>
      </div>

      <img
        loading="lazy"
        src="/assets/icons/arrow-down.svg"
        className="object-center justify-center items-center my-auto w-5 h-5 aspect-square"
      />
    </div>
  )
}
