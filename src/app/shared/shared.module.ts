import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CardSummaryComponent } from './card-summary/card-summary.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GraphSummaryComponent } from './graph-summary/graph-summary.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
const materialModules = [
  MatSidenavModule,
  MatDividerModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule
];
const nonMaterialModules = [
  FormsModule,
  ReactiveFormsModule,
  NgxEchartsModule
];
const components = [
  CardSummaryComponent,
  GraphSummaryComponent
];
@NgModule({
  imports: [
    CommonModule,
    nonMaterialModules,
    materialModules
  ],
  exports: [
    nonMaterialModules,
    materialModules,
    components
  ],
  declarations: [
    components
  ]
})
export class SharedModule { }
