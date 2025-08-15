import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import Button from '../UI/Button/Button.jsx';
import Badge from './UI/Badge';
import PreviewCard from './UI/PreviewCard.jsx';
import { Sparkles, Zap, ShieldCheck, BookOpen } from 'lucide-react';

export default function Hero() {
  const { user } = useAuth();

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-teal-200/30 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-medium text-emerald-700">
              <Sparkles className="w-3.5 h-3.5" />
              Fast • Clean • MERN
            </span>

            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
              Yaz. Paylaş.{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                İlham ver.
              </span>
            </h1>

            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              MERN Blog; fikirlerini hızlıca yayımlayabileceğin, başkalarının
              yazılarını keşfedebileceğin sade ve akıcı bir platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/posts">
                <Button variant="primary" size="tall">
                  Yazıları Keşfet
                </Button>
              </Link>
              {user ? (
                <Link to="/new-post">
                  <Button variant="soft" size="tall">
                    Yeni Yazı Oluştur
                  </Button>
                </Link>
              ) : (
                <Link to="/register">
                  <Button variant="soft" size="tall">
                    Ücretsiz Kaydol
                  </Button>
                </Link>
              )}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
              <Badge icon={<Zap className="w-4 h-4" />} title="Hızlı" />
              <Badge
                icon={<ShieldCheck className="w-4 h-4" />}
                title="Güvenli"
              />
              <Badge
                icon={<BookOpen className="w-4 h-4" />}
                title="Okunabilir"
              />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-emerald-200/30 to-teal-200/30 blur-2xl" />
            <div className="relative">
              <PreviewCard className="rotate-[-2deg] translate-y-2 opacity-90" />
              <PreviewCard
                className="relative -top-6 rotate-[2deg] shadow-xl"
                accent
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
