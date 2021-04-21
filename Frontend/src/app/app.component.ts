import { Component } from '@angular/core';
import { IMqttMessage, IPublishOptions, MqttService } from "ngx-mqtt";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Frontend';

  private options: IPublishOptions = {qos:1};
  public ledState:string="off";


  constructor(private mqttService: MqttService){}

  mqttPublish(){

    this.mqttService.publish("esp32/led/set",this.ledState,this.options).toPromise().then(
      (result)=>console.log(result)
    ).catch(
      (error)=>console.log(error)
    );
    if (this.ledState == 'off'){
      this.ledState = 'on'
    } else {
      this.ledState = 'off'
    }
  }

}
