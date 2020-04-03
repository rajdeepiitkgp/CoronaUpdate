import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';

const materialModules = [
  MatSidenavModule
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
