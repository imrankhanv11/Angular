import { Component, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChildComponet } from "../../componets/child/child.component";

@Component({
    selector: "app-about",
    standalone: true,
    imports: [CommonModule, ChildComponet],
    templateUrl: "about.component.html",
})
export class AboutComponent {
    @ViewChild(ChildComponet) child!: ChildComponet;

    callChild(){
        this.child.greet();
    }
};