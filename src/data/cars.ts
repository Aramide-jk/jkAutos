export interface Car {
  id: string;
  name: string;
  brand: string;
  price: number;
  year: number;
  mileage: string;
  fuelType: string;
  transmission: string;
  image: string;
  description: string;
  engine: string;
  condition: string;
  features: string[];
  gallery: string[];
}

export const cars: Car[] = [
  {
    id: '1',
    name: 'BMW M4 Competition',
    brand: 'BMW',
    price: 89500,
    year: 2023,
    mileage: '8,500 miles',
    fuelType: 'Premium Gasoline',
    transmission: 'Automatic',
    engine: '3.0L Twin-Turbo I6',
    condition: 'Excellent',
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'A masterpiece of engineering and luxury, featuring carbon fiber accents and race-inspired performance.',
    features: ['Carbon Fiber Roof', 'M Performance Package', 'Harman Kardon Audio', 'Adaptive Suspension'],
    gallery: [
      'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    id: '2',
    name: 'Mercedes-Benz S-Class',
    brand: 'Mercedes-Benz',
    price: 125000,
    year: 2024,
    mileage: '2,100 miles',
    fuelType: 'Premium Gasoline',
    transmission: 'Automatic',
    engine: '4.0L Twin-Turbo V8',
    condition: 'Pristine',
    image: 'https://images.pexels.com/photos/1719646/pexels-photo-1719646.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'The pinnacle of luxury sedans with unmatched comfort and cutting-edge technology.',
    features: ['Massage Seats', 'Panoramic Sunroof', 'Burmester Audio', 'Air Suspension'],
    gallery: [
      'https://images.pexels.com/photos/1719646/pexels-photo-1719646.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    id: '3',
    name: 'Audi R8 V10 Plus',
    brand: 'Audi',
    price: 145000,
    year: 2023,
    mileage: '5,800 miles',
    fuelType: 'Premium Gasoline',
    transmission: 'Automatic',
    engine: '5.2L V10',
    condition: 'Excellent',
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Pure performance incarnate with naturally aspirated V10 power and stunning design.',
    features: ['Carbon Fiber Trim', 'Magnetic Ride', 'Virtual Cockpit', 'Dynamic Steering'],
    gallery: [
      'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    id: '4',
    name: 'Porsche 911 Turbo S',
    brand: 'Porsche',
    price: 165000,
    year: 2024,
    mileage: '1,200 miles',
    fuelType: 'Premium Gasoline',
    transmission: 'Automatic',
    engine: '3.8L Twin-Turbo Flat-6',
    condition: 'Pristine',
    image: 'https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'The ultimate sports car combining legendary 911 DNA with turbocharged performance.',
    features: ['Sport Chrono Package', 'PASM Suspension', 'Bose Audio', 'Sport Exhaust'],
    gallery: [
      'https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/241316/pexels-photo-241316.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/733745/pexels-photo-733745.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    id: '5',
    name: 'Lamborghini Huracán',
    brand: 'Lamborghini',
    price: 195000,
    year: 2023,
    mileage: '3,400 miles',
    fuelType: 'Premium Gasoline',
    transmission: 'Automatic',
    engine: '5.2L V10',
    condition: 'Excellent',
    image: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Italian excellence with breathtaking performance and unmistakable Lamborghini design.',
    features: ['Carbon Fiber Package', 'Lifting System', 'Premium Audio', 'Dynamic Steering'],
    gallery: [
      'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/371274/pexels-photo-371274.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    id: '6',
    name: 'Tesla Model S Plaid',
    brand: 'Tesla',
    price: 95000,
    year: 2024,
    mileage: '6,800 miles',
    fuelType: 'Electric',
    transmission: 'Single Speed',
    engine: 'Tri-Motor Electric',
    condition: 'Excellent',
    image: 'https://images.pexels.com/photos/35967/mini-cooper-auto-model-vehicle.jpg?auto=compress&cs=tinysrgb&w=800',
    description: 'Revolutionary electric performance with cutting-edge autonomous capabilities.',
    features: ['Autopilot', 'Premium Connectivity', 'Glass Roof', 'Over-the-Air Updates'],
    gallery: [
      'https://images.pexels.com/photos/35967/mini-cooper-auto-model-vehicle.jpg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/193999/pexels-photo-193999.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  }
];