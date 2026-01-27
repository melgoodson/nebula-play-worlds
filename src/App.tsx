import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DevOverlay } from "@/components/dev/DevOverlay";

// Pages
import Home from "./pages/Home";
import Scan from "./pages/Scan";
import Characters from "./pages/Characters";
import Practice from "./pages/Practice";
import Showcase from "./pages/Showcase";
import Settings from "./pages/Settings";
import Shop from "./pages/Shop";
import Course from "./pages/Course";
import Redeem from "./pages/Redeem";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {import.meta.env.DEV && <DevOverlay />}
      <BrowserRouter>
        <Routes>
          {/* Redirect root to home */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          
          {/* AR Worlds routes (require blocks entitlement) */}
          <Route path="/home" element={<Home />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Shop routes */}
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:slug" element={<Shop />} />
          
          {/* Course routes (require course entitlement) */}
          <Route path="/course" element={<Course />} />
          <Route path="/course/module/:id" element={<Course />} />
          <Route path="/course/lesson/:slug" element={<Course />} />
          <Route path="/course/assessment/:slug" element={<Course />} />
          <Route path="/course/ai" element={<Course />} />
          
          {/* Blocks redeem */}
          <Route path="/redeem" element={<Redeem />} />
          
          {/* Profile */}
          <Route path="/profile" element={<Profile />} />
          
          {/* Product */}
          <Route path="/product" element={<Product />} />
          
          {/* Placeholder routes */}
          <Route path="/worlds" element={<Home />} />
          <Route path="/challenges" element={<Practice />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
