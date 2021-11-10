import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ApiModule } from '../openapi';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ApiModule.forRoot({rootUrl: environment.backendUrl}),
    BrowserModule,
    ButtonModule,
    HttpClientModule,
    TableModule,
    ToastModule,
    BrowserAnimationsModule,
    ProgressBarModule,
  ],
  providers: [
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
