import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'grados-uraa-validaciones',
    templateUrl    : './validaciones.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GradosURAValidacionesComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
