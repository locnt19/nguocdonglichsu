import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
import { ExamsComponent } from './pages/exams/exams.component';
import { ExamsComingSoonComponent } from './pages/exams/exams-coming-soon/exams-coming-soon.component';
import { ExamsExam1Component } from './pages/exams/exams-exam1/exams-exam1.component';
import { ExamsExam2Component } from './pages/exams/exams-exam2/exams-exam2.component';
import { ExamsExam3Component } from './pages/exams/exams-exam3/exams-exam3.component';
import { ExamsExam4Component } from './pages/exams/exams-exam4/exams-exam4.component';
import { ExamsSummaryComponent } from './pages/exams/exams-summary/exams-summary.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './pages/admin/admin-users/admin-users.component';
import { AdminRankComponent } from './pages/admin/admin-rank/admin-rank.component';
import { AdminTimeComponent } from './pages/admin/admin-time/admin-time.component';
import { AdminAccountsComponent } from './pages/admin/admin-accounts/admin-accounts.component';
import { AdminQuestionsComponent } from './pages/admin/admin-questions/admin-questions.component';
import { AdminQuestionListComponent } from './pages/admin/admin-questions/admin-question-list/admin-question-list.component';
import { AdminQuestion1Component } from './pages/admin/admin-questions/admin-question1/admin-question1.component';
import { AdminQuestion1CreateComponent } from './pages/admin/admin-questions/admin-question1/admin-question1-create/admin-question1-create.component';
import { AdminQuestion1ListComponent } from './pages/admin/admin-questions/admin-question1/admin-question1-list/admin-question1-list.component';
import { AdminQuestion2Component } from './pages/admin/admin-questions/admin-question2/admin-question2.component';
import { AdminQuestion2CreateComponent } from './pages/admin/admin-questions/admin-question2/admin-question2-create/admin-question2-create.component';
import { AdminQuestion2ListComponent } from './pages/admin/admin-questions/admin-question2/admin-question2-list/admin-question2-list.component';
import { AdminQuestion3Component } from './pages/admin/admin-questions/admin-question3/admin-question3.component';
import { AdminQuestion3CreateComponent } from './pages/admin/admin-questions/admin-question3/admin-question3-create/admin-question3-create.component';
import { AdminQuestion3ListComponent } from './pages/admin/admin-questions/admin-question3/admin-question3-list/admin-question3-list.component';
import { AdminQuestion4Component } from './pages/admin/admin-questions/admin-question4/admin-question4.component';
import { AdminQuestion4CreateComponent } from './pages/admin/admin-questions/admin-question4/admin-question4-create/admin-question4-create.component';
import { AdminQuestion4ListComponent } from './pages/admin/admin-questions/admin-question4/admin-question4-list/admin-question4-list.component';

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
    component: ExamsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'coming-soon',
      },
      {
        path: 'coming-soon',
        component: ExamsComingSoonComponent,
      },
      {
        path: 'summary',
        component: ExamsSummaryComponent,
      },
      {
        path: 'exam-1',
        component: ExamsExam1Component,
      },
      {
        path: 'exam-2',
        component: ExamsExam2Component,
      },
      {
        path: 'exam-3',
        component: ExamsExam3Component,
      },
      {
        path: 'exam-4',
        component: ExamsExam4Component,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
      },
      {
        path: 'rank',
        component: AdminRankComponent,
      },
      {
        path: 'users',
        component: AdminUsersComponent,
      },
      {
        path: 'time',
        component: AdminTimeComponent,
      },
      {
        path: 'accounts',
        component: AdminAccountsComponent,
      },
      {
        path: 'questions',
        component: AdminQuestionsComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list',
          },
          {
            path: 'list',
            component: AdminQuestionListComponent,
          },
          {
            path: 'question-1',
            component: AdminQuestion1Component,
            children: [
              {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list',
              },
              {
                path: 'list',
                component: AdminQuestion1ListComponent,
              },
              {
                path: 'create',
                component: AdminQuestion1CreateComponent,
              },
            ],
          },
          {
            path: 'question-2',
            component: AdminQuestion2Component,
            children: [
              {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list',
              },
              {
                path: 'list',
                component: AdminQuestion2ListComponent,
              },
              {
                path: 'create',
                component: AdminQuestion2CreateComponent,
              },
            ],
          },
          {
            path: 'question-3',
            component: AdminQuestion3Component,
            children: [
              {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list',
              },
              {
                path: 'list',
                component: AdminQuestion3ListComponent,
              },
              {
                path: 'create',
                component: AdminQuestion3CreateComponent,
              },
            ],
          },
          {
            path: 'question-4',
            component: AdminQuestion4Component,
            children: [
              {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list',
              },
              {
                path: 'list',
                component: AdminQuestion4ListComponent,
              },
              {
                path: 'create',
                component: AdminQuestion4CreateComponent,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
