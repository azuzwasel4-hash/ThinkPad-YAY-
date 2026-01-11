
import { Product, ProductType, ForumPost } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'ThinkPad X1 Carbon Gen 12',
    price: 1599.99,
    description: 'The ultimate professional ultraportable with OLED display and carbon fiber weave.',
    type: ProductType.NEW,
    seller: 'Lenovo Official Partner',
    isVerified: true,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800',
    specs: { cpu: 'Core Ultra 7', ram: '32GB', storage: '1TB SSD', screen: '14" 2.8K OLED', gpu: 'Intel Arc Graphics' }
  },
  {
    id: '2',
    name: 'ThinkPad T14s Gen 5',
    price: 1249.00,
    description: 'Perfect balance of performance and mobility for the modern professional.',
    type: ProductType.NEW,
    seller: 'TechSolutions Inc',
    isVerified: true,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800',
    specs: { cpu: 'AMD Ryzen 7 PRO', ram: '16GB', storage: '512GB SSD', screen: '14" WUXGA', gpu: 'Radeon 780M' }
  },
  {
    id: '3',
    name: 'ThinkPad T480 (Legendary)',
    price: 350.00,
    description: 'The last great dual-battery ThinkPad. Excellent condition with extended battery pack.',
    type: ProductType.USED,
    seller: 'ThinkFan99',
    isVerified: false,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800',
    condition: 'Refurbished',
    specs: { cpu: 'Intel i7-8650U', ram: '32GB', storage: '512GB SSD', gpu: 'Intel UHD 620' }
  },
  {
    id: '4',
    name: 'ThinkPad X230',
    price: 180.00,
    description: 'Classic 7-row keyboard modded. Battery health 85%. Perfect for Linux distros.',
    type: ProductType.USED,
    seller: 'ModMaster',
    isVerified: true,
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800',
    condition: 'Modded / Good',
    specs: { cpu: 'Intel i5-3320M', ram: '16GB', storage: '256GB SSD', gpu: 'Intel HD 4000' }
  },
  {
    id: '5',
    name: 'X1 Carbon G6 Battery',
    price: 65.00,
    description: 'Genuine internal battery for X1 Carbon 6th Gen. 57Wh original capacity.',
    type: ProductType.PART,
    seller: 'Parts4Think',
    isVerified: true,
    image: 'https://images.unsplash.com/photo-1625842268584-8f3bf9ff16a0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '6',
    name: 'P52 Backlit Keyboard',
    price: 45.99,
    description: 'Original replacement keyboard with trackpoint. US English layout.',
    type: ProductType.PART,
    seller: 'GlobalParts Hub',
    isVerified: false,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800'
  }
];

export const MOCK_FORUM_POSTS: ForumPost[] = [
  {
    id: 'f1',
    title: 'X220 vs X230: Which is the true king of compacts?',
    author: 'ClassicLover',
    category: 'Popular',
    replies: 156,
    timestamp: '2 hours ago',
    preview: 'I have both, but the keyboard on the X220 is just unbeatable for long coding sessions...'
  },
  {
    id: 'f2',
    title: 'T14 Gen 3 Thermal Throttling Issues',
    author: 'WorkstationUser',
    category: 'Troubleshooting',
    replies: 24,
    timestamp: '5 hours ago',
    preview: 'Has anyone noticed significant drops in clock speed during heavy compiles? I applied Kryonaut but...'
  },
  {
    id: 'f3',
    title: 'GUIDE: coreboot on X230 for beginners',
    author: 'ModMaster',
    category: 'Modding',
    replies: 89,
    timestamp: '1 day ago',
    preview: 'First, you will need a Raspberry Pi and a SOIC-8 clip. This guide assumes you have basic Linux knowledge...'
  },
  {
    id: 'f4',
    title: 'The Search for the IBM 701c Butterfly Keyboard',
    author: 'RetroCollector',
    category: 'General',
    replies: 42,
    timestamp: '3 days ago',
    preview: 'I finally found one in a local thrift shop! The hinges are stiff, but the mechanism still works like magic.'
  },
  {
    id: 'f5',
    title: 'Linux Kernel 6.12: TrackPoint scrolling broken on P1 Gen 5',
    author: 'KernelDev',
    category: 'Troubleshooting',
    replies: 12,
    timestamp: '12 hours ago',
    preview: 'Ever since the last update, libinput seems to be misdetecting the middle-click scroll as a regular click.'
  },
  {
    id: 'f6',
    title: 'Is the P16 too heavy for a daily carry?',
    author: 'HeavyLifter',
    category: 'General',
    replies: 67,
    timestamp: '1 week ago',
    preview: 'Thinking of switching from a T14 to a P16 for video editing. My backpack is ready, but is my back?'
  },
  {
    id: 'f7',
    title: 'Restoring a ThinkPad W541: Screen Upgrade Tips',
    author: 'ThinkResto',
    category: 'Modding',
    replies: 31,
    timestamp: '4 days ago',
    preview: 'The stock TN panel is atrocious. I am looking at a 3K IPS panel (FRU 04X4064). Anyone tried this swap?'
  },
  {
    id: 'f8',
    title: 'Battery Longevity: T480 Internal vs External drainage',
    author: 'PowerUser',
    category: 'Popular',
    replies: 112,
    timestamp: '2 days ago',
    preview: 'Why does Windows 11 insist on draining the internal battery first sometimes? Here is my Registry fix...'
  }
];
