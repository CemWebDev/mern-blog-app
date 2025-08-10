import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button/Button';
import Input from '../components/UI/Input/Input';
import { usePosts, usePostActions } from '../hooks/usePosts';
import Textarea from '../components/UI/Input/TextArea';
import { postSchema } from '../schemas/postSchema';
import { toastError, toastPromise } from '../utils/toast';
import CoverPicker from '../components/Posts/CoverPicker';
import { Rocket, X as XIcon } from 'lucide-react';

const NewPost = () => {
  const [form, setForm] = useState({ title: '', content: '' });
  const [cover, setCover] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { isLoading, isError, message } = usePosts();
  const { createPost } = usePostActions();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (cover && cover.size > 5 * 1024 * 1024) {
        toastError('Kapak görseli en fazla 5MB olmalı.');
        return;
      }

      await postSchema.validate(form, { abortEarly: false });
      setErrors({});

      const fd = new FormData();
      fd.append('title', form.title.trim());
      fd.append('content', form.content.trim());
      if (cover) fd.append('cover', cover);

      const createPromise = createPost(fd).unwrap();

      const created = await toastPromise(createPromise, {
        loading: 'Yazı yayımlanıyor…',
        success: 'Yazı yayımlandı!',
        error: (err) =>
          err?.response?.data?.message || err?.message || 'Yazı oluşturulamadı',
      });

      const id = created?._id || created?.id;
      navigate(id ? `/posts/${id}` : '/posts');
    } catch (err) {
      if (err?.name === 'ValidationError') {
        const out = {};
        for (const v of err.inner) if (!out[v.path]) out[v.path] = v.message;
        setErrors(out);
        toastError('Formu kontrol et: eksik/hatalı alanlar var.');
        return;
      }
      toastError(err?.message || 'Bir şeyler ters gitti.');
    }
  };

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Yeni Yazı Oluştur
        </h1>
        <p className="text-gray-600">
          Fikirlerinizi paylaşın ve topluluğa katkıda bulunun
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        {isError && (
          <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-4">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-rose-600 mt-0.5 mr-3 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h5 className="text-sm font-medium text-rose-900 mb-1">
                  Hata Oluştu
                </h5>
                <p className="text-sm text-rose-700">
                  {message ||
                    'Yazı oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.'}
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <Input
            label="Başlık"
            name="title"
            type="text"
            value={form.title}
            onChange={onChange}
            placeholder="Yazınızın çekici bir başlığını girin..."
            className="mb-0"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-rose-600">{errors.title}</p>
          )}

          <CoverPicker value={cover} onChange={setCover} />

          <Textarea
            label="İçerik"
            name="content"
            value={form.content}
            onChange={onChange}
            placeholder="Yazınızın içeriğini buraya yazın..."
            rows={12}
            error={errors.content}
            className="mb-0"
          />

          <div className="text-sm text-gray-500">
            <span
              className={
                form.title.length < 3 ? 'text-rose-500' : 'text-emerald-600'
              }
            >
              Başlık: {form.title.length} karakter
            </span>
            <span className="mx-2">•</span>
            <span
              className={
                form.content.length < 10 ? 'text-rose-500' : 'text-emerald-600'
              }
            >
              İçerik: {form.content.length} karakter
            </span>
          </div>

          <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
            <Button
              type="submit"
              variant="primary"
              size="tall"
              isLoading={isLoading}
              disabled={!form.title.trim() || !form.content.trim()}
              leftIcon={!isLoading && <Rocket className="w-4 h-4" />}
            >
              Yayımla
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="tall"
              onClick={() => navigate('/dashboard')}
              leftIcon={<XIcon className="w-4 h-4" />}
            >
              İptal
            </Button>
          </div>
        </form>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-start">
          <svg
            className="w-6 h-6 text-blue-600 mt-0.5 mr-3 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h5 className="text-sm font-medium text-blue-900 mb-2">
              💡 Yazı İpuçları
            </h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Başlığınızı çekici ve açıklayıcı yapın</li>
              <li>• İçeriğinizi paragraflar halinde düzenleyin</li>
              <li>• Yazınızı yayımlamadan önce bir kez daha gözden geçirin</li>
              <li>• Okuyucularınızı düşünerek net ve anlaşılır yazın</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPost;
