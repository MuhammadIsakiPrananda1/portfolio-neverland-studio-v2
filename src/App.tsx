import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import MainLayout from '@layouts/MainLayout';
import DashboardLayout from '@layouts/DashboardLayout';
import ScrollToTop from '@components/ScrollToTop';
import { 
  mainRoutes, 
  serviceRoutes, 
  dashboardRoutes,
  NotFound 
} from '@config/routes.config';

// Loading component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass p-8 rounded-2xl">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Main Routes with MainLayout */}
          <Route path="/" element={<MainLayout />}>
            {/* Main pages */}
            {mainRoutes.map(({ path, element: Element }) => (
              <Route key={path} path={path} element={<Element />} />
            ))}
            
            {/* Service pages */}
            {serviceRoutes.map(({ path, element: Element }) => (
              <Route key={path} path={path} element={<Element />} />
            ))}

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Dashboard Routes with DashboardLayout */}
          {dashboardRoutes.map(({ path, element: Element }) => (
            <Route 
              key={path} 
              path={path} 
              element={
                <DashboardLayout>
                  <Element />
                </DashboardLayout>
              } 
            />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
