import { Medicine, Doctor, Pharmacy, Clinic } from './types';

export const MEDICINES: Medicine[] = [
  {
    id: '1',
    name: 'Paracétamol 500mg',
    price: 4.5,
    category: 'Anti-douleur',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80',
    stock: 50,
    description: 'Efficace contre la fièvre et les douleurs légères à modérées.',
  },
  {
    id: '2',
    name: 'Amoxicilline',
    price: 6.2,
    category: 'Antibiotique',
    image: 'https://images.unsplash.com/photo-1550572017-ed200f545dec?w=400&q=80',
    stock: 20,
    description: 'Traitement antibactérien pour diverses infections.',
  },
  {
    id: '3',
    name: 'Sirop contre la toux',
    price: 7.8,
    category: 'Respiratoire',
    image: 'https://images.unsplash.com/photo-1576073719710-aa94939a04be?w=400&q=80',
    stock: 15,
    description: 'Soulage la toux sèche et grasse.',
  },
  {
    id: '4',
    name: 'Vitamine C 1000mg',
    price: 12.0,
    category: 'Complément',
    image: 'https://images.unsplash.com/photo-1616671285453-6a978f679782?w=400&q=80',
    stock: 100,
    description: 'Renforce le système immunitaire.',
  },
];

export const DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Martin',
    speciality: 'Généraliste',
    experience: 12,
    rating: 4.9,
    reviews: 124,
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
    availability: ['09:00', '10:30', '14:00', '16:00'],
  },
  {
    id: '2',
    name: 'Dr. Marc Durand',
    speciality: 'Pédiatre',
    experience: 8,
    rating: 4.8,
    reviews: 89,
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
    availability: ['08:30', '11:00', '15:30'],
  },
  {
    id: '3',
    name: 'Dr. Julie Chen',
    speciality: 'Dermatologue',
    experience: 15,
    rating: 4.9,
    reviews: 210,
    photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
    availability: ['10:00', '11:30', '13:00'],
  },
];

export const PHARMACIES: Pharmacy[] = [
  {
    id: '1',
    name: 'Pharmacie du Centre',
    distance: '1.2 km',
    rating: 4.7,
    photo: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?w=400&q=80',
  },
  {
    id: '2',
    name: 'Pharmacie Verte',
    distance: '2.5 km',
    rating: 4.5,
    photo: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=400&q=80',
  },
];

export const CLINICS: Clinic[] = [
  {
    id: '1',
    name: 'Hôpital International',
    services: ['Urgence', 'Radiologie', 'Maternité'],
    distance: '3.4 km',
    rating: 4.8,
    photo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=80',
  },
  {
    id: '2',
    name: 'Clinique de la Paix',
    services: ['Cardiologie', 'Ophtalmologie'],
    distance: '5.1 km',
    rating: 4.6,
    photo: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&q=80',
  },
];
