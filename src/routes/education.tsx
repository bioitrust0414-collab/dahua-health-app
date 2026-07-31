import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { EpisodeIndex } from '@/types/content'

export const Route = createFileRoute('/education')({
  component: EducationPage,
  loader: async () => {
    const res = await fetch('/content/itrust/index.json')
    if (!res.ok) throw new Error('Failed to load content')
    return res.json() as Promise<EpisodeIndex>
  },
})

function EducationPage() {
  const data = Route.useLoaderData()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">衛教知識</h1>
      <p className="text-muted-foreground mb-8">
        精選 36 期營養科普，陪你建立科學健康觀念
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.episodes.map((ep) => (
          <Link
            key={ep.id}
            to="/education/$episodeId"
            params={{ episodeId: ep.slug }}
          >
            <Card className="hover:shadow-lg transition-shadow h-full">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={`/content/itrust/episodes/${ep.slug}/images/${ep.cover_image}`}
                  alt={ep.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={ep.type === '深度' ? 'default' : 'secondary'}>
                    {ep.type}
                  </Badge>
                  <Badge variant="outline">{ep.category}</Badge>
                </div>
                <CardTitle className="text-lg">第 {ep.episode_number} 期</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {ep.title}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
