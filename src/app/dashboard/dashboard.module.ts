import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { InventoryListComponent } from './pages/inventory-list/inventory-list.component';
import { InventoryCreateComponent } from './pages/inventory-create/inventory-create.component';
import { SalesComponent } from './pages/sales/sales.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    InventoryListComponent,
    InventoryCreateComponent,
    SalesComponent,
    HomeComponent,
    DashboardComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
