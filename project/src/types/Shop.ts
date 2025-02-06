export interface Shop {
  id: string;
  basicInfo: {
    name: string;
    tagline?: string;
    description: string;
    establishedYear?: number;
    ownerName: string;
    businessType: 'retail' | 'wholesale' | 'both';
  };
  
  legalInfo: {
    gstin?: string;
    panNumber?: string;
    fssaiLicense?: string;
    shopLicenseNumber?: string;
  };
  
  location: {
    address: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    landmark?: string;
  };
  
  contact: {
    phone: string[];
    whatsapp?: string;
    email?: string;
    website?: string;
    socialMedia?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
    };
  };
  
  businessHours: {
    [key: string]: {
      isOpen: boolean;
      timings?: {
        open: string;
        close: string;
      }[];
    };
  };
  
  categories: string[];
  subCategories: string[];
  
  payment: {
    acceptsCash: boolean;
    acceptsCard: boolean;
    acceptsUPI: boolean;
    upiIds?: string[];
  };
  
  services: {
    homeDelivery: boolean;
    deliveryRadius?: number;
    minimumOrder?: number;
    returnsAccepted: boolean;
    returnPeriod?: number;
  };
  
  media: {
    logo?: string;
    storeFront: string[];
    gallery?: string[];
  };
  
  verification: {
    isVerified: boolean;
    verifiedAt?: Date;
    documents?: {
      type: string;
      url: string;
      verifiedAt?: Date;
    }[];
  };
  
  metrics: {
    rating: number;
    reviewCount: number;
    orderCount: number;
    followersCount: number;
  };
} 