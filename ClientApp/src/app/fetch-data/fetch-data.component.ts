import { OnInit, Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
//import { CustomerService } from '../services/cusservice.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {
  public Customers: Customer[] = [];
  public refreshpage = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private _router: Router) {
    http.get<Customer[]>(baseUrl + 'api/customer/index').subscribe(result => {
      this.Customers = result;
    }, error => console.error(error));

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
        this.Customers = result;
      }, error => console.error(error))
      window.location.reload();
    }
  }

  addcustomer() {
    this._router.navigate(['/register-customer']);
  }

  ngOnInit() {
    this.refreshpage = window.history.state.reloadparent;
    if (this.refreshpage == '1') {
      this.refreshpage = '';
      window.location.reload();
    }
  }
}

interface Customer {
  id: number;
  name: string;
  surname: string;
  phonenum: string;
  address: string;
  email: string;
}
