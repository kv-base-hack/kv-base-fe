import CircularProgress from "@/components/common/CircularProgress";
import { ImageToken } from "@/components/common/Image/ImageToken";
import PercentDownIcon from "@/components/shared/icons/PercentDownIcon";
import PercentUpIcon from "@/components/shared/icons/PercentUpIcon";
import { cn } from "@/lib/utils";
import { nFormatter } from "@/lib/utils/nFormatter";
import { renderPrice } from "@/lib/utils/renderPrice";
import { checkScoreToken } from "@/utils/checkScoreToken";
import numeral from "numeral";

type CardInfoTopTokenProps = {
  token: any;
  type: "hold" | "buy";
  view: "token" | "chart";
  color?: string;
};

export const CardInfoTopToken = ({
  token,
  type,
  view,
  color = "#00FFF0",
}: CardInfoTopTokenProps) => {
  const {
    image_url,
    token_image_url,
    symbol,
    score,
    avg_price,
    avg_cost,
    hold_in_usdt,
    pnl,
    realized_percent,
    number_of_smart_money_hold,
    number_of_smart_money,
    percent,
    price_change_24h,
    price_percent_change_24h,
    current_price,
    realized,
    total_profit,
    price_change_h24,
    number_of_users,
    usd_price,
    price,
    avg_entry_buy,
    tx,
    priceChangeH24,
    imgUrl,
  } = token;

  const percentChange =
    price_percent_change_24h ||
    price_change_24h ||
    price_change_h24 ||
    priceChangeH24 ||
    0;
  const totalProfit = pnl || total_profit;
  const totalST =
    number_of_users || number_of_smart_money_hold || number_of_smart_money;
  const realizedPercent = realized_percent || realized || 0;
  const avg = avg_price || avg_cost || avg_entry_buy || tx?.avg_price || 0;
  const imageUrl = token_image_url || image_url || imgUrl;
  const tokenPrice = current_price || usd_price || price || 0;

  return (
    <div className="relative z-50 overflow-hidden rounded-[20px] min-w-[210px]">
      <div className="absolute -z-10 h-full w-full rounded-[20px] bg-black/25 backdrop-blur-md"></div>
      <div className="custom-tooltip flex min-w-[173px] flex-col gap-2 rounded-[20px] border border-solid border-white/10 bg-black/25 p-4 font-sans shadow-tooltip backdrop-blur-md">
        <div className="flex items-center gap-3">
          {view === "chart" ? (
            <div className="flex items-center gap-3">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: color }}
              ></div>
              <div className="text-base font-medium text-neutral-200">
                {numeral(percent).format("0,0.[00]")}%
              </div>
              <div className="flex items-center gap-3">
                <ImageToken imgUrl={imageUrl} symbol={symbol} />
                <div className="text-xl font-semibold text-white underline">
                  {symbol}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <ImageToken imgUrl={imageUrl} symbol={symbol} />
              <div className="text-base font-semibold text-white underline">
                {symbol}
              </div>
            </div>
          )}
        </div>

        {/* Price % Percent Change */}

        <div className="flex items-center justify-between text-base font-medium">
          <p className="text-neutral-200">{renderPrice(tokenPrice)}</p>
          <div>
            <div className="flex items-center gap-1 text-base">
              {percentChange > 0 ? (
                <PercentUpIcon />
              ) : percentChange < 0 ? (
                <PercentDownIcon />
              ) : null}
              <div
                className={cn(
                  "font-medium",
                  percentChange > 0
                    ? "text-core"
                    : percentChange < 0
                      ? "text-error-500"
                      : "text-neutral-100",
                )}
              >
                {numeral(percentChange).format("0,0.[00]")}%
              </div>
            </div>
          </div>
        </div>

        {/* Score  */}
        {score ? (
          <div className="flex gap-2">
            <div>
              <CircularProgress
                percentage={parseFloat(
                  numeral(score?.toString()).format("0,0.[00]"),
                )}
                size={32}
                fontSize={10}
              />
            </div>
            <div
              style={{
                backgroundColor: checkScoreToken(score).backgroundColor,
                color: checkScoreToken(score).color,
              }}
              className="flex w-full items-center justify-center rounded-lg px-2 py-0.5 text-sm font-medium uppercase"
            >
              {checkScoreToken(score).text}
            </div>
          </div>
        ) : null}

        <div className="flex flex-col gap-2 whitespace-nowrap">
          {/* hold value */}
          <div className="flex items-center justify-between">
            <p className="text-xs font-normal leading-6 text-neutral-300">
              Total Hold Value
            </p>
            <p className="text-sm font-medium leading-6 text-neutral-100">
              {hold_in_usdt ? `$${nFormatter(hold_in_usdt)}` : "-"}
            </p>
          </div>
          {/* Avg entry */}
          <div className="flex items-center justify-between">
            <p className="text-xs font-normal leading-6 text-neutral-300">
              Avg Entry
            </p>
            <p className="text-sm font-medium leading-6 text-neutral-100">
              {avg ? renderPrice(avg) : "-"}
            </p>
          </div>
          {/* ST */}
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium leading-6 text-neutral-300">
              {type === "hold" ? "# ST Hold" : "# ST Buy"}
            </p>
            <p className="text-sm font-medium leading-6 text-neutral-100">
              {totalST ? totalST : "-"}
            </p>
          </div>

          {/* Realized % */}
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium leading-6 text-neutral-300">
              Realized %
            </p>
            <p className="text-sm font-medium leading-6 text-neutral-100">
              {numeral(realizedPercent).format("0,0.[00]")}%
            </p>
          </div>

          {/* Total Profit */}
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium leading-6 text-neutral-300">
              Total Profit
            </p>
            <p
              className={cn(
                "text-sm font-medium leading-6",
                totalProfit > 0
                  ? "text-core"
                  : totalProfit < 0
                    ? "text-error-500"
                    : "text-neutral-100",
              )}
            >
              {totalProfit ? `$${nFormatter(totalProfit)}` : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
