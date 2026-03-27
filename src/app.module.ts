import { Module } from '@nestjs/common';
import { AgentCreateCommand } from './commands/agent-create.command';
import { RegisterCommand } from './commands/register.command';
import { RegisterQuestions } from './commands/questions/register.questions';

@Module({
  imports: [],
  controllers: [],
  providers: [AgentCreateCommand, RegisterCommand, RegisterQuestions],
})
export class AppModule {}
