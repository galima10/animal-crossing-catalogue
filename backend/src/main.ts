import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ?? 3000;
  const CORS_ORIGIN = process.env.CORS_ORIGIN ?? 'http://localhost:5173';

  app.enableCors({
    origin: CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    // credentials: true,
  });

  await app.listen(PORT);
  console.log(`✅ Server running on http://localhost:${PORT}`);
}
bootstrap();
