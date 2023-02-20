import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ServicesService } from './services.service';

@Component({
  selector: 'app-carpeta',
  templateUrl: './carpeta.component.html',
  styleUrls: ['./carpeta.component.scss']
})
export class CarpetaComponent implements OnInit {
  diplomas$: Observable<any>;
  datosDiploma:any;
  i:string;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  
  constructor( private _services:ServicesService, private activatedRoute:ActivatedRoute, private _router: Router, private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.diplomas$ = this._services.diplomas$;

    this._services.diplomas$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((response) => {
            // Update the counts
            this.datosDiploma = response;
            console.log('aqui',this.datosDiploma);
            // Mark for check
            this._changeDetectorRef.markForCheck();
        });

  }
  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
  }

  home():void{
    this._router.navigate(['sign-in']);
  }


}
