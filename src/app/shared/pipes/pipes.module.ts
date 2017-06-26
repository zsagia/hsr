import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderBy } from './orderBy.pipe';
import { ReversePipe } from './reverse.pipe';
import { SafePipe } from './safe.pipe';

const DECLARATIONS = [
  SafePipe,
  OrderBy,
  ReversePipe
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
