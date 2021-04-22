import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { TemperaturaService } from '../services/temperatura.service'

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})

export class LineChartComponent implements OnInit{

  constructor(private temperatura:TemperaturaService){}

  ngOnInit(){
    this.updateData()
  }

  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Temperatura' },
  ];

  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  
  updateData(){
    console.log('Estoy en updateData');
    this.temperatura.getData().subscribe(
      (data)=>{
       // this.lineChartData[0].data.push(data.valor)
       var length = data['rows'].length;
       console.log(data)
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
  
}