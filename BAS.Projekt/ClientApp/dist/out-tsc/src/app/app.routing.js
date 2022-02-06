import { UserRole } from './interfaces/auth/role';
import { AuthGuard } from './_helpers/auth.guard';
import { RouterModule } from '@angular/router';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AddEditMovieComponent } from './components/add-edit-movie/add-edit-movie.component';
import { AddEditGenreComponent } from './components/add-edit-genre/add-edit-genre.component';
import { AddEditPersonnelComponent } from './components/add-edit-personnel/add-edit-personnel.component';
import { MovieComponent } from './components/movie/movie.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ActivationComponent } from './components/register/activation/activation.component';
const routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'admin/movie/add',
        component: AddEditMovieComponent,
        canActivate: [AuthGuard],
        data: { roles: [UserRole.Admin] }
    },
    {
        path: 'admin/movie/edit/:id',
        component: AddEditMovieComponent,
        canActivate: [AuthGuard],
        data: { roles: [UserRole.Admin] }
    },
    {
        path: 'admin/genre/add',
        component: AddEditGenreComponent,
        canActivate: [AuthGuard],
        data: { roles: [UserRole.Admin] }
    },
    {
        path: 'admin/genre/edit/:id',
        component: AddEditGenreComponent,
        canActivate: [AuthGuard],
        data: { roles: [UserRole.Admin] }
    },
    {
        path: 'admin/personnel/add',
        component: AddEditPersonnelComponent,
        canActivate: [AuthGuard],
        data: { roles: [UserRole.Admin] }
    },
    {
        path: 'admin/personnel/edit/:id',
        component: AddEditPersonnelComponent,
        canActivate: [AuthGuard],
        data: { roles: [UserRole.Admin] }
    },
    {
        path: 'admin/:tab',
        component: AdminPanelComponent,
        canActivate: [AuthGuard],
        data: { roles: [UserRole.Admin] }
    },
    {
        path: 'movie/:id',
        component: MovieComponent
    },
    {
        path: 'signin',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: RegisterComponent
    },
    {
        path: 'activate',
        component: ActivationComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
export const appRoutingModule = RouterModule.forRoot(routes);
//# sourceMappingURL=app.routing.js.map