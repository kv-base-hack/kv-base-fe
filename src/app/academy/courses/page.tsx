'use client'

import Aclock from '@/components/shared/icons/courses/Aclock'
import CheckDone from '@/components/shared/icons/courses/CheckDone'
import ClaimReward from '@/components/shared/icons/courses/ClaimReward'
import Learning from '@/components/shared/icons/courses/Learning'
import OneStopLearning from '@/components/shared/icons/courses/OneStopLearning'
import Play from '@/components/shared/icons/courses/Play'
import ReceiveCertificate from '@/components/shared/icons/courses/ReceiveCertificate'
import { cn } from '@/lib/utils'
import { useTrackQuery } from '@/query/course/getTrack'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Courses() {
  const [tab, setTab] = useState('all_course')

  return (
    <div className="h-full w-full">
      <div className="flex flex-col self-stretch p-10 max-md:px-5">
        <div className="text-4xl font-semibold leading-10 tracking-tighter text-gray-300 max-md:max-w-full">
          Courses - Learn crypto and earn rewards
        </div>
        <div className="mt-4 text-base leading-6 tracking-normal text-neutral-01 max-md:max-w-full">
          Advance your knowledge for free through our fun, interactive courses.
          Kaivest Academy presents the most comprehensive educational courses
          lineup for beginners, intermediate and advanced learners.
        </div>
        <div className="mt-4 flex items-center justify-center px-16 py-4 max-md:max-w-full max-md:px-5">
          <div className="w-full max-w-[804px] max-md:max-w-full">
            <div className="max-md: flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex w-1/3 flex-col max-md:ml-0 max-md:w-full">
                <div className="flex flex-col items-center justify-center whitespace-nowrap text-center text-lg leading-8 tracking-tight text-gray-200 max-md:mt-8 max-md:px-5">
                  <Learning />
                  <div className="mt-5">Learn for Free</div>
                </div>
              </div>
              <div className="ml-5 flex w-1/3 flex-col max-md:ml-0 max-md:w-full">
                <div className="flex flex-col items-center justify-center whitespace-nowrap text-center text-lg leading-8 tracking-tight text-gray-200 max-md:mt-8 max-md:px-5">
                  <ReceiveCertificate />
                  <div className="mt-5">Receive Certificate</div>
                </div>
              </div>
              <div className="ml-5 flex w-1/3 flex-col max-md:ml-0 max-md:w-full">
                <div className="flex flex-col items-center justify-center whitespace-nowrap text-center text-lg leading-8 tracking-tight text-gray-200 max-md:mt-8 max-md:px-5">
                  <OneStopLearning />
                  <div className="mt-5">One-Stop Learning Hub</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-2 whitespace-nowrap pr-20 text-base font-semibold leading-6 tracking-normal text-gray-500 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
          <div
            onClick={() => setTab('all_course')}
            className={cn(
              'cursor-pointer justify-center rounded-lg px-4 py-2',
              tab === 'all_course'
                ? 'bg-neutral-06 text-neutral-00'
                : 'bg-neutral-07 text-neutral-04',
            )}
          >
            All courses
          </div>
          <div
            onClick={() => setTab('in_process')}
            className={cn(
              'cursor-pointer justify-center rounded-lg px-4 py-2',
              tab === 'in_process'
                ? 'bg-neutral-06 text-neutral-00'
                : 'bg-neutral-07 text-neutral-04',
            )}
          >
            In Progress
          </div>
          <div
            onClick={() => setTab('completed')}
            className={cn(
              'cursor-pointer justify-center rounded-lg px-4 py-2',
              tab === 'completed'
                ? 'bg-neutral-06 text-neutral-00'
                : 'bg-neutral-07 text-neutral-04',
            )}
          >
            Completed
          </div>
        </div>
        {tab === 'all_course' ? (
          <AllCourse />
        ) : (
          <div className="flex flex-col items-center px-5 text-base leading-6">
            <Image
              loading="lazy"
              src="/assets/images/no-permission.png"
              alt="no-permission"
              className="aspect-square w-80 max-w-full"
            />
            <div className="mt-10 w-full self-stretch text-center tracking-normal text-zinc-50 max-md:max-w-full">
              You will find your finished courses here.
            </div>

            <div className="mt-4 flex max-w-full justify-start max-md:mt-10">
              <div className="w-auto cursor-pointer whitespace-nowrap rounded-xl bg-yellow-200 px-4 py-3 font-bold uppercase leading-[160%] tracking-wide text-neutral-07">
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
  //
  const trackQuery = useTrackQuery()
  const dataTrack = trackQuery.data?.data || []

  return dataTrack?.map((track) => (
    <div
      key={track.id}
      className="mt-4 flex flex-col rounded-lg border border-solid border-white/10 bg-neutral-07/50 p-6 shadow-2xl backdrop-blur-lg max-md:max-w-full max-md:px-5"
    >
      <div className="flex gap-4 self-start whitespace-nowrap text-xl font-semibold leading-8 tracking-tight text-neutral-02">
        <div className="h-8 w-4 rounded bg-yellow-200" />
        <div className="grow">{track.name}</div>
      </div>
      <div className="mt-8 max-md:max-w-full">
        <div className="max-md: flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex w-3/5 flex-col max-md:ml-0 max-md:w-full">
            <div className="relative flex min-h-[330px] max-w-[1200px] grow flex-col items-start self-stretch overflow-hidden rounded-lg pb-12 pl-4 pr-16 pt-5 max-md:mt-10 max-md:max-w-full max-md:pr-5">
              <Image
                loading="lazy"
                src={`https://cdn.kai.13thstation.xyz/track/${track.id}.webp`}
                alt={track.name}
                className="absolute inset-0 size-full rounded-lg object-cover"
              />
              <div className="relative h-[35px] w-[162px] bg-neutral-900" />
            </div>
          </div>
          <div className="ml-5 flex w-2/5 flex-col max-md:ml-0 max-md:w-full">
            <div className="flex flex-col gap-6 self-stretch text-base font-semibold leading-6 tracking-normal text-gray-200 max-md:mt-10">
              {track?.description
                ?.split('\n')
                ?.map((item, index) => <div key={index}>{item}</div>)}
              <div className="mt-8 flex max-w-full justify-start max-md:mt-10">
                <Link
                  href={`/academy/courses/${track.courses?.[0]}`}
                  className="w-auto cursor-pointer whitespace-nowrap rounded-xl bg-yellow-200 px-4 py-3 font-bold uppercase leading-[160%] tracking-wide text-neutral-07"
                >
                  Start course
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-2xl font-bold leading-8 text-gray-200 max-md:max-w-full">
        {track.coursesData.length} Courses
      </div>
      {track.coursesData.map((course) => (
        <Link
          href={`/academy/courses/${course.id}`}
          key={course.id}
          className="mt-4 flex items-center justify-between gap-4 text-base leading-6 tracking-normal max-md:max-w-full max-md:flex-wrap"
        >
          <CheckDone />
          <div className="flex flex-1 flex-col justify-center rounded-lg bg-gray-300 bg-opacity-10 px-4 py-5 max-md:max-w-full">
            <div className="flex w-full justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
              <div className="flex justify-between gap-1 whitespace-nowrap text-gray-200">
                <div>1.</div>
                <div className="grow">{course.name}</div>
              </div>
              <div className="flex w-1/2 justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
                <div className="flex justify-between gap-2.5 text-gray-200">
                  <Aclock />
                  <div className="flex-auto">{course.duration} Min</div>
                </div>
                <div className="flex justify-between gap-3 text-yellow-500">
                  <Play />
                  <div>Learn Now</div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}

      <div className="mt-4 flex items-center justify-between gap-4 max-md:max-w-full max-md:flex-wrap">
        <div className="my-auto flex aspect-square h-10 w-10 items-center justify-center rounded-[40px] bg-yellow-300 px-1">
          <ClaimReward />
        </div>
        <div className="flex justify-between gap-5 whitespace-nowrap rounded-lg bg-gray-300 bg-opacity-10 p-4 text-base leading-6 max-md:max-w-full max-md:flex-wrap">
          <div className="my-auto tracking-normal text-yellow-500">
            Certificate
          </div>
          <div className="justify-center rounded-xl bg-gray-500 px-4 py-3 font-bold uppercase tracking-wide text-neutral-07">
            Claim reward
          </div>
        </div>
      </div>
    </div>
  ))
}
