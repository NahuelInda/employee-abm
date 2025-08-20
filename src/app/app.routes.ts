import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees';
import { LayoutComponent } from './layout/layout';

export const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
      { path: 'employees', component: EmployeesComponent },
      { path: '', redirectTo: 'employees', pathMatch: 'full' }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
