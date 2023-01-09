import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'grados-finalizados',
    templateUrl    : './finalizados.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GradosFinalizadosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
