import { Injectable } from '@angular/core';
import { ZinsenResourceService, ZinsQuery } from '../../openapi';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZinsenService {

  constructor(
    private zinsenResourceService: ZinsenResourceService
  ) { }

  getZinsen(): Observable<ZinsQuery[]> {
    return this.zinsenResourceService.getAllZinsenUsingGet();
  }
}
