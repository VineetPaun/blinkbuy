import { Product, Category } from "@/lib/types";

export const tabs = ["All", "Cafe", "Home", "Toys", "Fresh", "Electronics", "Mobiles", "Beauty", "Fashion"];

export const categories: Category[] = [
  { id: "fruits-vegetables", name: "Fruits & Vegetables", icon: "🥬", tab: "Fresh" },
  { id: "dairy-bread", name: "Dairy, Bread & Eggs", icon: "🥛", tab: "Fresh" },
  { id: "rice-oil-dals", name: "Atta, Rice, Oil & Dals", icon: "🍚", tab: "All" },
  { id: "meat-fish", name: "Meat, Fish & Eggs", icon: "🥩", tab: "Fresh" },
  { id: "masala-dry-fruits", name: "Masala & Dry Fruits", icon: "🌶️", tab: "All" },
  { id: "breakfast-sauces", name: "Breakfast & Sauces", icon: "🥣", tab: "All" },
  { id: "packaged-food", name: "Packaged Food", icon: "📦", tab: "All" },
  { id: "beverages", name: "Tea, Coffee & More", icon: "☕", tab: "Cafe" },
  { id: "ice-cream", name: "Ice Creams & More", icon: "🍦", tab: "All" },
  { id: "frozen-food", name: "Frozen Food", icon: "❄️", tab: "Fresh" },
  { id: "laundry-care", name: "Laundry Care", icon: "🧺", tab: "Home" },
  { id: "cleaning", name: "Cleaning Essentials", icon: "🧹", tab: "Home" },
  { id: "toys", name: "Toys & Games", icon: "🧸", tab: "Toys" },
  { id: "electronics", name: "Electronics", icon: "🔌", tab: "Electronics" },
  { id: "mobiles", name: "Mobiles & Accessories", icon: "📱", tab: "Mobiles" },
  { id: "beauty", name: "Beauty & Personal Care", icon: "💄", tab: "Beauty" },
  { id: "fashion", name: "Fashion & Accessories", icon: "👕", tab: "Fashion" },
  { id: "cafe", name: "Cafe Snacks & Drinks", icon: "🍰", tab: "Cafe" },
  { id: "home-decor", name: "Home & Kitchen", icon: "🏠", tab: "Home" },
];

