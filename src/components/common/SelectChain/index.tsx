export const SelectChain = () => {
  return (
    <div className="flex gap-2 px-4 py-3 my-auto text-base font-semibold tracking-normal leading-6 text-gray-300 whitespace-nowrap border border-solid backdrop-blur-[50px] bg-zinc-900 bg-opacity-50 border-[color:var(--grayscale-white-10,rgba(255,255,255,0.10))] rounded-[360px]">
      <div className="flex gap-2 justify-between">
        <img
          loading="lazy"
          src="/assets/icons/chain/ethereum.svg"
          className="object-center w-6 aspect-square"
        />
        <div className="grow">Ethereum Chain</div>
      </div>

      <img
        loading="lazy"
        src="/assets/icons/arrow-down.svg"
        className="object-center justify-center items-center my-auto w-5 aspect-square"
      />
    </div>
  )
}
