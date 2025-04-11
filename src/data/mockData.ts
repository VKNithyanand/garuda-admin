import { faker } from '@faker-js/faker';
import { Workshop, SalesData, DashboardStats, RevenueData } from '../types/dashboard';
import { subMonths, format } from 'date-fns';

// Generate random stats with realistic trends
export const mockStats: DashboardStats = {
  totalArtisans: faker.number.int({ min: 150, max: 300 }),
  totalSales: faker.number.int({ min: 1000, max: 5000 }),
  totalEarnings: faker.number.int({ min: 40000, max: 100000 }),
  workshopEnrollments: faker.number.int({ min: 500, max: 1500 }),
  ecoFriendlyPercentage: faker.number.int({ min: 65, max: 95 })
};

// Generate random workshops with realistic data
const categories = ['Textiles', 'Ceramics', 'Woodworking', 'Jewelry', 'Painting', 'Sculpture'];
const workshopTitles = [
  'Traditional Craft Mastery',
  'Modern Design Techniques',
  'Sustainable Materials Workshop',
  'Cultural Heritage in Crafts',
  'Innovation in Traditional Arts',
  'Eco-friendly Crafting'
];

export const mockWorkshops: Workshop[] = Array.from({ length: 8 }, (_, i) => ({
  id: faker.string.uuid(),
  title: faker.helpers.arrayElement(workshopTitles),
  summary: faker.lorem.paragraph(),
  instructor: faker.person.fullName(),
  category: faker.helpers.arrayElement(categories),
  isPaid: faker.datatype.boolean(),
  price: faker.number.int({ min: 49, max: 299 }),
  liveSessionLink: `https://meet.craftsense.com/${faker.string.alphanumeric(10)}`,
  videoUrl: `https://video.craftsense.com/${faker.string.alphanumeric(8)}`,
  enrollments: faker.number.int({ min: 20, max: 200 }),
  createdAt: faker.date.past(),
  rating: faker.number.float({ min: 4, max: 5, precision: 0.1 }),
  completionRate: faker.number.int({ min: 70, max: 100 }),
  reviews: faker.number.int({ min: 5, max: 50 })
}));

// Generate realistic sales data
const productTypes = ['Handwoven', 'Ceramic', 'Wooden', 'Metal', 'Textile', 'Glass'];
const productItems = ['Bowl', 'Vase', 'Sculpture', 'Jewelry', 'Wall Art', 'Basket'];

export const mockSalesData: SalesData[] = Array.from({ length: 8 }, () => {
  const productName = `${faker.helpers.arrayElement(productTypes)} ${faker.helpers.arrayElement(productItems)}`;
  const sales = faker.number.int({ min: 50, max: 300 });
  const avgPrice = faker.number.int({ min: 30, max: 200 });
  
  return {
    productName,
    sales,
    revenue: sales * avgPrice,
    feedback: faker.number.float({ min: 4, max: 5, precision: 0.1 }),
    growth: faker.number.float({ min: -20, max: 40, precision: 0.1 })
  };
});

// Generate monthly revenue data
export const mockRevenueData: RevenueData[] = Array.from({ length: 12 }, (_, i) => {
  const date = subMonths(new Date(), i);
  return {
    month: format(date, 'MMM'),
    revenue: faker.number.int({ min: 20000, max: 80000 }),
    workshops: faker.number.int({ min: 10, max: 50 }),
    products: faker.number.int({ min: 100, max: 500 })
  };
}).reverse();

// Generate regional sales distribution
export const mockRegionalData = [
  { name: 'North America', value: faker.number.int({ min: 30, max: 40 }) },
  { name: 'Europe', value: faker.number.int({ min: 20, max: 30 }) },
  { name: 'Asia', value: faker.number.int({ min: 15, max: 25 }) },
  { name: 'Others', value: faker.number.int({ min: 10, max: 20 }) }
];

// Normalize regional data to 100%
const total = mockRegionalData.reduce((acc, curr) => acc + curr.value, 0);
mockRegionalData.forEach(item => {
  item.value = Math.round((item.value / total) * 100);
});