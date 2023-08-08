import { NgModule } from '@angular/core';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';


@NgModule({
    declarations:[],
    imports:[
        MatTreeModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatCardModule
    ],
    exports:[
        MatTreeModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatCardModule
    ],

})
export class SharedModule{};