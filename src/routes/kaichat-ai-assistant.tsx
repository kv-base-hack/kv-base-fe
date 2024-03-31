import ArrowRightIcon from '@/components/shared/icons/kaichat/ArrowRightIcon'
import SendMessageIcon from '@/components/shared/icons/kaichat/SendMessageIcon'
import TopCexDepositIcon from '@/components/shared/icons/kaichat/TopCexDepositIcon'
import TopCexWithdrawIcon from '@/components/shared/icons/kaichat/TopCexWithdrawIcon'
import TopSMBuyIcon from '@/components/shared/icons/kaichat/TopSMBuyIcon'
import TopSMSellIcon from '@/components/shared/icons/kaichat/TopSMSellIcon'
import TopTrendingIcon from '@/components/shared/icons/kaichat/TopTrendingIcon'
import { DATA_TOKEN } from '@/constant/token'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/kaichat-ai-assistant')({
  component: KaichatAIAssistant,
})

function KaichatAIAssistant() {
  return (
    <div className="w-full h-full p-10">
      <div className="flex flex-col self-stretch pt-8 text-base leading-6 rounded-lg border border-solid shadow-lg backdrop-blur-lg bg-neutral-07/30 border-white/10">
        <div className="flex flex-col justify-center px-8 w-full tracking-tight max-md:px-5 max-md:max-w-full">
          <div className="flex gap-4 justify-center tracking-normal leading-6 text-white max-md:flex-wrap">
            <img
              loading="lazy"
              srcSet="./assets/images/kaichat.png"
              className="shrink-0 max-w-full aspect-square w-[111px]"
            />
            <div
              className="rounded-xl backdrop-blur-[50px] px-px"
              style={{
                background: 'linear-gradient(180deg, #83BF6E, #1A1D1F)',
              }}>
              <div className="flex-1 justify-center p-4 m-auto mt-px h-full rounded-xl backdrop-blur-[5px] bg-neutral-07 max-md:max-w-full">
                Welcome to <span className="font-bold">KaiChat</span>, your personal AI investment
                assistant. Need suggestions about{' '}
                <span className="font-bold">
                  hot coins, market trends, trading strategies, technical analysis, smartmoney
                  onchain analysis
                </span>
                ? I'm here to help! I'll guide you with technical and market insights based on
                Kaivest's data.
              </div>
            </div>
          </div>
          <div className="mt-4 text-xl font-semibold tracking-tight text-neutral-03 max-md:max-w-full">
            Market quickview
          </div>
          <div className="flex gap-4 justify-center px-5 mt-4 text-sm tracking-normal leading-4 max-md:flex-wrap max-md:px-5">
            <div className="flex flex-col p-4 rounded-lg border border-solid shadow-lg backdrop-blur-lg bg-neutral-07/50 border-white border-opacity-10">
              <div className="flex gap-2 text-base font-bold tracking-normal leading-6 text-neutral-02">
                <TopTrendingIcon />
                <div>Top Trending</div>
              </div>
              <div className="flex gap-2 mt-4 text-right whitespace-nowrap">
                <div className="flex gap-3 text-neutral-03">
                  <img
                    loading="lazy"
                    src={DATA_TOKEN?.find((el) => el.token === 'GRT')?.image_url}
                    className="shrink-0 w-6 aspect-square fill-violet-600"
                  />
                  <div className="my-auto">GRT</div>
                </div>
                <div className="my-auto text-primary-2">+11.42%</div>
              </div>
              <div className="flex gap-2 mt-3 text-right whitespace-nowrap">
                <div className="flex gap-3 text-neutral-03">
                  <img
                    loading="lazy"
                    src={DATA_TOKEN?.find((el) => el.token === 'RNDR')?.image_url}
                    className="shrink-0 w-6 aspect-square fill-red-700"
                  />
                  <div className="my-auto">RNDR</div>
                </div>
                <div className="my-auto text-primary-2">+10.24%</div>
              </div>
            </div>
            <div className="flex flex-col p-4 rounded-lg border border-solid shadow-lg backdrop-blur-lg bg-neutral-07 bg-opacity-50 border-white border-opacity-10">
              <div className="flex gap-2 text-base font-bold tracking-normal leading-6 text-neutral-02">
                <TopSMBuyIcon />
                <div>Top SM Buy</div>
              </div>
              <div className="flex gap-2 mt-4 text-right whitespace-nowrap">
                <div className="flex gap-3 text-neutral-03">
                  <img
                    loading="lazy"
                    src={DATA_TOKEN?.find((el) => el.token === 'DOGE')?.image_url}
                    className="shrink-0 w-6 aspect-square"
                  />
                  <div className="my-auto">DOGE</div>
                </div>
                <div className="my-auto text-primary-2">+21.12%</div>
              </div>
              <div className="flex gap-2 mt-3 text-right whitespace-nowrap">
                <div className="flex gap-3 text-neutral-03">
                  <img
                    loading="lazy"
                    src={DATA_TOKEN?.find((el) => el.token === 'SHIB')?.image_url}
                    className="shrink-0 w-6 aspect-square fill-red-600"
                  />
                  <div className="my-auto">SHIB</div>
                </div>
                <div className="my-auto text-primary-2">+20.24%</div>
              </div>
            </div>
            <div className="flex flex-col p-4 rounded-lg border border-solid shadow-lg backdrop-blur-lg bg-neutral-07 bg-opacity-50 border-white border-opacity-10">
              <div className="flex gap-2 text-base font-bold tracking-normal leading-6 text-neutral-02">
                <TopSMSellIcon />
                <div>Top SM Sell</div>
              </div>
              <div className="flex gap-2 mt-4 text-right whitespace-nowrap">
                <div className="flex gap-3 text-neutral-03">
                  <img
                    loading="lazy"
                    src={DATA_TOKEN?.find((el) => el.token === 'USDT')?.image_url}
                    className="shrink-0 w-6 aspect-square fill-sky-400"
                  />
                  <div className="my-auto">USDT</div>
                </div>
                <div className="my-auto text-primary-3">-6.42%</div>
              </div>
              <div className="flex gap-2 mt-3 text-right whitespace-nowrap">
                <div className="flex gap-3 text-neutral-03">
                  <img
                    loading="lazy"
                    src={DATA_TOKEN?.find((el) => el.token === 'VET')?.image_url}
                    className="shrink-0 w-6 aspect-square fill-white"
                  />
                  <div className="my-auto">VET</div>
                </div>
                <div className="my-auto text-primary-3">-10.24%</div>
              </div>
            </div>
            <div className="flex flex-col p-4 rounded-lg border border-solid shadow-lg backdrop-blur-lg bg-neutral-07 bg-opacity-50 border-white border-opacity-10">
              <div className="flex gap-2 text-base font-bold tracking-normal leading-6 text-neutral-02">
                <TopCexWithdrawIcon />
                <div>Top CEX Withdraw</div>
              </div>
              <div className="flex gap-2 mt-4 text-right whitespace-nowrap">
                <div className="flex gap-3 text-neutral-03">
                  <img
                    loading="lazy"
                    src={DATA_TOKEN?.find((el) => el.token === 'USDT')?.image_url}
                    className="shrink-0 w-6 aspect-square fill-[linear-gradient(138deg,#00ADEF_19.49%,#0084FF_86.04%)]"
                  />
                  <div className="my-auto">USDT</div>
                </div>
                <div className="my-auto text-primary-2">+2.42%</div>
              </div>
              <div className="flex gap-2 mt-3 text-right whitespace-nowrap">
                <div className="flex gap-3 text-neutral-03">
                  <img
                    loading="lazy"
                    src={DATA_TOKEN?.find((el) => el.token === 'YFI')?.image_url}
                    className="shrink-0 w-6 aspect-square fill-sky-600"
                  />
                  <div className="my-auto">YFI</div>
                </div>
                <div className="my-auto text-primary-2">+3.42%</div>
              </div>
            </div>
            <div className="flex flex-col p-4 rounded-lg border border-solid shadow-lg backdrop-blur-lg bg-neutral-07 bg-opacity-50 border-white border-opacity-10">
              <div className="flex gap-2 text-base font-bold tracking-normal leading-6 text-neutral-02">
                <TopCexDepositIcon />
                <div>Top CEX Deposit</div>
              </div>
              <div className="flex gap-2 mt-4 text-right whitespace-nowrap">
                <div className="flex gap-3 text-neutral-03">
                  <img
                    loading="lazy"
                    src={DATA_TOKEN?.find((el) => el.token === 'LEO')?.image_url}
                    className="shrink-0 w-6 aspect-square"
                  />
                  <div className="my-auto">LEO</div>
                </div>
                <div className="my-auto text-primary-2">+2.42%</div>
              </div>
              <div className="flex gap-2 mt-3 text-right whitespace-nowrap">
                <div className="flex gap-3 text-neutral-03">
                  <img
                    loading="lazy"
                    src={DATA_TOKEN?.find((el) => el.token === 'ZIL')?.image_url}
                    className="shrink-0 w-6 aspect-square"
                  />
                  <div className="my-auto">ZIL</div>
                </div>
                <div className="my-auto text-primary-3">$-13.109M</div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-xl font-semibold tracking-tight text-neutral-03 max-md:max-w-full">
            Sample Questions
          </div>
          <div className="flex gap-2 pr-20 mt-4 font-semibold tracking-normal text-gray-500 max-md:flex-wrap max-md:pr-5">
            <div className="justify-center px-4 py-2 text-white rounded-lg bg-zinc-800">
              Technical Analysis
            </div>
            <div className="justify-center px-4 py-2 rounded-lg bg-neutral-07">
              Onchain Analysis
            </div>
            <div className="justify-center px-4 py-2 rounded-lg bg-neutral-07">Market Overview</div>
            <div className="justify-center px-4 py-2 whitespace-nowrap rounded-lg bg-neutral-07">
              Education
            </div>
          </div>
          <div className="flex flex-col justify-center px-2 py-1 mt-4 text-white rounded-xl border border-solid bg-white/5 border-neutral-05 max-md:max-w-full">
            <div className="flex gap-1 py-2 pr-2 max-md:flex-wrap">
              <div className="flex-1 max-md:max-w-full">
                General technical analysis for the 4-hour chart of [BTC]...
              </div>
              <ArrowRightIcon />
            </div>
          </div>
          <div className="flex flex-col justify-center px-2 py-1 mt-4 text-white rounded-xl border border-solid bg-white/5 border-neutral-05 max-md:max-w-full">
            <div className="flex gap-1 py-2 pr-2 max-md:flex-wrap">
              <div className="flex-1 max-md:max-w-full">
                Show me the trade signal of token [CYBER]
              </div>
              <ArrowRightIcon />
            </div>
          </div>
          <div className="flex flex-col justify-center px-2 py-1 mt-4 text-white rounded-xl border border-solid bg-white/5 border-neutral-05 max-md:max-w-full">
            <div className="flex gap-1 py-2 pr-2 max-md:flex-wrap">
              <div className="flex-1 max-md:max-w-full">
                What are the potential entry and exit points for [LINK]
              </div>
              <ArrowRightIcon />
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-8 justify-center self-stretch px-10 py-8 text-base font-semibold tracking-normal leading-6 text-gray-500 border border-solid bg-neutral-07 bg-opacity-50 border-white border-opacity-10 max-md:px-5">
          <div className="flex gap-3 p-4 rounded-xl border border-solid bg-white/5 border-white border-opacity-10 max-md:flex-wrap">
            <input
              className="flex-1 text-neutral-01 bg-transparent max-md:max-w-full outline-none"
              placeholder="Message KAICHAT..."
            />
            <SendMessageIcon />
          </div>
        </div>
      </div>
    </div>
  )
}
