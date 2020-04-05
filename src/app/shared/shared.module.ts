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
const materialModules = [
  MatSidenavModule,
  MatDividerModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatProgressBarModule
];
const nonMaterialModules = [
  FormsModule,
  ReactiveFormsModule
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
