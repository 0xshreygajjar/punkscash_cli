import { Command, CommandRunner } from 'nest-commander';

@Command({ name: 'register', description: 'Registration script for the application' })
export class RegisterCommand extends CommandRunner {
  async run(
    passedParam: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    console.log('Running registration script...');
    // Add registration logic here
    console.log('Registration successful!');
  }
}
