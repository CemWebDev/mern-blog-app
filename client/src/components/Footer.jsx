import { Link } from 'react-router-dom';
import { Github, Mail, FileText } from 'lucide-react';
import { FooterLink } from './Footer/FooterLink';
import { Social } from './Footer/Social';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-gray-100 bg-white/70 backdrop-blur">
      <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 text-white grid place-items-center shadow-md">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-gray-900">MERN BLOG</span>
            </Link>
            <p className="mt-3 text-gray-600">
              Hızlı, temiz ve keyifli yazı deneyimi. Paylaş, ilham ver.
            </p>
          </div>

          <nav aria-label="Hızlı linkler" className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Uygulama</h4>
              <ul className="mt-3 space-y-2 text-gray-600">
                <li>
                  <FooterLink to="/posts">Yazılar</FooterLink>
                </li>
                <li>
                  <FooterLink to="/new-post">Yayınla</FooterLink>
                </li>
                <li>
                  <FooterLink to="/profile">Profil</FooterLink>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Hesap</h4>
              <ul className="mt-3 space-y-2 text-gray-600">
                <li>
                  <FooterLink to="/login">Giriş Yap</FooterLink>
                </li>
                <li>
                  <FooterLink to="/register">Ücretsiz Kaydol</FooterLink>
                </li>
                <li>
                  <FooterLink to="/dashboard">Panel</FooterLink>
                </li>
              </ul>
            </div>
          </nav>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 hover:text-emerald-700 transition-colors cursor-default">
              İletişim
            </h4>
            <p className="mt-3 text-gray-600">
              Öneri ya da geri bildirimin var mı? Ulaşabilirsin.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Social
                href="https://github.com/CemWebDev/mern-blog-app"
                label="GitHub"
              >
                <Github className="w-5 h-5" />
              </Social>
              <Social href="mailto:b.b.cem.07@gmail.com" label="E-posta">
                <Mail className="w-5 h-5" />
              </Social>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-100 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-2">
            <p className="text-sm text-gray-500 text-center md:text-left md:justify-self-start">
              © {year} MERN Blog. Tüm hakları saklıdır.
            </p>
            <a
              href="https://github.com/CemWebDev"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-gray-700 hover:text-emerald-700 text-center md:justify-self-center"
            >
              CemWebDev tarafından geliştirildi
            </a>
            <div className="text-sm text-gray-500 space-x-4 text-center md:text-right md:justify-self-end">
              <FooterLink to="#" muted>
                Gizlilik
              </FooterLink>
              <FooterLink to="#" muted>
                Koşullar
              </FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
