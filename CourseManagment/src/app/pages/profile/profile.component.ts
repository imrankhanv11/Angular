import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { logout } from "../../store/authentication/auth.actions";

@Component({
    selector: 'app-profile',
    imports: [CommonModule],
    standalone: true,
    templateUrl: "./profile.Component.html"
})
export class ProfileComponent {

    constructor(
        private router: Router,
        private store: Store
    ) { }

    onLogout() {
        this.store.dispatch(logout());

        this.router.navigate(["/login"]);
    }
}