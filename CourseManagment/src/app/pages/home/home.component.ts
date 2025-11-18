import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeroComponent } from "../../common/components/hero/hero.component";

@Component({
    selector: "app-home",
    imports: [CommonModule, HeroComponent],
    standalone: true,
    templateUrl: "home.Component.html",
    styleUrl: "home.component.css"
})
export class HomeComponent {}