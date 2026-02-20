import mongoose from 'mongoose';

const uri = 'mongodb://localhost:27017/giftdelivery';

async function updateDatabase() {
  try {
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');
    
    const db = mongoose.connection.db;
    const collection = db.collection('foods');

    await collection.updateMany({ category: "Salad" }, { $set: { category: "Flowers" } });
    await collection.updateMany({ category: "Rolls" }, { $set: { category: "Cakes" } });
    await collection.updateMany({ category: "Deserts" }, { $set: { category: "Chocolates" } });
    await collection.updateMany({ category: "Sandwich" }, { $set: { category: "Soft Toys" } });
    await collection.updateMany({ category: "Cake" }, { $set: { category: "Personalized Gifts" } });
    await collection.updateMany({ category: "Pure Veg" }, { $set: { category: "Gift Hampers" } });
    await collection.updateMany({ category: "Pasta" }, { $set: { category: "Greeting Cards" } });
    await collection.updateMany({ category: "Noodles" }, { $set: { category: "Luxury Gifts" } });

    console.log('✅ Categories updated!');

    const updates = [
      { old: "Greek salad", new: "Rose Bouquet", desc: "Beautiful fresh roses arranged perfectly for any occasion" },
      { old: "Veg salad", new: "Mixed Flower Bouquet", desc: "Colorful assortment of seasonal flowers" },
      { old: "Clover Salad", new: "Tulip Arrangement", desc: "Elegant tulips for special moments" },
      { old: "Chicken Salad", new: "Orchid Collection", desc: "Exotic orchids for sophisticated gifting" },
      { old: "Lasagna Rolls", new: "Chocolate Cake", desc: "Rich chocolate cake for celebrations" },
      { old: "Peri Peri Rolls", new: "Red Velvet Cake", desc: "Classic red velvet with cream cheese frosting" },
      { old: "Chicken Rolls", new: "Black Forest Cake", desc: "Delicious black forest with cherries" },
      { old: "Veg Rolls", new: "Vanilla Cake", desc: "Light and fluffy vanilla sponge cake" },
      { old: "Ripple Ice Cream", new: "Ferrero Rocher Box", desc: "Premium chocolate gift box" },
      { old: "Fruit Ice Cream", new: "Lindt Chocolate Box", desc: "Swiss chocolate assortment" },
      { old: "Jar Ice Cream", new: "Cadbury Celebration", desc: "Assorted Cadbury chocolates" },
      { old: "Vanilla Ice Cream", new: "Dark Chocolate Bar", desc: "Premium dark chocolate" },
      { old: "Chicken Sandwich", new: "Teddy Bear Large", desc: "Cute large teddy bear for loved ones" },
      { old: "Vegan Sandwich", new: "Teddy Bear Small", desc: "Adorable small teddy bear" },
      { old: "Grilled Sandwich", new: "Stuffed Toy Dog", desc: "Soft and cuddly toy dog" },
      { old: "Bread Sandwich", new: "Stuffed Toy Cat", desc: "Cute stuffed cat toy" },
      { old: "Cup Cake", new: "Photo Frame", desc: "Customized photo frame gift" },
      { old: "Vegan Cake", new: "Engraved Mug", desc: "Personalized engraved coffee mug" },
      { old: "Butterscotch Cake", new: "Custom T-Shirt", desc: "Personalized printed t-shirt" },
      { old: "Sliced Cake", new: "Name Keychain", desc: "Customized name keychain" },
      { old: "Garlic Mushroom ", new: "Gourmet Hamper", desc: "Premium gourmet food hamper" },
      { old: "Fried Cauliflower", new: "Spa Gift Set", desc: "Relaxing spa and wellness hamper" },
      { old: "Mix Veg Pulao", new: "Tea & Coffee Hamper", desc: "Assorted tea and coffee collection" },
      { old: "Rice Zucchini", new: "Dry Fruits Hamper", desc: "Premium dry fruits gift box" },
      { old: "Cheese Pasta", new: "Birthday Card", desc: "Beautiful birthday greeting card" },
      { old: "Tomato Pasta", new: "Anniversary Card", desc: "Romantic anniversary card" },
      { old: "Creamy Pasta", new: "Thank You Card", desc: "Elegant thank you greeting card" },
      { old: "Chicken Pasta", new: "Congratulations Card", desc: "Celebration greeting card" },
      { old: "Buttter Noodles", new: "Designer Watch", desc: "Luxury designer wristwatch" },
      { old: "Veg Noodles", new: "Perfume Set", desc: "Premium perfume gift set" },
      { old: "Somen Noodles", new: "Jewelry Box", desc: "Elegant jewelry collection" },
      { old: "Cooked Noodles", new: "Leather Wallet", desc: "Premium leather wallet gift" }
    ];

    for (const update of updates) {
      await collection.updateOne({ name: update.old }, { $set: { name: update.new, description: update.desc } });
    }

    console.log('✅ Products updated!');
    console.log('✅ Migration completed successfully!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

updateDatabase();
