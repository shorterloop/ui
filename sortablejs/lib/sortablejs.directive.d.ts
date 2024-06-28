import {
  ElementRef,
  EventEmitter,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { Options } from 'sortablejs';
import { SortablejsService } from './sortablejs.service';
import * as i0 from '@angular/core';
export type SortableData = any | any[];
export declare class SortablejsDirective
  implements OnInit, OnChanges, OnDestroy {
  private globalConfig;
  private service;
  private element;
  private zone;
  private renderer;
  sortablejs: SortableData;
  sortablejsContainer: string;
  sortablejsOptions: Options;
  sortablejsCloneFunction: (item: any) => any;
  private sortableInstance;
  sortablejsInit: EventEmitter<any>;
  constructor(
    globalConfig: Options,
    service: SortablejsService,
    element: ElementRef,
    zone: NgZone,
    renderer: Renderer2
  );
  ngOnInit(): void;
  ngOnChanges(changes: SimpleChanges): void;
  ngOnDestroy(): void;
  private create;
  private getBindings;
  private get options();
  private get optionsWithoutEvents();
  private proxyEvent;
  private get isCloning();
  private clone;
  private get overridenOptions();
  static ɵfac: i0.ɵɵFactoryDeclaration<
    SortablejsDirective,
    [{ optional: true }, null, null, null, null]
  >;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    SortablejsDirective,
    '[sortablejs]',
    never,
    {
      sortablejs: { alias: 'sortablejs'; required: false };
      sortablejsContainer: { alias: 'sortablejsContainer'; required: false };
      sortablejsOptions: { alias: 'sortablejsOptions'; required: false };
      sortablejsCloneFunction: {
        alias: 'sortablejsCloneFunction';
        required: false;
      };
    },
    { sortablejsInit: 'sortablejsInit' },
    never,
    never,
    false,
    never
  >;
}
