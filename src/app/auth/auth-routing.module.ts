import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./auth.component";
import {AuthguardGuard} from "./authguard.guard";

const routes: Routes = [
  {path: '', component:AuthComponent, canActivate: [AuthguardGuard]},
]
@NgModule({

  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]

})

export class authRoutingModule{}
