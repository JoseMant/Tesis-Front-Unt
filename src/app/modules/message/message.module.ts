import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { MessageComponent } from 'app/modules/message/message.component';
import { MessageRoutes } from 'app/modules/message/message.routing';

@NgModule({
    declarations: [
        MessageComponent
    ],
    imports     : [
        RouterModule.forChild(MessageRoutes),
        MatButtonModule,
        FuseCardModule,
        SharedModule
    ]
})
export class MessageModule
{
}
