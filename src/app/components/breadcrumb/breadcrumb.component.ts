import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  constructor(private route: Router) { 
    console.log(this.route.url);
  }

  ngOnInit() {
  }

  getCurrentUrl() {
    console.log(this.route.url);
    return this.route.url;
  }
}
