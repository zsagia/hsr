/* tslint:disable:no-unused-variable */

import { addProviders, inject } from '@angular/core/testing';
import { FirebaseDatabaseService } from './firebase-database.service';

describe('Service: FirebaseDatabase', () => {
  beforeEach(() => {
    addProviders([FirebaseDatabaseService]);
  });

  it('should ...',
    inject([FirebaseDatabaseService],
      (service: FirebaseDatabaseService) => {
        expect(service).toBeTruthy();
      }));
});
