import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { WINDOW_PROVIDERS } from './window.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InfiniteScrollModule,
  ],
  declarations: [MainComponent],
  providers:[WINDOW_PROVIDERS]
})
export class HomeModule { }

