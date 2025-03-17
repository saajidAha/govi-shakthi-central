import json
import random

def generate_fruit_marketplace_data(unique_fruit_data_path, output_file_path):
    """
    Generates marketplace and raw material data from unique_fruit_data.json, 
    assigning unique marketplaces for alternative products and raw material sources
    based on location.
    """

    try:
        with open(unique_fruit_data_path, 'r') as f:
            fruit_data = json.load(f)
    except FileNotFoundError:
        print(f"Error: File not found at {unique_fruit_data_path}")
        return
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in {unique_fruit_data_path}")
        return

    marketplace_data = []

    # Define marketplaces
    marketplaces = [
        {"name": "SuperMart", "location": "Colombo", "type": "Retail", "audience": "Urban", "price_range": "Moderate"},
        {"name": "FreshGoods Market", "location": "Kandy", "type": "Wholesale", "audience": "Local Farmers", "price_range": "Affordable"},
        {"name": "Tropical Treats", "location": "Galle", "type": "Specialty", "audience": "Tourists", "price_range": "Premium"},
        {"name": "Green Basket", "location": "Anuradhapura", "type": "Farmers' Market", "audience": "Rural", "price_range": "Affordable"},
        {"name": "Taste of Lanka", "location": "Matara", "type": "E-commerce", "audience": "Nationwide", "price_range": "Moderate"},
        {"name": "Fruitopia", "location": "Jaffna", "type": "Organic", "audience": "Health-conscious", "price_range": "Premium"},
        {"name": "Island Grocer", "location": "Ratnapura", "type": "Wholesale", "audience": "Local Market", "price_range": "Affordable"},
        {"name": "Urban Fresh", "location": "Colombo", "type": "Retail", "audience": "Young Professionals", "price_range": "Moderate"},
        {"name": "Healthy Harvest", "location": "Galle", "type": "Organic", "audience": "Eco-conscious", "price_range": "Premium"},
        {"name": "Fruit Market Hub", "location": "Kandy", "type": "Wholesale", "audience": "Local Farmers", "price_range": "Affordable"}
    ]

    # Sample Raw Material Marketplaces
    raw_material_marketplaces = {
        "Colombo": ["Colombo Central Market", "Pettah Food Stalls", "Wellawatte Suppliers"],
        "Kandy": ["Kandy Good Market", "Bogas City Centre", "Kandy Farmers Association"],
        "Galle": ["Galle Fort Merchants", "Karapitiya Suppliers", "Galle Fisheries Harbor"],
        "Anuradhapura": ["Anuradhapura Economic Center", "Nuwaragam Palatha Local Market", "Local Farm Cooperatives"],
        "Matara": ["Matara DIMO", "Akuressa Fair", "Local fishermen Co-op"],
        "Jaffna": ["Jaffna Market Square", "Valikamam Coop", "Point Pedro Traders"],
        "Ratnapura": ["Ratnapura Gem & Food Bazaar", "Embilipitiya Open Market", "Kuruwita Traders"]
    }

    for item in fruit_data:
        fruit_type = item['fruit_type']
        alternative_product = item['alternative_product']['name']
        location = item['location']

        # Filter marketplaces for this location
        valid_marketplaces = [m for m in marketplaces if m["location"] == location]

        if not valid_marketplaces:
            print(f"Warning: No marketplaces found for location {location}. Skipping {fruit_type} - {alternative_product}.")
            continue

        # Select a marketplace
        marketplace = random.choice(valid_marketplaces)
        shop_name = f"{marketplace['name']} - {fruit_type} Ingredients"

        #Select a raw material marketplace for each alternative product from valid_marketplaces
        raw_material_marketplace_name = random.choice(raw_material_marketplaces.get(location, ["Local Supplier"]))  # Select a random one
        raw_material_shop_name = f"{raw_material_marketplace_name} - {fruit_type} Ingredients" #Name for raw_material Shop

        # Example Ingredients (You can expand on this)
        ingredients = ["Sugar", "Spices", "Fruits", "Preservatives"]  #Example


        entry = {
            "fruit_type": fruit_type,
            "alternative_product": alternative_product,
            "ingredients_required": ingredients,
            "marketplace_name": raw_material_marketplace_name,  #Use material marketplace info
            "location": location,
            "shop_name": raw_material_shop_name,
            "marketplace_type": "Raw Materials", #Make Type Raw Materials
            "target_audience": "Local Producers", #Local Prodcucers target Audiences
            "price_range": "Affordable", #Affordable price because Raw Materials
            "selling_strategy": random.choice(["Wholesale", "Retail"]), #Change selly Strategy
            "supplier_relationship": random.choice(["New", "Existing"]), #Change supier
            "seasonality": random.choice(["High", "Low", "Moderate"]),
            "promotion_method": random.choice(["Discounts", "Bulk Discounts", "Loyalty Programs"])  #Update promosion

        }
        marketplace_data.append(entry)

    try:
        with open(output_file_path, "w") as json_file:
            json.dump(marketplace_data, json_file, indent=4)
        print(f"Marketplace data saved to {output_file_path}")
    except Exception as e:
        print(f"Error saving to file: {e}")

unique_fruit_data_path = "unique_fruit_data.json"
output_file_path = "raw_material_marketplace_data.json"
generate_fruit_marketplace_data(unique_fruit_data_path, output_file_path)