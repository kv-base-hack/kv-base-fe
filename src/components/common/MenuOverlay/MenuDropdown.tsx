"use client";

import ArrowRightIcon from "@/components/shared/icons/ArrowRight";
import MenuArrowDownIcon from "@/components/shared/icons/MenuArrowDown";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";

export const MenuDropdown = ({
  title,
  data,
  isActive,
  setNavbarOpen,
}: {
  title: string;
  data: any;
  isActive: boolean;
  setNavbarOpen: (open: boolean) => void;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => {
    setOpen(false);
  });

  return (
    <div className="relative z-50">
      <div
        onClick={() => setOpen(!open)}
        className={cn(
          "flex cursor-pointer items-center gap-2 justify-center self-stretch px-3 py-2 whitespace-nowrap",
          isActive ? "rounded-3xl backdrop-blur-[50px] bg-white/20" : ""
        )}
      >
        <div>{title}</div>
        {open ? <MenuArrowDownIcon /> : <ArrowRightIcon />}
      </div>
      <div className="mt-1.5">
        {open ? (
          <div
            ref={ref}
            className="border shadow-box p-2 bg-neutral-07 rounded-2xl border-solid border-white/20 text-left"
          >
            {data?.map((item: any, idx: number) => (
              <Link
                key={idx}
                onClick={() => {
                  setNavbarOpen(false);
                  setOpen(false);
                }}
                href={item?.href}
              >
                <div
                  key={item?.title}
                  className="cursor-pointer rounded-2xl hover:bg-neutral-06 px-4 py-2"
                >
                  {item?.title}
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
