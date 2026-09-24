import { VideoCard } from "@/components/cards/video-card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { latestVideos } from "@/data/videos";

export function LatestVideos() {
  if (latestVideos.length === 0) return null;
  return (
    <section aria-labelledby="videos-title" className="bg-white py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            id="videos-title"
            eyebrow="Watch"
            title="Latest Property Videos"
            description="Project walkthroughs, neighbourhood films and market updates from the Ticmark team."
          />
        </Reveal>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {latestVideos.slice(0, 3).map((video, i) => (
            <li key={video.id}>
              <Reveal delay={i * 90}>
                <VideoCard video={video} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
