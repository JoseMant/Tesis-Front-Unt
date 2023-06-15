import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { filter, fromEvent, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Resolucion, Role } from 'app/modules/admin/masters/carpeta/resoluciones/resoluciones.types';
import { ResolucionesService } from 'app/modules/admin/masters/carpeta/resoluciones/resoluciones.service';

@Component({
    selector       : 'resoluciones-list',
    templateUrl    : './list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResolucionesListComponent implements OnInit, OnDestroy
{
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;

    resoluciones$: Observable<Resolucion[]>;

    resolucionesCount: number = 0;
    resolucionesTableColumns: string[] = ['name', 'email', 'phoneNumber', 'job'];
    roles: Role[];
    drawerMode: 'side' | 'over';
    searchInputControl: FormControl = new FormControl('');
    selectedResolucion: Resolucion;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _resolucionesService: ResolucionesService,
        @Inject(DOCUMENT) private _document: any,
        private _router: Router,
        private _fuseMediaWatcherService: FuseMediaWatcherService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the resoluciones
        this.resoluciones$ = this._resolucionesService.resoluciones$;
        this._resolucionesService.resoluciones$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((resoluciones: Resolucion[]) => {
                console.log(resoluciones);
                // Update the counts
                this.resolucionesCount = resoluciones.length;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the resolucion
        this._resolucionesService.resolucion$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((resolucion: Resolucion) => {

                // Update the selected resolucion
                this.selectedResolucion = resolucion;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the roles
        this._resolucionesService.roles$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((roles: Role[]) => {

                // Update the roles
                this.roles = roles;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                switchMap(query =>

                    // Search
                    this._resolucionesService.searchResoluciones(query)
                )
            )
            .subscribe();

        // Subscribe to MatDrawer opened change
        this.matDrawer.openedChange.subscribe((opened) => {
            if ( !opened )
            {
                // Remove the selected resolucion when drawer closed
                this.selectedResolucion = null;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Set the drawerMode if the given breakpoint is active
                if ( matchingAliases.includes('lg') )
                {
                    this.drawerMode = 'side';
                }
                else
                {
                    this.drawerMode = 'over';
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Listen for shortcuts
        fromEvent(this._document, 'keydown')
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter<KeyboardEvent>(event =>
                    (event.ctrlKey === true || event.metaKey) // Ctrl or Cmd
                    && (event.key === '/') // '/'
                )
            )
            .subscribe(() => {
                this.createResolucion();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On backdrop clicked
     */
    onBackdropClicked(): void
    {
        // Go back to the list
        this._router.navigate(['./'], {relativeTo: this._activatedRoute});

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Create resolucion
     */
    createResolucion(): void
    {
        // Go to the new contact
        this._router.navigate(['./', 0], {relativeTo: this._activatedRoute});

        // // Create the resolucion
        // this._resolucionesService.createResolucion().subscribe((newResolucion) => {

        //     // Go to the new resolucion
        //     this._router.navigate(['./', newResolucion.idUsuario], {relativeTo: this._activatedRoute});

        //     // Mark for check
        //     this._changeDetectorRef.markForCheck();
        // });
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
