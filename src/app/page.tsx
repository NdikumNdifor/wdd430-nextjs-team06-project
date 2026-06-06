import { ArtisanSpotlight } from './ui/home/artisan-spotlight';
import { CategoryShowcase } from './ui/home/category-showcase';
import { CommunityHighlights } from './ui/home/community-highlights';
import { Footer } from './ui/home/footer';
import { Hero } from './ui/home/hero';
import { SiteHeader } from './ui/home/site-header';

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
