# danger-portfolio

The source for **[dangervalentine.com](https://dangervalentine.com)**, the personal
portfolio site of Victor Danger Valentine.

It is a home page listing the projects he has built, a "how it's built" case study
for each of the two shipped applications, and a résumé, with links out to the
live builds and, where the source is public, their repositories.

## Deploying

The site runs as the Docker container `portfolio_web` on the remote server
(`root@91.99.62.133`). The server's Caddy (the `server-edge` repository) forwards
`dangervalentine.com` (and `www`, redirected to it) there; Cloudflare proxies both names.

**Deploying is a push to `main`**: `.github/workflows/deploy.yml` builds the image (which
type-checks the site) into `ghcr.io/dangervalentine/danger-portfolio:<commit>`, then has the
server deploy it (server-edge's `bin/deploy-hook`: pull, start, wait for the health check, put
the old image back if it fails). To deploy again without a change:

```sh
gh workflow run deploy.yml
```

It needs no settings on the server.
