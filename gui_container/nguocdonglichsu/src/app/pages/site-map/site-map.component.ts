import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.css'],
})
export class SiteMapComponent implements OnInit {
  production = environment.production;
  constructor() {}

  ngOnInit(): void {}
}
