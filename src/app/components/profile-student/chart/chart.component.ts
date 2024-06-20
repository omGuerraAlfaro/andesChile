import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('attendanceCanvas') private attendanceCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() attendanceData: number[] = [];
  private attendanceChart?: Chart<'doughnut', number[], string>;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['attendanceData'] && !changes['attendanceData'].isFirstChange()) {
      this.updateChart();
    }
  }

  renderChart() {
    const data = {
      labels: ['Asistencia', 'Inasistencia'],
      datasets: [
        {
          data: this.attendanceData,
          backgroundColor: ['#4bc0c0', '#ff6384'],
          hoverBackgroundColor: ['#36a2eb', '#ff6384']
        }
      ]
    };

    const options: ChartOptions<'doughnut'> = {
      responsive: true,
      maintainAspectRatio: true,
      cutout: '70%',
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.label + ': ' + tooltipItem.raw + '%';
            }
          }
        },
        datalabels: {
          formatter: (value, context) => {
            return context.chart.data.labels![context.dataIndex];
          },
          color: '#fff',
          font:{
            size: 14,
            weight: "bolder"
          }
        },
      },
      rotation: -Math.PI / 2,  // Iniciar en la parte superior
      circumference: 360,  // Completar un círculo completo
    };

    const config: ChartConfiguration<'doughnut', number[], string> = {
      type: 'doughnut',
      data: data,
      options: options,
    };

    if (this.attendanceCanvas) {
      this.attendanceChart = new Chart(this.attendanceCanvas.nativeElement, config);
    }
  }

  updateChart() {
    if (this.attendanceChart) {
      this.attendanceChart.data.datasets[0].data = this.attendanceData;
      this.attendanceChart.update();
    }
  }
}
