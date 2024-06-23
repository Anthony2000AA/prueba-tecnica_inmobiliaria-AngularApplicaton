import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreditReportComponent } from './pages/mortgage-credit-management/components/credit-report/credit-report.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { PrimengModule } from './shared/primeng/primeng.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InstallmentsDetailComponent } from './pages/mortgage-credit-management/components/installments-detail/installments-detail.component';  // Importa FormsModule
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    CreditReportComponent,
    LoaderComponent,
    SidebarComponent,
    InstallmentsDetailComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimengModule,
    HttpClientModule,
    FormsModule,  // Añade FormsModule aquí
    ReactiveFormsModule, 
    CommonModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
