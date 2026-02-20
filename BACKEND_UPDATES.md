# BACKEND UPDATES FOR GIFT DELIVERY

## Update Category Values in Database

Run these MongoDB commands to update food categories to gift categories:

```javascript
// Connect to your MongoDB database
use your_database_name;

// Update category names in food collection
db.foods.updateMany(
  { category: "Salad" },
  { $set: { category: "Flowers" } }
);

db.foods.updateMany(
  { category: "Rolls" },
  { $set: { category: "Cakes" } }
);

db.foods.updateMany(
  { category: "Deserts" },
  { $set: { category: "Chocolates" } }
);

db.foods.updateMany(
  { category: "Sandwich" },
  { $set: { category: "Soft Toys" } }
);

db.foods.updateMany(
  { category: "Cake" },
  { $set: { category: "Personalized Gifts" } }
);

db.foods.updateMany(
  { category: "Pure Veg" },
  { $set: { category: "Gift Hampers" } }
);

db.foods.updateMany(
  { category: "Pasta" },
  { $set: { category: "Greeting Cards" } }
);

db.foods.updateMany(
  { category: "Noodles" },
  { $set: { category: "Luxury Gifts" } }
);
```

## Update Product Names and Descriptions

Update individual product documents with gift-related names and descriptions:

```javascript
// Example updates for products
db.foods.updateOne(
  { name: "Greek salad" },
  { 
    $set: { 
      name: "Rose Bouquet",
      description: "Beautiful fresh roses arranged perfectly for any occasion"
    } 
  }
);

db.foods.updateOne(
  { name: "Veg salad" },
  { 
    $set: { 
      name: "Mixed Flower Bouquet",
      description: "Colorful assortment of seasonal flowers"
    } 
  }
);

// Continue for all products...
```

## No Backend Code Changes Required

The existing Express.js backend APIs will work without modification:
- `/api/food/list` - Returns all gifts
- `/api/food/add` - Adds new gift
- `/api/user/register` - User registration
- `/api/user/login` - User login
- `/api/cart/*` - Cart operations
- `/api/order/*` - Order operations

Only the data values need to be updated in MongoDB.
