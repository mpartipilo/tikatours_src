# TikaTours

Site is generated using GatsbyJS (https://www.gatsbyjs.org/)

## Install

```sh
npm install
```

## Develop

Opens live-reload development instance of the site that listens to changes on files and refreshes the browser view.

```sh
npm run develop
```

## Publish

Create the final version of the site with:

```sh
npm run build
```

## Deploy

The deployment script makes the `/build` directory public in the configured server with rsync via ssh. Leaving the `go` parameter out will dry-run the deployment without making any changes.

```sh
./deploy (live|staging) [go]
```