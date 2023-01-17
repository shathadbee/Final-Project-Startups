import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AppInitalizService {
  constructor(private _authService: AuthService,
    private fireAuth:AngularFireAuth) {}

  appInitializer(): Promise<any> {
    return new Promise<boolean>((resolve) => {
      this._authService.getUserById('') ;
      resolve(true);
    });
  }
}

export function appInitializer(config: AppInitalizService) {
  return () => config.appInitializer();
}
