import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
  imports: [],
  controllers: [HealthController],
  providers: [HealthService],
})
export class AppModule {}
