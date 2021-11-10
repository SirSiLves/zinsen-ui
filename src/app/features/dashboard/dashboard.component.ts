import { Component, OnInit } from '@angular/core';
import { ZinsQuery } from '../../../openapi';
import { Observable } from 'rxjs';
import { ZinsenService } from '../../services/zinsen.service';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  zinsen$!: Observable<ZinsQuery[]>;
  error: Error | undefined = undefined;

  constructor(
    private zinsenService: ZinsenService
  ) {
  }

  ngOnInit(): void {
    this.zinsen$ = this.zinsenService.getZinsen().pipe(
      shareReplay(),
      catchError(error => {
        this.error = error;
        throw error;
      }));
  }

}
