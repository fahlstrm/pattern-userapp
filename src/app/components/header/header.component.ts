import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivateService } from 'src/app/services/activate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  scooterActive!: boolean;
  subscription: Subscription;

  constructor(private activateService: ActivateService) {
    this.subscription = this.activateService.onToggle()
    .subscribe(value => this.scooterActive = value);
  }

  ngOnInit(): void {
  }

}
