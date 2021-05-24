import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AboutUsComponent } from './components/aboutus/aboutus.component';
import { ContactComponent } from './components/contact/contact.component';



const routes: Routes = [
  {
    path: '',
    component: ContactComponent
  },
  {
    path: 'aboutus',
    component: AboutUsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class InfoRoutingModule {}
