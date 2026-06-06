import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AdminSeed } from './seeds/admin.seed';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security middleware
  app.use(helmet());

  // CORS configuration
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('api');

  // Seed admin user on startup
  const adminSeed = app.get(AdminSeed);
  await adminSeed.seed();

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`✅ Backend running on http://localhost:${port}`);
}

bootstrap();
