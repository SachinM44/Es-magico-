import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import { LeadsRoute } from '@/features/leads/routes/LeadsRoute';
import { AddLeadDialog } from '@/features/leads/components/AddLeadDialog';
import { TimelineDialog } from '@/features/leads/components/TimelineDialog';
import { useDialogStore } from '@/store/dialogs';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, refetchOnWindowFocus: true },
  },
});

const RootDialogs = () => {
  const openDialog = useDialogStore((s) => s.openDialog);
  const selectedLeadId = useDialogStore((s) => s.selectedLeadId);
  const close = useDialogStore((s) => s.close);
  return (
    <>
      <AddLeadDialog open={openDialog === 'add'} onOpenChange={(o) => (o ? null : close())} />
      <TimelineDialog
        open={openDialog === 'timeline' && !!selectedLeadId}
        leadId={selectedLeadId}
        onOpenChange={(o) => (o ? null : close())}
      />
    </>
  );
};
RootDialogs.displayName = 'RootDialogs';

const LeadsRouteWrapper = () => {
  const openAdd = useDialogStore((s) => s.openAdd);
  const openTimeline = useDialogStore((s) => s.openTimeline);
  return <LeadsRoute onAddLead={openAdd} onOpenTimeline={openTimeline} />;
};
LeadsRouteWrapper.displayName = 'LeadsRouteWrapper';

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LeadsRouteWrapper />
        <RootDialogs />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
App.displayName = 'App';
