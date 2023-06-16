import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { filter, fromEvent, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Acreditada} from 'app/modules/admin/masters/bachiller_grado/acreditadas/acreditadas.types';
import { AcreditadasService } from 'app/modules/admin/masters/bachiller_grado/acreditadas/acreditadas.service';

@Component({
    selector       : 'acreditadas-list',
    templateUrl    : './list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcreditadasListComponent implements OnInit, OnDestroy
{
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;

    acreditadas$: Observable<Acreditada[]>;

    acreditadasCount: number = 0;
    acreditadasTableColumns: string[] = ['name', 'email', 'phoneNumber', 'job'];
    // roles: Role[];
    drawerMode: 'side' | 'over';
    searchInputControl: FormControl = new FormControl('');
    selectedAcreditada: Acreditada;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _acreditadasService: AcreditadasService,
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
        // Get the acreditadas
        this.acreditadas$ = this._acreditadasService.acreditadas$;
        this._acreditadasService.acreditadas$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((acreditadas: Acreditada[]) => {

                // Update the counts
                this.acreditadasCount = acreditadas.length;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the acreditada
        this._acreditadasService.acreditada$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((acreditada: Acreditada) => {

                // Update the selected acreditada
                this.selectedAcreditada = acreditada;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the roles
        // this._acreditadasService.roles$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((roles: Role[]) => {

        //         // Update the roles
        //         this.roles = roles;

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                switchMap(query =>

                    // Search
                    this._acreditadasService.searchAcreditadas(query)
                )
            )
            .subscribe();

        // Subscribe to MatDrawer opened change
        this.matDrawer.openedChange.subscribe((opened) => {
            if ( !opened )
            {
                // Remove the selected acreditada when drawer closed
                this.selectedAcreditada = null;

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
                this.createAcreditada();
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
     * Create acreditada
     */
    createAcreditada(): void
    {
        // Go to the new contact
        this._router.navigate(['./', 0], {relativeTo: this._activatedRoute});

        // // Create the acreditada
        // this._acreditadasService.createAcreditada().subscribe((newAcreditada) => {

        //     // Go to the new acreditada
        //     this._router.navigate(['./', newAcreditada.idUsuario], {relativeTo: this._activatedRoute});

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
