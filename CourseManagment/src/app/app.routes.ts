import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { loginGuard } from './guard/loginGuard';
import { authGuard } from './guard/authGuard';
import { UserAddFormComponent } from './pages/addUser/addUser.component';
import { adminGuard } from './guard/adminGuard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { NotFoundComponent } from './pages/notFound/not-found.component';
import { UserListComponent } from './pages/userList/userList.component';
import { CourseAddFormComponent } from './pages/addCourse/addCourse.component';
import { CourseListAdminComponent } from './pages/courseListAdmin/courseListAdmin.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    // Public Pages
    { path: "", component: HomeComponent },
    { path: "login", component: LoginComponent, canActivate: [loginGuard] },
    { path: "profile", component: ProfileComponent, canActivate: [authGuard] },
    { path: "register", component: RegisterComponent, canActivate: [loginGuard] },

    // Admin Pages
    { path: "adduser", component: UserAddFormComponent, canActivate: [adminGuard] },
    { path: 'userlist', component: UserListComponent, canActivate: [adminGuard] },
    { path: "addcourse", component: CourseAddFormComponent, canActivate: [adminGuard] },
    { path: "courselistadmin", component: CourseListAdminComponent, canActivate: [adminGuard] },

    // Helper pages
    { path: "unauthorized", component: UnauthorizedComponent },
    { path: "**", component: NotFoundComponent }
];
