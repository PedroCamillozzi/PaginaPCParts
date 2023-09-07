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
import { NavbarComponentComponent } from './components/navbar-component/navbar-component.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './Interceptor/auth.interceptor';

const routes:Routes=[
  {path:'', component:HomeComponentComponent},
  {path:'home', component:HomeComponentComponent},
  {path:'home/:idCliente', component:HomeComponentComponent},
  {path:'productos', component:ProductosComponentComponent},
  //{path:'productos/:idCliente', component:ProductosComponentComponent},
  {path: 'producto/:id', component:ProductoComponentComponent},
  {path: 'carrito/:idCliente', component:CarritoComponentComponent},
  //{path: 'carrito/:idCliente', component:CarritoComponentComponent},
  {path: 'carrito/:idCliente/:idProducto', component:CarritoComponentComponent},
  //{path: 'carrito/:idCliente/:idProducto', component:CarritoComponentComponent},
  //{path:'**', component: HomeComponentComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    ProductosComponentComponent,
    ProductoComponentComponent,
    CarritoComponentComponent,
    RegistroComponentComponent,
    LoginComponentComponent,
    NavbarComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [AuthInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
