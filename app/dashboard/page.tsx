'use client';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { api, Article } from '@/lib/api';
import { Pencil, Trash2, Loader2, RefreshCw } from 'lucide-react';
import Toast from '@/components/Toast';

type Tab = 'publish' | 'draft' | 'thrash';

const TABS: { key: Tab; label: string }[] = [
  { key: 'publish', label: 'Published' },
  { key: 'draft', label: 'Drafts' },
  { key: 'thrash', label: 'Trashed' },
];

export default function DashboardPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [tab, setTab] = useState<Tab>('publish');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getAll();
      setArticles(data || []);
    } catch {
      setToast({ message: 'Failed to load articles', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = articles.filter(a => a.status === tab);

  const handleTrash = async (article: Article) => {
    try {
      await api.update(article.id, { ...article, status: 'trashed' });
      setToast({ message: 'Article moved to trash', type: 'success' });
      load();
    } catch {
      setToast({ message: 'Failed to trash article', type: 'error' });
    }
  };

  const handleRestore = async (article: Article) => {
    try {
      await api.update(article.id, { ...article, status: 'draft' });
      setToast({ message: 'Article restored to drafts', type: 'success' });
      load();
    } catch {
      setToast({ message: 'Failed to restore article', type: 'error' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Permanently delete this article? This cannot be undone.')) return;
    try {
      await api.delete(id);
      setToast({ message: 'Article permanently deleted', type: 'success' });
      load();
    } catch {
      setToast({ message: 'Failed to delete article', type: 'error' });
    }
  };

  return (
    <div className="p-10">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="mb-8 fade-up">
        <div className="flex items-baseline justify-between">
          <div>
            <h1 className="font-display text-3xl text-[#282318] font-semibold">All Posts</h1>
            <p className="text-sm text-[#9a8b6a] mt-1 font-body">{articles.length} articles total</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={load}
              className="flex items-center gap-2 px-4 py-2 border border-[#ddd8c8] rounded-sm text-sm text-[#6e624b] hover:bg-[#eeebe3] transition-colors"
            >
              <RefreshCw size={14} />
              Refresh
            </button>
            <Link
              href="/dashboard/new"
              className="flex items-center gap-2 px-5 py-2 bg-[#c84b31] text-white rounded-sm text-sm font-medium hover:bg-[#a33825] transition-colors"
            >
              + New Article
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#ddd8c8] mb-0 fade-up fade-up-delay-1">
        <div className="flex gap-0">
          {TABS.map(t => {
            const count = articles.filter(a => a.status === t.key).length;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-6 py-3 text-sm font-body font-medium border-b-2 transition-all -mb-px
                  ${tab === t.key
                    ? 'border-[#c84b31] text-[#c84b31]'
                    : 'border-transparent text-[#9a8b6a] hover:text-[#282318]'
                  }`}
              >
                {t.label}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-mono
                  ${tab === t.key ? 'bg-[#c84b31] text-white' : 'bg-[#eeebe3] text-[#9a8b6a]'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#ddd8c8] border-t-0 fade-up fade-up-delay-2">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-[#b0a384]">
            <Loader2 size={24} className="animate-spin mr-3" />
            <span className="font-body text-sm">Loading articles...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-2xl text-[#ddd8c8] italic">No articles here.</p>
            <p className="text-sm text-[#b0a384] mt-2 font-body">
              {tab === 'publish' ? 'Publish some articles to see them here.' :
               tab === 'draft' ? 'Save drafts to see them here.' :
               'Trashed articles will appear here.'}
            </p>
          </div>
        ) : (
          <table className="w-full article-table">
            <thead>
              <tr className="border-b border-[#eeebe3]">
                <th className="text-left px-6 py-4 text-[10px] font-mono tracking-[0.15em] uppercase text-[#9a8b6a] w-1/2">Title</th>
                <th className="text-left px-6 py-4 text-[10px] font-mono tracking-[0.15em] uppercase text-[#9a8b6a]">Category</th>
                <th className="text-right px-6 py-4 text-[10px] font-mono tracking-[0.15em] uppercase text-[#9a8b6a]">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((article, i) => (
                <tr key={article.id} className={`border-b border-[#f7f6f3] ${i % 2 === 0 ? '' : 'bg-[#faf9f7]'}`}>
                  <td className="px-6 py-4">
                    <span className="font-body text-sm font-medium text-[#282318] line-clamp-1">{article.title}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="badge" style={{ background: '#eeebe3', color: '#6e624b' }}>
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {tab === 'thrash' ? (
                        <>
                          <button
                            onClick={() => handleRestore(article)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#ddd8c8] rounded-sm text-[#6e624b] hover:bg-[#eeebe3] transition-colors"
                          >
                            Restore
                          </button>
                          <button
                            onClick={() => handleDelete(article.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#f8d7da] rounded-sm text-[#721c24] hover:bg-[#f8d7da] transition-colors"
                          >
                            <Trash2 size={13} />
                            Delete
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href={`/dashboard/edit/${article.id}`}
                            className="flex items-center gap-1.5 p-2 border border-[#ddd8c8] rounded-sm text-[#6e624b] hover:bg-[#eeebe3] hover:text-[#282318] transition-colors"
                            title="Edit article"
                          >
                            <Pencil size={14} />
                          </Link>
                          <button
                            onClick={() => handleTrash(article)}
                            className="flex items-center gap-1.5 p-2 border border-[#ddd8c8] rounded-sm text-[#9a8b6a] hover:bg-[#f8d7da] hover:border-[#f8d7da] hover:text-[#721c24] transition-colors"
                            title="Move to trash"
                          >
                            <Trash2 size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
