
export enum ProductType {
  NEW = 'NEW',
  USED = 'USED',
  PART = 'PART'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  type: ProductType;
  seller: string;
  isVerified: boolean;
  image: string;
  specs?: {
    cpu?: string;
    ram?: string;
    storage?: string;
    screen?: string;
    gpu?: string;
  };
  condition?: string;
}

export interface ForumPost {
  id: string;
  title: string;
  author: string;
  category: 'Troubleshooting' | 'Modding' | 'Popular' | 'General';
  replies: number;
  timestamp: string;
  preview: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface UserFleetItem {
  id: string;
  model: string;
  specs: string;
  status: 'Optimal' | 'Requires Maintenance' | 'Parts Only';
  estimatedValue: number;
}
