'use client';
import { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-sm shadow-2xl border fade-up
      ${type === 'success'
        ? 'bg-[#1a5c2a] border-[#2d8a44] text-white'
        : 'bg-[#721c24] border-[#a12531] text-white'
      }`}
      style={{ minWidth: 280 }}
    >
      {type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
      <span className="text-sm font-body flex-1">{message}</span>
      <button onClick={onClose} className="opacity-70 hover:opacity-100 transition-opacity">
        <X size={16} />
      </button>
    </div>
  );
}
