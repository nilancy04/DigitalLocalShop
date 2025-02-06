import React from 'react';
import { Link } from 'react-router-dom';
import ImageWithFallback from './ImageWithFallback';

interface Category {
  id: string;
  name: string;
  image: string;
  link: string;
}

const productCategories: Category[] = [
  {
    id: 'dairy',
    name: 'Dairy, Bread & Eggs',
    image: 'https://th.bing.com/th/id/R.249a9ac68606cadcc5c0d9de7bf5a11a?rik=lIX3Q9iYwSE4ng&riu=http%3a%2f%2fgofreshusa.com%2fwp-content%2fuploads%2f2021%2f02%2fdairy-milk.png&ehk=2Mb4na9H2K1Kez6xBqilziMgkrf%2fvfkXSaoJnr%2fh64k%3d&risl=&pid=ImgRaw&r=0',
    link: '/category/dairy'
  },
  {
    id: 'fruits',
    name: 'Fruits & Vegetables',
    image: 'https://th.bing.com/th/id/OIP.vHtf8RbICjHKW7IDI8yd7wHaEg?rs=1&pid=ImgDetMain',
    link: '/category/fruits'
  },
  {
    id: 'beverages',
    name: 'Cold Drinks & Juices',
    image: 'https://th.bing.com/th/id/OIP.Z00vytAsuVH992SoGypGsAHaHh?rs=1&pid=ImgDetMain',
    link: '/category/beverages'
  },
  {
    id: 'snacks',
    name: 'Snacks & Munchies',
    image: 'https://png.pngtree.com/png-vector/20240603/ourmid/pngtree-an-assorted-snacks-png-image_12607903.png',
    link: '/category/snacks'
  },
  {
    id: 'breakfast',
    name: 'Breakfast & Instant Food',
    image: 'https://www.mtrfoods.com/mtr_admin/data_content/products_category/background_img/3-mins-bf-packshot-1.png',
    link: '/category/breakfast'
  }
];

const shopCategories: Category[] = [
  {
    id: 'kirana',
    name: 'Kirana Store',
    image: 'https://th.bing.com/th/id/OIP.hmgpp4Mjgki5fHFP9EyGlQHaGu?rs=1&pid=ImgDetMain',
    link: '/store/kirana'
  },
  {
    id: 'medical',
    name: 'Medical Store',
    image: 'https://th.bing.com/th/id/OIP.iC7D_5kmnVTxXoRhiCgmWQHaE7?rs=1&pid=ImgDetMain',
    link: '/store/medical'
  },
  {
    id: 'sweets',
    name: 'Sweet Shop',
    image: 'https://www.nicepng.com/png/full/63-634106_sweets-png.png',
    link: '/store/sweets'
  },
  {
    id: 'bakery',
    name: 'Bakery Shop',
    image: 'https://th.bing.com/th/id/OIP.2R5Vbv1Tvqcc53qUv1J2RAHaEK?rs=1&pid=ImgDetMain',
    link: '/store/bakery'
  }
];

interface CategorySectionProps {
  title: string;
  categories: Category[];
}

const CategorySection = ({ title, categories }: CategorySectionProps) => (
  <div className="mb-12">
    <h2 className="text-2xl font-bold mb-6">{title}</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {categories.map((category) => (
        <Link 
          key={category.id}
          to={category.link}
          className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
        >
          <div className="w-16 h-16 mb-4">
            <ImageWithFallback
              src={category.image}
              alt={category.name}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-center text-sm text-gray-800 font-medium">{category.name}</span>
        </Link>
      ))}
    </div>
  </div>
);

const CategoryGrid = () => {
  return (
    <div>
      <CategorySection title="Shop by Products" categories={productCategories} />
      <CategorySection title="Shop by Store Type" categories={shopCategories} />
    </div>
  );
};

export default CategoryGrid; 