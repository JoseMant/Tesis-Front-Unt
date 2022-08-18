import { Component } from '@angular/core';
import { NgxRolesService } from 'ngx-permissions';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    user: User;
    // public editor = customBuild;
    // public config = {
    //     placeholder: 'Type the content here!',
    // };
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
      private _rolesService: NgxRolesService,
      private _userService: UserService
    )
    {
    }

    ngOnInit(): void {
      // Subscribe to the user service
      this._userService.user$
          .pipe((takeUntil(this._unsubscribeAll)))
          .subscribe((user: User) => {
              this.user = user;

              console.log(this.user);
              if (this.user.idTipoUsuario) {
                  this._rolesService.addRole(this.user.rol.toUpperCase(), []);
              } else {
                this._rolesService.addRole('GUEST', () => {
                  return true;
                });
              }
          });

    }
}
