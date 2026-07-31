import { createFileRoute, notFound } from '@tanstack/react-router'
import type { Article, CardText } from '@/types/content'

// Bundles all episode article.json files at build time — no runtime fetch/fs needed.
const articleModules = import.meta.glob('/src/data/itrust/episodes/*/article.json', {
  eager: true,
}) as Record<string, { default: Article }>

function getArticle(episodeId: string): Article | undefined {
  const path = `/src/data/itrust/episodes/${episodeId}/article.json`
  return articleModules[path]?.default
}

export const Route = createFileRoute('/education/$episodeId')({
  component: EpisodeDetailPage,
  loader: ({ params }) => {
    const article = getArticle(params.episodeId)
    if (!article) throw notFound()
    return article
  },
})

function ArticleBody({
  text,
  cards,
  episodeId,
}: {
  text: CardText
  cards: Article['cards']
  episodeId: string
}) {
  const sections: Array<{ key: keyof CardText; img: string }> = [
    { key: 'cover', img: cards.cover },
    { key: 'card2', img: cards.card2 },
    { key: 'card3', img: cards.card3 },
  ]

  return (
    <div className="space-y-8">
      {sections.map(({ key, img }) => (
        <div key={key} className="space-y-3">
          <img
            src={`/content/itrust/episodes/${episodeId}/${img}`}
            alt=""
            className="w-full rounded-lg shadow"
          />
          <p className="whitespace-pre-wrap leading-relaxed">{text[key]}</p>
        </div>
      ))}
    </div>
  )
}

function EpisodeDetailPage() {
  const article = Route.useLoaderData()
  const { episodeId } = Route.useParams()

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">{article.title}</h1>
      <p className="text-muted-foreground mb-6">{article.hook}</p>
      <ArticleBody text={article.fb_long} cards={article.cards} episodeId={episodeId} />
    </div>
  )
}
