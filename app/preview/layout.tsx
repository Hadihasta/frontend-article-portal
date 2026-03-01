import Sidebar from '@/components/Sidebar';

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-[#f7f6f3]">
        {children}
      </main>
    </div>
  );
}
