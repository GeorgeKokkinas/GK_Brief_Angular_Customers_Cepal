import { Component, Inject, OnInit } from '@angular/core';
//import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchDataComponent } from '../fetch-data/fetch-data.component';
//import { CustomerService } from '../services/cusservice.service';

import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
})

export class CreateCustomerComponent implements OnInit
{
  customerForm: FormGroup;
  title: string;
  customerId: number;
  errorMessage: any;

  //constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
  //  private _customerService: CustomerService, private _router: Router) {
  //  if (this._avRoute.snapshot.params["id"]) {
  //    this.customerId = this._avRoute.snapshot.params["id"];
  //  }

  constructor(private _fb: FormBuilder, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private _avRoute: ActivatedRoute, private _router: Router) {
    if (this._avRoute.snapshot.params["id"]) {
      this.customerId = this._avRoute.snapshot.params["id"];
    }
    else {
      this.customerId = 0;
    }
  
    this.title = "Προσθήκη πελάτη";

    this.customerForm = this._fb.group({
      id: [0],
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z α-ωΑ-Ω]*')]],
      surname: ['', [Validators.required, Validators.pattern('[a-zA-Z α-ωΑ-Ω]*')]],
      phonenum: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]],
      address: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
    })
  }

  ngOnInit() {

    if (this.customerId > 0)
    {
      this.title = "Επεξερ. πελάτη";

      this.http.get(this.baseUrl + 'api/customer/details/'+this.customerId).subscribe(result => {
        var Customer;

        Customer = result;
        this.customerForm.setValue(Customer);
      }, error => console.error(error));

    //  this._customerService.getCustomerById(this.customerId)
    //    .subscribe(resp => this.customerForm.setValue(resp)
    //    .subscribe(resp => this.customerForm.setValue(resp)
    //      , error => this.errorMessage = error);
    }

  }
  save() {

    if (!this.customerForm.valid) {
      return;
    }

    if (this.title == "Προσθήκη πελάτη") {
      //this._customerService.saveCustomer(this.customerForm.value)
      //  .subscribe((data) => {
      //    this._router.navigate(['/fetch-data']);
      //  }, error => this.errorMessage = error)

      try {
        this.http.post<any>(this.baseUrl + 'api/customer/create', this.customerForm.value).subscribe(data => {
          var answer;
          answer = data;
          console.log(answer);
        });
        this._router.navigate(['/fetch-data'], { state: { reloadparent: '1' } });
      }
      catch(e)
      { throwError(e) }
      
      //this._http.post(this._baseURL + 'api/Customer/create', this.customerForm.value).subscribe(result =>
      //{
      //  var resp;
      //  resp = result;
      //  if (resp == 1)
      //    this._router.navigate(['/fetch-data'])
      //  else
      //    throwError("Σφάλμα στην αποθήκευση");;
      //}, error => console.error(error));
    }
    else {
      this.http.put(this.baseUrl + 'api/customer/Edit', this.customerForm.value).subscribe(result => {
        var resp;
        resp = result;
        if (resp == 1)
          this._router.navigate(['/fetch-data'])
        else
          throwError("Σφάλμα στην αποθήκευση");
      }, error => console.error(error));
    }
  }

  cancel() {
    this._router.navigate(['/fetch-data']);
  }

  get name() { return this.customerForm.get('name'); }
  get surname() { return this.customerForm.get('surname'); }
  get phonenum() { return this.customerForm.get('phonenum'); }
  get address() { return this.customerForm.get('address'); }
  get email() { return this.customerForm.get('email'); }
}

//interface Customer {
//  Id: number;
//  Name: string;
//  SurName: string;
//  Phonenum: string;
//  Address: string;
//  Email: string;
//}
