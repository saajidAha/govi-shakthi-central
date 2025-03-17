import json
import random

def generate_fruit_marketplace_data(unique_fruit_data_path, output_file_path):
    """
    Generates marketplace data from unique_fruit_data.json.  Assigns each fruit/alternative
    product a unique marketplace within its location.
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

    # Define marketplaces globally so we can randomly select
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

    for item in fruit_data:
        fruit_type = item['fruit_type']
        alternative_product = item['alternative_product']['name']
        location = item['location']

        # Filter for marketplaces in the same location.
        valid_marketplaces = [m for m in marketplaces if m["location"] == location]

        if not valid_marketplaces:
            print(f"Warning: No marketplaces found for location {location}. Skipping {fruit_type} - {alternative_product}.")
            continue

        # Randomly select a marketplace from the filtered list for EACH PRODUCT
        marketplace = random.choice(valid_marketplaces)
        shop_name = f"{marketplace['name']} - {fruit_type} Products" # create unique name

        entry = {
            "fruit_type": fruit_type,
            "alternative_product": alternative_product,
            "marketplace_name": marketplace["name"],
            "location": marketplace["location"],
            "shop_name": shop_name,
            "marketplace_type": marketplace["type"],
            "target_audience": marketplace["audience"],
            "price_range": marketplace["price_range"],
            "selling_strategy": random.choice(["Online", "In-store", "Both"]),
            "seasonality": random.choice(["High", "Low", "Moderate"]),
            "promotion_method": random.choice(["Discounts", "Bundles", "Loyalty Programs", "Advertising"])
        }
        marketplace_data.append(entry)

    # Saving with improved error handling:
    try:
        with open(output_file_path, "w") as json_file:
            json.dump(marketplace_data, json_file, indent=4)
        print(f"Marketplace data saved to {output_file_path}")
    except Exception as e:
        print(f"Error saving marketplace data to file: {e}")

unique_fruit_data_path = "unique_fruit_data.json"
output_file_path = "fruit_marketplace_data.json"
generate_fruit_marketplace_data(unique_fruit_data_path, output_file_path)