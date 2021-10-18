import {
  ConflictException,
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PgQueryErrorInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (/(duplicate key value violates|not found)/i.test(err.message)) {
          throw new ConflictException();
        }

        if (/violates foreign key constraint/i.test(err.message)) {
          throw new UnprocessableEntityException();
        }

        throw err;
      }),
    );
  }
}
