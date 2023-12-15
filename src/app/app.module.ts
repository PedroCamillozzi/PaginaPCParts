import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { ProductosComponentComponent } from './components/productos-component/productos-component.component';
import { ProductoComponentComponent } from './components/producto-component/producto-component.component';
import { CarritoComponentComponent } from './components/carrito-component/carrito-component.component';
import { RegistroComponentComponent } from './components/registro-component/registro-component.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared/shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { NavbarComponentComponent } from './components/navbar-component/navbar-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './Interceptor/auth.interceptor';
import { MisDatosPersonalesComponentComponent } from './components/mis-datos-personales-component/mis-datos-personales-component.component';
import { MisPedidosComponentComponent } from './components/mis-pedidos-component/mis-pedidos-component.component';
import { GraciasPorSucompraComponent } from './components/gracias-por-sucompra/gracias-por-sucompra.component';
import { authGuard } from './Guards/authentication.guard';


const routes:Routes=[
  {path:'', component:HomeComponentComponent},
  {path:'home', component:HomeComponentComponent},
  {path: 'misdatos/:idCliente', component:MisDatosPersonalesComponentComponent, canActivate: [authGuard]},
  {path:'productos', component:ProductosComponentComponent},
  //{path:'productos/:idCliente', component:ProductosComponentComponent},
  {path: 'producto/:id', component:ProductoComponentComponent},
  {path: 'carrito/:idCliente', component:CarritoComponentComponent, canActivate: [authGuard]},
  //{path: 'carrito/:idCliente', component:CarritoComponentComponent},
  {path: 'carrito/:idCliente/:idProducto', component:CarritoComponentComponent, canActivate: [authGuard]},
  {path: 'finalizarPedido', component:GraciasPorSucompraComponent, canActivate: [authGuard]},
  {path: 'misPedidos/:idCliente', component:MisPedidosComponentComponent, canActivate: [authGuard]},
 
  //{path: 'carrito/:idCliente/:idProducto', component:CarritoComponentComponent},
  {path:'**', component: HomeComponentComponent},
 

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
    NavbarComponentComponent,
    MisDatosPersonalesComponentComponent,
    MisPedidosComponentComponent,
    GraciasPorSucompraComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [{provide: HTTP_INTERCEPTORS,
              useClass: AuthInterceptor,
              multi:true
              },
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
