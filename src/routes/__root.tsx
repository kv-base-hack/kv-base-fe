import { Header } from '@/components/shared/Header'
import { LayoutSidebar } from '@/components/shared/LayoutSidebar'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <div className="bg-background w-full min-h-screen bg-[url('/assets/images/background.svg')] bg-cover">
      <div className="flex items-start">
        <LayoutSidebar />
        <div className="ml-[300px] w-full">
          <Header />
          <div className="p-10">
            <Outlet />
          </div>
        </div>
      </div>
      <TanStackRouterDevtools />
    </div>
  ),
})
