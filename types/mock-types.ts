export interface User {
  _id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'student' | 'admin' | 'instructor' 
}


export interface Meal {
  _id: string;
  cookId: string;
  cookName: string;
  cookAvatar?: string;
  cookRating: number;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  cuisine: string;
  category: 'main' | 'starter' | 'dessert' | 'beverage';
  mealType?: 'fast-food' | 'home-cooked'; // New field
  ingredients: string[];
  allergens?: string[];
  isVeg: boolean;
  isVegan?: boolean;
  spiceLevel: 'mild' | 'medium' | 'hot';
  preparationTime: number;
  availableQuantity: number;
  totalQuantity: number;
  availableUntil: string;
  preOrderRequired?: boolean; // For home-cooked meals
  orderDeadline?: string; // 24 hours before preparation
  rating: number;
  reviewCount: number;
  tags: string[];
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
    sugar?: number;
  };
  arModel?: string; // 3D model URL for AR preview
  stories?: CookStory[]; // Cook stories for this meal
  createdAt: string;
  featured?: boolean;
  bmiRecommended?: ('underweight' | 'normal' | 'overweight' | 'obese')[]; // BMI categories this meal is good for
}

export interface Order {
  id: string;
  studentId: string;
  studentName: string;
  cookId: string;
  cookName: string;
  meals: {
    mealId: string;
    mealTitle: string;
    quantity: number;
    price: number;
    specialInstructions?: string;
  }[];
  totalAmount: number;
  deliveryFee: number;
  status: 'pending' | 'accepted' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'card' | 'wallet' | 'cod';
  deliveryAddress: {
    building: string;
    room: string;
    campus: string;
    landmark?: string;
    phone: string;
  };
  estimatedDeliveryTime?: string;
  actualDeliveryTime?: string;
  riderId?: string;
  riderName?: string;
  riderPhone?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  orderId: string;
  studentId: string;
  studentName: string;
  cookId: string;
  mealId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
}

export interface CookStory {
  id: string;
  cookId: string;
  mealId?: string;
  title: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
  duration?: number; // in seconds
  views: number;
  likes: number;
  createdAt: string;
  expiresAt?: string; // Stories can expire after 24 hours
}

export interface Cart {
  items: {
    meal: Meal;
    quantity: number;
    specialInstructions?: string;
    orderType: 'instant' | 'pre-order';
    requestedDeliveryDate?: string; // For pre-orders
  }[];
  totalAmount: number;
  deliveryFee: number;
}

export interface CookStats {
  totalOrders: number;
  totalEarnings: number;
  averageRating: number;
  totalReviews: number;
  mealsPosted: number;
  completionRate: number;
}

export interface RiderStats {
  totalDeliveries: number;
  totalEarnings: number;
  averageRating: number;
  totalReviews: number;
  completionRate: number;
  averageDeliveryTime: number; // in minutes
  currentOrders: number;
  distanceTraveled: number; // in km
}

export interface AdminStats {
  totalUsers: number;
  totalCooks: number;
  totalStudents: number;
  totalRiders: number;
  totalOrders: number;
  totalRevenue: number;
  activeOrders: number;
  pendingVerifications: number;
}