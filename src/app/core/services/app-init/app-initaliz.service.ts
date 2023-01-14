import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AppInitalizService {
  constructor(private _authService: AuthService) {}

  appInitializer(): Promise<any> {
    return new Promise<boolean>((resolve) => {
      //this._authService.getUserById('') ;
      resolve(true);
    });
  }
}
export function appInitializer(config: AppInitalizService) {
  return () => config.appInitializer();
}
