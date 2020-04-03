import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
const materialModules = [
  MatSidenavModule,
  MatDividerModule,
  MatButtonModule,
  MatIconModule
];
const nonMaterialModules = [
  FormsModule,
  ReactiveFormsModule
];
@NgModule({
  imports: [
    CommonModule,
    nonMaterialModules,
    materialModules
  ],
  exports: [
    nonMaterialModules,
    materialModules
  ]
})
export class SharedModule { }
