import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedMaterialModule } from '../shared/shared-material/shared-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SortingComponent } from '../shared/shared-material/modal/sorting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [DashboardComponent,SortingComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class DashboardModule { }
