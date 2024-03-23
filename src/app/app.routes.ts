import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { guardsGuard } from './shared/auth-guard/guards.guard';
import { RegisterComponent } from './modules/auth/register/register.component';
// Definición de las rutas
export const routes: Routes = [
  // Ruta para el login, accesible sin autenticación
  { path: 'login', component: LoginComponent },
  // Ruta para el registro, aquí podrías o no querer usar el AuthGuard
  { path: 'sign-up', component: RegisterComponent},
  // Ruta para la página principal, protegida por el AuthGuard
  { path: 'home-page', component: HomePageComponent, canActivate: [guardsGuard] },
  // Ruta para los posts, con carga perezosa y protegida por el AuthGuard
  { path: 'post', loadChildren: () => import('./modules/posts/posts.module').then(m => m.PostsModule), canActivate: [guardsGuard] },
  // Ruta para la autenticación con carga perezosa, podría estar protegida o no según el caso de uso
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule), canActivate:[guardsGuard] },
  // Redirección para rutas vacías (''), se podría redirigir a 'login' o manejar de otra forma según la lógica de autenticación
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Ruta comodín para manejar cualquier ruta no definida, redirige al login
  { path: '**', redirectTo: 'login' }
];
