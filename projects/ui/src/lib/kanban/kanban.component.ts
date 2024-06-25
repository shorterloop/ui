import { AfterViewInit, Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { ColumnNamesPipe } from './column-names.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';


interface LibraryItem {
  type: 'link' | 'chip' | 'budget' | 'timeFrame' | 'avatar' | string; // Types for different items
  label?: string; // Label for the item (optional depending on type)
  value?: string | string[] | { value?: string; backgroundColor?: string; foregroundColor?: string; }[]; // Value for the item (optional depending on type)
  url?: string; // URL for links (optional depending on type)
  currency?: string; // Currency for budget (optional depending on type)
  amount?: number; // Amount for budget (optional depending on type)
  reference?: string; // Reference for links (optional depending on type)
  author?: { // Author details (optional depending on type)
    photo?: string;
    name?: string;
  };
}

interface Task {
  id: number;
  header: LibraryItem[];
  body: {
    description: string;
  };
  footer: LibraryItem[];
  borderColor?: string;
  toggleColumn?: boolean;
}

interface Column {
  id: number;
  heading: string;
  tasks: Task[];
  collapsed?: boolean;
  action?: {
    label: string;
    event: ($event: any, column: Column) => void;
  };
}

interface Swimlane {
  id: number;
  heading: string;
  columns: Column[];
}

type KanbanData = Column[] | Swimlane[] | any[];

@Component({
  selector: 'shorterloop-kanban',
  standalone: true,
  imports: [CommonModule, DragDropModule, MatIconModule, MatExpansionModule, MatMenuModule, ColumnNamesPipe],
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css'],
})
export class KanbanComponent implements AfterViewInit {
  @Input() data: KanbanData = [];
  @Input() type = '';
  @Input() tableHeaders: any = [];

  @ViewChildren('kanbanList') kanbanLists!: QueryList<ElementRef>;

  constructor(public sanitizer: DomSanitizer) { }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    setTimeout((_: any) => {
      this.adjustColumnHeights(event.container.id);
      this.adjustColumnHeights(event.previousContainer.id);
    });
  }

  ngAfterViewInit() {
    this.adjustColumnHeights();
    // this.setupMutationObserver();
  }

  private adjustColumnHeights(only = '') {
    let listing: any = this.kanbanLists;

    if (only) {
      const swimlane: any = document.querySelector('#' + only);
      const swimlaneRow = swimlane.getAttribute('customId');
      //@ts-ignore
      listing = this.kanbanLists._results.filter((list: any) => list.nativeElement.getAttribute('customId') === swimlaneRow)
    }
    if (listing) {
      const columnHeights: any = listing.map((list: any) => {
        const children = Array.from(list.nativeElement.children);
        const totalHeight = children.reduce((height: any, child: any) => {
          const childStyles = window.getComputedStyle(child);
          const marginBottom = parseFloat(childStyles.marginBottom);
          const paddingBottom = parseFloat(childStyles.paddingBottom);
          return height + child.offsetHeight + marginBottom + paddingBottom;
        }, 0);
        return totalHeight;
      });

      const maxHeight = Math.max(...columnHeights);
      listing.forEach((list: any) => {
        (list.nativeElement as HTMLElement).style.height = `${maxHeight}px`;
      });
    }
  }

  addAction($event: any, column: Column) {
    column?.action?.event($event, column);
  }

  toggleCollapse(column: Column) {
    const collapsedColumns = this.data.filter((col: any) => col.collapsed);

    const totalColumns = this.data.length;
    const collapsedCount = collapsedColumns.length;
    const remainingColumns = totalColumns - collapsedCount;

    if ((remainingColumns > 1 && !column.collapsed) || (remainingColumns >= 1 && column.collapsed)) {
      column.collapsed = !column.collapsed;
    }
  }

  toggleCollapseSwimlane(column: any) {
    // Toggle the collapsed state of the specified column
    this.data.forEach((swimlane: any) => {
      swimlane.columns.forEach((col: any) => {
        if (col.id === column.id) {
          col.collapsed = !col.collapsed;
        }
      });
    });

    // Calculate the number of collapsed columns and the remaining width
    // @ts-ignore
    const totalColumns = this.data[0].columns.length;
    let collapsedColumns = this.data.flatMap((swimlane: any) => swimlane.columns).filter((col: any) => col.collapsed);
    // Filter out duplicates by id
    collapsedColumns = collapsedColumns.reduce((acc, current) => {
      const x = acc.find((item: any) => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    const collapsedCount = collapsedColumns.length;
    const remainingColumns = totalColumns - collapsedCount;
    const remainingWidth = 100 - (collapsedCount * 10);

    // Update the idealWidth of each column based on its collapsed state
    this.data.forEach((swimlane: any) => {
      swimlane.columns.forEach((col: any) => {
        if (col.collapsed) {
          // There must be one column always expanded.

          if (remainingColumns) {
            col.idealWidth = 10;
          } else {
            if (col.id === column.id) {
              col.idealWidth = 100 - ((totalColumns - 1) * 10);
              col.collapsed = false;
            }
          }
        } else {
          col.idealWidth = remainingWidth / remainingColumns;
        }
      });
    });
  }

  toggleCollapseForWorkFlow(column: any, columnNumber: number) {
    const collapsedColumns = this.tableHeaders.filter((col: any) => col.collapsed);

    const totalColumns = this.tableHeaders.length;
    const collapsedCount = collapsedColumns.length;
    const remainingColumns = totalColumns - collapsedCount;
    if ((remainingColumns > 1 && !column.collapsed) || (remainingColumns >= 1 && column.collapsed)) {
      column.collapsed = !column.collapsed;
    }
  }
}
