import { NgModule } from '@angular/core';
import {BootstrapPaginator} from './BootstrapPaginator';
import {DataTable} from './DataTable';
import {DataTableBody} from './DataTableBody';
import {DataTableHead} from './DataTableHead';
import {DefaultSorter} from './DefaultSorter';
import {Paginator} from './Paginator';
import {TableController} from './TableController';
import {CommonModule} from '@angular/common';



@NgModule({
  declarations: [
    BootstrapPaginator,
    DataTable,
    DataTableBody,
    DataTableHead,
    DefaultSorter,
    Paginator,
    TableController
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BootstrapPaginator,
    DataTable,
    DataTableBody,
    DataTableHead,
    DefaultSorter,
    Paginator,
    TableController
  ]
})
export class ExtstatsDatatableModule { }
