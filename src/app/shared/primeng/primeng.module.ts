import { NgModule } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@NgModule({
    imports: [
        SidebarModule, ButtonModule,
        CalendarModule, TableModule,
        PaginatorModule, DropdownModule,
        ToastModule, ProgressSpinnerModule
    ],
    exports: [
        SidebarModule, ButtonModule,
        CalendarModule, TableModule,
        PaginatorModule, DropdownModule,
        ToastModule, ProgressSpinnerModule
    ]
})
export class PrimengModule { }
