import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation,
  } from '@angular/core';
  import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
  import { fromEvent, debounceTime } from 'rxjs';
  
  @Component({
    standalone: true,
    imports: [NgxEchartsModule],
    providers: [
      {
        provide: NGX_ECHARTS_CONFIG,
        useFactory: () => ({ echarts: () => import('echarts') }),
      },
    ],
    selector: 'app-animated-bar-chart',
    template:
      '<div echarts (chartInit)="onChartInit($event)" [autoResize]="false" [options]="options"></div>',
    styles: [
      `app-animated-bar-chart {
      display:block;
  }`,
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class AnimatedBarChartComponent implements OnInit {
    echartsIntance: any;
  
    options: any;
    constructor() {
      this.resize();
    }
  
    ngOnInit(): void {
      const xAxisData = [];
      const data1 = [];
      const data2 = [];
  
      for (let i = 0; i < 100; i++) {
        xAxisData.push('category' + i);
        data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
        data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
      }
  
      this.options = {
        backgroundColor: 'rgb(240,240,240)',
        color: ['purple', 'green'],
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        },
        legend: {
          data: ['orders', 'transactions'],
          align: 'left',
          borderWidth: 0,
          borderRadius: 0,
          textStyle: {
            color: 'red',
          },
        },
        /*
        toolbox: {
          // y: 'bottom',
          feature: {
            magicType: {
              type: ['stack'],
            },
            dataView: {},
            saveAsImage: {
              pixelRatio: 2,
            },
          },
        },
        */
        //      tooltip: {},
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          textStyle: {
            color: 'orange',
            fontWeight: '100',
            fontSize: '12',
          },
          position: 'top',
          backgroundColor: 'white',
          borderColor: 'transparent',
          borderWidth: 0,
          formatter: (params: any) =>
            `${Math.round(parseInt(params[0].value, 10))}`,
          //extraCssText: 'blue',
        },
        xAxis: {
          data: xAxisData,
          silent: false,
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'orange',
              opacity: '0.2',
              width: '5',
            },
          },
        },
        series: [
          {
            name: 'transactions',
            type: 'bar',
            data: data1,
            animationDelay: function (idx: any) {
              return idx * 10;
            },
          },
          {
            name: 'orders',
            type: 'bar',
            data: data2,
            animationDelay: function (idx: any) {
              return idx * 10 + 100;
            },
          },
        ],
        //      animationDuration: 0,
        //    animationDurationUpdate: 3000,
        //  animationDuration: 100,
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx: any) {
          return idx * 5;
        },
      };
    }
  
    resize() {
      fromEvent(window, 'resize')
        .pipe(debounceTime(200))
        .subscribe((e) => {
          console.log('RESIZE');
          if (this.echartsIntance) {
            this.echartsIntance.resize({
              animation: {
                duration: 1500,
                easing: 'elasticOut',
              },
            });
          }
        });
    }
  
    onChartInit(echarts: any) {
      this.echartsIntance = echarts;
    }
  }
  