import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderBy } from './orderBy.pipe';
import { ReversePipe } from './reverse.pipe';
import { SafePipe } from './safe.pipe';
import { TimePipe } from './time.pipe';
import 'moment'

const DECLARATIONS = [
  SafePipe,
  OrderBy,
  ReversePipe,
  TimePipe
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: DECLARATIONS,
  exports: DECLARATIONS
})
export class PipesModule {
}
