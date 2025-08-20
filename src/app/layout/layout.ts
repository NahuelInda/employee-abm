import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";


@Component({
  selector: 'app-layout',
  templateUrl: './layout.html',
  styleUrls: ['./layout.css'],
  imports: [RouterOutlet]
})
export class LayoutComponent {}
