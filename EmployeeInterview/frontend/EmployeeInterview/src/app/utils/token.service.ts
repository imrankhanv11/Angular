import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp?: number;
  [key: string]: any; // allow any other claims like nameid etc.
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
}

@Injectable({ providedIn: 'root' })
export class TokenService {

  getRoleFromToken(token: string | null): string | null {
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      return role || null;
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }
}
