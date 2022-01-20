import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "../not-found/not-found.component";


const AppRoutes: Routes =[
  {path: '', redirectTo: '/recipes', pathMatch:'full'},
  {path:'recipes', loadChildren: () => import('../recipe/recipes/recipes.module').then(m => m.RecipesModule)},
  {path:'shop', loadChildren: () => import('../shopping/shopping.module').then(m => m.shoppingModule)},
  {path:'auth', loadChildren: () => import('../auth/auth.module').then(m => m.authModule)},
  {path: 'not-found', component: NotFoundComponent},
  {path: "**", redirectTo:'/not-found'}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(AppRoutes,{preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
