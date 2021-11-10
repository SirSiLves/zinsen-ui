import { Injectable } from '@angular/core';
import { ZinsenResourceService, ZinsQuery } from '../../openapi';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ZinsenService {

  constructor(
    private zinsenResourceService: ZinsenResourceService,
    private messageService: MessageService
  ) { }

  getZinsen(): Observable<ZinsQuery[]> {
    return this.zinsenResourceService.getAllZinsenUsingGet().pipe(
      catchError(error => {
        this.messageService.add({
          severity: 'error',
          summary: error.name,
          detail:  error.message
        });

        return throwError(error);
      })
    );
  }
}
