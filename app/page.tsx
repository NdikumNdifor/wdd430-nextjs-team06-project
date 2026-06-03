import { ArtisanSpotlight } from '@/app/ui/home/artisan-spotlight';
import { CategoryShowcase } from '@/app/ui/home/category-showcase';
import { CommunityHighlights } from '@/app/ui/home/community-highlights';
import { Footer } from '@/app/ui/home/footer';
import { Hero } from '@/app/ui/home/hero';
import { SiteHeader } from '@/app/ui/home/site-header';

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <CategoryShowcase />
        <ArtisanSpotlight />
        <CommunityHighlights />
      </main>
      <Footer />
    </>
  );
}
