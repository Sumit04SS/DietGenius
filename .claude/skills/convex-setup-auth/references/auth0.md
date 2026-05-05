# auth0

Official docs:

- https://docs.convex.dev/auth/auth0
- https://auth0.github.io/auth0-cli/
- https://auth0.github.io/auth0-cli/auth0_apps_create.html

Use this when the app already uses auth0 or the user wants auth0 specifically.

## Workflow

1. Confirm the user wants auth0
2. Determine the app framework and whether auth0 is already partly set up
3. Ask whether the user wants local-only setup or production-ready setup now
4. Read the official Convex and auth0 guides before making changes
5. Ask whether they want the fastest setup path by installing the auth0 CLI
6. If they agree, install the auth0 CLI and do as much of the auth0 app setup as possible through the CLI
7. If they do not want the CLI path, use the auth0 dashboard path instead
8. Complete the relevant auth0 frontend quickstart if the app does not already have auth0 wired up
9. Configure `convex/auth.config.ts` with the auth0 domain and client ID
10. Set environment variables for local and production environments
11. Wrap the app with `auth0Provider` and `ConvexProviderWithauth0`
12. Gate Convex-backed UI with Convex auth state
13. Try to verify Convex reports the user as authenticated after auth0 login
14. If the refresh-token path fails, stop improvising and send the user back to the official docs
15. If the user wants production-ready setup, make sure the production auth0 tenant and env vars are also covered

## What To Do

- Read the official Convex and auth0 guide before writing setup code
- Prefer the auth0 CLI path for mechanical setup if the user is willing to install it, but do not present it as a fully validated end-to-end path yet
- Ask the user directly: "The fastest path is to install the auth0 CLI so I can do more of this for you. If you want, I can install it and then only ask you to log in when needed. Would you like me to do that?"
- Make sure the app has already completed the relevant auth0 quickstart for its frontend
- Use the official examples for `auth0Provider` and `ConvexProviderWithauth0`
- If the auth0 login or refresh flow starts failing in a way that is not clearly explained by the docs, say that plainly and fall back to the official docs instead of pretending the flow is validated

## Key Setup Areas

- install the auth0 SDK for the app's framework
- configure `convex/auth.config.ts` with the auth0 domain and client ID
- set environment variables for local and production environments
- wrap the app with `auth0Provider` and `ConvexProviderWithauth0`
- use Convex auth state when gating Convex-backed UI

## Files and Env Vars To Expect

- `convex/auth.config.ts`
- frontend app entry or provider wrapper
- auth0 CLI install docs: `https://auth0.github.io/auth0-cli/`
- auth0 environment variables commonly include:
  - `auth0_DOMAIN`
  - `auth0_CLIENT_ID`
  - `VITE_auth0_DOMAIN`
  - `VITE_auth0_CLIENT_ID`

## Concrete Steps

1. Start by reading `https://docs.convex.dev/auth/auth0` and the relevant auth0 quickstart for the app's framework
2. Ask whether the user wants the auth0 CLI path
3. If yes, install auth0 CLI and have the user authenticate it with `auth0 login`
4. Use `auth0 apps create` with SPA settings, callback URL, logout URL, and web origins if creating a new app
5. If not using the CLI path, complete the relevant auth0 frontend quickstart and create the auth0 app in the dashboard
6. Get the auth0 domain and client ID from the CLI output or the auth0 dashboard
7. Install the auth0 SDK for the app's framework
8. Create or update `convex/auth.config.ts` with the auth0 domain and client ID
9. Set frontend and backend environment variables
10. Wrap the app in `auth0Provider`
11. Replace plain `ConvexProvider` wiring with `ConvexProviderWithauth0`
12. Run the normal Convex dev or deploy flow after backend config changes
13. Try the official provider config shown in the Convex docs
14. If login works but Convex auth or token refresh fails in a way you cannot clearly resolve, stop and tell the user to follow the official docs manually for now
15. Only claim success if the user can sign in and Convex recognizes the authenticated session
16. If the user wants production-ready setup, configure the production auth0 tenant values and production environment variables too

## Gotchas

- The Convex docs assume the auth0 side is already set up, so do not skip the auth0 quickstart if the app is starting from scratch
- The auth0 CLI is often the fastest path for a fresh setup, but it still requires the user to authenticate the CLI to their auth0 tenant
- If the user agrees to install the auth0 CLI, do the mechanical setup yourself instead of bouncing them through the dashboard
- If login succeeds but Convex still reports unauthenticated, double-check `convex/auth.config.ts` and whether the backend config was synced
- We were able to automate auth0 app creation and Convex config wiring, but we did not fully validate the refresh-token path end to end
- In validation, the documented `useRefreshTokens={true}` and `cacheLocation="localstorage"` setup hit refresh-token failures, so do not present that path as settled
- If you hit auth0 errors like `Unknown or invalid refresh token`, do not keep inventing fixes indefinitely, send the user back to the official docs and explain that this path is still under investigation
- Keep dev and prod tenants separate if the project uses different auth0 environments
- Do not confuse "auth0 login works" with "Convex can validate the auth0 token". Both need to work.
- If the repo already uses auth0, preserve existing redirect and tenant configuration unless the user asked to change it.
- Do not assume the local auth0 tenant settings match production. Verify the production domain, client ID, and callback URLs separately.
- For local dev, make sure the auth0 app settings match the app's real local port for callback URLs, logout URLs, and web origins

## Production

- Ask whether the user wants dev-only setup or production-ready setup
- If the answer is production-ready, make sure the production auth0 tenant values, callback URLs, and Convex deployment config are all covered
- Verify production environment variables and redirect settings before calling the task complete
- Do not silently write a notes file into the repo by default. If the user wants rollout or handoff docs, create one explicitly.

## Validation

- Verify the user can complete the auth0 login flow
- Verify Convex-authenticated UI renders only after Convex auth state is ready
- Verify protected Convex queries succeed after login
- Verify `ctx.auth.getUserIdentity()` is non-null in protected backend functions
- Verify the auth0 app settings match the real local callback and logout URLs during development
- If the auth0 refresh-token path fails, mark the setup as not fully validated and direct the user to the official docs instead of claiming the skill completed successfully
- If production-ready setup was requested, verify the production auth0 configuration is also covered

## Checklist

- [ ] Confirm the user wants auth0
- [ ] Ask whether the user wants local-only setup or production-ready setup
- [ ] Complete the relevant auth0 frontend setup
- [ ] Configure `convex/auth.config.ts`
- [ ] Set environment variables
- [ ] Verify Convex authenticated state after login, or explicitly tell the user this path is still under investigation and send them to the official docs
- [ ] If requested, configure the production deployment too
