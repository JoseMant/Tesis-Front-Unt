import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'constancias-firma-uraa',
    templateUrl    : './firma_uraa.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConstanciasFirmaURAAComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
