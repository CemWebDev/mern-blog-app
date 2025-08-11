import { Link } from 'react-router-dom';
import Button from "../../components/UI/Button/Button.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { CheckCircle2 } from 'lucide-react';

export default function Cta() {
  const { user } = useAuth();

  return (
    <section className="py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
          <div className="absolute -right-16 -bottom-16 h-72 w-72 rounded-full bg-white/15 blur-2xl" />
          <div className="relative grid md:grid-cols-2 gap-8 p-8 sm:p-12">
            <div>
              <h3 className="text-3xl font-extrabold leading-tight">Bugün bir şey anlat.</h3>
              <p className="mt-3 text-emerald-50">
                Dakikalar içinde yayına al; dilediğin zaman düzenle. Okunması keyifli, yazması hızlı.
              </p>

              <ul className="mt-6 space-y-2 text-emerald-50/95">
                {[
                  'Ücretsiz ve basit kurulum',
                  'Hoş kapak görselleri ve temiz tasarım',
                  'Tam kontrol: düzenle, güncelle, sil',
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> {t}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                {user ? (
                  <Link to="/new-post">
                    <Button
                      size="tall"
                      variant="soft"
                      className="bg-white text-emerald-700 hover:bg-white/90"
                    >
                      Hemen Başla
                    </Button>
                  </Link>
                ) : (
                  <Link to="/register">
                    <Button
                      size="tall"
                      variant="soft"
                      className="bg-white text-emerald-700 hover:bg-white/90"
                    >
                      Ücretsiz Kaydol
                    </Button>
                  </Link>
                )}
                <Link to="/posts">
                  <Button
                    size="tall"
                    variant="ghost"
                    className="text-white border border-white/30 hover:bg-white/10"
                  >
                    Yazıları Keşfet
                  </Button>
                </Link>
              </div>
            </div>

            <div className="md:ml-auto">
              <div className="h-56 sm:h-64 rounded-xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border border-white/30 shadow-inner" />
              <p className="mt-3 text-sm text-emerald-50/90">
                * İlhamlık alan: son yazılarından öne çıkanları burada vitrine taşıyabilirsin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
