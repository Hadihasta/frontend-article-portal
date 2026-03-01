'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, Article } from '@/lib/api';
import ArticleForm from '@/components/ArticleForm';
import Toast from '@/components/Toast';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function EditArticlePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    api.getById(Number(params.id))
      .then(setArticle)
      .catch(() => setToast({ message: 'Failed to load article', type: 'error' }))
      .finally(() => setFetching(false));
  }, [params.id]);

  const handleSave = async (data: { title: string; content: string; category: string; status: string }) => {
    setLoading(true);
    try {
      await api.update(Number(params.id), data);
      setToast({ message: `Article ${data.status === 'published' ? 'published' : 'saved as draft'}!`, type: 'success' });
      setTimeout(() => router.push('/dashboard'), 1200);
    } catch {
      setToast({ message: 'Failed to update article.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="p-10 flex items-center gap-3 text-[#9a8b6a]">
        <Loader2 size={20} className="animate-spin" />
        <span className="font-body text-sm">Loading article...</span>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="p-10">
        <p className="font-body text-[#c84b31]">Article not found.</p>
        <Link href="/dashboard" className="text-sm text-[#9a8b6a] underline mt-2 block">← Back</Link>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-3xl">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="mb-8 fade-up">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-[#9a8b6a] hover:text-[#282318] transition-colors mb-4">
          <ArrowLeft size={14} />
          Back to All Posts
        </Link>
        <h1 className="font-display text-3xl text-[#282318] font-semibold">Edit Article</h1>
        <p className="text-sm text-[#9a8b6a] mt-1 font-body">
          ID #{article.id} — Currently
          <span className={`ml-1 badge ${
            article.status === 'published' ? 'badge-published' :
            article.status === 'draft' ? 'badge-draft' : 'badge-trashed'
          }`}>{article.status}</span>
        </p>
      </div>

      <div className="ornament mb-8 text-xs font-mono tracking-widest fade-up fade-up-delay-1">✦</div>

      <ArticleForm
        initialData={article}
        onPublish={handleSave}
        onDraft={handleSave}
        loading={loading}
      />
    </div>
  );
}
