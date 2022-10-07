import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { url } from '../../../assets/dataUrl/url';

@Component({
  selector: 'app-order-transaction',
  templateUrl: './order-transaction.page.html',
  styleUrls: ['./order-transaction.page.scss'],
})
export class OrderTransactionPage implements OnInit {

  sub;
  page;
  data;
  fullname;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.page = +params['page'] || 0;
      });

    console.log(this.sub)
    console.log(this.page)

    this.storage.get('fullname').then((val) => {
      this.fullname = val;
    })

    let stack_data ={
      icode: this.page
    };

    // this.http.get<any>(url + 'api/drug_transaction',stack_data).subscribe((message) => {
    //   console.log(message);
    //   this.data = message;
    // })

    this.http.post<any>(url+'api/drug_transaction',stack_data).subscribe(res => {
      console.log(res);
      this.data = res
    })
  }

}
