import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { ProductosComponentComponent } from './components/productos-component/productos-component.component';
import { ProductoComponentComponent } from './components/producto-component/producto-component.component';
import { CarritoComponentComponent } from './components/carrito-component/carrito-component.component';
import { RegistroComponentComponent } from './components/registro-component/registro-component.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared/shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponentComponent } from './components/login-component/login-component.component';

const routes:Routes=[
  {path:'', component:HomeComponentComponent},
  {path:'productos', component:ProductosComponentComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    ProductosComponentComponent,
    ProductoComponentComponent,
    CarritoComponentComponent,
    RegistroComponentComponent,
    LoginComponentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
