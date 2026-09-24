import { VideoFeature } from "@/components/home/video-feature";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-heading";
import { siteConfig } from "@/data/site-config";
import { featuredVideo } from "@/data/videos";

export function VideoSection() {
  const { videoFeature } = siteConfig;
  return (
    <section aria-labelledby="video-title" className="overflow-hidden bg-white py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
            <div>
              <Eyebrow className="mb-4">{videoFeature.eyebrow}</Eyebrow>
              <h2 id="video-title" className="text-[1.9rem] font-bold leading-[1.12] sm:text-[2.35rem] lg:text-[2.6rem]">
                {videoFeature.heading}
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-body sm:text-[17px] lg:justify-self-end">{videoFeature.copy}</p>
          </div>
        </Reveal>
        <Reveal delay={120} className="mt-10 lg:mt-14">
          <VideoFeature video={featuredVideo} />
        </Reveal>
      </Container>
    </section>
  );
}
