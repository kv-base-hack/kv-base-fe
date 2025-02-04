import { SelectChain } from "@/components/common/SelectChain";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchComp } from "../Search";
import MenuIcon from "@/components/shared/icons/onchain/MenuIcon";
import { ButtonConnectWallet } from "../ConnectWallet";
import { useAtomValue } from "jotai";
import { chainAtom } from "@/atom/chain";
import { Suspense } from "react";
import { MENU } from "@/constant/menu";
import { useWindowSize } from "react-use";

export const Header = ({
  navbarOpen,
  setNavbarOpen,
}: {
  navbarOpen: boolean;
  setNavbarOpen: (value: boolean) => void;
}) => {
  const pathname = usePathname();
  const { width } = useWindowSize();
  const CHAIN = useAtomValue(chainAtom);

  return (
    <div className="flex items-center justify-between gap-3 bg-header px-4 py-2 max-md:px-5 md:gap-5">
      <div>
        <Link href="/" className="flex items-center gap-2">
          <Image
            loading="lazy"
            src="/assets/images/logo.svg"
            className="w-[36px] shrink-0"
            width={36}
            height={41}
            alt="logo"
          />
          <p className="font-sora hidden md:block lg:hidden bg-conic-gradient-logo bg-clip-text text-[30px] font-medium leading-10 text-transparent xl:block ">
            KAIVEST
          </p>
        </Link>
      </div>

      <div className="leading-6 max-md:flex-wrap hidden w-full gap-5 xl:gap-8 px-0 xl:px-2 py-1.5 text-base font-medium max-md:px-5 lg:flex md:justify-center">
        {MENU.map((i) => {
          const isActive = pathname.includes(i.url?.split("?")[0]);
          return (
            <MenuItem
              key={i.url}
              url={i.url}
              menu={i.menu}
              isActive={isActive}
            />
          );
        })}
        <div className="flex w-1/3 justify-end">
          <SearchComp />
        </div>
      </div>

      <div className="flex items-center gap-4 w-fit pr-4">
        <div className="flex shrink-0 items-stretch justify-between gap-4">
          <Suspense fallback={<div>Loading...</div>}>
            <SelectChain size="lg" showName={false} />
          </Suspense>
        </div>
        {width > 1023 && <ButtonConnectWallet />}
        <div className="flex items-center justify-center !rounded-full bg-[#0080FF]">
          <div
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="flex h-8 w-8 items-center justify-center overflow-visible rounded-full lg:hidden"
            role="button"
          >
            <MenuIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({
  menu,
  url,
  isActive,
}: {
  menu: string;
  url: string;
  isActive: boolean;
}) => {
  return (
    <Link
      href={url}
      className={cn(
        "my-auto !cursor-pointer self-stretch whitespace-nowrap",
        isActive ? "text-core" : "text-disabled",
      )}
    >
      {menu}
    </Link>
  );
};
