# GooseChef

[![Vitest Tests](https://github.com/zusorio/goosechef/actions/workflows/vitest.yml/badge.svg?branch=main)](https://github.com/zusorio/goosechef/actions/workflows/vitest.yml)
[![Playwright Tests](https://github.com/zusorio/goosechef/actions/workflows/playwright.yml/badge.svg?branch=main)](https://github.com/zusorio/goosechef/actions/workflows/playwright.yml)

> Detailed documentation can be found [here](https://github.com/zusorio/goosechef/wiki)

### Prerequisites

- Install node >18
- Make sure `corepack` is installed using `npm install -g corepack`
- Install `pnpm` using `corepack enable pnpm`
- Install docker and docker-compose
- Create a Discord application [here](https://discord.com/developers/applications)
  - Set the OAuth2 redirect URL to `http://localhost:3000/api/auth/callback/discord`
- Create an uploadthing account [here](https://uploadthing.com/)
  - Create a new application

### Setup

- Clone the repository
- Run `pnpm install` in the root directory
- Copy the `.env.example` file to `.env` and fill in the values
  - `DATABASE_URL` is the connection string to the database, if you're using docker-compose leave it as is
  - `AUTH_URL` is the url of the app, if you're using docker-compose leave it as is
  - `AUTH_DISCORD_ID` from the Discord application you created
  - `AUTH_DISCORD_SECRET` from the Discord application you created
  - `UPLOADTHING_SECRET` from the uploadthing application you created
  - `UPLOADTHING_APP_ID` from the uploadthing application you created

## Development

- Run `docker-compose up -d` to start the database
- Run `pnpm run db:reset` to set up the database
- Run `pnpm run dev` to start the development server

### Database

- If you're testing changes to the database, run `pnpm run db:push` to apply the changes to the database
- Once you've decided your database changes are good, make a migration
  - Run `pnpm run prisma migrate dev --name <migration-name>` to generate a migration

### Formatting

- This project uses [Prettier](https://prettier.io/) for formatting
- WebStorm has built-in support for Prettier
  - Please enable it on save!
  - You can set it up in `Settings > Languages & Frameworks > JavaScript > Prettier`
- VS Code requires a bit more setup, check out [this guide](https://www.robinwieruch.de/how-to-use-prettier-vscode/) for
  more info

### Committing

- Make sure your code is formatted before committing
- This project uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- Pushing to the `main` branch is disabled, please make a branch and open a pull request

### Stopping

- Run `docker-compose down` to stop the database
- You can stop the development server with `Ctrl+C`

## Testing

- Run `pnpm run test:unit` to run all vitest tests
- Run `pnpm run test:e2e` to run all playwright tests

## Deployment

- This project is deployed using [Vercel](https://vercel.com/)
- The `main` branch is automatically deployed to the production environment
- Pull requests are automatically deployed to a preview environment
- The production environment is available at [goosechef.de](https://goosechef.de/)

## Authors

  <a href="https://github.com/zusorio">
    <img src='https://github.com/zusorio.png' width='25x'/>
  </a>


  <a href="https://github.com/robinsmith-source">
    <img src='https://github.com/robinsmith-source.png' width='25x'/>
  </a>


  <a href="https://github.com/DenizGazitepe">
    <img src='https://github.com/DenizGazitepe.png' width='25x'/>
  </a>


  <a href="https://github.com/sabrinaturni">
    <img src='https://github.com/sabrinaturni.png' width='25x'/>
  </a>

  <a href="https://github.com/KuroiKoneko">
    <img src='https://github.com/KuroiKoneko.png' width='25x'/>
  </a>