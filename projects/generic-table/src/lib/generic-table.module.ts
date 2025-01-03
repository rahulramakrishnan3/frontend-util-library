import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { GenericTableComponent } from './generic-table.component';
import { TableComponent } from './components/table/table.component';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';






@NgModule({
  declarations: [
    GenericTableComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule
  ],
  schemas:[NO_ERRORS_SCHEMA],
  exports: [
    GenericTableComponent,
    TableComponent
  ]
})
export class GenericTableModule { }
