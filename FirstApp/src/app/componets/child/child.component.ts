import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-child",
    imports: [CommonModule],
    standalone: true,
    templateUrl: "child.componet.html"
})
export class ChildComponet{
    greet(){
        alert("Hello");
    }
};