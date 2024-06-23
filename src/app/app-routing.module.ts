import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditReportComponent } from './pages/mortgage-credit-management/components/credit-report/credit-report.component';

const routes: Routes = [
  {path: '', redirectTo: '/report', pathMatch: 'full'},

  {path: 'report',  component: CreditReportComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
