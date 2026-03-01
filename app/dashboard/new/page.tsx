'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import ArticleForm from '@/components/ArticleForm';
import Toast from '@/components/Toast';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewArticlePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSave = async (data: { title: string; content: string; category: string; status: string }) => {
    setLoading(true);
    try {
      await api.create(data as any);
      setToast({ message: `Article ${data.status === 'publish' ? 'publish' : 'saved as draft'} successfully!`, type: 'success' });
      setTimeout(() => router.push('/dashboard'), 1200);
    } catch {
      setToast({ message: 'Failed to save article. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-3xl">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="mb-8 fade-up">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-[#9a8b6a] hover:text-[#282318] transition-colors mb-4">
          <ArrowLeft size={14} />
          Back to All Posts
        </Link>
        <h1 className="font-display text-3xl text-[#282318] font-semibold">New Article</h1>
        <p className="text-sm text-[#9a8b6a] mt-1 font-body">Write and publish a new article</p>
      </div>

      {/* Decorative divider */}
      <div className="ornament mb-8 text-xs font-mono tracking-widest fade-up fade-up-delay-1">✦</div>

      <ArticleForm
        onPublish={handleSave}
        onDraft={handleSave}
        loading={loading}
      />
    </div>
  );
}
