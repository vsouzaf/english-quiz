import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthStatus } from './HealthStatus.type';

@Controller()
export class HealthController {
  constructor(private readonly appService: HealthService) {}

  @Get('/health')
  getStatus(): HealthStatus {
    return this.appService.getStatus();
  }
}
