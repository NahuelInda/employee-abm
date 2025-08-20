import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [RouterOutlet, ReactiveFormsModule],
  
})
export class AppComponent {}
