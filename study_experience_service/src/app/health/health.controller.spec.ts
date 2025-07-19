import { Test, TestingModule } from '@nestjs/testing';
import { HealthController as HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    healthController = app.get<HealthController>(HealthController);
  });

  describe('root', () => {
    it('should return "ok"', () => {
      expect(healthController.getStatus()).toBe({ status: 'ok' });
    });
  });
});
