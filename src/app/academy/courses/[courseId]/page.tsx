'use client'

import ArrowRightIcon from '@/components/shared/icons/ArrowRight'
import Aclock from '@/components/shared/icons/courses/Aclock'
import ActiveACourceIcon from '@/components/shared/icons/courses/ActiveACourse'
import CheckDone from '@/components/shared/icons/courses/CheckDone'
import { useCourseQuery } from '@/query/course/getCourse'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function CourseDetail() {
  const router = useRouter()
  const { courseId } = router.query
  const [currentVideo, setCurrentVideo] = useState(0)

  const courseQuery = useCourseQuery({ id: courseId?.toString() || '' })
  const dataCourse = courseQuery.data?.data

  return (
    <div className="flex flex-col self-stretch p-10 max-md:px-5">
      <div className="flex items-center gap-0 py-2 text-xl leading-8 tracking-tight max-md:max-w-full max-md:flex-wrap">
        <Link href="/academy/courses" className="text-gray-400">
          Courses
        </Link>
        <ArrowRightIcon />
        <div className="flex-auto text-gray-200 max-md:max-w-full">
          Intermediate Track
        </div>
      </div>
      <div className="mt-4 text-4xl font-semibold leading-10 tracking-tighter text-gray-300 max-md:max-w-full">
        {dataCourse?.name}
      </div>
      <div className="mt-10 justify-center max-md:max-w-full">
        <div className="max-md: flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex w-[68%] flex-col max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch pb-3 text-base leading-6 text-gray-200 max-md:mt-10 max-md:max-w-full">
              <Image
                loading="lazy"
                src="/assets/images/video.png"
                alt={dataCourse?.name || 'video'}
                className="aspect-[1.64] w-full max-md:max-w-full"
              />
              <div className="mt-4 text-3xl leading-10 max-md:max-w-full">
                {dataCourse?.videos[currentVideo].title}
              </div>
              <div className="mt-7 leading-6 tracking-normal max-md:mr-1.5 max-md:max-w-full">
                {dataCourse?.videos[currentVideo].description}
              </div>
              <div className="mt-7 font-bold tracking-normal max-md:mr-1.5 max-md:max-w-full">
                Further Reading
              </div>
              {dataCourse?.videos[currentVideo].read_more_links?.map(
                (link, index) => {
                  return (
                    <div
                      key={index}
                      className="mt-6 tracking-normal text-yellow-200 max-md:max-w-full"
                    >
                      {link.title}
                    </div>
                  )
                },
              )}
            </div>
          </div>
          <div className="ml-5 flex w-[32%] flex-col max-md:ml-0 max-md:w-full">
            <div className="flex grow flex-col self-stretch text-gray-200 max-md:mt-10">
              {dataCourse?.videos?.map((video, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => setCurrentVideo(index)}
                    className="mt-4 flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-solid border-white border-opacity-10 bg-zinc-900 bg-opacity-50 px-5 py-3 first:mt-0"
                  >
                    <div className="flex flex-1 flex-col">
                      <div className="text-sm leading-4 tracking-normal">
                        {video.title}
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-1.5 text-xs leading-3 tracking-normal">
                        <Aclock className="w-3" />
                        <div className="flex-auto">{video.duration} Min</div>
                      </div>
                    </div>
                    {currentVideo === index ? (
                      <ActiveACourceIcon />
                    ) : (
                      <CheckDone className="w-6" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
