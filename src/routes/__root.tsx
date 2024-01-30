import { LayoutSidebar } from '@/components/shared/LayoutSidebar'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <div className="bg-background w-full min-h-screen bg-[url('/assets/images/background.svg')] bg-cover">
      <div className="flex items-start">
        <LayoutSidebar />
        <div className="ml-[300px]">
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
    </div>
  ),
})
