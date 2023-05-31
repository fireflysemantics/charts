import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimatedBarChartComponent } from './animated-echarts.component';

@Component({
  standalone:true,
  imports: [RouterOutlet, AnimatedBarChartComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'charts';
}
