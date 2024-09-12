import CircularProgress from '@/components/common/CircularProgress'
import { CopyCustom } from '@/components/common/CopyCustom'
import { WrapTable } from '@/components/common/DataTable/WrapTable'
import { ImageToken } from '@/components/common/Image/ImageToken'
import Link from '@/components/shared/icons/Link'
import { Discord, Telegram, Twitter } from '@/components/shared/icons/social'
import { VerifyIcon } from '@/components/shared/icons/token-explorer'
import CopyIcon from '@/components/shared/icons/token-explorer/CopyIcon'
import { cn } from '@/lib/utils'
import { checkScoreToken } from '@/utils/checkScoreToken'
import { nFormatter } from '@/utils/nFormatter'

export function TokenInfo({ dataTokenInfo, params }: any) {
  return (
    <WrapTable
      className="relative flex h-[unset] min-w-[430px] w-full items-center gap-4 rounded-[20px] p-6 font-normal"
      title={
        <div className="flex items-center gap-2">
          <ImageToken
            imgUrl={dataTokenInfo?.image_url}
            symbol={dataTokenInfo?.symbol}
          />
          {dataTokenInfo.symbol}
          <div className="mt-1">
            <CopyCustom value={params.token} icon={<CopyIcon />} />
          </div>
          <VerifyIcon />
        </div>
      }
      childHeader={
        <div className="flex items-center gap-2">
          <CircularProgress percentage={dataTokenInfo?.score} size={24} />
          <div
            style={{
              backgroundColor: checkScoreToken(dataTokenInfo?.score)
                .backgroundColor,
              color: checkScoreToken(dataTokenInfo?.score).color,
            }}
            className="flex items-center justify-center rounded-lg px-2 py-0.5 text-sm font-medium uppercase"
          >
            {checkScoreToken(dataTokenInfo?.score).text}
          </div>
        </div>
      }
    >
      <div className="h-px w-full bg-white/10"/>
      <div className="flex w-full items-center justify-start gap-3">
        <div className="flex items-center gap-2">
          {dataTokenInfo?.websites?.[0] ? (
            <a
              href={dataTokenInfo?.websites?.[0] || ''}
              target="_blank"
              className="flex h-7 w-7 items-center justify-center rounded-md border border-solid border-gray-800 bg-[#111827]"
            >
              <Link />
            </a>
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-solid border-gray-800 bg-[#111827] opacity-10">
              <Link />
            </div>
          )}
          {dataTokenInfo?.discord_url ? (
            <a
              href={dataTokenInfo?.discord_url || ''}
              target="_blank"
              className="flex h-7 w-7 cursor-not-allowed items-center justify-center rounded-md border border-solid border-gray-800 bg-[#111827]"
            >
              <Discord />
            </a>
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-solid border-gray-800 bg-[#111827] opacity-10">
              <Discord />
            </div>
          )}
          {dataTokenInfo?.telegram_handle ? (
            <a
              href={dataTokenInfo?.telegram_handle || ''}
              target="_blank"
              className="flex h-7 w-7 items-center justify-center rounded-md border border-solid border-gray-800 bg-[#111827]"
            >
              <Telegram />
            </a>
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-solid border-gray-800 bg-[#111827] opacity-10">
              <Telegram />
            </div>
          )}
          {dataTokenInfo?.twitter_handle ? (
            <a
              href={dataTokenInfo?.twitter_handle || ''}
              target="_blank"
              className="flex h-7 w-7 items-center justify-center rounded-md border border-solid border-gray-800 bg-[#111827]"
            >
              <Twitter />
            </a>
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-solid border-gray-800 bg-[#111827] opacity-10">
              <Twitter />
            </div>
          )}
        </div>
        <div className="h-7 rounded-3xl bg-gradient-to-r from-[#9945FF] to-[#14F195] p-px shadow-lg backdrop-blur-[2px]">
          <div className="flex h-full cursor-pointer items-center justify-center whitespace-nowrap rounded-3xl bg-black px-3 text-sm leading-5 tracking-normal text-white">
            Ask Kaichat
          </div>
        </div>
      </div>
      <div className="flex w-full flex-wrap justify-between gap-3 whitespace-nowrap text-center leading-[150%]">
        <div className="flex w-[90px] flex-1 cursor-pointer flex-col justify-center pb-1.5 pl-4 pr-4 pt-1.5">
          <div className="self-center text-xs font-normal text-light-telegray">
            Age
          </div>
          <div className="text-sm font-medium">{dataTokenInfo?.token_age}</div>
        </div>
        <div className="flex w-[90px] flex-1 cursor-pointer flex-col justify-center pb-1.5 pl-4 pr-4 pt-1.5">
          <div className="self-center text-xs font-normal text-light-telegray">
            24h Vol
          </div>
          <div className="text-sm font-medium">
            ${nFormatter(dataTokenInfo?.volume_24h)}
          </div>
        </div>
        <div className="flex w-[90px] flex-1 cursor-pointer flex-col justify-center pb-1.5 pl-4 pr-4 pt-1.5">
          <div className="self-center text-xs font-normal text-light-telegray">
            Liquidity
          </div>
          <div className="text-sm font-medium">
            ${nFormatter(dataTokenInfo?.liquidity)}
          </div>
        </div>
        <div className="flex w-[90px] flex-1 cursor-pointer flex-col justify-center pb-1.5 pl-4 pr-4 pt-1.5">
          <div className="self-center text-xs font-normal text-light-telegray">
            FDV
          </div>
          <div className="text-sm font-medium">
            ${nFormatter(dataTokenInfo?.fully_diluted_valuation)}
          </div>
        </div>
      </div>
      <div className="flex w-full flex-wrap justify-between gap-3 whitespace-nowrap text-center uppercase leading-[150%]">
        <div className="flex w-[90px] flex-1 cursor-pointer flex-col justify-center rounded border border-solid border-neutral-700 pb-1.5 pl-4 pr-4 pt-1.5">
          <div className="self-center text-xs text-light-telegray">1h</div>
          <div
            className={cn(
              'text-sm font-semibold',
              dataTokenInfo?.percent_change_1h < 0 ? 'text-red' : 'text-core',
            )}
          >
            {dataTokenInfo?.percent_change_1h?.toFixed(2)}%
          </div>
        </div>
        <div className="flex w-[90px] flex-1 cursor-pointer flex-col justify-center border border-solid border-neutral-700 pb-1.5 pl-3 pr-2.5 pt-1.5">
          <div className="self-center text-xs text-light-telegray">2h</div>
          <div
            className={cn(
              'text-sm font-semibold',
              dataTokenInfo?.price_change_h2 < 0 ? 'text-red' : 'text-core',
            )}
          >
            {dataTokenInfo?.price_change_h2?.toFixed(2)}%
          </div>
        </div>
        <div className="flex w-[90px] flex-1 cursor-pointer flex-col justify-center border border-solid border-neutral-700 pb-1.5 pl-3.5 pr-3.5 pt-1.5">
          <div className="self-center text-xs text-light-telegray">6h</div>
          <div
            className={cn(
              'text-sm font-semibold',
              dataTokenInfo?.price_change_h6 < 0 ? 'text-red' : 'text-core',
            )}
          >
            {dataTokenInfo?.price_change_h6?.toFixed(2)}%
          </div>
        </div>
        <div className="flex w-[90px] flex-1 cursor-pointer flex-col justify-center border border-solid border-neutral-700 pb-1.5 pl-3.5 pr-3.5 pt-1.5">
          <div className="self-center text-xs text-light-telegray">1D</div>
          <div
            className={cn(
              'text-sm font-semibold',
              dataTokenInfo?.percent_change_24h < 0 ? 'text-red' : 'text-core',
            )}
          >
            {dataTokenInfo?.percent_change_24h?.toFixed(2)}%
          </div>
        </div>
      </div>
    </WrapTable>
  )
}
