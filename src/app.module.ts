import { Module } from '@nestjs/common';
import { AgentCreateCommand } from './commands/agent-create.command';
import { RegisterCommand } from './commands/register.command';

@Module({
  imports: [],
  controllers: [],
  providers: [AgentCreateCommand, RegisterCommand],
})
export class AppModule {}
