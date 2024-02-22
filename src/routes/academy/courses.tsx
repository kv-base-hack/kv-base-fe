import Aclock from '@/components/shared/icons/courses/Aclock'
import CheckDone from '@/components/shared/icons/courses/CheckDone'
import ClaimReward from '@/components/shared/icons/courses/ClaimReward'
import Learning from '@/components/shared/icons/courses/Learning'
import OneStopLearning from '@/components/shared/icons/courses/OneStopLearning'
import Play from '@/components/shared/icons/courses/Play'
import ReceiveCertificate from '@/components/shared/icons/courses/ReceiveCertificate'
import { cn } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/academy/courses')({
  component: Courses,
})

function Courses() {
  const [tab, setTab] = useState('all_course')

  return (
    <div className="w-full h-full">
      <div className="flex flex-col self-stretch p-10 max-md:px-5">
        <div className="text-4xl font-semibold tracking-tighter leading-10 text-gray-300 max-md:max-w-full">
          Courses - Learn crypto and earn rewards
        </div>
        <div className="mt-4 text-base tracking-normal leading-6 text-neutral-01 max-md:max-w-full">
          Advance your knowledge for free through our fun, interactive courses. Kaivest Academy
          presents the most comprehensive educational courses lineup for beginners, intermediate and
          advanced learners.
        </div>
        <div className="flex justify-center items-center px-16 py-4 mt-4 max-md:px-5 max-md:max-w-full">
          <div className="w-full max-w-[804px] max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
              <div className="flex flex-col w-1/3 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col justify-center items-center text-lg tracking-tight leading-8 text-center text-gray-200 whitespace-nowrap max-md:px-5 max-md:mt-8">
                  <Learning />
                  <div className="mt-5">Learn for Free</div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-1/3 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col justify-center items-center text-lg tracking-tight leading-8 text-center text-gray-200 whitespace-nowrap max-md:px-5 max-md:mt-8">
                  <ReceiveCertificate />
                  <div className="mt-5">Receive Certificate</div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-1/3 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col justify-center items-center text-lg tracking-tight leading-8 text-center text-gray-200 whitespace-nowrap max-md:px-5 max-md:mt-8">
                  <OneStopLearning />
                  <div className="mt-5">One-Stop Learning Hub</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 pr-20 mt-4 text-base font-semibold tracking-normal leading-6 text-gray-500 whitespace-nowrap max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
          <div
            onClick={() => setTab('all_course')}
            className={cn(
              'cursor-pointer justify-center px-4 py-2 rounded-lg',
              tab === 'all_course'
                ? 'bg-neutral-06 text-neutral-00'
                : 'text-neutral-04 bg-neutral-07'
            )}>
            All courses
          </div>
          <div
            onClick={() => setTab('in_process')}
            className={cn(
              'cursor-pointer justify-center px-4 py-2 rounded-lg',
              tab === 'in_process'
                ? 'bg-neutral-06 text-neutral-00'
                : 'text-neutral-04 bg-neutral-07'
            )}>
            In Progress
          </div>
          <div
            onClick={() => setTab('completed')}
            className={cn(
              'cursor-pointer justify-center px-4 py-2 rounded-lg',
              tab === 'completed'
                ? 'bg-neutral-06 text-neutral-00'
                : 'text-neutral-04 bg-neutral-07'
            )}>
            Completed
          </div>
        </div>
        {tab === 'all_course' ? (
          <AllCourse />
        ) : (
          <div className="flex flex-col items-center px-5 text-base leading-6">
            <img
              loading="lazy"
              srcSet="/assets/images/no-permission.png"
              className="w-80 max-w-full aspect-square"
            />
            <div className="self-stretch mt-10 w-full tracking-normal text-center text-zinc-50 max-md:max-w-full">
              You will find your finished courses here.
            </div>

            <div className="mt-4 max-w-full max-md:mt-10 flex justify-start">
              <div className="w-auto px-4 py-3 cursor-pointer bg-yellow-200 text-neutral-07 font-bold tracking-wide uppercase whitespace-nowrap rounded-xl leading-[160%]">
                Start learning
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const AllCourse = () => {
  return (
    <>
      <div className="flex flex-col p-6 mt-4 rounded-lg border border-solid shadow-2xl backdrop-blur-lg bg-neutral-07/50 border-white/10 max-md:px-5 max-md:max-w-full">
        <div className="flex gap-4 self-start text-xl font-semibold tracking-tight leading-8 whitespace-nowrap text-neutral-02">
          <div className="w-4 h-8 bg-yellow-200 rounded" />
          <div className="grow">Intermediate Track</div>
        </div>
        <div className="mt-8 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
            <div className="flex flex-col w-3/5 max-md:ml-0 max-md:w-full">
              <div className="flex overflow-hidden relative flex-col grow items-start self-stretch pt-5 pr-16 pb-12 pl-4 rounded-lg max-w-[1200px] min-h-[330px] max-md:pr-5 max-md:mt-10 max-md:max-w-full">
                <img
                  loading="lazy"
                  srcSet="/assets/images/article.jpeg"
                  className="object-cover absolute inset-0 size-full rounded-lg"
                />
                <div className="relative bg-neutral-900 h-[35px] w-[162px]" />
              </div>
            </div>
            <div className="flex flex-col ml-5 w-2/5 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow justify-between self-stretch text-base font-semibold tracking-normal leading-6 text-gray-200 max-md:mt-10">
                <div>
                  <span className="font-bold">📄</span> Blockchain Beyond Basics
                </div>
                <div className="mt-6 whitespace-nowrap leading-[160%] max-md:mr-1.5">
                  📄 Level up your knowledge of blockchain & crypto
                </div>
                <div className="mt-6">
                  ️<span className="font-bold">⌛ </span>Watch videos & pass quizzes
                </div>
                <div className="mt-6 leading-[160%]">⌛ 6 courses and 70+ modules</div>
                <div className="mt-6">
                  🎁 Receive a PDF or NFT certificate upon completing each intermediate-level course
                </div>
                <div className="mt-11 max-w-full max-md:mt-10 flex justify-start">
                  <div className="w-auto px-4 py-3 cursor-pointer bg-yellow-200 text-neutral-07 font-bold tracking-wide uppercase whitespace-nowrap rounded-xl leading-[160%]">
                    Start course
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-2xl font-bold leading-8 text-gray-200 max-md:max-w-full">
          6 Courses
        </div>
        <div className="flex gap-4 items-center justify-between mt-4 text-base tracking-normal leading-6 max-md:flex-wrap max-md:max-w-full">
          <CheckDone />
          <div className="flex flex-col flex-1 justify-center px-4 py-5 rounded-lg bg-gray-300 bg-opacity-10 max-md:max-w-full">
            <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-1 justify-between text-gray-200 whitespace-nowrap">
                <div>1.</div>
                <div className="grow">Blockchain Deep Dive</div>
              </div>
              <div className="flex gap-5 w-1/2 justify-between max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-2.5 justify-between text-gray-200">
                  <Aclock />
                  <div className="flex-auto">77 Min</div>
                </div>
                <div className="flex gap-3 justify-between text-yellow-500">
                  <Play />
                  <div>Learn Now</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-between mt-4 text-base tracking-normal leading-6 max-md:flex-wrap max-md:max-w-full">
          <CheckDone />
          <div className="flex flex-col flex-1 justify-center px-4 py-5 rounded-lg bg-gray-300 bg-opacity-10 max-md:max-w-full">
            <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-1 justify-between text-gray-200 whitespace-nowrap">
                <div>2.</div>
                <div className="grow">Cryptocurrency Deep Dive</div>
              </div>
              <div className="flex gap-5 w-1/2 justify-between max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-2.5 justify-between text-gray-200">
                  <Aclock />
                  <div className="flex-auto">110 Min</div>
                </div>
                <div className="flex gap-3 justify-between text-yellow-500">
                  <Play />
                  <div>Learn Now</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-between mt-4 text-base tracking-normal leading-6 max-md:flex-wrap max-md:max-w-full">
          <CheckDone />
          <div className="flex flex-col flex-1 justify-center px-4 py-5 rounded-lg bg-gray-300 bg-opacity-10 max-md:max-w-full">
            <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-1 justify-between text-gray-200 whitespace-nowrap">
                <div>3.</div>
                <div className="grow">DApps Deep Dive</div>
              </div>
              <div className="flex gap-5 w-1/2 justify-between max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-2.5 justify-between text-gray-200">
                  <Aclock />
                  <div className="flex-auto">73 Min</div>
                </div>
                <div className="flex gap-3 justify-between text-yellow-500">
                  <Play />
                  <div>Learn Now</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-between mt-4 text-base tracking-normal leading-6 max-md:flex-wrap max-md:max-w-full">
          <CheckDone />
          <div className="flex flex-col flex-1 justify-center px-4 py-5 rounded-lg bg-gray-300 bg-opacity-10 max-md:max-w-full">
            <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-1 justify-between text-gray-200 whitespace-nowrap">
                <div>4.</div>
                <div className="grow">DeFi Deep Dive</div>
              </div>
              <div className="flex gap-5 w-1/2 justify-between max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-2.5 justify-between text-gray-200">
                  <Aclock />
                  <div className="flex-auto">60 Min</div>
                </div>
                <div className="flex gap-3 justify-between text-yellow-500">
                  <Play />
                  <div>Learn Now</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-between mt-4 text-base tracking-normal leading-6 max-md:flex-wrap max-md:max-w-full">
          <CheckDone />
          <div className="flex flex-col flex-1 justify-center px-4 py-5 rounded-lg bg-gray-300 bg-opacity-10 max-md:max-w-full">
            <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-1 justify-between text-gray-500 whitespace-nowrap">
                <div>5.</div>
                <div className="grow">NFT Deep Dive</div>
              </div>
              <div className="flex gap-5 w-1/2 justify-between max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-2.5 justify-between text-gray-200">
                  <Aclock />
                  <div className="flex-auto">0 Min</div>
                </div>
                <div className="text-gray-500 whitespace-nowrap">Coming Soon</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-between mt-4 text-base tracking-normal leading-6 max-md:flex-wrap max-md:max-w-full">
          <CheckDone />
          <div className="flex flex-col flex-1 justify-center px-4 py-5 rounded-lg bg-gray-300 bg-opacity-10 max-md:max-w-full">
            <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-1 justify-between text-gray-500 whitespace-nowrap">
                <div>6.</div>
                <div className="grow">Crypto Trading Deep Dive</div>
              </div>
              <div className="flex gap-5 w-1/2 justify-between max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-2.5 justify-between text-gray-200">
                  <Aclock />
                  <div className="flex-auto">0 Min</div>
                </div>
                <div className="text-gray-500 whitespace-nowrap">Coming Soon</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-between mt-4 max-md:flex-wrap max-md:max-w-full">
          <div className="flex justify-center items-center px-1 my-auto w-10 h-10 bg-yellow-300 aspect-square rounded-[40px]">
            <ClaimReward />
          </div>
          <div className="flex gap-5 justify-between p-4 text-base leading-6 whitespace-nowrap rounded-lg bg-gray-300 bg-opacity-10 max-md:flex-wrap max-md:max-w-full">
            <div className="my-auto tracking-normal text-yellow-500">Certificate</div>
            <div className="justify-center px-4 py-3 font-bold tracking-wide uppercase bg-gray-500 rounded-xl text-neutral-07">
              Claim reward
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-6 mt-4 rounded-lg border border-solid shadow-2xl backdrop-blur-lg bg-neutral-07/50 border-white/10 max-md:px-5 max-md:max-w-full">
        <div className="flex gap-4 self-start text-xl font-semibold tracking-tight leading-8 whitespace-nowrap text-neutral-01">
          <div className="w-4 h-8 bg-yellow-200 rounded" />
          <div className="grow">Beginner Track</div>
        </div>
        <div className="mt-8 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
            <div className="flex flex-col w-3/5 max-md:ml-0 max-md:w-full">
              <div className="flex overflow-hidden relative flex-col grow items-start self-stretch pt-5 pr-16 pb-12 pl-4 rounded-lg max-w-[1200px] min-h-[330px] max-md:pr-5 max-md:mt-10 max-md:max-w-full">
                <img
                  loading="lazy"
                  srcSet="/assets/images/article.jpeg"
                  className="object-cover absolute inset-0 size-full rounded-lg"
                />
                <div className="relative bg-neutral-900 h-[35px] w-[162px]" />
              </div>
            </div>
            <div className="flex flex-col ml-5 w-2/5 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow justify-between self-stretch text-base font-semibold tracking-normal leading-6 text-gray-200 max-md:mt-10">
                <div>
                  <span className="font-bold">📄</span> Blockchain Beyond Basics
                </div>
                <div className="mt-6 whitespace-nowrap leading-[160%] max-md:mr-1.5">
                  📄 Level up your knowledge of blockchain & crypto
                </div>
                <div className="mt-6">
                  ️<span className="font-bold">⌛ </span>Watch videos & pass quizzes
                </div>
                <div className="mt-6 leading-[160%]">⌛ 6 courses and 70+ modules</div>
                <div className="mt-6">
                  🎁 Receive a PDF or NFT certificate upon completing each intermediate-level course
                </div>
                <div className="mt-11 max-w-full max-md:mt-10 flex justify-start">
                  <div className="w-auto px-4 py-3 cursor-pointer bg-yellow-200 text-neutral-07 font-bold tracking-wide uppercase whitespace-nowrap rounded-xl leading-[160%]">
                    Start course
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-2xl font-bold leading-8 text-gray-200 max-md:max-w-full">
          6 Courses
        </div>
        <div className="flex gap-4 items-center justify-between mt-4 text-base tracking-normal leading-6 max-md:flex-wrap max-md:max-w-full">
          <CheckDone />
          <div className="flex flex-col flex-1 justify-center px-4 py-5 rounded-lg bg-gray-300 bg-opacity-10 max-md:max-w-full">
            <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-1 justify-between text-gray-200 whitespace-nowrap">
                <div>1.</div>
                <div className="grow">Blockchain Deep Dive</div>
              </div>
              <div className="flex gap-5 w-1/2 justify-between max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-2.5 justify-between text-gray-200">
                  <Aclock />
                  <div className="flex-auto">77 Min</div>
                </div>
                <div className="flex gap-3 justify-between text-yellow-500">
                  <Play />
                  <div>Learn Now</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-between mt-4 text-base tracking-normal leading-6 max-md:flex-wrap max-md:max-w-full">
          <CheckDone />
          <div className="flex flex-col flex-1 justify-center px-4 py-5 rounded-lg bg-gray-300 bg-opacity-10 max-md:max-w-full">
            <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-1 justify-between text-gray-200 whitespace-nowrap">
                <div>2.</div>
                <div className="grow">Cryptocurrency Deep Dive</div>
              </div>
              <div className="flex gap-5 w-1/2 justify-between max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-2.5 justify-between text-gray-200">
                  <Aclock />
                  <div className="flex-auto">110 Min</div>
                </div>
                <div className="flex gap-3 justify-between text-yellow-500">
                  <Play />
                  <div>Learn Now</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-between mt-4 text-base tracking-normal leading-6 max-md:flex-wrap max-md:max-w-full">
          <CheckDone />
          <div className="flex flex-col flex-1 justify-center px-4 py-5 rounded-lg bg-gray-300 bg-opacity-10 max-md:max-w-full">
            <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-1 justify-between text-gray-200 whitespace-nowrap">
                <div>3.</div>
                <div className="grow">DApps Deep Dive</div>
              </div>
              <div className="flex gap-5 w-1/2 justify-between max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-2.5 justify-between text-gray-200">
                  <Aclock />
                  <div className="flex-auto">73 Min</div>
                </div>
                <div className="flex gap-3 justify-between text-yellow-500">
                  <Play />
                  <div>Learn Now</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-between mt-4 text-base tracking-normal leading-6 max-md:flex-wrap max-md:max-w-full">
          <CheckDone />
          <div className="flex flex-col flex-1 justify-center px-4 py-5 rounded-lg bg-gray-300 bg-opacity-10 max-md:max-w-full">
            <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-1 justify-between text-gray-200 whitespace-nowrap">
                <div>4.</div>
                <div className="grow">DeFi Deep Dive</div>
              </div>
              <div className="flex gap-5 w-1/2 justify-between max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-2.5 justify-between text-gray-200">
                  <Aclock />
                  <div className="flex-auto">60 Min</div>
                </div>
                <div className="flex gap-3 justify-between text-yellow-500">
                  <Play />
                  <div>Learn Now</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-between mt-4 text-base tracking-normal leading-6 max-md:flex-wrap max-md:max-w-full">
          <CheckDone />
          <div className="flex flex-col flex-1 justify-center px-4 py-5 rounded-lg bg-gray-300 bg-opacity-10 max-md:max-w-full">
            <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-1 justify-between text-gray-500 whitespace-nowrap">
                <div>5.</div>
                <div className="grow">NFT Deep Dive</div>
              </div>
              <div className="flex gap-5 w-1/2 justify-between max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-2.5 justify-between text-gray-200">
                  <Aclock />
                  <div className="flex-auto">0 Min</div>
                </div>
                <div className="text-gray-500 whitespace-nowrap">Coming Soon</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-between mt-4 text-base tracking-normal leading-6 max-md:flex-wrap max-md:max-w-full">
          <CheckDone />
          <div className="flex flex-col flex-1 justify-center px-4 py-5 rounded-lg bg-gray-300 bg-opacity-10 max-md:max-w-full">
            <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-1 justify-between text-gray-500 whitespace-nowrap">
                <div>6.</div>
                <div className="grow">Crypto Trading Deep Dive</div>
              </div>
              <div className="flex gap-5 w-1/2 justify-between max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-2.5 justify-between text-gray-200">
                  <Aclock />
                  <div className="flex-auto">0 Min</div>
                </div>
                <div className="text-gray-500 whitespace-nowrap">Coming Soon</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center justify-between mt-4 max-md:flex-wrap max-md:max-w-full">
          <div className="flex justify-center items-center px-1 my-auto w-10 h-10 bg-yellow-300 aspect-square rounded-[40px]">
            <ClaimReward />
          </div>
          <div className="flex gap-5 justify-between p-4 text-base leading-6 whitespace-nowrap rounded-lg bg-gray-300 bg-opacity-10 max-md:flex-wrap max-md:max-w-full">
            <div className="my-auto tracking-normal text-yellow-500">Certificate</div>
            <div className="justify-center px-4 py-3 font-bold tracking-wide uppercase bg-gray-500 rounded-xl text-neutral-07">
              Claim reward
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
