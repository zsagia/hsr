/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { FirebaseAuthService } from './firebase-auth.service';

describe('Service: FirebaseAuth', () => {
  beforeEach(() => {
    addProviders([FirebaseAuthService]);
  });

  it('should ...',
    inject([FirebaseAuthService],
      (service: FirebaseAuthService) => {
        expect(service).toBeTruthy();
      }));
});
