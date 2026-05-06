/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'Patient' | 'Doctor' | 'Pharmacy' | 'Clinic' | 'Delivery';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Doctor {
  id: string;
  name: string;
  speciality: string;
  experience: number;
  rating: number;
  reviews: number;
  photo: string;
  availability: string[];
}

export interface Pharmacy {
  id: string;
  name: string;
  distance: string;
  rating: number;
  photo: string;
}

export interface Medicine {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  description: string;
}

export interface Clinic {
  id: string;
  name: string;
  services: string[];
  distance: string;
  rating: number;
  photo: string;
}
