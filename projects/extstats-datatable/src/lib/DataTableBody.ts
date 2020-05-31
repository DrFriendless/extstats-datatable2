import {Component, Input} from "@angular/core";
import { DataTable} from "./DataTable";
import {Column} from "./model";

@Component({
    selector: "[mfBody]",
    template: `<tr *ngFor="let row of mfTable.data">
        <td *ngFor="let column of columns" title="{{column.valueTooltip(row)}}" [innerHtml]="column.valueHtml(row)"></td>
    </tr>`
})
export class DataTableBody<R extends object> {
    @Input("columns") columns: Column<R>[];

    public constructor(public mfTable: DataTable) {
    }
}
