import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button/Button.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import {
  CheckCircle2,
  Sparkles,
  Users,
  FileText,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { getStats } from '../../services/statsService.js';
import { useState, useEffect } from 'react';

export default function Cta() {
  const [stats, setStats] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    getStats().then((data) => setStats(data));
  }, []);

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white shadow-2xl">
          <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-float" />
          <div
            className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/5 blur-2xl animate-float"
            style={{ animationDelay: '1s' }}
          />
          <div
            className="absolute top-1/4 right-1/4 h-32 w-32 rounded-full bg-white/8 blur-xl animate-float"
            style={{ animationDelay: '2s' }}
          />
          <div
            className="absolute bottom-1/4 left-1/4 h-48 w-48 rounded-full bg-white/6 blur-2xl animate-float"
            style={{ animationDelay: '3s' }}
          />

          <div className="relative grid md:grid-cols-2 gap-12 p-8 sm:p-16">
            <div className="space-y-8">
              <div className="animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold uppercase tracking-wider text-emerald-100">
                    Başlamaya Hazır mısın?
                  </span>
                </div>
                <h3 className="text-4xl sm:text-5xl font-bold leading-tight bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                  Bugün bir şey anlat.
                </h3>
              </div>

              <div
                className="animate-fade-in-up"
                style={{ animationDelay: '0.2s' }}
              >
                <p className="text-xl text-emerald-50 leading-relaxed">
                  Dakikalar içinde yayına al; dilediğin zaman düzenle.
                  <span className="font-semibold text-white">
                    {' '}
                    Okunması keyifli, yazması hızlı.
                  </span>
                </p>
              </div>

              <div
                className="animate-fade-in-up"
                style={{ animationDelay: '0.4s' }}
              >
                <ul className="space-y-4 text-emerald-50">
                  {[
                    'Ücretsiz ve basit kurulum',
                    'Hoş kapak görselleri ve temiz tasarım',
                    'Tam kontrol: düzenle, güncelle, sil',
                  ].map((t, index) => (
                    <li key={t} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-lg">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="animate-fade-in-up flex flex-wrap gap-4"
                style={{ animationDelay: '0.6s' }}
              >
                {user ? (
                  <Link to="/new-post">
                    <Button size="tall" variant="outline">
                      Hemen Başla
                    </Button>
                  </Link>
                ) : (
                  <Link to="/register">
                    <Button size="tall" variant="soft">
                      Ücretsiz Kaydol
                    </Button>
                  </Link>
                )}
                <Link to="/posts">
                  <Button size="tall" variant="soft">
                    Yazıları Keşfet
                  </Button>
                </Link>
              </div>
            </div>

            <div
              className="md:ml-auto animate-fade-in-up"
              style={{ animationDelay: '0.8s' }}
            >
              <div className="relative">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-white/20">
                        <Users className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-emerald-100">
                        Yazarlar
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-white group-hover:scale-110 transition-transform">
                      {stats?.User} +
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-white/20">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-emerald-100">
                        Yazılar
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-white group-hover:scale-110 transition-transform">
                      {stats?.Post} +
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-white/20">
                        <Clock className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-emerald-100">
                        Ortalama
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-white group-hover:scale-110 transition-transform">
                      3dk
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-white/20">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-emerald-100">
                        Büyüme
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-white group-hover:scale-110 transition-transform">
                      +25%
                    </div>
                  </div>
                </div>
                <div className="h-48 rounded-2xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm border border-white/30 shadow-inner overflow-hidden hover:from-white/20 hover:to-white/10 transition-all duration-300">
                  <div className="absolute top-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-emerald-300 animate-pulse"></div>
                      <div
                        className="w-3 h-3 rounded-full bg-teal-300 animate-pulse"
                        style={{ animationDelay: '0.5s' }}
                      ></div>
                      <div
                        className="w-3 h-3 rounded-full bg-cyan-300 animate-pulse"
                        style={{ animationDelay: '1s' }}
                      ></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-white/25 rounded w-3/4 animate-pulse"></div>
                      <div
                        className="h-3 bg-white/20 rounded w-full animate-pulse"
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                      <div
                        className="h-3 bg-white/20 rounded w-5/6 animate-pulse"
                        style={{ animationDelay: '0.4s' }}
                      ></div>
                      <div
                        className="h-3 bg-white/20 rounded w-2/3 animate-pulse"
                        style={{ animationDelay: '0.6s' }}
                      ></div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div
                      className="h-8 bg-white/25 rounded-lg animate-pulse"
                      style={{ animationDelay: '0.8s' }}
                    ></div>
                  </div>
                </div>

                <p className="mt-4 text-sm text-emerald-100 text-center">
                  * İlhamlık alan: son yazılarından öne çıkanları burada vitrine
                  taşıyabilirsin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
