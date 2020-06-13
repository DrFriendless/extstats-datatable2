import {Component, Input} from "@angular/core";
import { DataTable} from "./DataTable";
import {Column} from "./model";

@Component({
    selector: "[mfBody]",
    template: `<tr *ngFor="let row of mfTable.data">
        <td *ngFor="let column of columns"
            [attr.title]="column.valueTooltip(row) || null"
            [attr.class]="column.classname || null"
            [innerHtml]="column.valueHtml(row)"></td>
    </tr>`
})
export class DataTableBody<R extends object> {
    @Input("columns") columns: Column<R>[];

    public constructor(public mfTable: DataTable) {
    }
}
