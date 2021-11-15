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
  ) {
  }

  getZinsen(): Observable<ZinsQuery[]> {
    return this.zinsenResourceService.getAllZinsenUsingGet().pipe(
      catchError(error => {
        this.messageService.add({
          severity: 'error',
          summary: error.name,
          detail: error.message
        });

        return throwError(error);
      })
    );
  }


  calculateZins(z: ZinsQuery): Observable<ZinsQuery> {
    if (!z.id) {
      return throwError('No Zins ID found');
    }

    return this.zinsenResourceService.calculateZinsUsingPut({
      id: z.id
    }).pipe(
      catchError(error => {
        this.messageService.add({
          severity: 'error',
          summary: error.name,
          detail: error.message
        });

        return throwError(error);
      })
    );
  }

  create(laufzeit: any, product: any): Observable<String> {
    if (!laufzeit || !product) {
      return throwError('Laufzeit or Product not found');
    }

    return this.zinsenResourceService.createZinsUsingPost({
      laufzeit: laufzeit,
      produkt: product
    }).pipe(
      catchError(error => {
        this.messageService.add({
          severity: 'error',
          summary: error.name,
          detail: error.message
        });

        return throwError(error);
      })
    );
  }

  delete(zins: ZinsQuery): Observable<string> {
    if (!zins.id) {
      return throwError('No Zins ID found');
    }

    return this.zinsenResourceService.deleteZinsUsingDelete({
      id: zins.id
    }).pipe(
      catchError(error => {
        this.messageService.add({
          severity: 'error',
          summary: error.name,
          detail: error.message
        });

        return throwError(error);
      })
    );

  }
}
