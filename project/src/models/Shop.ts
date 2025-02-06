import mongoose, { Schema } from 'mongoose';
import { Shop } from '../types/Shop';

const shopSchema = new Schema<Shop>({
  basicInfo: {
    name: { type: String, required: true, index: true },
    tagline: String,
    description: { type: String, required: true },
    establishedYear: Number,
    ownerName: { type: String, required: true },
    businessType: { 
      type: String, 
      enum: ['retail', 'wholesale', 'both'],
      required: true 
    }
  },

  location: {
    address: { type: String, required: true },
    locality: { type: String, required: true },
    city: { type: String, required: true, index: true },
    state: { type: String, required: true, index: true },
    pincode: { type: String, required: true, index: true },
    coordinates: {
      type: {
        latitude: Number,
        longitude: Number
      },
      index: '2dsphere' // For geospatial queries
    }
  },

  categories: [{ type: String, index: true }],
  subCategories: [{ type: String }],

  payment: {
    acceptsCash: { type: Boolean, default: true },
    acceptsCard: { type: Boolean, default: false },
    acceptsUPI: { type: Boolean, default: false },
    upiIds: [String]
  },

  metrics: {
    rating: { type: Number, default: 0, index: true },
    reviewCount: { type: Number, default: 0 },
    orderCount: { type: Number, default: 0 },
    followersCount: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Indexes for common queries
shopSchema.index({ 'basicInfo.name': 'text', 'basicInfo.description': 'text' });
shopSchema.index({ 'location.coordinates': '2dsphere' });

// Methods
shopSchema.methods.isOpen = function() {
  const now = new Date();
  const day = now.toLocaleDateString('en-US', { weekday: 'long' });
  const time = now.toLocaleTimeString('en-US', { hour12: false });
  
  const todayHours = this.businessHours[day];
  return todayHours?.isOpen && todayHours.timings?.some(
    timing => time >= timing.open && time <= timing.close
  );
};

export const ShopModel = mongoose.model<Shop>('Shop', shopSchema); 