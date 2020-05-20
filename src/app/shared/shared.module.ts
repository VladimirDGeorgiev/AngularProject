import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { LoadingSpinerComponent } from './loading-spiner/loading-spiner.component';
import { PlaceholderDirective } from './placeholder.directive';
import { DropdownDirective } from './dropdown.directive';
import { ConfirmationAlertComponent } from './confirmation-alert/confirmation-alert.component';

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinerComponent,
        PlaceholderDirective,
        DropdownDirective,
        ConfirmationAlertComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponent,
        ConfirmationAlertComponent,
        LoadingSpinerComponent,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule
    ],
    entryComponents: [AlertComponent]

})
export class SharedModule { }