import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'home',loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',redirectTo: 'login',pathMatch: 'full'
  },
  {
    path: 'report-status',
    loadChildren: () => import('./pages/report-status/report-status.module').then( m => m.ReportStatusPageModule)
  },
  {
    path: 'stack',
    loadChildren: () => import('./pages/stack/stack.module').then( m => m.StackPageModule)
  },
  {
    path: 'setting-dash',
    loadChildren: () => import('./pages/setting-dash/setting-dash.module').then( m => m.SettingDashPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'move',
    loadChildren: () => import('./move/move.module').then( m => m.MovePageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'drugcheck',
    loadChildren: () => import('./pages/drugcheck/drugcheck.module').then( m => m.DrugcheckPageModule)
  },
  {
    path: 'order-transaction',
    loadChildren: () => import('./pages/order-transaction/order-transaction.module').then( m => m.OrderTransactionPageModule)
  }
];

@NgModule({
  imports: [
  
  RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
