import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContainerComponent } from './Components/UI-Container/Container.component';

@NgModule({
  declarations: [ContainerComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [],

  exports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ContainerComponent,
  ],
})
export class ShareModule {}
