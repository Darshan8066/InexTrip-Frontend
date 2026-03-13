
// import { TripType, TransportMode, Trip, DayPlan } from './types';

// Strict mapping for regional accuracy
const getPhotosForDestination = (dest) => {
  const mapping = {
    'Somnath': [
      'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1594993877167-a0b9b6707d88?auto=format&fit=crop&q=80&w=800'
    ],
    'Dwarka': [
      'https://images.unsplash.com/photo-1621259182978-fbf9ad132d84?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1624635105221-f2f719f96b95?auto=format&fit=crop&q=80&w=800'
    ],
    'Kashmir': [
      'https://images.unsplash.com/photo-1598305077399-6847585ebf07?auto=format&fit=crop&q=80&w=800', // Dal Lake
      'https://images.unsplash.com/photo-1566833917748-038c11467406?auto=format&fit=crop&q=80&w=800', // Gulmarg
      'https://images.unsplash.com/photo-1616423642377-5264b73b5df5?auto=format&fit=crop&q=80&w=800', // Shikara
      'https://images.unsplash.com/photo-1566833917748-038c11467406?auto=format&fit=crop&q=80&w=800'
    ],
    'Rajasthan': [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=800', // Amer Fort
      'https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?auto=format&fit=crop&q=80&w=800', // Desert
      'https://images.unsplash.com/photo-1605649440419-44fbc62983b5?auto=format&fit=crop&q=80&w=800', // Hawa Mahal
      'https://images.unsplash.com/photo-1591146973302-3c3e76949033?auto=format&fit=crop&q=80&w=800'
    ],
    'Ladakh': [
      'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&q=80&w=800'
    ]
  };
  
  const defaultImages = Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/${dest}${i}/800/600`);
  return mapping[dest] ? [...mapping[dest], ...defaultImages] : defaultImages;
};

const createDayPlan = (dest ,days) => {
  const photos = getPhotosForDestination(dest);
  return Array.from({ length: days }).map((_, i) => ({
    day: i + 1,
    activities: [`Sunrise Exploration in ${dest}`, `Local Heritage Walk`, `Evening Cultural Experience`],
    image: photos[i % photos.length],
    meals: { breakfast: 'Resort Buffet', lunch: 'Regional Thali', dinner: 'Rooftop Theme Dinner' }
  }));
};

const RAW_DESTINATIONS = [
  // HERITAGE (8)
  { to: 'Somnath', from: 'Ahmedabad', price: 7500, days: 3, cat: 'Heritage' },
  { to: 'Dwarka', from: 'Rajkot', price: 8200, days: 4, cat: 'Heritage' },
  { to: 'Varanasi', from: 'Delhi', price: 9500, days: 3, cat: 'Heritage' },
  { to: 'Jaipur', from: 'Delhi', price: 6800, days: 3, cat: 'Heritage' },
  { to: 'Hampi', from: 'Bangalore', price: 8900, days: 4, cat: 'Heritage' },
  { to: 'Mysore', from: 'Bangalore', price: 3800, days: 2, cat: 'Heritage' },
  { to: 'Agra', from: 'Delhi', price: 4500, days: 2, cat: 'Heritage' },
  { to: 'Rajasthan', from: 'Mumbai', price: 12500, days: 5, cat: 'Heritage' },

  // MOUNTAINS (8)
  { to: 'Ladakh', from: 'Manali', price: 28000, days: 7, cat: 'Mountains' },
  { to: 'Munnar', from: 'Kochi', price: 14500, days: 5, cat: 'Mountains' },
  { to: 'Shimla', from: 'Delhi', price: 7800, days: 4, cat: 'Mountains' },
  { to: 'Darjeeling', from: 'Siliguri', price: 12000, days: 5, cat: 'Mountains' },
  { to: 'Coorg', from: 'Bangalore', price: 11500, days: 4, cat: 'Mountains' },
  { to: 'Ooty', from: 'Coimbatore', price: 9800, days: 4, cat: 'Mountains' },
  { to: 'Kashmir', from: 'Srinagar', price: 19500, days: 6, cat: 'Mountains' },
  { to: 'Manali', from: 'Chandigarh', price: 8500, days: 4, cat: 'Mountains' },

  // BEACHES (8)
  { to: 'Pondicherry', from: 'Chennai', price: 5800, days: 3, cat: 'Beaches' },
  { to: 'Alleppey', from: 'Kochi', price: 15500, days: 4, cat: 'Beaches' },
  { to: 'Gokarna', from: 'Goa', price: 7200, days: 3, cat: 'Beaches' },
  { to: 'Goa', from: 'Mumbai', price: 11000, days: 4, cat: 'Beaches' },
  { to: 'Varkala', from: 'Trivandrum', price: 8500, days: 3, cat: 'Beaches' },
  { to: 'Daman', from: 'Surat', price: 4500, days: 2, cat: 'Beaches' },
  { to: 'Puri', from: 'Bhubaneswar', price: 6500, days: 3, cat: 'Beaches' },
  { to: 'Lakshadweep', from: 'Kochi', price: 32000, days: 5, cat: 'Beaches' },

  // CITIES (8)
  { to: 'Udaipur', from: 'Ahmedabad', price: 11000, days: 4, cat: 'Cities' },
  { to: 'Mumbai', from: 'Pune', price: 5500, days: 2, cat: 'Cities' },
  { to: 'Bangalore', from: 'Chennai', price: 4800, days: 2, cat: 'Cities' },
  { to: 'Hyderabad', from: 'Vijayawada', price: 6200, days: 3, cat: 'Cities' },
  { to: 'Kolkata', from: 'Guwahati', price: 9500, days: 3, cat: 'Cities' },
  { to: 'Delhi', from: 'Amritsar', price: 3500, days: 2, cat: 'Cities' },
  { to: 'Chandigarh', from: 'Ludhiana', price: 2500, days: 1, cat: 'Cities' },
  { to: 'Ahmedabad', from: 'Rajkot', price: 3200, days: 2, cat: 'Cities' }
];

export const RECOMMENDED_TRIPS = RAW_DESTINATIONS.map((dest, i) => {
  const start = new Date('2026-06-15');
  const end = new Date(start);
  end.setDate(start.getDate() + dest.days - 1);

  return {
    id: `trip-v5-${i + 1}`,
    createdBy: 'admin',
    // tripType:JOIN,
    from: dest.from,
    to: dest.to,
    startDate: start.toISOString().split('T')[0],
    endDate: end.toISOString().split('T')[0],
    pickupPoint: `${dest.from} Junction`,
    dropPoint: `${dest.to} Terminal`,
    budget: dest.price + 5000,
    price: dest.price,
    // transportMode: TransportMode.BUS,
    dayPlan: createDayPlan(dest.to, dest.days),
    hotels: [`${dest.to} Palace Resort`],
    foodPlaces: [`The ${dest.to} Kitchen`],
    description: `[Category: ${dest.cat}] Exclusive curated experience in ${dest.to}. Perfect for regional explorers.`,
    images: getPhotosForDestination(dest.to),
    createdAt: Date.now()
  };
});
