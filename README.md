# HC React Lib

This repo is home to two main things:

- **hc-react-lib** - the HedgeCourt React library of common components, contexts, and utilities. This is a node package available for other projects to include as a dependency.
- **hc-home-app** - the UI for the home page of HedgeCourt Apps, launcher for all other HC apps. This is a React app that packages into a Docker container for runtime.

This would be better suited as either two totally separate projects, or a monorepo setup with the `lib` and `app` in their own sub-packages, with `app` dependent upon `lib`.

Instead, they're combined into one, it really just suits the HC React pattern of keeping each App pretty much identical in structure.

The artifacts can be thought of as:

- **hc-home-app** - `src/pages`, `src/index.tsx` and anything docker-related (`docker/` and `.dockerignore`)
- **hc-react-lib** - everything else.
- **package.json** - until this approach blows up in my face, `package.json` is shared between both, with project-specific details injected at build-time.

## hc-react-lib

This is a node.js package providing a library of common components, contexts, and utilities for HedgeCourt React projects.

Details about this are a work in progress, as it currently does not build a distinct package, but rather is just built into `hc-home-app` directly.

## hc-home-app

This is the UI for the homepage of HedgeCourt Apps, launcher for all other HC apps. It provides login, launcher for other HC Apps, and user management.

### Random notes about hc-home-app

To run locally `yarn start` will serve the app out of `http://localhost:3000` under a context root `/`. It will default
to making API calls to an hc-auth-api running on `http://localhost:8081` under a context root `/`. Details for setting
up the hc-auth-api service running locally can be found at [hc-spring-monorepo](https://github.com/esasiela/hc-spring-monorepo).

To test Docker locally, run these commands while sitting in the repo root dir. `PUBLIC_URL` defaults to `/` if not set.

```shell
# build
./docker/docker-local.sh -b
```

- Builds a docker image named `hc-home-app`
- It is expected that `docker/default.conf` is already updated for PUBLIC_URL.
  - **TODO** - have docker-local.sh produce a default.conf suitable for the PUBLIC_URL

```shell
# run
./docker/docker-local.sh -r
```

- Stop and remove any existing container named `hc-home-app`
- Start a new container named `hc-home-app`, mapping port `8080->80`
- Runtime config of the container is via environment variables. There is a script in the container at `/docker-entrypoint.d/hc-config.sh` that updates `/use/share/nginx/html/hc-config.json5` before nginx starts.
  - This allows Docker or Kubernetes or whatever runtime configuration for everything in `hc-config.json5`

### Configuring hc-home-app

This feels overly complex, but such as it is, with React apps relying on build-time configuration. This hop.skip.jump approach provides for runtime configuration in a self-contained structure.

The majority of configuration gets done in `src/utils/hc-config.ts` for defaults and overrides in `public/hc-config.json5`.

`public/index.html` has an important role in bootstrapping the config. As of this commit, the `PUBLIC_URL` is hardcoded in the docker build, so the resulting image is locked into its path so leave this as-is.

```html
<script>
  window.HC_CONTEXT_ROOT = '%PUBLIC_URL%';
</script>
```

`src/hc-config.ts` uses this global variable to make a request to `<HC_CONTEXT_ROOT>/hc-config.json5`

If `ENABLED` is set to `true`, config properties supplied in `hc-config.json5` will clobber the values in `src/utils/hc-config.ts`.
Otherwise, the rest of the file is discarded.

#### Configuring development

If you run `hc-auth-api` according to the recommendation, you don't need to override anything so just leave `hc-config.json5` disabled (`ENABLED=%ENABLED%`) and with `%TOKEN%` tokens for all other values.

#### Configuring local docker

**Build config** - When running `./docker/docker-local.sh -b`, the only variable you need to set is environment variable `PUBLIC_URL`, so for example:

```shell
PUBLIC_URL=/apps/home ./docker/docker-local.sh -b
```

**Runtime config** - When running `./docker/docker-local.sh -r`, the approach is that all the values you need for `hc-config.json5` need to be supplied as env vars to the running container. Make sure you provide **every** config property that has a `%TOKEN%` token, unless you want the unaltered `%TOKEN%` string in your running environment.

#### Configuring production docker

Automated CI/CD does this for you. More notes to come, but you'll need to supply envvars to the GitHub Action (or mayhap the values hardcoded in the workflow yaml are sufficient).

#### Login Default

In **development**, a convenient helper is to have the login screen autofill with a username & password suitable for your dev environment without resorting to a password manager.

The approach to enabling this is deliberately different from other configuration to make it really hard to mistakenly enable this in production.

Put this in `.env.development` in the project root. This file is already in `.gitignore` but it is a good idea to verify that now. The `devuser` and `devpass` should match what you initialize your development `hc-auth-api` with (she runs a throwaway, in-memory H2 database so as long as you don't use a production user/pass here, it's all good).

```text
REACT_APP_LOGIN_DEFAULT_ENABLE=true
REACT_APP_LOGIN_DEFAULT_USER=devuser
REACT_APP_LOGIN_DEFAULT_PASS=devpass
```
