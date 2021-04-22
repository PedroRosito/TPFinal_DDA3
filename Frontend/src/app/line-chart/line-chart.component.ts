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
       for(let i=0; i<length; i++){
        this.lineChartData[0].data.push(Number(data['rows'][i]['valor']));
        this.lineChartLabels.push('' + i);
        console.log(data['rows'][i]['valor']);
       }
      }
    )
  }  
  
}