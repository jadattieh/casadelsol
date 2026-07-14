export interface SimpleMenuItem {
  name: string;
  price: number;
}

export interface SizedMenuItem {
  name: string;
  prices: {
    S?: number | null;
    M?: number | null;
    L?: number | null;
  };
}

export interface AlcoholMenuItem {
  name: string;
  prices: {
    glass?: number | null;
    bottle?: number | null;
  };
}

export interface OrderItem {
  id: string;
  name: string;
  category: string;
  price: number;
  qty: number;
  sizeOrType?: string; // e.g. "S", "M", "L", "Glass", "Bottle"
}

export interface MenuData {
  saj: SimpleMenuItem[];
  sandwiches: SimpleMenuItem[];
  mezza: SimpleMenuItem[];
  sides: SizedMenuItem[];
  softDrinks: SimpleMenuItem[];
  hotDrinks: SimpleMenuItem[];
  alcohol: AlcoholMenuItem[];
  shisha: SimpleMenuItem[];
}

export const menuData: MenuData = {
  saj: [
    { name: "Zaatar", price: 150000 },
    { name: "Cheese", price: 250000 },
    { name: "Kechek", price: 250000 },
    { name: "Kafta", price: 300000 },
    { name: "Soujok", price: 300000 },
    { name: "Labneh 7arra", price: 250000 },
    { name: "Lahme b 3ajin", price: 300000 },
    { name: "7arra", price: 200000 },
    { name: "Nutella", price: 250000 }
  ],
  sandwiches: [
    { name: "Hamburger", price: 500000 },
    { name: "Chicken Burger", price: 500000 },
    { name: "Tawouk", price: 500000 },
    { name: "Soujok", price: 500000 },
    { name: "Makanek", price: 500000 },
    { name: "Kafta", price: 500000 },
    { name: "Fajita", price: 600000 },
    { name: "Lahmeh", price: 600000 },
    { name: "Fries", price: 300000 },
    { name: "Chicken Strips", price: 550000 },
    { name: "Crispy Chicken", price: 550000 },
    { name: "Nuggets", price: 550000 }
  ],
  mezza: [
    { name: "Fattouch (3 pers.)", price: 550000 },
    { name: "Tabbouleh (3 pers.)", price: 550000 },
    { name: "Hommous", price: 450000 },
    { name: "Warak 3enab", price: 450000 },
    { name: "Rkakat", price: 550000 },
    { name: "Mtabbal", price: 450000 },
    { name: "Chanklish", price: 550000 },
    { name: "Jwenin", price: 450000 },
    { name: "Mozzarella Sticks", price: 550000 }
  ],
  sides: [
    { name: "Carrot", prices: { S: 150000, M: 250000, L: 350000 } },
    { name: "Foul", prices: { S: 200000, M: 400000, L: 600000 } },
    { name: "Termos", prices: { S: 150000, M: 250000, L: 350000 } },
    { name: "Mixed Nuts", prices: { S: 200000, M: 400000, L: 600000 } },
    { name: "Watermelon", prices: { S: null, M: 500000, L: 1000000 } },
    { name: "Melon", prices: { S: null, M: 500000, L: 1000000 } },
    { name: "Chips", prices: { S: null, M: 150000, L: 200000 } }
  ],
  softDrinks: [
    { name: "Water Small", price: 50000 },
    { name: "Water Big", price: 100000 },
    { name: "Soft Drink", price: 150000 },
    { name: "Mr Juicy", price: 50000 },
    { name: "Xtra", price: 100000 },
    { name: "Milkshake", price: 150000 },
    { name: "Dark Blue", price: 200000 },
    { name: "Ice Tea", price: 150000 },
    { name: "XXL", price: 200000 }
  ],
  hotDrinks: [
    { name: "Green Tea", price: 150000 },
    { name: "Zhourat", price: 150000 },
    { name: "Lebanese Coffee", price: 200000 },
    { name: "Cappuccino", price: 150000 },
    { name: "Nescafé", price: 150000 }
  ],
  alcohol: [
    { name: "Beer", prices: { glass: 200000, bottle: null } },
    { name: "Mexican Beer", prices: { glass: 300000, bottle: null } },
    { name: "Whiskey Red Label", prices: { glass: 300000, bottle: 2250000 } },
    { name: "Whiskey Black Label", prices: { glass: 450000, bottle: 4050000 } },
    { name: "Vodka Stoli", prices: { glass: 300000, bottle: 2250000 } },
    { name: "Vodka Stoli Gold", prices: { glass: null, bottle: 3600000 } },
    { name: "Arak Fakra", prices: { glass: null, bottle: 1800000 } },
    { name: "Wine Rosé", prices: { glass: 450000, bottle: 1350000 } }
  ],
  shisha: [
    { name: "Shisha", price: 450000 },
    { name: "+1 Head", price: 180000 }
  ]
};

export function formatPrice(price: number | null | undefined): string {
  if (price === null || price === undefined) return "---";
  // Format as e.g. 150.000
  return price.toLocaleString("de-DE");
}
