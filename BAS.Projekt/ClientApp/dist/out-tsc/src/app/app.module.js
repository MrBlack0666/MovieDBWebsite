import { __decorate } from "tslib";
import { AddEditGenreComponent } from './components/add-edit-genre/add-edit-genre.component';
import { AdminGenreComponent, DeleteGenreDialog } from './components/admin-genre/admin-genre.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MoviesService } from './services/movies.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { GenresService } from './services/genres.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminMovieComponent, DeleteMovieDialog } from './components/admin-movie/admin-movie.component';
import { MatTableModule } from '@angular/material/table';
import { MovieFilterComponent } from './components/movie-filter/movie-filter.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddEditMovieComponent } from './components/add-edit-movie/add-edit-movie.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonnelService } from './services/personnel.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AdminPersonnelComponent, DeletePersonnelDialog } from './components/admin-personnel/admin-personnel.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
import { AddEditPersonnelComponent } from './components/add-edit-personnel/add-edit-personnel.component';
import { MovieComponent } from './components/movie/movie.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from './services/notification.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { appRoutingModule } from './app.routing';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AdminUserComponent, DeleteUserDialog } from './components/admin-user/admin-user.component';
import { AdminReviewComponent } from './components/admin-review/admin-review.component';
import { ReviewService } from './services/review.service';
import { MovieReviewComponent } from './components/movie-review/movie-review.component';
import { StarRatingModule } from 'angular-star-rating';
import { ActivationComponent } from './components/register/activation/activation.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { DeleteReviewDialogComponent } from './components/dialogs/delete-review-dialog/delete-review-dialog.component';
registerLocaleData(localePl);
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            NavbarComponent,
            HomeComponent,
            AdminPanelComponent,
            AdminMovieComponent,
            MovieFilterComponent,
            AddEditMovieComponent,
            DeleteMovieDialog,
            AdminPersonnelComponent,
            DeletePersonnelDialog,
            AddEditPersonnelComponent,
            AdminGenreComponent,
            AddEditGenreComponent,
            DeleteGenreDialog,
            MovieComponent,
            LoginComponent,
            RegisterComponent,
            AdminUserComponent,
            DeleteUserDialog,
            AdminReviewComponent,
            MovieReviewComponent,
            ActivationComponent,
            RecommendationsComponent,
            DeleteReviewDialogComponent
        ],
        imports: [
            BrowserModule,
            FormsModule,
            HttpClientModule,
            appRoutingModule,
            BrowserAnimationsModule,
            MatChipsModule,
            MatIconModule,
            MatExpansionModule,
            MatInputModule,
            MatFormFieldModule,
            MatButtonModule,
            MatSelectModule,
            MatCardModule,
            MatProgressSpinnerModule,
            MatTabsModule,
            MatTableModule,
            MatPaginatorModule,
            MatDialogModule,
            ReactiveFormsModule,
            MatAutocompleteModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatSnackBarModule,
            StarRatingModule.forRoot(),
        ],
        providers: [
            MoviesService,
            GenresService,
            PersonnelService,
            NotificationService,
            AuthService,
            UserService,
            ReviewService,
            { provide: localePl, useValue: 'pl' },
            { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
            { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
            { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map