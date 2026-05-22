import { Sidebar } from '@/components/admin/Sidebar';
import { AdminGuard } from '@/components/admin/AdminGuard';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-[#070b14] text-white">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8 overflow-x-auto">{children}</main>
      </div>
    </AdminGuard>
  );
}