import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { guardsGuard } from './shared/auth-guard/guards.guard';
import { RegisterComponent } from './modules/auth/register/register.component';

export const routes: Routes = [
    { path: '', component: LoginComponent }, //aqui no se protege
    { path: 'register-u', component: RegisterComponent }, 
    { path: 'home-page', component: HomePageComponent, canActivate: [guardsGuard] },
    { path: 'post', loadChildren: () => import('./modules/posts/posts.module').then((m) => m.PostsModule), canActivate: [guardsGuard]},
    { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule)},
    // Redirigir a login si no está autenticado, o a home si ya está autenticado
    
    // // Ruta para manejar rutas no definidas, redirige al login
   
];
    
