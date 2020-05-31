import { Component, Input, ViewChild } from '@angular/core';
import * as _ from "lodash";
import {DataTable} from "./DataTable";
import {Paginator} from "./Paginator";

@Component({
  selector: 'mfTableController',
  template: `
    <div class="extstats-table-controller">
      <mfPaginator #p [mfTable]="table">
        <div class="extstats-pagination" *ngIf="p.dataLength > p.rowsOnPage">
          <div class="help">Page:</div>
          <button type="button" class="extstats-page-item" *ngFor="let page of pages()" [class.active]="p.activePage === page" (click)="p.setPage(page)">
            <a class="extstats-page-link" style="cursor: pointer">{{page}}</a>
          </button>
        </div>

        <div class="filler"></div>

        <div *ngIf="!!searchColumn">
          <div class="help">Search:</div>
          <input type="text" [value]="searchValue" [placeholder]="placeholder" (input)="search($event)">
        </div>

        <div class="filler" *ngIf="!!searchColumn"></div>

        <div class="extstats-pagination" *ngIf="p.dataLength > minRowsOnPage">
          <div class="help">Rows per page:</div>
          <button type="button" class="extstats-page-item" *ngFor="let rows of rowsOnPageSet" [class.active]="p.rowsOnPage===rows" (click)="p.setRowsOnPage(rows)">
            <a class="extstats-page-link" style="cursor: pointer">{{rows}}</a>
          </button>
        </div>
      </mfPaginator>
    </div>`
})
export class TableController {
  @Input('table') table: DataTable;
  @Input('searchColumn') searchColumn: string;
  @Input('placeholder') placeholder: string = 'search term';
  @ViewChild(Paginator, {static: true}) paginator: Paginator;

  public searchValue = "";
  public rowsOnPageSet = [20, 30, 50];
  public minRowsOnPage = 0;

  public pages(): number[] {
    const result = [];
    const totalPages = this.paginator.lastPage;
    this.addPage(1, totalPages, result);
    this.addPage((this.paginator.activePage + 1) / 2, totalPages, result);
    this.addPage(this.paginator.activePage - 1, totalPages, result);
    this.addPage((this.paginator.activePage + totalPages) / 2, totalPages, result);
    this.addPage(this.paginator.activePage, totalPages, result);
    this.addPage(this.paginator.activePage + 1, totalPages, result);
    this.addPage(totalPages, totalPages, result);
    if (result.length < 7) {
      this.addPage((this.paginator.activePage + totalPages / 10), totalPages, result);
      this.addPage(this.paginator.activePage - totalPages / 10, totalPages, result);
    }
    result.sort((a, b) => a - b);
    return result;
  }

  private addPage(page: number, totalPages: number, pages: number[]) {
    const p = Math.round(page);
    if (p > 0 && p <= totalPages && pages.indexOf(p) < 0) {
      pages.push(p);
    }
  }

  public search(event: any) {
    const searchTerm = event.srcElement.value.toLowerCase();
    let index = 0;
    for (const row of this.getSortedData()) {
      const v = row[this.searchColumn].toString();
      if (v.toLowerCase().startsWith(searchTerm)) {
        const p = Math.floor(index / this.paginator.rowsOnPage);
        this.paginator.setPage(p + 1);
        break;
      }
      index++;
    }
  }

  private getSortedData(): any[] {
    let data = this.table.inputData;
    const sortBy = this.table.sortBy;
    const sortOrder = this.table.sortOrder === "asc" ? "asc" : "desc";
    if (typeof sortBy === 'string' || sortBy instanceof String) {
      data = _.orderBy(data, this.caseInsensitiveIteratee(<string>sortBy), [sortOrder]);
    } else {
      data = _.orderBy(data, sortBy, [sortOrder]);
    }
    return data;
  }

  private caseInsensitiveIteratee(sortBy: string) {
    return (row: any): any => {
      let value = row;
      for (const sortByProperty of sortBy.split('.')) {
        if (value) {
          value = value[sortByProperty];
        }
      }
      if (value && typeof value === 'string' || value instanceof String) {
        return value.toLowerCase();
      }
      return value;
    };
  }
}
