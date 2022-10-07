import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private socket: Socket) { 
      this.socket.connect();
  }

  listen(evenName : string){
    return new Observable((observer)=>{
      console.log(evenName);
      this.socket.fromEvent(evenName).subscribe(message =>{
        observer.next(message);
        console.log(message);
      })
    });
   } 
}