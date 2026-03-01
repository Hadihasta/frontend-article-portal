'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, Article } from '@/lib/api';
import { Loader2, ArrowLeft, Tag, Calendar, Edit } from 'lucide-react';

export default function ArticlePreviewPage({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getById(Number(params.id))
      .then(setArticle)
      .catch(() => setArticle(null))
      .finally(() => setLoading(false));
  }, [params.id]);

  const formatDate = (str?: string) => {
    if (!str) return '';
    try {
      return new Date(str).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
    } catch { return ''; }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-[#b0a384]">
        <Loader2 size={24} className="animate-spin mr-3" />
        <span className="font-body text-sm">Loading...</span>
      </div>
    );
  }

  // Cek status 'publish' (bukan 'published')
  if (!article || article.status !== 'publish') {
    return (
      <div className="p-10 text-center">
        <p className="font-display text-2xl text-[#ddd8c8] italic mb-4">Article not found or not published.</p>
        <Link href="/preview" className="text-sm text-[#c84b31] hover:underline">← Back to all articles</Link>
      </div>
    );
  }

  return (
    <div className="p-10">
      {/* Back */}
      <div className="mb-8 fade-up">
        <Link href="/preview" className="inline-flex items-center gap-2 text-sm text-[#9a8b6a] hover:text-[#282318] transition-colors">
          <ArrowLeft size={14} />
          Back to Preview
        </Link>
      </div>

      {/* Article */}
      <article className="max-w-2xl fade-up fade-up-delay-1">
        {/* Category + date */}
        <div className="flex items-center gap-4 mb-6">
          <span className="flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-[#c84b31]">
            <Tag size={11} />
            {article.category}
          </span>
          {article.created_at && (
            <span className="flex items-center gap-1.5 text-xs font-mono text-[#b0a384]">
              <Calendar size={11} />
              {formatDate(article.created_at)}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#282318] leading-tight mb-6">
          {article.title}
        </h1>

        {/* Divider ornament */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-[#ddd8c8]" />
          <span className="text-[#c84b31] text-sm">✦</span>
          <div className="h-px flex-1 bg-[#ddd8c8]" />
        </div>

        {/* Content */}
        <div className="article-content whitespace-pre-wrap">
          {article.content}
        </div>

    
      </article>
    </div>
  );
}
