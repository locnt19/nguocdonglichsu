import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamsComponent } from '../../pages/exams/exams.component';
import { ExamsComingSoonComponent } from '../../pages/exams/exams-coming-soon/exams-coming-soon.component';
import { ExamsExam1Component } from '../../pages/exams/exams-exam1/exams-exam1.component';
import { ExamsExam2Component } from '../../pages/exams/exams-exam2/exams-exam2.component';
import { ExamsExam3Component } from '../../pages/exams/exams-exam3/exams-exam3.component';
import { ExamsExam4Component } from '../../pages/exams/exams-exam4/exams-exam4.component';
import { ExamsSummaryComponent } from '../../pages/exams/exams-summary/exams-summary.component';

const routes: Routes = [
  {
    path: '',
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
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamRoutingModule {}
