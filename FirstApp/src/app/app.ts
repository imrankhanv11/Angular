import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLink, NgbCollapseModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isMenuCollapsed = true;
}