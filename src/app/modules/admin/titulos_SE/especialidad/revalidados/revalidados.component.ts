import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'titulos_SE-revalidados',
    templateUrl    : './revalidados.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitulosEspecialidadRevalidadosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
