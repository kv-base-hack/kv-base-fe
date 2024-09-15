import { nFormatter } from "@/lib/utils/nFormatter";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { ImageToken } from "@/components/common/Image/ImageToken";
import Link from "next/link";
import { useMemo } from "react";
import { DataTable } from ".";
import { TableProps } from "@/types";
import numeral from "numeral";
import { UnusualBuy } from "@/types/unusualBuy";
import { DialogNumberOfSmartMoney } from "../Dialog/DialogNumberOfSmartMoney";
import { TooltipTable } from "../Tooltip/TooltipTable";
import { TooltipToken } from "../Tooltip/tooltip-token";

export const TableFreshUnusualBuy = ({
  page,
  perPage,
  data,
  isFetching,
  duration,
  setSortBy,
}: TableProps) => {
  const columns: ColumnDef<UnusualBuy>[] = useMemo(() => {
    return [
      {
        accessorKey: "id",
        header: () => (
          <div className="text-[15px] font-medium not-italic leading-6 tracking-[-0.14px]">
            #
          </div>
        ),
        cell: ({ row }) => {
          return (
            <div className="font-medium">
              {row.index + 1 + (page - 1) * perPage}
            </div>
          );
        },
        size: 50,
      },
      {
        accessorKey: "symbol",
        header: () => (
          <div className="whitespace-nowrap text-[15px] font-medium not-italic leading-6 tracking-[-0.14px]">
            Token Name
          </div>
        ),
        cell: ({ row }) => {
          return (
            <TooltipToken data={row?.original}>
              <div className="flex w-full items-center justify-start">
                {row?.original?.address ? (
                  <Link
                    href={`/smartmoney-onchain/token-explorer/${row?.original?.address}`}
                  >
                    <div className="flex w-full items-center justify-start gap-1.5">
                      <ImageToken
                        imgUrl={row?.original?.image_url}
                        symbol={row?.original?.symbol}
                      />
                      <div className="text-normal max-w-[100px] truncate font-medium text-neutral-300 underline">
                        {row?.original?.symbol}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="flex w-full cursor-not-allowed items-center justify-start gap-1.5">
                    <ImageToken
                      imgUrl={row?.original?.image_url}
                      symbol={row?.original?.symbol}
                    />
                    <div className="text-normal font-medium text-neutral-300 underline">
                      {row?.original?.symbol}
                    </div>
                  </div>
                )}
              </div>
            </TooltipToken>
          );
        },
      },
      {
        accessorKey: "age",
        header: () => (
          <div
            className="whitespace-nowrap text-[15px] font-medium not-italic leading-6 tracking-[-0.14px]"
            onClick={() => setSortBy("price_change")}
            role="button"
          >
            Token Age
          </div>
        ),
        cell: ({ row }) => {
          const { token_age } = row.original;
          return (
            <div className="whitespace-nowrap font-medium text-neutral-03">
              {token_age}
            </div>
          );
        },
        align: "start",
      },
      {
        accessorKey: "price",
        header: () => (
          <div
            className="whitespace-nowrap text-[15px] font-medium not-italic leading-6 tracking-[-0.14px]"
            onClick={() => setSortBy("price_change")}
            role="button"
          >
            24h%
          </div>
        ),
        cell: ({ row }) => {
          const { price_change_24h } = row.original;
          return price_change_24h ? (
            <div
              className={cn(
                "flex items-center font-medium leading-[140%]",
                price_change_24h > 0 ? "text-green" : "text-error-500",
                price_change_24h === 0 && "text-neutral-03",
              )}
            >
              {price_change_24h > 0 ? "+" : ""}
              {numeral(price_change_24h).format("0,0.[00]")}%
            </div>
          ) : (
            "-"
          );
        },
        align: "start",
      },

      {
        accessorKey: "buy_volumn",
        header: () => (
          <div
            className="whitespace-nowrap text-[15px] font-medium not-italic leading-6 tracking-[-0.14px]"
            onClick={() => setSortBy("total_spent")}
            role="button"
          >
            Buy Vol
          </div>
        ),
        cell: ({ row }) => {
          const { total_spent } = row.original;
          return (
            <div className="w-full items-center justify-start font-medium text-neutral-300">
              ${nFormatter(total_spent)}
            </div>
          );
        },
        align: "start",
      },
      {
        accessorKey: "pnl",
        header: () => (
          <div
            className="whitespace-nowrap text-[15px] font-medium not-italic leading-6 tracking-[-0.14px]"
            onClick={() => setSortBy("pnl")}
            role="button"
          >
            Profit
          </div>
        ),
        cell: ({ row }) => {
          const { pnl } = row.original;
          return pnl === 0 ? (
            "-"
          ) : (
            <div
              className={cn(
                pnl < 0 ? "text-error-500" : "text-green",
                "font-medium",
              )}
            >
              $
              {(pnl < 0.001 && pnl > 0) || (pnl > -0.001 && pnl < 0)
                ? numeral(pnl).format("0,0.[000000]")
                : nFormatter(pnl)}
            </div>
          );
        },
        align: "start",
      },
      {
        accessorKey: "buyer_count",
        header: () => (
          <div className="flex items-center gap-0.5">
            <div className="w-full whitespace-nowrap text-center text-[15px] font-medium not-italic leading-6 tracking-[-0.14px]">
              # Wallet
            </div>
            <TooltipTable type="numberOfSMBuy" />
          </div>
        ),
        cell: ({ row }) => {
          const { number_of_users, address } = row.original;
          return (
            <DialogNumberOfSmartMoney
              number={number_of_users}
              address={address}
              type="unusual-buy"
              duration={duration as string}
            />
          );
        },
        align: "center",
      },
    ];
  }, [duration, page, perPage, setSortBy]);
  return (
    <DataTable
      className="bg-neutral-06 bg-neutral-07/50 text-xs font-bold leading-4 tracking-normal text-gray-300"
      columns={columns}
      data={data || []}
      isFetching={isFetching}
      noneBorder
      noneBgHeader
      emptyData="No results."
    />
  );
};
