import FeatureCard from './UI/FeatureCard';
import { PenSquare, Rocket, ShieldCheck } from 'lucide-react';

export default function Features() {
  return (
    <section className="pb-6 sm:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<PenSquare className="w-5 h-5" />}
            title="Basit Editör"
            text="Kafa karıştırmayan arayüz, hızlı yayınlama deneyimi."
          />
          <FeatureCard
            icon={<Rocket className="w-5 h-5" />}
            title="Akıcı Deneyim"
            text="Sayfalar göz açıp kapayıncaya kadar açılır; odak yalnızca yazında kalır."
          />
          <FeatureCard
            icon={<ShieldCheck className="w-5 h-5" />}
            title="Kontrol Sende"
            text="Yazılarını düzenle, kapak görselini güncelle; dilediğinde sil."
          />
        </div>
      </div>
    </section>
  );
}
