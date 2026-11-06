# danger-portfolio

The source for **[dangervalentine.com](https://dangervalentine.com)**, the personal
portfolio site of Victor Danger Valentine.

It is a home page listing the projects he has built, a "how it's built" case study
for each of the two shipped applications, and a résumé, with links out to the
live builds and, where the source is public, their repositories.

## Deploying

The site runs as the Docker container `portfolio_web` on the remote server
(`root@91.99.62.133`), beside NextQuest, whose Caddy forwards `dangervalentine.com`
(and `www`, redirected to it) there; Cloudflare proxies both names.

```sh
deploy/deploy.sh [branch]      # pull the branch on the server, rebuild, check it answers
```

It needs no settings on the server. `scripts/deploy.ps1` is the earlier Windows host's
deploy, kept until that host stops serving the site.
