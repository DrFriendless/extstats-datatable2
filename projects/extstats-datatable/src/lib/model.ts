export interface SortEvent {
  sortBy: string|string[];
  sortOrder: string
}

export interface PageEvent {
  activePage: number;
  rowsOnPage: number;
  dataLength: number;
}

export type SortOrder = "asc"|"desc";

export interface ColumnParams<R> {
  name: string
  field: keyof R
  tooltip?: string
  classname?: string
  valueHtml?: (r:R) => string
  valueTooltip?: (r:R) => string
}

export class Column<R extends object> {
  name: string;
  field: keyof R;
  tooltip: string;
  classname?: string;
  valueHtml(r: R): string { return r[this.field] ? r[this.field].toString() : ""; }
  valueTooltip(r: R): string | null { return null; }

  constructor(obj: ColumnParams<R>) {
    this.name = obj["name"];
    if (obj["field"]) this.field = obj["field"];
    if (obj["tooltip"]) this.tooltip = obj["tooltip"];
    if (obj["valueHtml"]) this.valueHtml = obj["valueHtml"];
    if (obj["valueTooltip"]) this.valueTooltip = obj["valueTooltip"] || null;
    if (obj["classname"]) this.classname = obj["classname"];
  }
}
