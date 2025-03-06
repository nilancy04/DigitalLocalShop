import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, Phone, ShoppingBag, Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    inStock: boolean;
}

interface ShopData {
    [key: string]: {
        info: {
            name: string;
            rating: number;
            reviews: number;
            address: string;
            timing: string;
            contact: string;
            categories: string[];
        };
        products: Product[];
    };
}

const shopData: ShopData = {
    '1': {
        info: {
            name: "Super Mart Grocery",
            rating: 4.5,
            reviews: 128,
            address: "123 Main Street, Local Area",
            timing: "9:00 AM - 9:00 PM",
            contact: "+91 98765 43210",
            categories: ["Dairy & Bread", "Fresh Produce", "Staples", "Snacks", "Beverages", "Personal Care", "Household", "Breakfast & Cereal", "Cooking Essentials", "Packaged Food"]
        },
        products: [
            // Dairy & Bread Category (20 items)
            {
                id: "1",
                name: "Fresh Milk",
                price: 62,
                image: "https://th.bing.com/th/id/OIP.PkootZ3kvTWFsukAT0cFjAHaHa?rs=1&pid=ImgDetMain",
                description: "Fresh farm milk, 1 liter",
                category: "Dairy & Bread",
                inStock: true
            },
            {
                id: "2",
                name: "OroWheat Whole Wheat Bread",
                price: 45,
                image: "https://th.bing.com/th/id/OIP.Io4_hDbEfHta1NXBp-pFxQHaHa?rs=1&pid=ImgDetMain",
                description: "Fresh baked bread, 400g",
                category: "Dairy & Bread",
                inStock: true
            },
            {
                id: "3",
                name: "Amul Butter",
                price: 55,
                image: "https://th.bing.com/th/id/R.5221bc05d283be08747affe17daffa9b?rik=JMdDe4x%2bv39MTg&riu=http%3a%2f%2fwww.dudhsagardairy.coop%2fwp-content%2fuploads%2f2014%2f04%2f3-Amul-Butter-4.jpg&ehk=iawA3gs9%2fv7md7VwoMg6HA8bf8LuL5xc3YeMt44X6Hg%3d&risl=&pid=ImgRaw&r=0",
                description: "Salted butter, 100g",
                category: "Dairy & Bread",
                inStock: true
            },
            {
                id: "4",
                name: "Amul Paneer Fresh",
                price: 80,
                image: "https://www.bigbasket.com/media/uploads/p/xxl/40137716_11-amul-fresh-paneer.jpg",
                description: "Fresh cottage cheese, 200g",
                category: "Dairy & Bread",
                inStock: true
            },
            {
                id: "5",
                name: "Amul Cheese Slices",
                price: 120,
                image: "https://www.urbangroc.com/wp-content/uploads/2021/04/Amul-Cheese-Slice.jpg",
                description: "Processed cheese slices, 10 pieces",
                category: "Dairy & Bread",
                inStock: true
            },
            {
                id: "6",
                name: "Farmer's Union Yogurt",
                price: 45,
                image: "https://th.bing.com/th/id/OIP.REWvOgKcWlio1gwOt7SS1QHaHa?rs=1&pid=ImgDetMain",
                description: "Natural greek yogurt, 100g",
                category: "Dairy & Bread",
                inStock: true
            },
            {
                id: "7",
                name: "OroWheat Brown Bread",
                price: 40,
                image: "https://th.bing.com/th/id/OIP.4QNI4gXTTpubQK1SXihkBQHaHa?rs=1&pid=ImgDetMain",
                description: "Healthy brown bread, 400g",
                category: "Dairy & Bread",
                inStock: true
            },
            {
                id: "8",
                name: "Amul Mozzarella Cheese",
                price: 160,
                image: "https://fattaak.in/cdn/shop/files/1_60dd2513-fd15-4ef6-a95a-628c42b448dd.png?v=1691420646&width=823",
                description: "Shredded mozzarella, 200g",
                category: "Dairy & Bread",
                inStock: true
            },
            {
                id: "9",
                name: "Curd",
                price: 30,
                image: "https://www.bigbasket.com/media/uploads/p/l/40137716_2-amul-masti-curd.jpg",
                description: "Fresh curd, 200g",
                category: "Dairy & Bread",
                inStock: true
            },
            {
                id: "10",
                name: "Burger Buns",
                price: 35,
                image: "https://www.bigbasket.com/media/uploads/p/l/40019374_10-fresho-burger-buns.jpg",
                description: "Soft burger buns, 4 pieces",
                category: "Dairy & Bread",
                inStock: true
            },
            // Fresh Produce Category (20 items)
            {
                id: "21",
                name: "Organic Tomatoes",
                price: 40,
                image: "https://www.bigbasket.com/media/uploads/p/xxl/10000200_17-fresho-tomato-hybrid.jpg",
                description: "Fresh organic tomatoes, 500g",
                category: "Fresh Produce",
                inStock: true
            },
            {
                id: "22",
                name: "Onions",
                price: 35,
                image: "https://www.bigbasket.com/media/uploads/p/xxl/10000148_30-fresho-onion.jpg",
                description: "Fresh red onions, 1kg",
                category: "Fresh Produce",
                inStock: true
            },
            {
                id: "23",
                name: "Potatoes",
                price: 30,
                image: "https://www.bigbasket.com/media/uploads/p/l/40023472_4-fresho-potato.jpg",
                description: "Fresh potatoes, 1kg",
                category: "Fresh Produce",
                inStock: true
            },
            {
                id: "24",
                name: "Carrots",
                price: 40,
                image: "https://www.bigbasket.com/media/uploads/p/l/10000200-2_2-fresho-carrot.jpg",
                description: "Fresh carrots, 500g",
                category: "Fresh Produce",
                inStock: true
            },
            {
                id: "25",
                name: "Green Peas",
                price: 60,
                image: "https://www.bigbasket.com/media/uploads/p/l/40023472_4-fresho-green-peas.jpg",
                description: "Fresh green peas, 500g",
                category: "Fresh Produce",
                inStock: true
            },
            // Staples Category (15 items)
            {
                id: "41",
                name: "Tata Salt",
                price: 28,
                image: "https://www.bigbasket.com/media/uploads/p/xxl/241600_7-tata-salt-iodized.jpg",
                description: "Iodized salt, 1kg",
                category: "Staples",
                inStock: true
            },
            {
                id: "42",
                name: "Aashirvaad Atta",
                price: 325,
                image: "https://www.bigbasket.com/media/uploads/p/xxl/126903_8-aashirvaad-atta-whole-wheat.jpg",
                description: "Whole wheat flour, 5kg",
                category: "Staples",
                inStock: true
            },
            {
                id: "43",
                name: "Basmati Rice",
                price: 180,
                image: "https://www.bigbasket.com/media/uploads/p/l/40023472_4-india-gate-basmati-rice.jpg",
                description: "Premium basmati rice, 1kg",
                category: "Staples",
                inStock: true
            },
            {
                id: "44",
                name: "Moong Dal",
                price: 120,
                image: "https://www.bigbasket.com/media/uploads/p/l/30005420_10-tata-sampann-moong-dal.jpg",
                description: "Split green gram, 1kg",
                category: "Staples",
                inStock: true
            },
            {
                id: "45",
                name: "Sugar",
                price: 45,
                image: "https://www.bigbasket.com/media/uploads/p/l/40023472_4-madhur-sugar.jpg",
                description: "Pure refined sugar, 1kg",
                category: "Staples",
                inStock: true
            },
            // Snacks Category (15 items)
            {
                id: "56",
                name: "Lay's Classic",
                price: 20,
                image: "https://www.bigbasket.com/media/uploads/p/xxl/294297_12-lays-potato-chips-classic-salted.jpg",
                description: "Salted potato chips, 52g",
                category: "Snacks",
                inStock: true
            },
            {
                id: "57",
                name: "Haldiram's Mixture",
                price: 45,
                image: "https://www.bigbasket.com/media/uploads/p/l/40019374_10-haldirams-mixture.jpg",
                description: "Spicy mixture, 200g",
                category: "Snacks",
                inStock: true
            },
            {
                id: "58",
                name: "Oreo Cookies",
                price: 30,
                image: "https://www.bigbasket.com/media/uploads/p/l/100002991_10-cadbury-oreo-cookies.jpg",
                description: "Chocolate sandwich cookies, 120g",
                category: "Snacks",
                inStock: true
            },
            {
                id: "59",
                name: "Peanuts",
                price: 40,
                image: "https://www.bigbasket.com/media/uploads/p/l/40023472_4-fresho-peanuts.jpg",
                description: "Roasted peanuts, 200g",
                category: "Snacks",
                inStock: true
            },
            {
                id: "60",
                name: "Dark Fantasy",
                price: 35,
                image: "https://www.bigbasket.com/media/uploads/p/l/100002991_10-sunfeast-dark-fantasy.jpg",
                description: "Chocolate cream cookies, 100g",
                category: "Snacks",
                inStock: true
            },
            // Beverages Category (10 items)
            {
                id: "66",
                name: "Coca Cola",
                price: 40,
                image: "https://www.bigbasket.com/media/uploads/p/xxl/288927_15-coca-cola-soft-drink-original-taste.jpg",
                description: "Soft drink, 750ml",
                category: "Beverages",
                inStock: true
            },
            {
                id: "67",
                name: "Nescafe Coffee",
                price: 285,
                image: "https://www.bigbasket.com/media/uploads/p/xxl/40122232_11-nescafe-classic-coffee-powder.jpg",
                description: "Instant coffee powder, 200g",
                category: "Beverages",
                inStock: true
            },
            {
                id: "68",
                name: "Real Juice",
                price: 110,
                image: "https://www.bigbasket.com/media/uploads/p/xxl/265783_12-real-fruit-power-mixed-fruit-juice.jpg",
                description: "Mixed fruit juice, 1L",
                category: "Beverages",
                inStock: true
            },
            {
                id: "69",
                name: "Sprite",
                price: 40,
                image: "https://www.bigbasket.com/media/uploads/p/xxl/251006_10-sprite-lime-flavoured-soft-drink.jpg",
                description: "Lemon flavored drink, 750ml",
                category: "Beverages",
                inStock: true
            },
            {
                id: "70",
                name: "Tata Tea Gold",
                price: 140,
                image: "https://www.bigbasket.com/media/uploads/p/l/266569_12-tata-tea-gold.jpg",
                description: "Premium tea powder, 500g",
                category: "Beverages",
                inStock: true
            },
            // Personal Care Category (10 items)
            {
                id: "76",
                name: "Dove Soap",
                price: 45,
                image: "https://www.bigbasket.com/media/uploads/p/xxl/40019374_10-dove-cream-beauty-bathing-bar.jpg",
                description: "Cream beauty bathing bar, 100g",
                category: "Personal Care",
                inStock: true
            },
            {
                id: "77",
                name: "Head & Shoulders",
                price: 180,
                image: "https://www.bigbasket.com/media/uploads/p/xxl/40176378_10-head-shoulders-anti-dandruff-shampoo-cool-menthol.jpg",
                description: "Anti-dandruff shampoo, 200ml",
                category: "Personal Care",
                inStock: true
            },
            {
                id: "78",
                name: "Pepsodent",
                price: 95,
                image: "https://www.bigbasket.com/media/uploads/p/xxl/281497_7-pepsodent-germicheck-cavity-protection-toothpaste.jpg",
                description: "Cavity protection, 200g",
                category: "Personal Care",
                inStock: true
            },
            {
                id: "79",
                name: "Nivea Cream",
                price: 125,
                image: "https://www.bigbasket.com/media/uploads/p/l/40019374_10-nivea-cream.jpg",
                description: "Moisturizing cream, 100ml",
                category: "Personal Care",
                inStock: true
            },
            {
                id: "80",
                name: "Gillette Razor",
                price: 295,
                image: "https://www.bigbasket.com/media/uploads/p/l/40019374_10-gillette-mach3-razor.jpg",
                description: "3-blade razor with 2 cartridges",
                category: "Personal Care",
                inStock: true
            },
            // Household Category (10 items)
            {
                id: "86",
                name: "Vim Dishwash Bar",
                price: 10,
                image: "https://www.bigbasket.com/media/uploads/p/xxl/267747_9-vim-dishwash-bar-lemon.jpg",
                description: "Dishwashing bar, 200g",
                category: "Household",
                inStock: true
            },
            {
                id: "87",
                name: "Surf Excel",
                price: 110,
                image: "https://www.bigbasket.com/media/uploads/p/xxl/267012_19-surf-excel-quick-wash-detergent-powder.jpg",
                description: "Washing powder, 1kg",
                category: "Household",
                inStock: true
            },
            {
                id: "88",
                name: "Colin Glass Cleaner",
                price: 85,
                image: "https://www.bigbasket.com/media/uploads/p/xxl/40129780_7-colin-glass-surface-cleaner-regular.jpg",
                description: "Glass and surface cleaner, 500ml",
                category: "Household",
                inStock: true
            },
            {
                id: "89",
                name: "Good Knight",
                price: 72,
                image: "https://www.bigbasket.com/media/uploads/p/l/267741_9-good-knight-mosquito-repellent.jpg",
                description: "Mosquito repellent refill, 45ml",
                category: "Household",
                inStock: true
            },
            {
                id: "90",
                name: "Scotch Brite",
                price: 35,
                image: "https://www.bigbasket.com/media/uploads/p/l/267741_9-scotch-brite-scrub-pad.jpg",
                description: "Scrub pad, 3 pieces",
                category: "Household",
                inStock: true
            },
            // Breakfast & Cereal Category (5 items)
            {
                id: "91",
                name: "Kellogg's Corn Flakes",
                price: 175,
                image: "https://www.bigbasket.com/media/uploads/p/xxl/102102_9-kelloggs-corn-flakes-original-worlds-no1-breakfast-cereal.jpg",
                description: "Original corn flakes, 475g",
                category: "Breakfast & Cereal",
                inStock: true
            },
            {
                id: "92",
                name: "Quaker Oats",
                price: 205,
                image: "https://www.bigbasket.com/media/uploads/p/xxl/40087525_10-quaker-oats-high-in-protein-high-in-fibre.jpg",
                description: "Quick cooking oats, 1kg",
                category: "Breakfast & Cereal",
                inStock: true
            },
            {
                id: "93",
                name: "Chocos",
                price: 165,
                image: "https://www.bigbasket.com/media/uploads/p/l/100002991_10-kelloggs-chocos.jpg",
                description: "Chocolate flavored cereal, 375g",
                category: "Breakfast & Cereal",
                inStock: true
            },
            {
                id: "94",
                name: "Muesli",
                price: 280,
                image: "https://www.bigbasket.com/media/uploads/p/l/100002991_10-bagrry-muesli.jpg",
                description: "Mixed fruit muesli, 750g",
                category: "Breakfast & Cereal",
                inStock: true
            },
            {
                id: "95",
                name: "Porridge Mix",
                price: 195,
                image: "https://www.bigbasket.com/media/uploads/p/l/100002991_10-saffola-porridge.jpg",
                description: "Masala oats, 500g",
                category: "Breakfast & Cereal",
                inStock: true
            },
            // Cooking Essentials Category (5 items)
            {
                id: "96",
                name: "Fortune Sunflower Oil",
                price: 220,
                image: "https://www.bigbasket.com/media/uploads/p/xxl/274148_14-fortune-sunflower-refined-oil.jpg",
                description: "Refined sunflower oil, 1L",
                category: "Cooking Essentials",
                inStock: true
            },
            {
                id: "97",
                name: "MDH Turmeric",
                price: 52,
                image: "https://www.bigbasket.com/media/uploads/p/xxl/40177432_4-mdh-powder-haldi-turmeric.jpg",
                description: "Pure turmeric powder, 100g",
                category: "Cooking Essentials",
                inStock: true
            },
            {
                id: "98",
                name: "Everest Garam Masala",
                price: 68,
                image: "https://www.bigbasket.com/media/uploads/p/xxl/40177469_4-everest-masala-garam.jpg",
                description: "Blended spices, 100g",
                category: "Cooking Essentials",
                inStock: true
            },
            {
                id: "99",
                name: "Saffola Gold Oil",
                price: 185,
                image: "https://www.bigbasket.com/media/uploads/p/l/274148_14-saffola-gold-oil.jpg",
                description: "Heart healthy oil, 1L",
                category: "Cooking Essentials",
                inStock: true
            },
            {
                id: "100",
                name: "Maggi Magic Masala",
                price: 25,
                image: "https://www.bigbasket.com/media/uploads/p/l/274148_14-maggi-magic-masala.jpg",
                description: "All-purpose seasoning, 50g",
                category: "Cooking Essentials",
                inStock: true
            }
        ]
    },
    '2': {
        info: {
            name: "City Medical Store",
            rating: 4.8,
            reviews: 256,
            address: "45 Health Avenue, City Center",
            timing: "24x7",
            contact: "+91 98765 43211",
            categories: ["Medicines", "Healthcare", "Personal Care"]
        },
        products: [
            {
                id: "1",
                name: "Paracetamol",
                price: 30,
                image: "https://5.imimg.com/data5/SELLER/Default/2021/1/KF/VF/XG/3823480/paracetamol-tablets-ip-500x500.jpg",
                description: "Fever & pain relief, 10 tablets",
                category: "Medicines",
                inStock: true
            },
            {
                id: "2",
                name: "First Aid Kit",
                price: 450,
                image: "https://5.imimg.com/data5/SELLER/Default/2021/12/MI/TR/UN/142391801/first-aid-kit.jpg",
                description: "Complete emergency kit",
                category: "Healthcare",
                inStock: true
            },
            {
                id: "3",
                name: "Hand Sanitizer",
                price: 85,
                image: "https://5.imimg.com/data5/SELLER/Default/2022/3/ZG/VM/ZK/71225056/hand-sanitizer.jpg",
                description: "Alcohol-based, 200ml",
                category: "Personal Care",
                inStock: true
            }
        ]
    },
    '3': {
        info: {
            name: "Fresh Bakery House",
            rating: 4.6,
            reviews: 189,
            address: "78 Baker Street, Downtown",
            timing: "7:00 AM - 9:00 PM",
            contact: "+91 98765 43212",
            categories: ["Bread", "Cakes", "Pastries", "Cookies"]
        },
        products: [
            {
                id: "1",
                name: "Chocolate Cake",
                price: 450,
                image: "https://www.fnp.com/images/pr/l/v20200206180434/chocolate-truffle-cake-half-kg_1.jpg",
                description: "Rich chocolate cake, 500g",
                category: "Cakes",
                inStock: true
            },
            {
                id: "2",
                name: "Butter Cookies",
                price: 120,
                image: "https://www.fnp.com/images/pr/l/butter-cookies-box_1.jpg",
                description: "Freshly baked, 250g",
                category: "Cookies",
                inStock: true
            }
        ]
    }
};

