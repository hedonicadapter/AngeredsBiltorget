type Car = {
  title: string;
  description?: string;
  make: string;
  model: string;
  year: number;
  mileage?: number; // Mätarställning
  registrationNumber?: string; // Registreringsnummer
  gearbox: string; // Växellåda
  fuelType: string; // Drivmedel
  vehicleType?: string; // Fordonstyp
  color?: string;
  extraFeatures?: string[];
};
