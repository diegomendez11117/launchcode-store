import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactComponent } from '../info/components/contact/contact.component';

import { InfoRoutingModule } from './info-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { AboutUsComponent } from './components/aboutus/aboutus.component';

@NgModule({
  declarations: [
    ContactComponent,
    AboutUsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    InfoRoutingModule
  ]
})
export class ContactModule {

}
