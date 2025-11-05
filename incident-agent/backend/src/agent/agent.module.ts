import { Module } from '@nestjs/common';
import { ReactAgent } from './implementation/react.agent';

@Module({
  controllers: [],
  providers: [ReactAgent],
})
export class AgentModule {}