
export interface SearchFilters {
  searchTerm: string;
  distance: number[];
  priceRange: number[];
  categories: string[];
  amenities: string[];
  ratings: number[];
  openNow: boolean;
  hasParking: boolean;
  acceptsCards: boolean;
  sortBy: 'relevance' | 'rating' | 'distance' | 'price';
}

export const defaultFilters: SearchFilters = {
  searchTerm: '',
  distance: [50],
  priceRange: [0, 500],
  categories: [],
  amenities: [],
  ratings: [0],
  openNow: false,
  hasParking: false,
  acceptsCards: false,
  sortBy: 'relevance'
};
