import { Command, CommandRunner, Option } from 'nest-commander';

@Command({ name: 'agent:create', description: 'Create a new agent' })
export class AgentCreateCommand extends CommandRunner {
  async run(
    passedParam: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    const name = options?.name || passedParam[0];
    const type = options?.type || 'default';
    const role = options?.role || 'assistant';
    
    if (!name) {
      console.error('Error: Agent name is required.');
      return;
    }
    console.log(`Creating agent: ${name}...`);
    console.log(`Type: ${type}`);
    console.log(`Role: ${role}`);
    // Mock logic here
    console.log(`Agent ${name} created successfully with role ${role}!`);
  }

  @Option({
    flags: '-n, --name [name]',
    description: 'The name of the agent',
  })
  parseName(val: string): string {
    return val;
  }

  @Option({
    flags: '-t, --type [type]',
    description: 'The type of the agent',
  })
  parseType(val: string): string {
    return val;
  }

  @Option({
    flags: '-r, --role [role]',
    description: 'The role of the agent',
  })
  parseRole(val: string): string {
    return val;
  }
}
