import { Switch, Route, Router as WouterRouter } from "wouter";
import { Layout } from "@/components/layout";
import Home from "@/pages/home";
import Questionnaire from "@/pages/questionnaire";
import Result from "@/pages/result";
import Dashboard from "@/pages/dashboard";
import ResponseDetail from "@/pages/response-detail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/questionnaire" component={Questionnaire} />
        <Route path="/result" component={Result} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/response/:id" component={ResponseDetail} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
