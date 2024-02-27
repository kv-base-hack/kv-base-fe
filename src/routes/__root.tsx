import { Header } from '@/components/common/Header'
import { LayoutSidebar } from '@/components/common/LayoutSidebar'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <div className="bg-background w-full min-h-screen bg-[url('/assets/images/background.svg')] bg-cover">
      <div className="flex items-start">
        <LayoutSidebar />
        <div className="ml-[300px] w-full">
          <Header />
          <div className="mt-[100px]">
            <Outlet />
          </div>
        </div>
      </div>
      <TanStackRouterDevtools />
    </div>
  ),
})
