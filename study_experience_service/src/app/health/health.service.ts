import { Injectable } from '@nestjs/common';
import { HealthStatus } from './HealthStatus.type';

@Injectable()
export class HealthService {
  getStatus(): HealthStatus {
    return {
      status: 'ok',
    }; 
  }
}
