import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    nameid: string;
    isAdmin: "True" | "False";
    exp?: number;
}

@Injectable({ providedIn: 'root' })
export class TokenService {
    getRoleFromToken(token: string | null): string | null {
        if (!token) return null;
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            const role = decoded.isAdmin === "True" ? "Admin" : "User";
            return role || null;
        } catch (error) {
            console.error('Invalid token');
            return null;
        }
    }
}
