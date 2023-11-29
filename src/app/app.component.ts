import { Component, OnInit } from '@angular/core';
import { SampleService } from './service/sample.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'internal-betting-fe';

  constructor(private sample: SampleService) { }

  ngOnInit() {
    this.sample.getSample().subscribe((res) => {
      console.log(res);
    });
  }
}