const ViewShop: React.FC = () => {
    const { shopId } = useParams();
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('all');
    const [currentShop, setCurrentShop] = useState<typeof shopData[keyof typeof shopData] | null>(null);
    const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
    const { addToCart, items } = useCart();

    useEffect(() => {
        if (shopId && shopData[shopId]) {
            setCurrentShop(shopData[shopId]);
            // Initialize addedItems from cart
            const cartItemIds = new Set(items.map(item => item.id));
            setAddedItems(cartItemIds);
        }
    }, [shopId, items]);

    const handleViewCart = () => {
        navigate('/cart');
    };

    const handleAddToCart = (product: Product) => {
        if (!currentShop) return;

        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            shopId: shopId || '',
            shopName: currentShop.info.name
        });

        setAddedItems(prev => new Set([...prev, product.id]));
        toast.success(`Added ${product.name} to cart`);
    };

    if (!currentShop) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Shop not found</h2>
                    <button 
                        onClick={() => navigate('/explore')}
                        className="mt-4 bg-[#fc8019] text-white px-6 py-2 rounded-lg hover:bg-[#db6c12] transition-colors"
                    >
                        Back to Explore
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Shop Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{currentShop.info.name}</h1>
                        <div className="flex items-center mt-2">
                            <Star className="text-yellow-400 fill-current" size={20} />
                            <span className="ml-1 text-gray-700">{currentShop.info.rating}</span>
                            <span className="ml-2 text-gray-500">({currentShop.info.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center mt-3 text-gray-600">
                            <MapPin size={18} className="mr-2" />
                            <span>{currentShop.info.address}</span>
                        </div>
                        <div className="flex items-center mt-2 text-gray-600">
                            <Clock size={18} className="mr-2" />
                            <span>{currentShop.info.timing}</span>
                        </div>
                        <div className="flex items-center mt-2 text-gray-600">
                            <Phone size={18} className="mr-2" />
                            <span>{currentShop.info.contact}</span>
                        </div>
                    </div>
                    <button 
                        onClick={handleViewCart}
                        className="bg-[#fc8019] text-white px-6 py-2 rounded-lg hover:bg-[#db6c12] transition-colors flex items-center"
                    >
                        <ShoppingBag size={20} className="mr-2" />
                        View Cart
                    </button>
                </div>
            </div>

            {/* Categories */}
            <div className="mb-8">
                <div className="flex space-x-4 overflow-x-auto pb-4">
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`px-4 py-2 rounded-full ${
                            activeCategory === 'all'
                                ? 'bg-[#fc8019] text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        } transition-colors`}
                    >
                        All Items
                    </button>
                    {currentShop.info.categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 rounded-full whitespace-nowrap ${
                                activeCategory === category
                                    ? 'bg-[#fc8019] text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            } transition-colors`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentShop.products
                    .filter(product => activeCategory === 'all' || product.category === activeCategory)
                    .map(product => (
                        <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="aspect-w-1 aspect-h-1">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-lg font-bold text-gray-800">₹{product.price}</span>
                                    <button 
                                        onClick={() => handleAddToCart(product)}
                                        className={`px-4 py-2 rounded flex items-center ${
                                            !product.inStock 
                                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                : addedItems.has(product.id)
                                                ? 'bg-green-500 text-white'
                                                : 'bg-[#fc8019] text-white hover:bg-[#db6c12]'
                                        } transition-colors`}
                                        disabled={!product.inStock}
                                    >
                                        {addedItems.has(product.id) ? (
                                            <>
                                                <Check size={18} className="mr-1" />
                                                Added
                                            </>
                                        ) : (
                                            <>
                                                <Plus size={18} className="mr-1" />
                                                Add to Cart
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ViewShop; 