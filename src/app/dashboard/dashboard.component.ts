import { Component, OnInit } from '@angular/core';
import { FadeIn } from '../core/animations/fadeIn.animation';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: FadeIn.animations,
})
export class DashboardComponent implements OnInit {
  /* Variables */
  sidebarVisible: boolean = true;
  activeUrl: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      // see also
      if (val instanceof NavigationEnd) {
        console.log(val.url);
        this.activeUrl = val.url;
      }
    });
  }

  ngOnInit(): void {}

  /* Methods */
  hideSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
