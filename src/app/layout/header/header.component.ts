import { Component, OnInit } from '@angular/core';
import versions from '../../../_versions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  version?: string

  constructor() { }

  ngOnInit(): void {
    this.version = versions.versionLong;
  }

}
