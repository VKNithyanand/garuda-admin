export interface Workshop {
  id: string;
  title: string;
  summary: string;
  instructor: string;
  category: string;
  isPaid: boolean;
  price?: number;
  liveSessionLink?: string;
  videoUrl?: string;
  enrollments: number;
  createdAt: Date;
  rating: number;
  completionRate: number;
  reviews: number;
}

export interface SalesData {
  productName: string;
  sales: number;
  revenue: number;
  feedback: number;
  growth: number;
}

export interface DashboardStats {
  totalArtisans: number;
  totalSales: number;
  totalEarnings: number;
  workshopEnrollments: number;
  ecoFriendlyPercentage: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  workshops: number;
  products: number;
}