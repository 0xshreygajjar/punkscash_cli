import { Command, CommandRunner, Option } from 'nest-commander';
import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import { SovereignSwarm } from 'sovereign-swarm';

// Load environment variables
dotenv.config();

@Command({
  name: 'register',
  description: 'Register an agent using SovereignSwarm',
})
export class RegisterCommand extends CommandRunner {
  async run(
    passedParam: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    console.log('=== SovereignSwarm Agent Registration ===\n');

    const agentName = options?.name || passedParam[0];
    if (!agentName) {
      console.error('❌ Error: Agent name is required. Use --name "My Agent"');
      return;
    }

    const agentDescription = options?.description || 'A high-performance AI agent with X402 payment support';
    const agentImage = options?.image || 'ipfs://bafkreihs7xtyc2dufbahs4ajel3eunc7mraw4zihcl5fhjbxx2jl5fdpbu';

    // Configuration
    const RPC_URL = process.env.RPC_URL;
    const PRIVATE_KEY = options?.privateKey || process.env.PRIVATE_KEY;
    const CHAIN_ID = parseInt(options?.chainId || process.env.CHAIN_ID || '97');
    const PINATA_JWT = process.env.PINATA_JWT;

    if (!PRIVATE_KEY) {
      console.error('❌ Error: PRIVATE_KEY not set (via flag or .env file)');
      return;
    }

    if (!RPC_URL) {
      console.error('❌ Error: RPC_URL not set in .env file');
      return;
    }

    try {
      const provider = new ethers.JsonRpcProvider(RPC_URL);
      const signer = new ethers.Wallet(PRIVATE_KEY, provider);
      console.log('✅ Signer address:', signer.address);
      console.log('✅ Chain ID:', CHAIN_ID);

      console.log('\n--- Step 1: Initialize SDK ---');
      const sdkConfig: any = {
        chainId: CHAIN_ID,
        rpcUrl: RPC_URL,
        signer: PRIVATE_KEY,
        ipfs: 'pinata',
        pinataJwt: PINATA_JWT
      };

      const sdk = new SovereignSwarm(sdkConfig);
      
      const currentChain = await sdk.chainId();
      console.log('✅ SDK initialized on chain:', currentChain);

      const balance = await provider.getBalance(signer.address);
      console.log("✅ Wallet balance:", ethers.formatEther(balance), "ETH");

      console.log('\n--- Step 2: Create Agent (off-chain) ---');
      const agent = sdk.createAgent({
        name: agentName,
        description: agentDescription,
        image: agentImage,
        x402support: true,
        metadata: { 
          category: "Analytics",
          version: "1.0.0",
          pricing: {
            perQuery: "0.0001"
          }
        },
        active: true,
        owners: [signer.address as `0x${string}`],
      });
      console.log(`✅ Agent object created locally`);

      console.log('\n--- Step 3: Configure MCP Integration ---');
      try {
        await agent.setMCP(
          "https://api.example.com/mcp",
          "2024-11-05",
          false // Auto-fetch capabilities
        );
        console.log("✅ MCP server configured");
      } catch (e) {
        console.log("⚠️ MCP configuration skipped:", (e as Error).message);
      }

      console.log('\n--- Step 4: Register Agent On-Chain ---');
      if (balance === 0n) {
        console.log("❌ Insufficient balance for registration");
        return;
      }

      console.log("📝 Uploading metadata to IPFS and sending transaction...");
      const registration = await agent.registerIPFS();
      console.log('\n🎉 Agent Registered Successfully!');
      console.log('   Agent ID:', registration.agentId);
      console.log('   IPFS URI:', registration.agentURI);

    } catch (error) {
      console.error('\n❌ Registration failed:', error instanceof Error ? error.message : String(error));
    }
  }

  @Option({
    flags: '-n, --name [name]',
    description: 'The name of the agent',
  })
  parseName(val: string): string {
    return val;
  }

  @Option({
    flags: '-d, --description [description]',
    description: 'The description of the agent',
  })
  parseDescription(val: string): string {
    return val;
  }

  @Option({
    flags: '-i, --image [image]',
    description: 'The IPFS URI for the agent image',
  })
  parseImage(val: string): string {
    return val;
  }


  @Option({
    flags: '--privateKey [privateKey]',
    description: 'Private Key for signer (overrides .env)',
  })
  parsePk(val: string): string {
    return val;
  }

  @Option({
    flags: '--chainId [chainId]',
    description: 'Chain ID (overrides .env)',
  })
  parseChainId(val: string): string {
    return val;
  }

}
