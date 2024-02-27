export interface Article {
  id: string
  title: string
  content: string
  image: string
  topics: string[]
  difficulty: string
  reading_time: number
}

export interface ArticleResponse {
  data: Article[]
}
