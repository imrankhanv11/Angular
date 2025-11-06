import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectIsAuthenticated, selectAccessToken } from '../../store/authentication/auth.selector';
import { logout } from '../../store/authentication/auth.actions';
import { TokenService } from '../../utils/token.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './navBar.component.html',
    styleUrls: ['./navBar.component.css']
})
export class NavbarComponent implements OnInit {
    isAuthenticated$!: Observable<boolean>;
    role$!: Observable<string | null>;

    private store: Store = inject(Store);
    private router: Router = inject(Router);
    private tokenService: TokenService = inject(TokenService);

    ngOnInit() {
        this.isAuthenticated$ = this.store.select(selectIsAuthenticated);

        this.role$ = this.store.select(selectAccessToken).pipe(
            map((token) => this.tokenService.getRoleFromToken(token))
        );
    }

    onLogout() {
        this.store.dispatch(logout());
        this.router.navigate(['/']);
    }
}
