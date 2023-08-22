import theme from "@/config/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </QueryClientProvider>
  );
}
