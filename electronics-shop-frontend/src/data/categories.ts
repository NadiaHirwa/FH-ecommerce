import laptop from '../assets/categories/laptop.jpg';
import monitor from '../assets/categories/monitor.jpg';
import keyboard from '../assets/categories/keyboard-mouse.jpg';
import headphones from '../assets/categories/headphones.jpg';
import storage from '../assets/categories/storage.jpg';
import accessory from '../assets/categories/accessory.jpg';

export interface CategoryItem {
    name: string;
    items: string[];
}

export const CATEGORY_DATA: Record<string, string[]> = {
    'Computers': [
        'Laptops',
        'Desktops / PCs',
        'Mini PCs',
        'All-in-One PCs'
    ],

    'Components & Parts': [
        'Processors (CPU)',
        'Motherboards',
        'RAM',
        'Graphics Cards (GPU)',
        'Power Supplies (PSU)',
        'Cooling Systems',
        'Computer Cases'
    ],

    'Storage': [
        'SSD',
        'HDD',
        'External Storage',
        'Flash Drives',
        'Memory Cards'
    ],

    'Computer Accessories': [
        'Keyboards',
        'Mouse',
        'Webcams',
        'USB Hubs',
        'Laptop Stands',
        'Laptop Bags & Sleeves'
    ],

    'Audio & Video': [
        'Headphones & Headsets',
        'Earphones',
        'Bluetooth Earbuds',
        'Speakers',
        'Microphones',
        'Projectors',
        'Audio Cables & Adapters'
    ],

    'Phones & Tablets': [
        'Smartphones',
        'Tablets',
        'Phone Cases',
        'Screen Protectors'
    ],

    'Networking': [
        'Routers',
        'Modems',
        'Switches',
        'Network Cables',
        'Wi-Fi Extenders',
        'Network Adapters'
    ],

    'Office Equipment': [
        'Printers',
        'Scanners',
        'Ink Cartridges',
        'Toner Cartridges',
        'Printer Paper'
    ],

    'Power & Electrical': [
        'Chargers',
        'Power Banks',
        'UPS',
        'Adapters',
        'Extension Cables'
    ],

    'Tools & Maintenance': [
        'Tool Kits',
        'Cleaning Kits',
        'Thermal Paste',
        'Replacement Parts'
    ]
};

// Start logic for category images
const categoryImages = [laptop, monitor, keyboard, headphones, storage, accessory];

export const CATEGORIES_WITH_IMAGES = Object.keys(CATEGORY_DATA).map((key, index) => ({
    id: index,
    name: key,
    image: categoryImages[index % categoryImages.length],
    count: CATEGORY_DATA[key].length * 12 + 5,
    items: CATEGORY_DATA[key]
}));
