import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {authRoutingModule} from "./auth-routing.module";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    AuthComponent
  ],

  imports: [
    SharedModule,
    RouterModule,
    FormsModule,
    authRoutingModule,
  ],
})

export class authModule{}
