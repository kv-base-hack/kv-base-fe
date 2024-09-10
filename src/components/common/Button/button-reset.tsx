import Image from "next/image";

export function ButtonReset({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex h-7 w-auto cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[360px] border border-solid border-[#656565] px-4 text-sm font-medium leading-6 tracking-normal text-white bg-transparent"
    >
      Reset <Image src="/rotate.svg" alt="rotate" width={12} height={12} />
    </button>
  );
}
