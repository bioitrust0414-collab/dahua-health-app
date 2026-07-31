import { createFileRoute } from '@tanstack/react-router'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Article } from '@/types/content'

export const Route = createFileRoute('/education/$episodeId')({
  component: EpisodeDetailPage,
  loader: async ({ params }) => {
    const { episodeId } = params
    const res = await fetch(`/content/itrust/episodes/${episodeId}/article.json`)
    if (!res.ok) throw new Error('Article not found')
    return res.json() as Promise<Article>
  },
})

function EpisodeDetailPage() {
  const article = Route.useLoaderData()
  const { episodeId } = Route.useParams()

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Tabs defaultValue="fb" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="fb">FB 長文</TabsTrigger>
          <TabsTrigger value="ig">IG 短文</TabsTrigger>
        </TabsList>

        <TabsContent value="fb" className="mt-6">
          <article className="prose prose-stone max-w-none">
            {article.fb_long.split('\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </article>
        </TabsContent>

        <TabsContent value="ig" className="mt-6">
          <div className="bg-muted p-6 rounded-lg">
            <p className="whitespace-pre-wrap">{article.ig_short}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {article.hashtags.map((tag) => (
                <span key={tag} className="text-primary">#{tag}</span>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 grid grid-cols-1 gap-4">
        {article.images.cards.map((img, i) => (
          <img
            key={i}
            src={`/content/itrust/episodes/${episodeId}/images/${img}`}
            alt={`圖卡 ${i + 1}`}
            className="w-full rounded-lg shadow"
          />
        ))}
      </div>
    </div>
  )
}
