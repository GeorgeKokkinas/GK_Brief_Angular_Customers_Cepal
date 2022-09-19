import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
//import { CustomerService } from '../services/cusservice.service';

@Component({
  selector: 'app-fetch-customers',
  styleUrls: ['/fetch-customers.component.css'],
  templateUrl: './fetch-customers.component.html'
})
export class FetchCustomersComponent implements AfterViewInit, OnInit { 
  displayedColumns: string[] = ['name', 'surname', 'phonenum', 'address', 'email', 'id'];
  public dataSource!: MatTableDataSource<Customer>;
  public refreshpage = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator; /*, { static: false }*/
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    http.get<Customer[]>(baseUrl + 'api/customer/index').subscribe(result => {
      var customers;
      customers = result;
      this.dataSource = new MatTableDataSource(customers);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, error => console.error(error));
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    
  }

  ngOnInit() {
    this.refreshpage = window.history.state.reloadparent;
    if (this.refreshpage == '1') {
      this.refreshpage = '';
      window.location.reload();
    }
  }

  //constructor(public http: Http, private _customerService: CustomerService) {
  //  this.getCustomers();
  //}

  //getCustomers() {
  //  this._customerService.getCustomers().subscribe(data =>this.Customers = data)
  //  }

  delete(customerID: number) {
    var ans = confirm("Επιβεβαίωση διαγραφής;");
    if (ans) {
      //this._customerService.deleteCustomer(customerID).subscribe((data) => {
      //  this.getCustomers();
      //}, error => console.error(error))
      this.http.get<Customer[]>(this.baseUrl + 'api/customer/Delete/' + customerID).subscribe();

      this.http.get<Customer[]>(this.baseUrl + 'api/customer/index').subscribe(result => {
        var Customers;
        Customers = result;
        this.dataSource = new MatTableDataSource(Customers);
        //this.dataSource.paginator = this.paginator;

      }, error => console.error(error))
      window.location.reload();
    }
  }
}

export interface Customer {
  id: number;
  name: string;
  surName: string;
  phonenum: string;
  address: string;
  email: string;
}
