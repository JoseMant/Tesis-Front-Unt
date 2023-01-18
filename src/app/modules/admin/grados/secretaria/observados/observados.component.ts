import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'grados-observados',
    templateUrl    : './observados.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GradosSecretariaObservadosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
