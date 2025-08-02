import { AppRouter } from '@apps/api'
/**
 * This is the client-side code that uses the inferred types from the server
 */
import {
  createTRPCClient,
  httpBatchStreamLink,
  httpSubscriptionLink,
  splitLink,
} from '@trpc/client'

// Initialize the tRPC client
export const trpcClient = ({ accessToken, url }: { accessToken?: string; url: string }) =>
  createTRPCClient<AppRouter>({
    links: [
      splitLink({
        condition: op => op.type === 'subscription',
        false: httpBatchStreamLink({
          headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
          url,
        }),
        true: httpSubscriptionLink({
          url,
        }),
      }),
    ],
  })
