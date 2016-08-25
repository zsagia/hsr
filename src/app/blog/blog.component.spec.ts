/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { BlogComponent } from './blog.component';

describe('Component: Blog', () => {
  it('should create an instance', () => {
    let component = new BlogComponent();
    expect(component).toBeTruthy();
  });
});
