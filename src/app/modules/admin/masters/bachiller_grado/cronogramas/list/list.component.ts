import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { filter, fromEvent, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Cronograma, Role } from 'app/modules/admin/masters/bachiller_grado/cronogramas/cronogramas.types';
import { CronogramasService } from 'app/modules/admin/masters/bachiller_grado/cronogramas/cronogramas.service';

@Component({
    selector       : 'cronogramas-list',
    templateUrl    : './list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CronogramasListComponent implements OnInit, OnDestroy
{
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;

    cronogramas$: Observable<Cronograma[]>;

    cronogramasCount: number = 0;
    cronogramasTableColumns: string[] = ['name', 'email', 'phoneNumber', 'job'];
    roles: Role[];
    drawerMode: 'side' | 'over';
    searchInputControl: FormControl = new FormControl();
    selectedCronograma: Cronograma;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _cronogramasService: CronogramasService,
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
        // Get the cronogramas
        this.cronogramas$ = this._cronogramasService.cronogramas$;
        this._cronogramasService.cronogramas$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((cronogramas: Cronograma[]) => {

                // Update the counts
                this.cronogramasCount = cronogramas.length;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the cronograma
        this._cronogramasService.cronograma$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((cronograma: Cronograma) => {

                // Update the selected cronograma
                this.selectedCronograma = cronograma;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the roles
        this._cronogramasService.roles$
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
                    this._cronogramasService.searchCronogramas(query)
                )
            )
            .subscribe();

        // Subscribe to MatDrawer opened change
        this.matDrawer.openedChange.subscribe((opened) => {
            if ( !opened )
            {
                // Remove the selected cronograma when drawer closed
                this.selectedCronograma = null;

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
                this.createCronograma();
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
     * Create cronograma
     */
    createCronograma(): void
    {
        // Go to the new contact
        this._router.navigate(['./', 0], {relativeTo: this._activatedRoute});

        // // Create the cronograma
        // this._cronogramasService.createCronograma().subscribe((newCronograma) => {

        //     // Go to the new cronograma
        //     this._router.navigate(['./', newCronograma.idUsuario], {relativeTo: this._activatedRoute});

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
