// column-names.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'columnNames',
  standalone: true
})
export class ColumnNamesPipe implements PipeTransform {

  transform(data: any, allItems: any): string[] {
    const columnNames: string[] = [];

    // Iterate over each column in the swimlane
    data.columns.forEach((column: any) => {
      // Push the column heading into the columnNames array
      columnNames.push(column);
    });
    this.toggleCollapseSwimlane(data, allItems);
    return columnNames;
  }

  toggleCollapseSwimlane(column: any, allItems: any) {
    allItems.forEach((data: any) => {
      const idealWidth = 100 / data.columns.length;
      data.columns.forEach((column: any) => {
        column.idealWidth = idealWidth;

        if (column.collapsed) {
          column.idealWidth = 10;
        }
      })

      // }
    });
  }

}
