import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { InventoryListComponent } from './pages/inventory-list/inventory-list.component';
import { InventoryCreateComponent } from './pages/inventory-create/inventory-create.component';
import { SalesComponent } from './pages/sales/sales.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'inventory',
        children: [
          {
            path: 'list',
            component: InventoryListComponent,
          },
          {
            path: 'create',
            component: InventoryCreateComponent,
          },
        ],
      },
      {
        path: 'sales',
        component: SalesComponent,
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
