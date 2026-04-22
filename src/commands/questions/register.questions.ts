import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'register-questions' })
export class RegisterQuestions {
  @Question({
    name: 'name',
    message: 'Agent display name:',
  })
  parseName(val: string) {
    return val;
  }

  @Question({
    name: 'description',
    message: 'Description (what does your agent do?):',
    default: 'a newly created agent to register',
  })
  parseDescription(val: string) {
    return val;
  }

  @Question({
    name: 'provider',
    message: 'Model provider (e.g. anthropic, openai):',
    default: 'anthropic',
  })
  parseProvider(val: string) {
    return val;
  }

  @Question({
    name: 'model',
    message: 'Model name (e.g. claude-opus-4-6, gpt-4):',
    default: 'gpt-4',
  })
  parseModel(val: string) {
    return val;
  }

  @Question({
    name: 'capabilities',
    message: 'Capabilities (comma-separated, e.g. research,analysis):',
    default: 'research, analysis',
  })
  parseCapabilities(val: string) {
    return val;
  }

  @Question({
    name: 'mcpUrl',
    message: 'MCP Endpoint URL (optional):',
    default: 'https://api.example.com/mcp',
  })
  parseMcpUrl(val: string) {
    return val;
  }

  @Question({
    name: 'mcpVersion',
    message: 'MCP Version (optional):',
    default: '2024-11-05',
  })
  parseMcpVersion(val: string) {
    return val;
  }
}
