export interface Track {
  id: string
  name: string
  description: string
  image: string
  courses: string[]
  coursesData: CoursesDaum[]
}

export interface CoursesDaum {
  id: string
  name: string
  duration: number
  videos: Video[]
}

export interface Video {
  title: string
  duration: number
  link: string
  read_more_links: ReadMoreLink[]
}

export interface ReadMoreLink {
  title: string
  link: string
}

export interface TrackResponse {
  data: Track[]
}
