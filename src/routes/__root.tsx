import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Onchain Signals
        </Link>{' '}
        <Link to="/leaderboard" className="[&.active]:font-bold">
          Leaderboard
        </Link>
        <Link to="/token-explorer" className="[&.active]:font-bold">
          Token Explorer
        </Link>
        <Link to="/wallet-explorer" className="[&.active]:font-bold">
          Wallet Explorer
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
