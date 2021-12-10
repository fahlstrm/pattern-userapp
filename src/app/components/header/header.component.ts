import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivateService } from 'src/app/services/activate.service';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cities!: Array<any>;
  scooterActive!: boolean;
  subscription: Subscription;
  time = 0;
  displaytime!: string;
  interval: any;

  constructor(private activateService: ActivateService, public cityService: CityService) {
    this.subscription = this.activateService.onToggle()
    .subscribe(value => {
      this.scooterActive = value
      this.scooterActive ? this.startTimer() : this.endTimer();
    });
  }

  ngOnInit(): void {
    this.cityService.getCities()
    .subscribe((data) => {
      this.cities = data;
    })
  }

 startTimer() {
    this.interval = setInterval(() => {
        this.time++;
        let minutes = Math.floor(this.time/60);
        let seconds = this.time - (minutes * 60);
        let secondsString;
        if (seconds < 10) {
          secondsString = "0" + seconds;
        } else {
          secondsString = seconds;
        }
        this.displaytime = minutes + ":" + secondsString;
      }, 1000);
  }

  endTimer() {
    clearInterval(this.interval);
    this.time = 0;
  }

  transform(value: number): string {
       const minutes: number = Math.floor(value / 60);
       return minutes + ':' + (value - minutes * 60);
  }

  // Function for changing city in menu
  changeCity(city: number): void {
    this.cityService.setCity(city);
  }

  // Used by toolbar button to street park scooter
  endClick(): void {
    this.activateService.endClick();
  }

  // upSecond(): void {
  //   this.time += 1;
  // }

}
