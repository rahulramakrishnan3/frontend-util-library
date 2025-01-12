import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { GenericChartService } from '../../generic-chart.service';

@Component({
  selector: 'lib-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  @Input() url: any;
  @Input() headers: any;
  @Input() labels: any
  @Input() legends :any;
  @Input() sessionType :any;
data : any
  private chart: Chart | undefined;
  constructor(private cdr: ChangeDetectorRef, private apiService : GenericChartService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    let url = this.url;
    let headers = this.headers;
      setTimeout(() => {
        this.getChartData();
        // this.initializeChart();
      }, 100);
          window.addEventListener('resize', this.onResize.bind(this));
        }

  ngOnChanges() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }

    if (this.url && this.headers) {
      this.initializeChart();
    }
  }

  async getChartData(){
    const paylaod  ={url : this.url, headers : this.headers}
    this.apiService.post(paylaod).then(async (data: any) => {
     this.data = await this.apiService.transformApiResponse(data,this.legends[this.sessionType] );
      this.initializeChart();
    })
  }

  private initializeChart() {
    const chartElement = document.getElementById('MyChart') as HTMLCanvasElement;
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
    const hasData = this.data ? this.checkIfAnyDataExists(this.data?.datasets): true;
    if (!hasData) {
      const containerElement = document.getElementById('chartContainer');
      if (containerElement) {
        containerElement.innerHTML = '<div style="color: #832215; background-color: #f8f9fa; text-align: center; font-size: 16px; padding: 20px 0; width: 100%;">No sessions</div>';
      }
      return;
    }
  
    if (chartElement) {
      this.chart = new Chart(chartElement, {
        type: 'bar',
        data: this.data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            align:"end",
              labels: {
                boxWidth: 15,
                boxHeight: 15, 
                padding: 20,
                font: {
                  size: 14,
                },
              },
            },
          },
          scales: {
            x: {
              ticks: {
                autoSkip: false, 
              },
              grid: {
                display: false, 
              },
            },
            y: {
              beginAtZero: true,
            },
          },
          layout: {
            padding: {
              right: 20, 
            },
          },
        },
      });
      this.cdr.detectChanges();
    }
  }
  

  private onResize() {
    if (this.chart) {
      this.chart.resize();
    }
  }
  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  checkIfAnyDataExists(datasets: { label: string; data: number[] }[]): boolean {
    return datasets.some(dataset => dataset?.data.some(value => value > 0));
  }

}
