import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { IPublishOptions, MqttService } from 'ngx-mqtt';
import { HumedadService } from '../services/humedad.service';
import { TemperaturaService } from '../services/temperatura.service'

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})

export class LineChartComponent implements OnInit{


  title = 'Frontend';

  private options: IPublishOptions= {qos:1};
  public ledState:string="off";

  constructor(private mqttService: MqttService, private temperatura:TemperaturaService, private humedad:HumedadService){}

  ngOnInit(){
    this.updateTempData()
  }

  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Temperatura' },
  ];

  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
         ticks: {
            stepSize: 0.5
         }
      }]
   }
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(0, 119, 290, 0.5)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  
  updateTempData(){
    this.lineChartData[0].data = [];
    this.lineChartLabels = [];
    console.log('Estoy en updateData');
    this.temperatura.getData().subscribe(
      (data)=>{
       // this.lineChartData[0].data.push(data.valor)
       var length = data['rows'].length;
       console.log(data);
       this.lineChartData[0].label = 'Temperatura'; 
       for(let i=0; i<length; i++){
        var time = data['rows'][i]['timestamp'].split('T');
        var hours = time[1].split('.');
        var minutes = hours[0].split(':');
        if (minutes[0] == '02'){
          minutes[0] = '23';
        } else if (minutes[0] == '01'){
          minutes[0] = '22';
        } else if (minutes[0] == '00') {
          minutes[0] = '21';
        } else {
          minutes[0] = String(Number(minutes[0])-3);
        }
        minutes[0] = minutes[0] + ':' + minutes[1] + ':' + minutes[2]; 
        this.lineChartData[0].data.push(Number(data['rows'][i]['value']));
        this.lineChartLabels.push(minutes[0]);
        console.log(data['rows'][i]['value']);
       }
      }
    )
  }  

  updateHumData(){
    this.lineChartData[0].data = [];
    this.lineChartLabels = [];
    console.log('Estoy en updateData');
    this.humedad.getData().subscribe(
      (data)=>{
       // this.lineChartData[0].data.push(data.valor)
       var length = data['rows'].length;
       console.log(data);
       this.lineChartData[0].label = 'Humedad';
       for(let i=0; i<length; i++){
        var time = data['rows'][i]['timestamp'].split('T');
        var hours = time[1].split('.');
        var minutes = hours[0].split(':');
        if (minutes[0] == '02'){
          minutes[0] = '23';
        } else if (minutes[0] == '01'){
          minutes[0] = '22';
        } else if (minutes[0] == '00') {
          minutes[0] = '21';
        } else {
          minutes[0] = String(Number(minutes[0])-3);
        }
        minutes[0] = minutes[0] + ':' + minutes[1] + ':' + minutes[2]; 
        this.lineChartData[0].data.push(Number(data['rows'][i]['value']));
        this.lineChartLabels.push(minutes[0]);
        console.log(data['rows'][i]['value']);
       }
      }
    )
  }  

  mqttPublish(message:string){
    this.mqttService.publish("esp32/led/set",message,this.options).subscribe(
      (next)=>{console.log(next)},
      (err)=>{console.log(err)}
    );
  }

  showTemp(){
    console.log("Pedi la temperatura");
    this.updateTempData();
  }

  showHum(){
    console.log("Pedi la humedad");
    this.updateHumData();
  }

  
  
}