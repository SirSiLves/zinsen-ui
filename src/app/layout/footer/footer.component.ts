import { Component, OnInit } from '@angular/core';
import versions, { TsAppVersion } from '../../../_versions';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  today: Date = new Date();
  version: TsAppVersion = versions;

  constructor() { }

  ngOnInit(): void {
  }

}
