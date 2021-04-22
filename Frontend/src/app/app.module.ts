import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { ChartsModule } from 'ng2-charts';
import { IMqttServiceOptions, MqttModule } from "ngx-mqtt";
import { HttpClientModule } from '@angular/common/http';

const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: '192.168.100.25',
  port: 9001,
  protocol: "ws",
  path: '/mqtt',
};

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
