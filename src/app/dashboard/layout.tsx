import { ErrorBoundary } from '@/components/layout/ErrorBoundary';
import { AppSidebar } from '@/components/basic/AppSideBar2';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <TooltipProvider>
        <AppSidebar>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </AppSidebar>
      </TooltipProvider>
    </ErrorBoundary>
  );
}