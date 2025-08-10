import { useEffect, useState } from 'react';
import { Upload, X } from 'lucide-react';

export default function CoverPicker({ value, onChange }) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(value);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [value]);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-800">
        Kapak Görseli{' '}
        <span className="text-gray-500 font-normal">(isteğe bağlı)</span>
      </label>

      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="cover preview"
            className="w-full h-48 object-cover rounded-sm border border-gray-200 shadow-sm"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-sm" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute cursor-pointer top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/95 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onChange(e.target.files?.[0] || null)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="border-2 border-dashed border-gray-300 rounded-sm p-8 text-center hover:border-emerald-400 hover:bg-emerald-50/30 transition-all duration-200 cursor-pointer">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-700 mb-1">
              Kapak görseli yükleyin
            </p>
            <p className="text-xs text-gray-500">
              JPG, PNG veya WebP formatında
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
