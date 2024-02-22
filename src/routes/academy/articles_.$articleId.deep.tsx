import ArrowRightIcon from '@/components/shared/icons/ArrowRight'
import Copy from '@/components/shared/icons/social/Copy'
import Facebook from '@/components/shared/icons/social/Facebook'
import Telegram from '@/components/shared/icons/social/Telegram'
import Twitter from '@/components/shared/icons/social/Twitter'
import { cn } from '@/lib/utils'
import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/academy/articles/$articleId/deep')({
  component: ArticleDetail,
})

const TITLE = [
  'Key Takeaways',
  'Introduction',
  'What Are Bitcoin Layer 2s?',
  'Why Bitcoin Layer 2?',
  'Bitcoin Layer 2: How It',
  'Works',
  'Examples of Bitcoin Layer 2',
  'Solutions',
  'Use Cases of Bitcoin Layer',
  '2s Beyond Scalability',
  'The Rise of Bitcoin Layer 2',
  'Networks',
  'Closing Thoughts',
  'Further Reading',
]

function ArticleDetail() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col self-stretch p-10 max-md:px-5">
        <div className="flex items-center gap-0 py-2 text-xl tracking-tight leading-8 max-md:flex-wrap max-md:max-w-full">
          <Link to="/academy/articles" className="text-gray-400">
            Articles
          </Link>
          <ArrowRightIcon />
          <div className="flex-auto text-gray-200 max-md:max-w-full">
            What Are Bitcoin Layer 2 Networks?
          </div>
        </div>
        <div className="mt-4 max-w-[1248px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
            <div className="flex flex-col w-9/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow text-xl text-gray-200 max-w-[792px] max-md:mt-8 max-md:max-w-full">
                <img
                  loading="lazy"
                  srcSet="/assets/images/article.jpeg"
                  className="w-full aspect-[1.79] rounded-2xl max-md:max-w-full"
                />
                <div className="mt-5 text-5xl text-gray-200 leading-[60px] max-md:max-w-full max-md:text-4xl max-md:leading-[56px]">
                  What Are Bitcoin Layer 2<br />
                  Networks?
                </div>
                <div className="flex gap-4 items-center self-start mt-5 text-xs font-bold tracking-normal leading-4 text-gray-400">
                  <div className="grow justify-center self-stretch py-1.5 pr-2 pl-6 text-white whitespace-nowrap rounded-lg bg-yellow-500 bg-opacity-30 max-md:pl-5">
                    Intermediate
                  </div>
                  <div className="self-stretch my-auto">Feb 16, 2024</div>
                  <div className="flex gap-1 self-stretch my-auto whitespace-nowrap">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/87958d82b6bb584f3f2873486f0f3405a187705d345fcdd72e633a940b40a3a6?"
                      className="w-4 aspect-square"
                    />
                    <div>6m</div>
                  </div>
                </div>
                <div className="flex gap-2 self-start pr-14 mt-4 text-xs font-bold leading-3 text-white whitespace-nowrap max-md:pr-5">
                  <div className="justify-center px-3 py-1.5 aspect-[3.05] bg-white bg-opacity-10 rounded-[100px]">
                    Bitcoin
                  </div>
                  <div className="grow justify-center px-3 py-1.5 bg-white bg-opacity-10 rounded-[100px]">
                    Blockchain
                  </div>
                  <div className="justify-center py-1.5 pl-3 aspect-[1.32] bg-white bg-opacity-10 rounded-[100px]">
                    Tech
                  </div>
                </div>
                <div className="mt-5 text-3xl font-bold leading-10 max-md:max-w-full">
                  Key Takeaways
                </div>
                <div className="flex flex-col p-4 leading-7 text-neutral-300 max-md:max-w-full">
                  <div className="max-md:max-w-full">
                    Bitcoin Layer 2 networks address scalability challenges, enhancing transaction
                    speed and reducing fees. Examples of Bitcoin Layer 2 protocols include the
                    Lightning Network, Rootstock, Stacks, and Liquid Network.
                  </div>
                  <div className="mt-4 max-md:max-w-full">
                    Layer 2s often use scaling mechanisms such as state channels, sidechains, and
                    blockchain rollups.
                  </div>
                  <div className="mt-4 max-md:max-w-full">
                    Beyond scalability, Layer 2 solutions also introduce enhanced programmability,
                    promoting more decentralized finance services and other Web3 services on the
                    Bitcoin blockchain.
                  </div>
                </div>
                <div className="text-3xl font-bold max-md:max-w-full">Introduction</div>
                <div className="leading-7 max-md:max-w-full">
                  As a pioneer, Bitcoin has established itself as the biggest and most popular
                  cryptocurrency. But despite its success, the growing popularity of Bitcoin brought
                  certain challenges, most notably scalability issues. In response to these
                  challenges, the crypto community has introduced Bitcoin Layer 2 networks, a class
                  of protocols designed to enhance scalability, reduce transaction costs, and unlock
                  new possibilities for the Bitcoin ecosystem.
                </div>
                <div className="mt-9 text-3xl font-bold leading-10 max-md:max-w-full">
                  What Are Bitcoin Layer 2s?
                </div>
                <div className="mt-1.5 leading-7 max-md:max-w-full">
                  Bitcoin Layer 2s are protocols built on top of the Bitcoin blockchain. They are
                  typically designed to address performance issues or other limitations of the main
                  chain. Layer 2 protocols process transactions off the main blockchain, providing
                  advantages such as improved scalability, enhanced <br />
                  programmability, and expanded capabilities to support various decentralized
                  applications.
                </div>
                <div className="mt-9 text-3xl font-bold leading-10 max-md:max-w-full">
                  Why Bitcoin Layer 2?
                </div>
                <div className="mt-4 leading-7 max-md:mr-2.5 max-md:max-w-full">
                  Bitcoin's initial design as a decentralized and secure payment system faced
                  limitations when it came to scalability. The average block creation time of 10
                  minutes and a throughput of seven transactions per second (
                  <span className="text-yellow-500 underline">TPS</span>) proved insufficient during
                  periods of high transaction volume, leading to increased fees and delays.
                </div>
                <div className="mt-3.5 leading-7 max-md:max-w-full">
                  The Bitcoin blockchain's limited scripting language also restricted its ability to
                  support complex <span className="text-yellow-500 underline">smart contracts</span>{' '}
                  and decentralized applications (
                  <span className="text-yellow-500 underline">DApps</span>). The concept of Bitcoin
                  Layer 2 networks emerged <br />
                  to address these challenges.
                </div>
                <div className="mt-9 text-3xl font-bold leading-10 max-md:max-w-full">
                  Examples of Bitcoin Layer 2 Solutions
                </div>
                <div className="mt-1.5 leading-7 max-md:max-w-full">
                  Several Layer 2 solutions have emerged within the Bitcoin ecosystem, each
                  contributing to scalability and introducing new functionalities.
                </div>
                <div className="mt-9 text-2xl font-bold leading-8 max-md:max-w-full">
                  1. Lightning Network
                </div>
                <div className="mt-1.5 leading-7 max-md:max-w-full">
                  Launched in 2018, the Lightning Network uses state channels to enable
                  microtransactions on top of the Bitcoin Layer-1. It facilitates fast and low-cost
                  transactions by conducting multiple transactions off-chain and settling the
                  opening and closing balances on the main blockchain.
                </div>
                <div className="mt-9 text-2xl font-bold leading-8 max-md:max-w-full">
                  2. Rootstock (RSK)
                </div>
                <div className="mt-1.5 leading-7 max-md:max-w-full">
                  Operating as a sidechain, Rootstock pioneered smart contracts on the Bitcoin
                  blockchain. It allows users to send Bitcoin to the Rootstock network, where it
                  becomes a locked-up smart Bitcoin (RBTC) in the user's RSK wallet, enabling faster
                  and cheaper transactions.
                </div>
                <div className="mt-9 text-2xl font-bold leading-8 max-md:max-w-full">
                  3. Stacks Protocol
                </div>
                <div className="mt-1.5 leading-7 max-md:max-w-full">
                  This Layer-2 blockchain (formerly Blockstack) enables smart contracts and
                  decentralized applications on the Bitcoin blockchain. Stacks utilizes microblocks
                  for speed and a Proof-of-Transfer (PoX) mechanism, tying transactions to the
                  Bitcoin blockchain.
                </div>
                <div className="mt-9 text-2xl font-bold leading-8 max-md:max-w-full">
                  4. Liquid Network
                </div>
                <div className="mt-1.5 leading-7 max-md:max-w-full">
                  Liquid Network is a Bitcoin Layer 2 sidechain that allows its users to move their
                  bitcoins back and forth using a two-way peg mechanism. When BTC is transferred to
                  the Liquid Network, it’s converted into Liquid BTC (L-BTC) at a 1:1 ratio. It also
                  supports the issuance of tokens and other digital assets.
                </div>
                <div className="mt-9 text-3xl font-bold leading-10 max-md:max-w-full">
                  The Rise of Bitcoin Layer 2 Networks
                </div>
                <div className="mt-1.5 leading-7 max-md:max-w-full">
                  In recent times, the significance of Bitcoin Layer 2 networks has gained momentum,
                  with major developments indicating widespread adoption and integration. For
                  example, Binance announced the completion of its Lightning Network integration in
                  2023, allowing users to utilize layer-2 scaling solutions for Bitcoin withdrawals
                  and deposits. This move underscores the growing importance of Layer 2 solutions in
                  the broader crypto ecosystem.
                </div>
                <div className="leading-7 max-md:max-w-full">
                  Looking ahead, Bitcoin Layer 2 solutions promise immense potential as the space
                  continues to evolve. The crypto community has witnessed unprecedented growth and
                  innovation within the Bitcoin ecosystem, with Layer 2 networks playing a pivotal
                  role in driving this progress.
                </div>
                <div className="mt-9 text-3xl font-bold leading-10 max-md:max-w-full">
                  Closing Thoughts
                </div>
                <div className="mt-1.5 leading-7 max-md:max-w-full">
                  The emergence of Bitcoin Layer 2 networks has effectively tackled scalability
                  challenges faced by Bitcoin, providing solutions that enhance transaction speed,
                  reduce fees, and unlock new capabilities. Beyond scalability improvements, Bitcoin
                  Layer 2 solutions introduce enhanced programmability, paving the way for DeFi
                  services, asset management, and more on the Bitcoin blockchain.
                </div>
                <div className="italic leading-7 max-md:max-w-full">
                  <br />
                  Disclaimer: This content is presented to you on an “as is” basis for <br />
                  general information and educational purposes only, without <br />
                  representation or warranty of any kind. It should not be construed as <br />
                  financial, legal or other professional advice, nor is it intended to <br />
                  recommend the purchase of any specific product or service. You should <br />
                  seek your own advice from appropriate professional advisors.{' '}
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col self-stretch max-md:mt-8">
                <div className="text-xl leading-7 text-gray-200">Share Posts</div>
                <div className="flex gap-5 justify-between pr-7 mt-6 max-md:pr-5">
                  <Twitter />
                  <Facebook />
                  <Telegram />
                  <Copy />
                </div>
                <div className="mt-20">
                  {TITLE.map((title: string, index: number) => (
                    <div
                      key={index}
                      className={cn(
                        index === 0 ? 'text-gray-200' : 'text-gray-400',
                        'flex gap-5 justify-between items-start px-3 text-base leading-6 max-md:mt-10'
                      )}>
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            index === 0 ? 'border-neutral-02' : 'border-neutral-04',
                            'w-[10px] h-[10px] rotate-45 border-2 rounded-[2px]'
                          )}></div>
                        {index < TITLE.length - 1 ? (
                          <div className="w-1 h-14 bg-neutral-04" />
                        ) : null}
                      </div>
                      <div className="flex-auto -mt-1.5">{title}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-20 text-xl leading-7 text-gray-200 max-md:mt-10">
                  Related Articles
                </div>
                <img
                  loading="lazy"
                  srcSet="/assets/images/article.jpeg"
                  className="mt-6 w-full aspect-[1.79] rounded-2xl"
                />
                <div className="mt-2 text-base leading-6 text-gray-200">
                  Blockchain Advantages and
                  <br />
                  Disadvantages
                </div>
                <img
                  loading="lazy"
                  srcSet="/assets/images/article.jpeg"
                  className="mt-6 w-full aspect-[1.79] rounded-2xl"
                />
                <div className="mt-2 text-base leading-6 text-gray-200">
                  Delegated Proof of Stake
                  <br />
                  Explained
                </div>
                <img
                  loading="lazy"
                  srcSet="/assets/images/article.jpeg"
                  className="mt-6 w-full aspect-[1.79] rounded-2xl"
                />
                <div className="mt-2 text-base leading-6 text-gray-200">What Is PGP?</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
