import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LeadsPage } from '@/features/leads/routes/LeadsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, refetchOnWindowFocus: true },
  },
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LeadsPage />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
App.displayName = 'App';
