// src/app/api/apiConfig.ts
import { HttpHeaders } from '@angular/common/http';

export const BASE_URL = 'https://localhost:7281/api';

// Function to get default headers
export function getDefaultHeaders(): HttpHeaders {
  return new HttpHeaders({
    'Content-Type': 'application/json',
  });
}
