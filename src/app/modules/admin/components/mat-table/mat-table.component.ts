import {
    Component,
    Input,
    OnInit,
    ViewChild,
    AfterViewInit,
    Output,
    EventEmitter,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';

import { MatDialog } from '@angular/material/dialog';

import { ThemePalette } from '@angular/material/core';
import { TableColumnsDefInterface } from 'app/shared/interfaces/TableColumnsDefInterface';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

const rangosPorPagina = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    const endIndex =
        startIndex < length
            ? Math.min(startIndex + pageSize, length)
            : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} de ${length}`;
};

@Component({
    selector: 'app-mat-table',
    templateUrl: './mat-table.component.html',
    styleUrls: ['./mat-table.component.scss'],
})
export class MatTableComponent implements OnInit, AfterViewInit {
    @Output() onEdit: EventEmitter<any> = new EventEmitter<any>();
    @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
    @Output() verDetalle: EventEmitter<any> = new EventEmitter<any>();
    @Output() verDetalleEvaluacion: EventEmitter<any> = new EventEmitter<any>();
    @Output() clone: EventEmitter<any> = new EventEmitter<any>();

    @Output() addObs: EventEmitter<any> = new EventEmitter<any>();
    @Output() editObs: EventEmitter<any> = new EventEmitter<any>();
    @Output() onReport: EventEmitter<any> = new EventEmitter<any>();
    @Output() obtenerElemento: EventEmitter<any> = new EventEmitter<any>();
    @Output() verLocales: EventEmitter<any> = new EventEmitter<any>();

    @Input() data: any[];
    @Input() cabeceras: TableColumnsDefInterface[] = [];
    @Input() clonar: boolean;
    @Input() typeTable: string; // institucion,groupAcademic,etc

    @Output() dataSourceFilter: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @Input() termino: string;
    public displayedColumns: string[] = [];
    public displaySort: string[] = [];
    public dataSource: MatTableDataSource<[]>;
    selection = new SelectionModel<MatTableDataSource<any>>();
    color: ThemePalette = 'warn';
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = 'Items por página';
        this.paginator._intl.previousPageLabel = 'Página anterior';
        this.paginator._intl.nextPageLabel = 'Siguiente página';
        this.paginator._intl.getRangeLabel = rangosPorPagina;
        this.sort.disableClear = true;
        this.dataSource.sort = this.sort;
        console.log(this.sort.sortables);
        this.sort.sortables.forEach((element) => {
            if (element.id !== 'nro_tramite') {
                element['disabled']=true;
            }
        });
    }

    constructor(public dialog: MatDialog, private _liveAnnouncer: LiveAnnouncer) {}

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource<any>(this.data);
        console.log(this.dataSource);
        this.cabeceras
            .sort((a, b) => (a.id < b.id ? -1 : 1))
            .forEach((column: TableColumnsDefInterface) => {
                this.displayedColumns.push(column.name);
            });
            console.log(this.displayedColumns);
    }

    editar(element: any) {
        this.onEdit.emit(element);
        console.log(element);
    }

    eliminar(element: any) {
        this.onDelete.emit(element);
    }

    detalle(element: any) {
        this.verDetalle.emit(element);
        console.log(element);
    }

    announceSortChange(sortState: Sort) {
        console.log(sortState);
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }
}
