'use client';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { api, Article } from '@/lib/api';
import { Loader2, ChevronLeft, ChevronRight, Calendar, Tag } from 'lucide-react';

const PER_PAGE = 6;

export default function PreviewPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getAll();
      const published = (data || []).filter(a => a.status === 'published');
      setArticles(published);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const totalPages = Math.ceil(articles.length / PER_PAGE);
  const paginated = articles.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const excerpt = (content: string, len = 160) =>
    content.length > len ? content.slice(0, len).trimEnd() + '…' : content;

  const formatDate = (str?: string) => {
    if (!str) return '';
    try {
      return new Date(str).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch { return ''; }
  };

  return (
    <div className="p-10">
      {/* Header */}
      <div className="mb-10 fade-up">
        <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#c84b31] mb-2">The Blog</p>
        <h1 className="font-display text-4xl text-[#282318] font-semibold italic">Published Articles</h1>
        <div className="mt-4 h-px bg-gradient-to-r from-[#ddd8c8] via-[#c84b31] to-transparent" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-[#b0a384]">
          <Loader2 size={24} className="animate-spin mr-3" />
          <span className="font-body text-sm">Loading articles...</span>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-24">
          <p className="font-display text-3xl text-[#ddd8c8] italic mb-3">Nothing published yet.</p>
          <p className="font-body text-sm text-[#b0a384]">Published articles will appear here as a blog.</p>
          <Link href="/dashboard/new" className="inline-block mt-4 px-5 py-2.5 bg-[#c84b31] text-white text-sm rounded-sm hover:bg-[#a33825] transition-colors">
            Write the first article
          </Link>
        </div>
      ) : (
        <>
          {/* Article grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {paginated.map((article, i) => (
              <article
                key={article.id}
                className="bg-white border border-[#ddd8c8] rounded-sm overflow-hidden group hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 fade-up"
                style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}
              >
                {/* Category stripe */}
                <div className="h-1 bg-[#c84b31]" />

                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-[#9a8b6a] uppercase">
                      <Tag size={10} />
                      {article.category}
                    </span>
                    {article.created_at && (
                      <>
                        <span className="text-[#ddd8c8]">·</span>
                        <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#b0a384]">
                          <Calendar size={10} />
                          {formatDate(article.created_at)}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="font-display text-xl font-semibold text-[#282318] leading-snug mb-3 group-hover:text-[#c84b31] transition-colors line-clamp-2">
                    {article.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="font-body text-sm text-[#6e624b] leading-relaxed line-clamp-3">
                    {excerpt(article.content)}
                  </p>

                  {/* Read more */}
                  <div className="mt-5 pt-4 border-t border-[#f7f6f3]">
                    <Link
                      href={`/preview/${article.id}`}
                      className="text-xs font-mono tracking-widest uppercase text-[#c84b31] hover:text-[#a33825] transition-colors flex items-center gap-1.5"
                    >
                      Read article →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 py-4 fade-up fade-up-delay-4">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 px-4 py-2 border border-[#ddd8c8] rounded-sm text-sm text-[#6e624b] hover:bg-[#eeebe3] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={15} />
                Prev
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-sm text-sm font-mono transition-colors
                      ${p === page
                        ? 'bg-[#282318] text-white'
                        : 'text-[#6e624b] hover:bg-[#eeebe3] border border-[#ddd8c8]'
                      }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1 px-4 py-2 border border-[#ddd8c8] rounded-sm text-sm text-[#6e624b] hover:bg-[#eeebe3] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ChevronRight size={15} />
              </button>
            </div>
          )}

          {/* Count info */}
          <p className="text-center text-xs font-mono text-[#b0a384] mt-2">
            Showing {((page - 1) * PER_PAGE) + 1}–{Math.min(page * PER_PAGE, articles.length)} of {articles.length} articles
          </p>
        </>
      )}
    </div>
  );
}
