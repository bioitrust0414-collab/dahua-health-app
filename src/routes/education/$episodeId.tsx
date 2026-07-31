import { createFileRoute, notFound } from '@tanstack/react-router'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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

function ChannelContent({
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

      <Tabs defaultValue="web" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="web">網站文案</TabsTrigger>
          <TabsTrigger value="fb">FB 長文</TabsTrigger>
          <TabsTrigger value="ig">IG 短文</TabsTrigger>
        </TabsList>

        <TabsContent value="web" className="mt-6">
          <ChannelContent text={article.web_copy} cards={article.cards} episodeId={episodeId} />
        </TabsContent>

        <TabsContent value="fb" className="mt-6">
          <ChannelContent text={article.fb_long} cards={article.cards} episodeId={episodeId} />
        </TabsContent>

        <TabsContent value="ig" className="mt-6">
          <ChannelContent text={article.ig_short} cards={article.cards} episodeId={episodeId} />
          {article.hashtags && (
            <p className="mt-4 text-primary text-sm">{article.hashtags}</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
