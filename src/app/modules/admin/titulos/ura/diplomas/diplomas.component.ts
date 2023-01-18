import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'titulos-URA-diplomas',
    templateUrl    : './diplomas.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitulosURADiplomasComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
