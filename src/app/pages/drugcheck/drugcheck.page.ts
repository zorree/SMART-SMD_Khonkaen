import { Component, OnInit } from '@angular/core';

import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { url } from '../../../assets/dataUrl/url';




@Component({
  selector: 'app-drugcheck',
  templateUrl: './drugcheck.page.html',
  styleUrls: ['./drugcheck.page.scss'],
})
export class DrugcheckPage implements OnInit {

  fullname;
  startdate;
  checkmin;
  data;

  constructor(

    private storage: Storage,
    private http: HttpClient,

  ) { }

  ngOnInit() {
    this.storage.get('fullname').then((val) => {
      this.fullname = val;
    })

    this.http.get(url + 'api/stock_total').subscribe((message) => {
      console.log(message);
      this.data = message;
    })
  }

  usedate() {
    console.log(this.startdate)
  }



}
