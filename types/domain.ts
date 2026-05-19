export type ServiceStatus = "draft" | "published" | "archived";

export type Service = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  highlights: string[];
  status: ServiceStatus;
  startingPrice?: number;
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
