import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'cronogramas',
    templateUrl    : './cronogramas.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CronogramasComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
