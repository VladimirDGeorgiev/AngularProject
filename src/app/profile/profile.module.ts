import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProfileRoutingModule } from './profile-routing.module';



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    SharedModule,
    RouterModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
