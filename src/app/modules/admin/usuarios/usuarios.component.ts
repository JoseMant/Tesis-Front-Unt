import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'usuarios',
    templateUrl    : './usuarios.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsuariosComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
