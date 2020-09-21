import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { SiteMapComponent } from './pages/site-map/site-map.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { RankComponent } from './pages/rank/rank.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserComponent } from './pages/user/user.component';
import { UserMeComponent } from './pages/user/user-me/user-me.component';
import { UserChangePasswordComponent } from './pages/user/user-change-password/user-change-password.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'rank',
    component: RankComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'site-map',
    component: SiteMapComponent,
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'me',
      },
      {
        path: 'me',
        component: UserMeComponent,
      },
      {
        path: 'change-password',
        component: UserChangePasswordComponent,
      },
    ],
  },
  {
    path: 'exams',
    loadChildren: () =>
      import('./routes/exam-routing/exam-routing.module').then(
        (m) => m.ExamRoutingModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./routes/admin-routing/admin-routing.module').then(
        (m) => m.AdminRoutingModule
      ),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules, // Tải tất cả module sau khi index.html load xong
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
