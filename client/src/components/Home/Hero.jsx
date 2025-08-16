import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import Button from '../UI/Button/Button.jsx';
import Badge from './UI/Badge';
import { blogFeatures } from '../../constants/index.js';
import { Sparkles, Zap, ShieldCheck, BookOpen, TrendingUp } from 'lucide-react';
import { getStats } from '../../services/statsService.js';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [stats, setStats] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    getStats().then((data) => setStats(data));
  }, []);

  console.log('Stats:', stats);
  console.log('User:', stats.User);

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse" />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-accent/10 blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
      />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-secondary/5 blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 lg:space-y-8 order-1">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                Fast • Clean • MERN
                <TrendingUp className="w-4 h-4 ml-1" />
              </span>
            </div>

            <div
              className="animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground leading-tight">
                Yaz. Paylaş.{' '}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-x">
                  İlham ver.
                </span>
              </h1>
            </div>

            <div
              className="animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg">
                MERN Blog; fikirlerini hızlıca yayımlayabileceğin, başkalarının
                yazılarını keşfedebileceğin{' '}
                <span className="text-primary font-medium">sade ve akıcı</span>{' '}
                bir platform.
              </p>
            </div>

            <div
              className="animate-fade-in-up flex flex-col sm:flex-row gap-4"
              style={{ animationDelay: '0.6s' }}
            >
              <Link to="/posts">
                <Button variant="primary" size="tall" className="w-full">
                  Yazıları Keşfet
                </Button>
              </Link>
              {user ? (
                <Link to="/new-post">
                  <Button variant="soft" size="tall" className="w-full">
                    Yeni Yazı Oluştur
                  </Button>
                </Link>
              ) : (
                <Link to="/register">
                  <Button variant="soft" size="tall" className="w-full">
                    Ücretsiz Kaydol
                  </Button>
                </Link>
              )}
            </div>

            <div
              className="animate-fade-in-up grid grid-cols-3 gap-3 sm:gap-4 max-w-md pt-4"
              style={{ animationDelay: '0.8s' }}
            >
              <div className="group">
                <Badge
                  icon={
                    <Zap className="w-4 h-4 group-hover:text-primary transition-colors" />
                  }
                  title="Hızlı"
                  className="hover:bg-card/60 transition-all duration-300 hover:scale-105"
                />
              </div>
              <div className="group">
                <Badge
                  icon={
                    <ShieldCheck className="w-4 h-4 group-hover:text-primary transition-colors" />
                  }
                  title="Güvenli"
                  className="hover:bg-card/60 transition-all duration-300 hover:scale-105"
                />
              </div>
              <div className="group">
                <Badge
                  icon={
                    <BookOpen className="w-4 h-4 group-hover:text-primary transition-colors" />
                  }
                  title="Okunabilir"
                  className="hover:bg-card/60 transition-all duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>

          <div
            className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-lg animate-fade-in-up order-1 lg:order-2"
            style={{ animationDelay: '1s' }}
          >
            <div className="absolute -inset-4 sm:-inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-primary/20 via-secondary/10 to-accent/20 blur-2xl animate-pulse" />
            <div className="relative h-80 w-80 sm:h-96 sm:w-96 mx-auto">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-2xl flex items-center justify-center group hover:scale-110 transition-all duration-300 border-4 border-white/20">
                <BookOpen className="w-6 h-6 sm:w-10 sm:h-10 text-white drop-shadow-lg group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute -bottom-8 sm:-bottom-10 left-1/2 -translate-x-1/2 text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap bg-white/80 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full border border-white/30">
                  MERN Blog
                </div>
              </div>
              {blogFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={feature.name}
                    className={`absolute w-12 h-12 sm:w-16 sm:h-16 rounded-full ${feature.color} shadow-lg flex items-center justify-center cursor-pointer group hover:scale-125 transition-all duration-300 animate-float`}
                    style={{
                      ...(window.innerWidth < 640
                        ? feature.position.mobile
                        : feature.position.desktop),
                      animationDelay: `${index * 0.5}s`,
                    }}
                  >
                    <IconComponent className="w-4 h-4 sm:w-6 sm:h-6 text-white group-hover:rotate-12 transition-transform duration-300" />

                    <div className="absolute top-1/2 left-1/2 w-px h-16 sm:h-20 bg-gradient-to-b from-border to-transparent origin-top rotate-45 opacity-30 group-hover:opacity-60 transition-opacity duration-300" />

                    <div className="absolute -top-14 sm:-top-16 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-white/20 rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform group-hover:-translate-y-1 z-10">
                      <div className="text-xs sm:text-sm font-semibold text-gray-800">
                        {feature.name}
                      </div>
                      <div className="text-xs text-gray-600 mt-1 hidden sm:block">
                        {feature.description}
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white/90"></div>
                    </div>
                  </div>
                );
              })}

              <div
                className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-2 sm:p-3 shadow-lg animate-float"
                style={{ animationDelay: '1s' }}
              >
                <div className="text-sm sm:text-lg font-bold text-primary">
                  {stats?.Post} +
                </div>
                <div className="text-xs text-muted-foreground">Aktif Yazı</div>
              </div>

              <div
                className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-2 sm:p-3 shadow-lg animate-float"
                style={{ animationDelay: '1.5s' }}
              >
                <div className="text-sm sm:text-lg font-bold text-secondary">
                  {stats?.User} +
                </div>
                <div className="text-xs text-muted-foreground">Yazar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
