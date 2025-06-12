import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { LoggingInterceptor } from './common/interceptors/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            utilities.format.nestLike(),
          ),
        }),
        new winston.transports.DailyRotateFile({
          filename: 'logs/app-%DATE%.log', // Crea un log por día
          datePattern: 'YYYY-MM-DD', // Formato de fecha en el nombre
          zippedArchive: true, // Comprime logs antiguos en .gz
          maxSize: '20m', // Tamaño máximo del archivo
          maxFiles: '14d', // Guarda logs de los últimos 14 días
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
      ],
    }),
  });
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