export const products: Product[] = [
  // Fruits & Vegetables
  { id: "p1", name: "Fresh Bananas", description: "Ripe yellow bananas, rich in potassium", price: 45, originalPrice: 55, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop", category: "fruits-vegetables", unit: "1 dozen", inStock: true, badge: "18% OFF" },
  { id: "p2", name: "Organic Tomatoes", description: "Fresh organic tomatoes from local farms", price: 35, image: "https://images.unsplash.com/photo-1546470427-227c7369a9b8?w=300&h=300&fit=crop", category: "fruits-vegetables", unit: "500g", inStock: true },
  { id: "p3", name: "Green Apples", description: "Crispy and fresh green apples", price: 180, originalPrice: 220, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop", category: "fruits-vegetables", unit: "1 kg", inStock: true, badge: "18% OFF" },
  { id: "p4", name: "Fresh Spinach", description: "Tender spinach leaves, washed and ready", price: 25, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=300&fit=crop", category: "fruits-vegetables", unit: "250g", inStock: true },
  { id: "p5", name: "Carrots", description: "Fresh orange carrots, full of nutrients", price: 40, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&h=300&fit=crop", category: "fruits-vegetables", unit: "500g", inStock: true },
  { id: "p6", name: "Onions", description: "Red onions for everyday cooking", price: 30, image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=300&h=300&fit=crop", category: "fruits-vegetables", unit: "1 kg", inStock: true },
  { id: "p100", name: "Fresh Mangoes", description: "Sweet Alphonso mangoes", price: 299, originalPrice: 350, image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=300&h=300&fit=crop", category: "fruits-vegetables", unit: "1 kg", inStock: true, badge: "15% OFF" },
  { id: "p101", name: "Potatoes", description: "Fresh potatoes for cooking", price: 35, image: "https://images.unsplash.com/photo-1518977676601-b53f82ber633?w=300&h=300&fit=crop", category: "fruits-vegetables", unit: "1 kg", inStock: true },

  // Dairy, Bread & Eggs
  { id: "p7", name: "Amul Butter", description: "Creamy salted butter", price: 56, image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&h=300&fit=crop", category: "dairy-bread", unit: "100g", inStock: true },
  { id: "p8", name: "Farm Fresh Eggs", description: "Free-range brown eggs", price: 85, originalPrice: 95, image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&h=300&fit=crop", category: "dairy-bread", unit: "12 pcs", inStock: true, badge: "10% OFF" },
  { id: "p9", name: "White Bread", description: "Soft white sandwich bread", price: 45, image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=300&h=300&fit=crop", category: "dairy-bread", unit: "400g", inStock: true },
  { id: "p10", name: "Amul Milk", description: "Full cream pasteurized milk", price: 68, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop", category: "dairy-bread", unit: "1 ltr", inStock: true },
  { id: "p11", name: "Paneer", description: "Fresh cottage cheese", price: 95, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=300&fit=crop", category: "dairy-bread", unit: "200g", inStock: true },
  { id: "p102", name: "Greek Yogurt", description: "Creamy protein-rich yogurt", price: 120, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=300&fit=crop", category: "dairy-bread", unit: "400g", inStock: true },
  { id: "p103", name: "Cheese Slices", description: "Processed cheese slices", price: 85, image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&h=300&fit=crop", category: "dairy-bread", unit: "200g", inStock: true },

  // Laundry Care
  { id: "p12", name: "Tide Detergent Powder", description: "Powerful stain removal", price: 299, originalPrice: 350, image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=300&h=300&fit=crop", category: "laundry-care", unit: "2 kg", inStock: true, badge: "15% OFF" },
  { id: "p13", name: "Surf Excel Matic", description: "For front load washing machines", price: 449, image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300&h=300&fit=crop", category: "laundry-care", unit: "3 kg", inStock: true },
  { id: "p14", name: "Comfort Fabric Conditioner", description: "Long-lasting freshness", price: 199, image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=300&h=300&fit=crop", category: "laundry-care", unit: "800ml", inStock: true },
  { id: "p15", name: "Ghadi Detergent", description: "Affordable washing powder", price: 125, originalPrice: 150, image: "https://images.unsplash.com/photo-1585441695325-21557f914d03?w=300&h=300&fit=crop", category: "laundry-care", unit: "1 kg", inStock: true, badge: "17% OFF" },

  // Beverages
  { id: "p16", name: "Tata Tea Gold", description: "Premium black tea", price: 225, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=300&fit=crop", category: "beverages", unit: "500g", inStock: true },
  { id: "p17", name: "Nescafe Classic", description: "Instant coffee powder", price: 350, originalPrice: 399, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop", category: "beverages", unit: "200g", inStock: true, badge: "12% OFF" },
  { id: "p18", name: "Bournvita", description: "Health drink for kids", price: 275, image: "https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=300&h=300&fit=crop", category: "beverages", unit: "500g", inStock: true },
  { id: "p104", name: "Green Tea", description: "Organic green tea leaves", price: 185, image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=300&h=300&fit=crop", category: "beverages", unit: "100g", inStock: true },
  { id: "p105", name: "Cold Coffee", description: "Ready to drink cold coffee", price: 45, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=300&fit=crop", category: "beverages", unit: "200ml", inStock: true },

  // Packaged Food
  { id: "p19", name: "Maggi Noodles", description: "2-minute instant noodles", price: 70, image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=300&h=300&fit=crop", category: "packaged-food", unit: "280g (4 pack)", inStock: true },
  { id: "p20", name: "Lays Classic Chips", description: "Crispy salted potato chips", price: 40, image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop", category: "packaged-food", unit: "90g", inStock: true },
  { id: "p21", name: "Parle-G Biscuits", description: "Classic glucose biscuits", price: 25, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop", category: "packaged-food", unit: "250g", inStock: true },
  { id: "p22", name: "Oreo Cookies", description: "Chocolate sandwich cookies", price: 35, image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=300&h=300&fit=crop", category: "packaged-food", unit: "120g", inStock: true },

  // Rice & Oil
  { id: "p23", name: "Basmati Rice", description: "Long grain aromatic rice", price: 350, originalPrice: 420, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop", category: "rice-oil-dals", unit: "5 kg", inStock: true, badge: "17% OFF" },
  { id: "p24", name: "Fortune Sunflower Oil", description: "Heart healthy cooking oil", price: 180, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop", category: "rice-oil-dals", unit: "1 ltr", inStock: true },
  { id: "p25", name: "Toor Dal", description: "Split pigeon peas", price: 160, image: "https://images.unsplash.com/photo-1585996746272-50c25ec5d2a4?w=300&h=300&fit=crop", category: "rice-oil-dals", unit: "1 kg", inStock: true },
  { id: "p26", name: "Aashirvaad Atta", description: "Whole wheat flour", price: 280, originalPrice: 320, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=300&fit=crop", category: "rice-oil-dals", unit: "5 kg", inStock: true, badge: "13% OFF" },

  // Cleaning
  { id: "p27", name: "Vim Dishwash Bar", description: "Powerful grease removal", price: 35, image: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=300&h=300&fit=crop", category: "cleaning", unit: "200g", inStock: true },
  { id: "p28", name: "Harpic Toilet Cleaner", description: "Disinfectant toilet cleaner", price: 99, image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=300&fit=crop", category: "cleaning", unit: "500ml", inStock: true },
  { id: "p29", name: "Colin Glass Cleaner", description: "Streak-free shine", price: 115, image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=300&h=300&fit=crop", category: "cleaning", unit: "500ml", inStock: true },
  { id: "p106", name: "Floor Cleaner", description: "Disinfectant floor cleaner", price: 145, image: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=300&h=300&fit=crop", category: "cleaning", unit: "1 ltr", inStock: true },

  // Masala & Dry Fruits
  { id: "p30", name: "MDH Garam Masala", description: "Blend of aromatic spices", price: 85, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", category: "masala-dry-fruits", unit: "100g", inStock: true },
  { id: "p31", name: "Almonds", description: "Premium California almonds", price: 320, originalPrice: 380, image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=300&h=300&fit=crop", category: "masala-dry-fruits", unit: "250g", inStock: true, badge: "16% OFF" },
  { id: "p32", name: "Cashews", description: "Whole cashew nuts", price: 280, image: "https://images.unsplash.com/photo-1526016650454-68a6f488910a?w=300&h=300&fit=crop", category: "masala-dry-fruits", unit: "200g", inStock: true },
  { id: "p107", name: "Walnuts", description: "Premium walnuts", price: 350, image: "https://images.unsplash.com/photo-1563412580-62eb86e70a1c?w=300&h=300&fit=crop", category: "masala-dry-fruits", unit: "200g", inStock: true },

  // Breakfast & Sauces
  { id: "p108", name: "Corn Flakes", description: "Crunchy breakfast cereal", price: 165, image: "https://images.unsplash.com/photo-1521483451569-e33803c0330c?w=300&h=300&fit=crop", category: "breakfast-sauces", unit: "500g", inStock: true },
  { id: "p109", name: "Tomato Ketchup", description: "Heinz tomato ketchup", price: 120, image: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=300&h=300&fit=crop", category: "breakfast-sauces", unit: "500g", inStock: true },
  { id: "p110", name: "Peanut Butter", description: "Creamy peanut butter", price: 225, image: "https://images.unsplash.com/photo-1613564857003-a08b8a0db7bf?w=300&h=300&fit=crop", category: "breakfast-sauces", unit: "350g", inStock: true },
  { id: "p111", name: "Honey", description: "Pure organic honey", price: 299, originalPrice: 350, image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&h=300&fit=crop", category: "breakfast-sauces", unit: "500g", inStock: true, badge: "15% OFF" },
  { id: "p112", name: "Oats", description: "Quaker rolled oats", price: 175, image: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=300&h=300&fit=crop", category: "breakfast-sauces", unit: "1 kg", inStock: true },

  // Ice Cream
  { id: "p113", name: "Vanilla Ice Cream", description: "Creamy vanilla ice cream", price: 199, image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=300&h=300&fit=crop", category: "ice-cream", unit: "500ml", inStock: true },
  { id: "p114", name: "Chocolate Ice Cream", description: "Rich chocolate flavor", price: 220, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=300&fit=crop", category: "ice-cream", unit: "500ml", inStock: true },
  { id: "p115", name: "Mango Ice Cream", description: "Fresh mango flavor", price: 199, image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=300&h=300&fit=crop", category: "ice-cream", unit: "500ml", inStock: true },
  { id: "p116", name: "Ice Cream Cone", description: "Classic cone pack", price: 150, originalPrice: 180, image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=300&h=300&fit=crop", category: "ice-cream", unit: "6 pcs", inStock: true, badge: "17% OFF" },

  // Frozen Food
  { id: "p117", name: "Frozen Peas", description: "Green peas frozen fresh", price: 85, image: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=300&h=300&fit=crop", category: "frozen-food", unit: "500g", inStock: true },
  { id: "p118", name: "Frozen Corn", description: "Sweet corn kernels", price: 95, image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=300&h=300&fit=crop", category: "frozen-food", unit: "500g", inStock: true },
  { id: "p119", name: "Frozen Parathas", description: "Ready to cook parathas", price: 120, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=300&fit=crop", category: "frozen-food", unit: "5 pcs", inStock: true },
  { id: "p120", name: "Frozen Samosas", description: "Crispy vegetable samosas", price: 150, image: "https://images.unsplash.com/photo-1601050690117-94f5f7fa8bd7?w=300&h=300&fit=crop", category: "frozen-food", unit: "12 pcs", inStock: true },

  // Meat & Fish
  { id: "p121", name: "Chicken Breast", description: "Boneless chicken breast", price: 320, image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&h=300&fit=crop", category: "meat-fish", unit: "500g", inStock: true },
  { id: "p122", name: "Fresh Fish", description: "Rohu fish cleaned", price: 280, image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=300&h=300&fit=crop", category: "meat-fish", unit: "500g", inStock: true },
  { id: "p123", name: "Mutton Curry Cut", description: "Fresh goat meat", price: 650, originalPrice: 720, image: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=300&h=300&fit=crop", category: "meat-fish", unit: "500g", inStock: true, badge: "10% OFF" },
  { id: "p124", name: "Prawns", description: "Fresh cleaned prawns", price: 450, image: "https://images.unsplash.com/photo-1565680018093-ebb6b9e0e99e?w=300&h=300&fit=crop", category: "meat-fish", unit: "500g", inStock: true },

  // Toys & Games
  { id: "p125", name: "Building Blocks", description: "100 piece colorful blocks", price: 599, originalPrice: 799, image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=300&h=300&fit=crop", category: "toys", unit: "1 set", inStock: true, badge: "25% OFF" },
  { id: "p126", name: "Soft Teddy Bear", description: "Cuddly teddy bear", price: 499, image: "https://images.unsplash.com/photo-1558864559-ed673ba3610b?w=300&h=300&fit=crop", category: "toys", unit: "1 pc", inStock: true },
  { id: "p127", name: "Remote Control Car", description: "RC racing car", price: 1299, originalPrice: 1599, image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=300&h=300&fit=crop", category: "toys", unit: "1 pc", inStock: true, badge: "19% OFF" },
  { id: "p128", name: "Board Game Set", description: "Family board games", price: 899, image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=300&h=300&fit=crop", category: "toys", unit: "1 set", inStock: true },
  { id: "p129", name: "Puzzle 500pc", description: "Scenic puzzle set", price: 399, image: "https://images.unsplash.com/photo-1494059980473-813e73ee784b?w=300&h=300&fit=crop", category: "toys", unit: "1 set", inStock: true },
  { id: "p130", name: "Play Dough Set", description: "Colorful modeling clay", price: 299, image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&h=300&fit=crop", category: "toys", unit: "6 colors", inStock: true },

  // Electronics
  { id: "p131", name: "USB Cable", description: "Fast charging Type-C cable", price: 299, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop", category: "electronics", unit: "1 m", inStock: true },
  { id: "p132", name: "Power Bank", description: "10000mAh power bank", price: 999, originalPrice: 1299, image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop", category: "electronics", unit: "1 pc", inStock: true, badge: "23% OFF" },
  { id: "p133", name: "Wireless Earbuds", description: "Bluetooth TWS earbuds", price: 1499, originalPrice: 1999, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop", category: "electronics", unit: "1 pc", inStock: true, badge: "25% OFF" },
  { id: "p134", name: "LED Bulb", description: "9W energy saving bulb", price: 99, image: "https://images.unsplash.com/photo-1532007468894-2cfe54bd5c47?w=300&h=300&fit=crop", category: "electronics", unit: "1 pc", inStock: true },
  { id: "p135", name: "Extension Board", description: "4 socket with surge protector", price: 449, image: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=300&h=300&fit=crop", category: "electronics", unit: "1 pc", inStock: true },
  { id: "p136", name: "Mouse Wireless", description: "Ergonomic wireless mouse", price: 599, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop", category: "electronics", unit: "1 pc", inStock: true },

  // Mobiles & Accessories
  { id: "p137", name: "Phone Case", description: "Silicone protective case", price: 299, image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=300&h=300&fit=crop", category: "mobiles", unit: "1 pc", inStock: true },
  { id: "p138", name: "Screen Protector", description: "Tempered glass protector", price: 199, image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=300&h=300&fit=crop", category: "mobiles", unit: "1 pc", inStock: true },
  { id: "p139", name: "Car Phone Mount", description: "Magnetic car mount", price: 499, image: "https://images.unsplash.com/photo-1544866092-1935c5ef2a8f?w=300&h=300&fit=crop", category: "mobiles", unit: "1 pc", inStock: true },
  { id: "p140", name: "Fast Charger", description: "20W fast charger", price: 699, originalPrice: 899, image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=300&h=300&fit=crop", category: "mobiles", unit: "1 pc", inStock: true, badge: "22% OFF" },
  { id: "p141", name: "Phone Stand", description: "Adjustable desk stand", price: 349, image: "https://images.unsplash.com/photo-1586953208270-767889fa9b8f?w=300&h=300&fit=crop", category: "mobiles", unit: "1 pc", inStock: true },

  // Beauty & Personal Care
  { id: "p142", name: "Face Wash", description: "Gentle cleansing face wash", price: 199, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop", category: "beauty", unit: "100ml", inStock: true },
  { id: "p143", name: "Moisturizer", description: "Daily moisturizing cream", price: 299, image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=300&h=300&fit=crop", category: "beauty", unit: "100ml", inStock: true },
  { id: "p144", name: "Sunscreen SPF50", description: "UV protection sunscreen", price: 450, originalPrice: 550, image: "https://images.unsplash.com/photo-1556227834-09f1de7a7d14?w=300&h=300&fit=crop", category: "beauty", unit: "50ml", inStock: true, badge: "18% OFF" },
  { id: "p145", name: "Shampoo", description: "Anti-dandruff shampoo", price: 249, image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=300&h=300&fit=crop", category: "beauty", unit: "340ml", inStock: true },
  { id: "p146", name: "Hair Oil", description: "Nourishing coconut hair oil", price: 175, image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300&h=300&fit=crop", category: "beauty", unit: "200ml", inStock: true },
  { id: "p147", name: "Lipstick", description: "Matte finish lipstick", price: 399, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop", category: "beauty", unit: "1 pc", inStock: true },

  // Fashion
  { id: "p148", name: "Cotton T-Shirt", description: "Comfortable cotton tee", price: 499, originalPrice: 699, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop", category: "fashion", unit: "1 pc", inStock: true, badge: "29% OFF" },
  { id: "p149", name: "Socks Pack", description: "Ankle socks 3 pair", price: 199, image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=300&h=300&fit=crop", category: "fashion", unit: "3 pairs", inStock: true },
  { id: "p150", name: "Cap", description: "Cotton baseball cap", price: 349, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&h=300&fit=crop", category: "fashion", unit: "1 pc", inStock: true },
  { id: "p151", name: "Sunglasses", description: "UV protection sunglasses", price: 599, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop", category: "fashion", unit: "1 pc", inStock: true },
  { id: "p152", name: "Handkerchief Set", description: "Cotton hankies 6 pack", price: 249, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=300&fit=crop", category: "fashion", unit: "6 pcs", inStock: true },

  // Cafe
  { id: "p153", name: "Croissant", description: "Buttery flaky croissant", price: 85, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&h=300&fit=crop", category: "cafe", unit: "1 pc", inStock: true },
  { id: "p154", name: "Chocolate Brownie", description: "Rich chocolate brownie", price: 120, image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=300&h=300&fit=crop", category: "cafe", unit: "1 pc", inStock: true },
  { id: "p155", name: "Cold Brew Coffee", description: "Ready to drink cold brew", price: 150, image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=300&h=300&fit=crop", category: "cafe", unit: "300ml", inStock: true },
  { id: "p156", name: "Muffin", description: "Blueberry muffin", price: 75, image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=300&h=300&fit=crop", category: "cafe", unit: "1 pc", inStock: true },
  { id: "p157", name: "Sandwich", description: "Grilled cheese sandwich", price: 130, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=300&h=300&fit=crop", category: "cafe", unit: "1 pc", inStock: true },
  { id: "p158", name: "Hot Chocolate", description: "Creamy hot chocolate", price: 99, image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=300&h=300&fit=crop", category: "cafe", unit: "250ml", inStock: true },

  // Home & Kitchen
  { id: "p159", name: "Kitchen Towel", description: "Absorbent paper towels", price: 120, image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300&h=300&fit=crop", category: "home-decor", unit: "2 rolls", inStock: true },
  { id: "p160", name: "Garbage Bags", description: "Heavy duty trash bags", price: 150, image: "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=300&h=300&fit=crop", category: "home-decor", unit: "30 pcs", inStock: true },
  { id: "p161", name: "Air Freshener", description: "Room freshener spray", price: 199, image: "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?w=300&h=300&fit=crop", category: "home-decor", unit: "300ml", inStock: true },
  { id: "p162", name: "Tissue Box", description: "Soft facial tissues", price: 85, image: "https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=300&h=300&fit=crop", category: "home-decor", unit: "100 pcs", inStock: true },
];

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.category === categoryId);
}

export function getProductsByTab(tabName: string): Product[] {
  if (tabName === "All") return products;
  const categoryIds = categories.filter((c) => c.tab === tabName).map((c) => c.id);
  return products.filter((p) => categoryIds.includes(p.category));
}

export function getCategoriesByTab(tabName: string): Category[] {
  if (tabName === "All") return categories;
  return categories.filter((c) => c.tab === tabName);
}

export function getProductById(productId: string): Product | undefined {
  return products.find((p) => p.id === productId);
}
