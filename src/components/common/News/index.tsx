import Image from 'next/image'

export const News = () => {
  return (
    <div className="flex flex-col rounded-lg border border-solid border-white/10 bg-neutral-07 bg-opacity-30 p-6 text-xl font-semibold leading-7 tracking-tight text-neutral-01 shadow-2xl backdrop-blur-lg max-md:px-5">
      <div className="leading-8 max-md:max-w-full">
        ZA Bank: It has received approval from regulatory authorities and is
        preparing to launch trading services such as US stocks and ETFs.
      </div>
      <div className="mt-2 flex justify-center gap-1 self-start whitespace-nowrap rounded border border-solid border-neutral-06 p-0.5 text-xs font-bold tracking-normal text-gray-500">
        <Image
          alt="customer"
          loading="lazy"
          src="/assets/icons/customer.png"
          className="aspect-square w-5"
          width={20}
          height={20}
        />
        <div className="my-auto grow">
          4 minutes ago Foresight News and 2 more media reports
        </div>
      </div>
      <div className="mt-8 leading-[160%] max-md:max-w-full">
        Raydium now supports OKX Web3 wallet
      </div>
      <div className="mt-2 flex justify-center gap-1 self-start whitespace-nowrap rounded border border-solid border-neutral-06 p-0.5 text-xs font-bold tracking-normal text-gray-500">
        <Image
          alt="customer"
          loading="lazy"
          src="/assets/icons/customer.png"
          className="aspect-square w-5"
          width={20}
          height={20}
        />
        <div className="my-auto grow">
          7 minutes ago Foresight News and 2 more media reports
        </div>
      </div>
      <div className="mt-8 leading-[160%] max-md:max-w-full">
        Coinbase will suspend Polymath (POLY) trading on December 6
      </div>
      <div className="mt-2 flex justify-center gap-1 self-start whitespace-nowrap rounded border border-solid border-neutral-06 p-0.5 text-xs font-bold tracking-normal text-gray-500">
        <Image
          alt="customer"
          loading="lazy"
          src="/assets/icons/customer.png"
          className="aspect-square w-5"
          width={20}
          height={20}
        />
        <div className="my-auto grow">
          4 minutes ago Foresight News and 2 more media reports
        </div>
      </div>
      <div className="mt-8 leading-[160%] max-md:max-w-full">
        Data: Huang Licheng’s address has purchased over 380,000 BLUR for pledge
      </div>
      <div className="mt-2 flex justify-center gap-1 self-start whitespace-nowrap rounded border border-solid border-neutral-06 p-0.5 text-xs font-bold tracking-normal text-gray-500">
        <Image
          alt="customer"
          loading="lazy"
          src="/assets/icons/customer.png"
          className="aspect-square w-5"
          width={20}
          height={20}
        />
        <div className="my-auto grow">
          4 minutes ago Foresight News and 2 more media reports
        </div>
      </div>
      <div className="mt-8 leading-[160%] max-md:max-w-full">
        Data: Huang Licheng’s address has purchased over 380,000 BLUR for pledge
      </div>
      <div className="mt-2 flex justify-center gap-1 self-start whitespace-nowrap rounded border border-solid border-neutral-06 p-0.5 text-xs font-bold tracking-normal text-gray-500">
        <Image
          alt="customer"
          loading="lazy"
          src="/assets/icons/customer.png"
          className="aspect-square w-5"
          width={20}
          height={20}
        />
        <div className="my-auto grow">
          4 minutes ago Foresight News and 2 more media reports
        </div>
      </div>
    </div>
  )
}
