import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// IMPORT OFFICIAL ANGULAR FIRE AND THE ENVIRONMENT TO LOAD FIREBASE.
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

// IMPORT FIRESTORE (DB) MODULE TO PERFORM A QUERY
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SuppliersComponent} from  './components/suppliers/suppliers.component';
import { NavbarComponent} from  './components/navbar/navbar.component';
import { AddSupplierComponent} from  './components/add-supplier/add-supplier.component';
import { SupplierService} from  './services/supplier.service'

@NgModule({
  declarations: [AppComponent, SuppliersComponent,NavbarComponent,AddSupplierComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    // Add the modules to import and initialize the AngularFireModule with the environment.firebase we added previously.
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SupplierService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
