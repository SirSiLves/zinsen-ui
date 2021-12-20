import { Component, OnInit } from '@angular/core';
import { MonitoringService } from './services/monitoring.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'zinsen-ui';

  constructor(
    private monitoringService: MonitoringService
  ) {
  }

  ngOnInit() {
    this.monitoringService.logPageView('Zinsen-UI loaded',);
  }

}
