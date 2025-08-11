import Footer from '../components/Footer';
import Header from '../components/Header';
import Cta from '../components/Home/CTA';
import Features from '../components/Home/Features';
import Hero from '../components/Home/Hero';
import LatestPosts from '../components/Home/LatestPosts';

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50/30">
        <Header />
        <Hero />
        <LatestPosts />
        <Features />
        <Cta />
      </div>
      <Footer />
    </>
  );
}
