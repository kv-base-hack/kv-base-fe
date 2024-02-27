import ArrowRightIcon from '@/components/shared/icons/ArrowRight'
import Aclock from '@/components/shared/icons/courses/Aclock'
import ActiveACourceIcon from '@/components/shared/icons/courses/ActiveACourse'
import CheckDone from '@/components/shared/icons/courses/CheckDone'
import { useCourseQuery } from '@/query/course/getCourse'
import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/academy/courses/$courseId/deep')({
  component: CourseDetail,
})

function CourseDetail() {
  const params = Route.useParams()
  const [currentVideo, setCurrentVideo] = useState(0)

  const courseQuery = useCourseQuery({ id: params.courseId })
  const dataCourse = courseQuery.data?.data

  return (
    <div className="flex flex-col self-stretch p-10 max-md:px-5">
      <div className="flex items-center gap-0 py-2 text-xl tracking-tight leading-8 max-md:flex-wrap max-md:max-w-full">
        <Link to="/academy/courses" className="text-gray-400">
          Courses
        </Link>
        <ArrowRightIcon />
        <div className="flex-auto text-gray-200 max-md:max-w-full">Intermediate Track</div>
      </div>
      <div className="mt-4 text-4xl font-semibold tracking-tighter leading-10 text-gray-300 max-md:max-w-full">
        {dataCourse?.name}
      </div>
      <div className="justify-center mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
          <div className="flex flex-col w-[68%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch pb-3 text-base leading-6 text-gray-200 max-md:mt-10 max-md:max-w-full">
              <img
                loading="lazy"
                srcSet="/assets/images/video.png"
                className="w-full aspect-[1.64] max-md:max-w-full"
              />
              <div className="mt-4 text-3xl leading-10 max-md:max-w-full">
                {dataCourse?.videos[currentVideo].title}
              </div>
              <div className="mt-7 tracking-normal leading-6 max-md:mr-1.5 max-md:max-w-full">
                {dataCourse?.videos[currentVideo].description}
              </div>
              <div className="mt-7 font-bold tracking-normal max-md:mr-1.5 max-md:max-w-full">
                Further Reading
              </div>
              {dataCourse?.videos[currentVideo].read_more_links?.map((link, index) => {
                return (
                  <div
                    key={index}
                    className="mt-6 tracking-normal text-yellow-200 max-md:max-w-full">
                    {link.title}
                  </div>
                )
              })}
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[32%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow self-stretch text-gray-200 max-md:mt-10">
              {dataCourse?.videos?.map((video, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => setCurrentVideo(index)}
                    className="flex cursor-pointer items-center gap-4 justify-between px-5 py-3 mt-4 first:mt-0 rounded-lg border border-solid bg-zinc-900 bg-opacity-50 border-white border-opacity-10">
                    <div className="flex flex-col flex-1">
                      <div className="text-sm tracking-normal leading-4">{video.title}</div>
                      <div className="flex items-center gap-1.5 justify-between mt-2 text-xs tracking-normal leading-3">
                        <Aclock className="w-3" />
                        <div className="flex-auto">{video.duration} Min</div>
                      </div>
                    </div>
                    {currentVideo === index ? <ActiveACourceIcon /> : <CheckDone className="w-6" />}
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
