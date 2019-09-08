import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { RegistroComponent } from './registro/registro.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        RegistroComponent,
        AccoutSettingsComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        RegistroComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class PagesModule {}
