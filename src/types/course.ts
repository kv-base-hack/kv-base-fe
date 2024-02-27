export interface Course {
  id: string
  name: string
  duration: number
  videos: Video[]
}

export interface Video {
  title: string
  duration: number
  description: string
  link: string
  read_more_links: ReadMoreLink[]
}

export interface ReadMoreLink {
  title: string
  link: string
}
export interface CourseResponse {
  data: Course
}
