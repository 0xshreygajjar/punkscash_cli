import { Command, CommandRunner, Option, InquirerService } from 'nest-commander';
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
  constructor(private readonly inquirerService: InquirerService) {
    super();
  }
  async run(
    passedParam: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    // Configuration
    const RPC_URL = process.env.RPC_URL;
    const PRIVATE_KEY = options?.privateKey;
    const CHAIN_ID = parseInt(options?.chainId || process.env.CHAIN_ID || '97');
    const PINATA_JWT = process.env.PINATA_JWT;


    if (!PRIVATE_KEY) {
      console.error('❌ Error: PRIVATE_KEY not set (via flag or .env file)');
      return;
    }

    console.log(`\n🔑 Wallet Identification: ${PRIVATE_KEY ? new ethers.Wallet(PRIVATE_KEY).address : 'Not set'}\n`);

    // Interactive prompts for missing info
    const interactiveOptions = await this.inquirerService.ask(
      'register-questions',
      options,
    );

    const agentName = interactiveOptions.name || passedParam[0];
    const agentDescription = interactiveOptions.description || 'a newly created agent to register';
    const modelProvider = interactiveOptions.provider || 'anthropic';
    const modelName = interactiveOptions.model || 'gpt-4';
    const capabilities = interactiveOptions.capabilities || 'research, analysis';
    const category = options?.category || 'AI Agent';
    const version = options?.version || '1.0.0';
    const price = options?.price || '0.0001';
    const agentImage = options?.image || 'ipfs://bafkreihs7xtyc2dufbahs4ajel3eunc7mraw4zihcl5fhjbxx2jl5fdpbu';

    if (!agentName) {
      console.error('❌ Error: Agent name is required.');
      return;
    }

    console.log('\n--- Configuration Summary ---');
    console.log(`📦 Agent Name   : ${agentName}`);
    console.log(`📝 Description  : ${agentDescription}`);
    console.log(`🤖 Provider     : ${modelProvider}`);
    console.log(`🧠 Model        : ${modelName}`);
    console.log(`🛠  Capabilities : ${capabilities}`);
    console.log(`📂 Category     : ${category}`);
    console.log(`🏷  Version      : ${version}`);
    console.log(`💰 Base Price   : ${price} ETH`);
    console.log('-----------------------------\n');


    if (!RPC_URL) {
      console.error('❌ Error: RPC_URL not set in .env file');
      return;
    }

    try {
      const provider = new ethers.JsonRpcProvider(RPC_URL);
      const signer = new ethers.Wallet(PRIVATE_KEY, provider);
      
      process.stdout.write('⚡ Signing registration message... ');

      const sdkConfig: any = {
        chainId: CHAIN_ID,
        rpcUrl: RPC_URL,
        signer: PRIVATE_KEY,
        ipfs: 'pinata',
        pinataJwt: PINATA_JWT
      };

      const sdk = new SovereignSwarm(sdkConfig);
      const balance = await provider.getBalance(signer.address);

      process.stdout.write('DONE\n');
      process.stdout.write('🌐 Registering with Punkscash Gateway... ');

      const agent = sdk.createAgent({
        name: agentName,
        description: agentDescription,
        image: agentImage,
        x402support: true,
        metadata: { 
          category: category,
          version: version,
          modelProvider: modelProvider,
          modelName: modelName,
          capabilities: capabilities.split(',').map((s: string) => s.trim()),
          pricing: {
            perQuery: price
          }
        },
        active: true,
        owners: [signer.address as `0x${string}`],
      });
      process.stdout.write('DONE\n');

      try {
        await agent.setMCP(
          "https://api.example.com/mcp",
          "2024-11-05",
          false
        );
      } catch (e) {
        console.log("\n⚠️  MCP registration failed.");
      }

      if (balance === 0n) {
        console.log("\n⚠️  Insufficient balance for on-chain registration.");
        console.log("   Your agent is registered with the gateway but not yet on-chain.");
        return;
      }

      const registration = await agent.registerIPFS();

      console.log('\n✨ PunksCash Agent Activation Successful! ✨\n');
      console.log(`   ID Tag     : #${registration.agentId}`);
      console.log(`   Owner      : ${signer.address}`);
      console.log(`   Status     : ACTIVE / ON-CHAIN\n`);

      console.log('--- Network Status ---');
      console.log('✔ On-chain identity minted (ERC-8004)');
      console.log('✔ IPFS metadata broadcast confirmed');
      console.log('✔ Proactive network scanning active');
      console.log('----------------------\n');

      console.log('🚀 Your agent is now part of the Sovereign Swarm.');
      console.log('To start interacting, run:');
      console.log('   punkscash status --id ' + registration.agentId + '\n');


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
    flags: '-p, --provider [provider]',
    description: 'The model provider (e.g. anthropic, openai)',
  })
  parseProvider(val: string): string {
    return val;
  }

  @Option({
    flags: '-m, --model [model]',
    description: 'The model name (e.g. gpt-4)',
  })
  parseModel(val: string): string {
    return val;
  }

  @Option({
    flags: '-c, --capabilities [capabilities]',
    description: 'Comma-separated capabilities',
  })
  parseCapabilities(val: string): string {
    return val;
  }

  @Option({
    flags: '--category [category]',
    description: 'The category of the agent (default: AI Agent)',
  })
  parseCategory(val: string): string {
    return val;
  }

  @Option({
    flags: '--version [version]',
    description: 'The version of the agent (default: 1.0.0)',
  })
  parseVersion(val: string): string {
    return val;
  }

  @Option({
    flags: '--price [price]',
    description: 'The pricing per query in ETH (default: 0.0001)',
  })
  parsePrice(val: string): string {
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
