import { Injectable } from '@angular/core';
import { ApplicationInsights, DistributedTracingModes } from '@microsoft/applicationinsights-web';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {

  appInsights: ApplicationInsights;

  constructor() {
    this.appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: environment.appInsights.instrumentationKey,
        enableAutoRouteTracking: true, // option to log all route changes,
        distributedTracingMode: DistributedTracingModes.W3C,
        disableCorrelationHeaders: false,
        enableCorsCorrelation: true
      }
    });

    this.appInsights.loadAppInsights();

    this.appInsights.addTelemetryInitializer(envelope => {
      if (envelope && envelope.tags) {
        envelope.tags["ai.cloud.role"] = "app";
      }
    });
  }

  logPageView(name?: string, url?: string) { // option to call manually
    this.appInsights.trackPageView({
      name: name,
      uri: url
    });
  }

  logEvent(name: string, properties?: { [key: string]: any }) {
    this.appInsights.trackEvent({name: name}, properties);
  }

  logMetric(name: string, average: number, properties?: { [key: string]: any }) {
    this.appInsights.trackMetric({name: name, average: average}, properties);
  }

  logException(exception: Error, severityLevel?: number) {
    this.appInsights.trackException({exception: exception, severityLevel: severityLevel});
  }

  logTrace(message: string, properties?: { [key: string]: any }) {
    this.appInsights.trackTrace({message: message}, properties);
  }
}
