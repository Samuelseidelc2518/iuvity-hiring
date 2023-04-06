import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InventoryListComponent } from './pages/inventory-list/inventory-list.component';
import { InventoryCreateComponent } from './pages/inventory-create/inventory-create.component';
import { SalesCreateComponent } from './pages/sales-create/sales-create.component';
import { SalesComponent } from './pages/sales/sales.component';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InventoryListComponent,
    InventoryCreateComponent,
    SalesCreateComponent,
    SalesComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
