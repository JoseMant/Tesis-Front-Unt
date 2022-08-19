import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { FuseAlertService, FuseAlertType } from '@fuse/components/alert';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertaComponent } from 'app/shared/alerta/alerta.component';

@Component({
    selector       : 'madurity_model-dialog',
    templateUrl    : './dialogReq.component.html',
    styles         : [

          /* language=SCSS */
          `
              .nombre {
                  position: relative;
                  top: 0;
                  margin-top: 0;
                  -webkit-backface-visibility: hidden;
                  backface-visibility: hidden;
                  transition: none;
                  font-weight: 500;
                  --tw-text-opacity: 1 !important;
                  color: rgba(var(--fuse-text-default-rgb), var(--tw-text-opacity)) !important;
              }
          `

    ],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequisitosDialogComponent implements OnInit, OnDestroy
{
    requisitosForm: FormGroup;
    methodologieDetailForm: FormGroup;
    methodologieDetailEditForm: FormGroup;
    enableEdit = false;
    enableEditIndex = null;
    metodologias: any;

    alert: { type: FuseAlertType; message: string; title: string} = {
        type   : 'success',
        message: '',
        title: '',
    };

    // Private
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<RequisitosDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private snackBar: MatSnackBar
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
        // Prepare the card form
        this.requisitosForm = this._formBuilder.group({
            requisitos   : [[]]
        });

        // Fill the form
        this.requisitosForm.setValue({
            requisitos : this.data.requisitos
        });
        console.log(this.data.requisitos);

        // Get the metodologias
        // this._methodologiesService.methodologies$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((metodologias: MethodologieInterface[]) => {
        //         console.log(metodologias);
        //         // Update the counts
        //         this.metodologias = metodologias;
        //         console.log(this.metodologias);
        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

        //     this.data.methodologies.forEach((element) =>{
        //         const key = this.metodologias.indexOf(element2 => element2.idMethodologie = element.idMethodologie);
        //         console.log(key);
        //         this.metodologias.splice(key, 0);
        //         console.log(this.metodologias.splice(key, 0));
        //     });
        //     this.metodologias.forEach((element,key) =>{
        //         element['selected'] = false;
        //         this.data.methodologies.forEach((element2)=>{
        //             if (element.idMethodologie === element2.idMethodologie) {
        //                 element['selected'] = true;
        //             }
        //         });
        //     });
        //     console.log(this.metodologias);
        //     console.log(this.data.methodologies);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        //this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    selectionChange(option): void {
        console.log(option.value);
        //const metodo = this.data.methodologies;
        //if (this.selectFile) {
        //     if (option.selected) {
        //         const newMetodo = {
        //             idMethodologie: option.value.idMethodologie,
        //         };
        //         metodo.push(newMetodo);
        //         this.data.methodologies = metodo;
        //         console.log(this.data.methodologies);
        //         console.log(this.methodologieForm.getRawValue().methodologies);
        //     } else {
        //         //const key = metodo.find(item => item.idMethodologie !== option.value.idMethodologie);
        //         const eliminate = [];
        //         for (const met of metodo) {
        //             if (met.idMethodologie !== option.value.idMethodologie) {
        //                 eliminate.push(met);
        //             }
        //         }
        //         this.data.methodologies = eliminate;
        //         console.log(this.data.methodologies);
        //         this.methodologieForm.patchValue({methodologies: eliminate});
        //         console.log(this.methodologieForm.getRawValue().methodologies);
        //     // Mark for check
        //     this._changeDetectorRef.markForCheck();
        // }
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
