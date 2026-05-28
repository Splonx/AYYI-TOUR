export type Service = {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
};

export type Vehicle = {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  description: string;
  imageUrl?: string;
  seats: number;
  luggage: number;
  priceNote: string;
  category: string;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
  createdAt?: string;
};
