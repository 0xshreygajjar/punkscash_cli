# Punkscash CLI

A NestJS-based Command Line Interface for the Punkscash application.

## Installation

```bash
npm install
npm run build
npm link
```

## Usage

After linking, you can use the `punkscash` command:

### Agent Creation

Create a new agent with a name, type, and role.

```bash
punkscashcli agent:create --name "MyAgent" --type "custom" --role "executor"
```

### Registration

Run the registration script.

```bash
punkscashcli register
```

## Development

```bash
# build and run with ts-node
npx ts-node src/main.ts agent:create --name "Test"

# watch mode
$ npm run start:dev

# production build
$ npm run build
```

## Built With

- [NestJS](https://nestjs.com/)
- [nest-commander](https://nest-commander.com/)
