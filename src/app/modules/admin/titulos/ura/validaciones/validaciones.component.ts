import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'titulos-uraa-validaciones',
    templateUrl    : './validaciones.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitulosURAValidacionesComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
