import { PopoverComponent } from './popover/popover.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HttpClientModule } from '@angular/common/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { url } from '../assets/dataUrl/url';

// const config: SocketIoConfig = { url: 'http://192.168.15.245:3000', options: {} };
const config: SocketIoConfig = { url: url, options: {} };

@NgModule({
  declarations: [AppComponent, PopoverComponent],
  entryComponents: [],
  imports: [BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    SocketIoModule.forRoot(config),
    AppRoutingModule],
  providers: [
    StatusBar,
    BarcodeScanner,
    SplashScreen,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
