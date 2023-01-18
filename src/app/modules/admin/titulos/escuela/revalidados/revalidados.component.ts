import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'titulos-revalidados',
    templateUrl    : './revalidados.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitulosEscuelaRevalidadosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
