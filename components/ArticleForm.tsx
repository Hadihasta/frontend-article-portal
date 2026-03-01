'use client';
import { useState } from 'react';
import { Send, FileText, Loader2 } from 'lucide-react';

const CATEGORIES = ['Technology', 'Business', 'Science', 'Culture', 'Politics', 'Health', 'Sports', 'Opinion', 'Travel', 'Other'];

interface ArticleFormProps {
  initialData?: { title: string; content: string; category: string; status?: string };
  onPublish: (data: { title: string; content: string; category: string; status: string }) => Promise<void>;
  onDraft: (data: { title: string; content: string; category: string; status: string }) => Promise<void>;
  loading?: boolean;
}

export default function ArticleForm({ initialData, onPublish, onDraft, loading }: ArticleFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [category, setCategory] = useState(initialData?.category || CATEGORIES[0]);
  const [action, setAction] = useState<'publish' | 'draft' | null>(null);

  const handleSubmit = async (status: 'published' | 'draft') => {
    const data = { title, content, category, status };
    setAction(status === 'published' ? 'publish' : 'draft');
    if (status === 'published') await onPublish(data);
    else await onDraft(data);
    setAction(null);
  };

  return (
    <div className="space-y-6 fade-up">
      {/* Title */}
      <div className="space-y-2">
        <label className="text-xs font-mono tracking-[0.15em] uppercase text-[#9a8b6a]">Title</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter article title..."
          className="w-full px-4 py-3 bg-white border border-[#ddd8c8] rounded-sm
            font-display text-xl text-[#282318] placeholder-[#c8bfa8]
            focus:outline-none focus:border-[#c84b31] transition-colors"
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-xs font-mono tracking-[0.15em] uppercase text-[#9a8b6a]">Category</label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-[#ddd8c8] rounded-sm
            font-body text-sm text-[#282318] cursor-pointer
            focus:outline-none focus:border-[#c84b31] transition-colors appearance-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239a8b6a' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <label className="text-xs font-mono tracking-[0.15em] uppercase text-[#9a8b6a]">Content</label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Write your article content here..."
          rows={16}
          className="w-full px-4 py-3 bg-white border border-[#ddd8c8] rounded-sm
            font-body text-base text-[#282318] placeholder-[#c8bfa8] leading-relaxed resize-y
            focus:outline-none focus:border-[#c84b31] transition-colors"
        />
      </div>

      {/* Word count */}
      <p className="text-xs font-mono text-[#b0a384]">
        {content.trim() ? content.trim().split(/\s+/).length : 0} words · {content.length} characters
      </p>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={() => handleSubmit('published')}
          disabled={loading || !title.trim() || !content.trim()}
          className="flex items-center gap-2 px-6 py-3 bg-[#c84b31] text-white
            text-sm font-body font-medium rounded-sm
            hover:bg-[#a33825] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading && action === 'publish' ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
          Publish
        </button>
        <button
          onClick={() => handleSubmit('draft')}
          disabled={loading || !title.trim() || !content.trim()}
          className="flex items-center gap-2 px-6 py-3 bg-white text-[#282318] border border-[#ddd8c8]
            text-sm font-body font-medium rounded-sm
            hover:bg-[#eeebe3] hover:border-[#c8bfa8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading && action === 'draft' ? <Loader2 size={15} className="animate-spin" /> : <FileText size={15} />}
          Save as Draft
        </button>
      </div>
    </div>
  );
}
