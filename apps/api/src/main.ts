import { existsSync } from 'fs';
import { join } from 'path';
import { config as loadEnv } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const envCandidates = [
  join(process.cwd(), '.env'),
  join(process.cwd(), '..', '.env'),
  join(process.cwd(), '..', '..', '.env'),
  join(process.cwd(), '..', '..', '..', '.env'),
];

for (const candidate of envCandidates) {
  if (existsSync(candidate)) {
    loadEnv({ path: candidate });
    break;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });
  app.enableCors({
    origin: [/http:\/\/localhost:\d+$/],
    credentials: false,
  });
  await app.listen(process.env.PORT ?? 4000);
}

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('API bootstrap failed', error);
});