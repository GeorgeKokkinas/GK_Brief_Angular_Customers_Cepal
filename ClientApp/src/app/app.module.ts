import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { CreateCustomerComponent } from './addcustomer/addcustomer.component';
import { FetchCustomersComponent } from './fetch-customers/fetch-customers.component'

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FetchDataComponent,
    CreateCustomerComponent,
    FetchCustomersComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    MatSortModule,
    MatPaginatorModule,
    MatTableModule,

    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      //{ path: 'fetch-data', component: FetchDataComponent },
      { path: 'fetch-data', component: FetchCustomersComponent},
      { path: 'register-customer', component: CreateCustomerComponent },
      { path: 'customer/edit/:id', component: CreateCustomerComponent },

      { path: 'fetch', component: FetchCustomersComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
