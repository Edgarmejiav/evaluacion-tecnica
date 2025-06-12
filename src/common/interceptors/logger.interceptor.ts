import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, query, params } = request;
    const now = Date.now();

    this.logger.log(
      `[${method}]`,
      context.getClass().name, // Context: Controller name
    );

    return next.handle().pipe(
      tap({
        // <--- HERE'S THE CHANGE: Use an object for callbacks
        next: (data) => {
          const responseTime = Date.now() - now;
          this.logger.log(
            `[${method}] ${url} - Response sent in ${responseTime}ms. Data: ${JSON.stringify(data)}`,
            context.getClass().name, // Context: Controller name
          );
        },
        error: (error) => {
          const responseTime = Date.now() - now;
          this.logger.error(
            `[${method}] ${url} - Error after ${responseTime}ms. Error: ${error.message}`,
            error.stack, // Log stack trace for errors
            context.getClass().name, // Context: Controller name
          );
        },
        complete: () => {
          this.logger.log(`[${method}] ${url} - Request completed.`);
        },
      }),
    );
  }
}
