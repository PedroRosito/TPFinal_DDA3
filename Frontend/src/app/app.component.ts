import { Component } from '@angular/core';
import { IMqttMessage, IPublishOptions, MqttService } from "ngx-mqtt";
import { PartialObserver } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Frontend';

  private options: IPublishOptions = {qos:1};
  public ledState:string="off";


  private observer: PartialObserver<void>;

  constructor(private mqttService: MqttService){}

<<<<<<< HEAD
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
=======
  mqttPublish(message:string){
    this.mqttService.publish("esp32/led/set",message,this.options).subscribe(
      (next)=>{console.log(next)},
      (err)=>{console.log(err)}
    );
>>>>>>> dd22a10dd66644f58c6254677e7c7fb76ed1ca58
  }


}
