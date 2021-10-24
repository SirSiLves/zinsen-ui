import { Component, OnInit } from '@angular/core';
import { ZinsQuery } from '../../../openapi';
import { Observable } from 'rxjs';
import { ZinsenService } from '../../services/zinsen.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  zinsen$!: Observable<ZinsQuery[]>;

  constructor(
    private zinsenService: ZinsenService
  ) { }

  ngOnInit(): void {
    this.zinsen$ = this.zinsenService.getZinsen().pipe();
  }

}
