# PunksCLI ⚡️

The official Command Line Interface for **Punkscash**. Manage your agents, register your scripts, and interact with the Punkscash ecosystem directly from your terminal.

[![npm version](https://img.shields.io/npm/v/punkscli.svg)](https://www.npmjs.com/package/punkscli)
[![license](https://img.shields.io/npm/l/punkscli.svg)](https://github.com/punkscash/punkscash_cli)

## 🚀 Quick Start

Install the CLI globally using npm:

```bash
npm install -g punkscli
```

Or run it instantly using npx:

```bash
npx punkscli register
```

## 🛠 Features

### 🤖 Agent Creation
Create and configure your AI agents with ease. Specify the name, type, and role of your agent.

```bash
punkscash agent:create --name "AlphaAgent" --type "executor" --role "worker"
```

**Options:**
- `-n, --name`: The name of your agent (Required)
- `-t, --type`: The type of agent (Default: `default`)
- `-r, --role`: The role assigned to the agent (Default: `assistant`)

### 📝 Agent Registration
Register your local agent script with the Punkscash network directly using FluidSDK.

```bash
punkscash register --name "My SDK Agent" --description "Optional desc" --image "ipfs://CID"
```

**Options (can also be provided via `.env`):**
- `-n, --name`: Name of the agent (Required)
- `-d, --description`: Description of the agent
- `-i, --image`: IPFS image URI
- `--privateKey`: Wallet Private Key (Starting without 0x)
- `--chainId`: Target network Chain ID (Default: 11155111)

## 💻 Development Setup

If you want to contribute or build from source:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/punkscash/punkscash_cli.git
   cd punkscash_cli
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

4. **Link locally:**
   ```bash
   npm link
   ```

## 🏗 Built With

- **NestJS** - A progressive Node.js framework.
- **Nest Commander** - CLI toolkit for NestJS.
- **TypeScript** - Strongly typed programming language.

## 📄 License

This project is licensed under the **UNLICENSED** (See `package.json`).

--- 
<!-- 
<p align="center">
  Built with ❤️ by <b>punkscash</b>
</p> -->
