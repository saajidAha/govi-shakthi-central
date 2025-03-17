import json
import random
from collections import defaultdict

def generate_fruit_marketplace_data(output_file_path):
    """
    Generates unique fruit data with a minimum of 5 *unique* alternative products
    per fruit-location combination and saves the data to a JSON file.  Ensures no
    duplicate alternative product names for the same fruit and location.
    This version is optimized for speed and memory usage.
    """

    # Possible values for different fields:
    fruit_types = ["Mango", "Banana", "Papaya", "Pineapple", "Guava", "Woodapple", "Strawberry", "Kiwi", "Avocado", "Lychee"]
    alternative_products = {
        "Mango": ["Mango Jam", "Mango Pickle", "Mango Chutney", "Mango Juice", "Mango Sorbet", "Mango Pudding", "Mango Smoothie", "Mango Lassi", "Mango Marmalade", "Mango Jelly"],
        "Banana": ["Banana Chips", "Banana Bread", "Banana Smoothie", "Banana Muffins", "Banana Ice Cream", "Banana Cake", "Banana Pudding", "Banana Jam", "Banana Fritters", "Banana Milkshake"],
        "Papaya": ["Papaya Juice", "Papaya Salad", "Papaya Smoothie", "Papaya Pudding", "Papaya Jam", "Papaya Chutney", "Papaya Pickle", "Papaya Sorbet", "Papaya Ice Cream", "Papaya Popsicles"],
        "Pineapple": ["Pineapple Jam", "Pineapple Juice", "Pineapple Cake", "Pineapple Sorbet", "Pineapple Pickle", "Pineapple Smoothie", "Pineapple Popsicles", "Pineapple Tart", "Pineapple Chutney"],
        "Guava": ["Guava Jelly", "Guava Jam", "Guava Juice", "Guava Smoothie", "Guava Paste", "Guava Ice Cream", "Guava Cake", "Guava Pickle", "Guava Pudding", "Guava Sorbet"],
        "Woodapple": ["Woodapple Syrup", "Woodapple Juice", "Woodapple Chutney", "Woodapple Jam", "Woodapple Pickle", "Woodapple Smoothie", "Woodapple Ice Cream", "Woodapple Popsicles", "Woodapple Pudding", "Woodapple Cake"],
        "Strawberry": ["Strawberry Jam", "Strawberry Sorbet", "Strawberry Smoothie", "Strawberry Milkshake", "Strawberry Ice Cream", "Strawberry Muffins", "Strawberry Cake", "Strawberry Pie", "Strawberry Jam Bars", "Strawberry Popsicles"],
        "Kiwi": ["Kiwi Smoothie", "Kiwi Jam", "Kiwi Popsicles", "Kiwi Sorbet", "Kiwi Juice", "Kiwi Cake", "Kiwi Tarts", "Kiwi Chutney", "Kiwi Pudding", "Kiwi Marmalade"],
        "Avocado": ["Avocado Toast", "Avocado Smoothie", "Avocado Ice Cream", "Avocado Guacamole", "Avocado Salad", "Avocado Hummus", "Avocado Pudding", "Avocado Dip", "Avocado Sandwich", "Avocado Muffins"],
        "Lychee": ["Lychee Sorbet", "Lychee Juice", "Lychee Smoothie", "Lychee Jam", "Lychee Cake", "Lychee Ice Cream", "Lychee Cocktail", "Lychee Popsicles", "Lychee Chutney", "Lychee Pudding"]
    }
    locations = ["Colombo", "Kandy", "Galle", "Jaffna", "Anuradhapura", "Ratnapura", "Matara"]
    weather_conditions = ["Sunny", "Rainy", "Cloudy", "Stormy"]

    start_year = 2020
    end_year = 2025

    target_entries_per_combination = 5  # Ensure at least 5 unique alternative products
    target_entries = 500  # Total number of entries to generate (adjust as needed)

    generated_data = []
    used_combinations = defaultdict(set)  # {(fruit, location): set(alternative_product_names)}

    # Pre-calculate all possible (fruit, location) combinations *except* Strawberry in Anuradhapura
    valid_combinations = [(f, l) for f in fruit_types for l in locations if not (f == "Strawberry" and l == "Anuradhapura")]
    
    num_combinations = len(valid_combinations)

    entries_per_combination = target_entries // num_combinations
    remaining_entries = target_entries % num_combinations
    
    for i, (fruit, location) in enumerate(valid_combinations):
        
        num_entries = entries_per_combination
        if i < remaining_entries:
            num_entries += 1

        available_alternatives = alternative_products[fruit][:]
        random.shuffle(available_alternatives)

        # Guarantee at least 5 unique alternative products per combination
        num_alternatives_to_generate = min(5, len(available_alternatives))
        selected_alternatives = available_alternatives[:num_alternatives_to_generate] # Select first 5 *unique* alternatives

        for alternative_product in selected_alternatives:

            production_cost = round(random.uniform(50, 150), 2)
            wholesale_price = round(random.uniform(150, 300), 2)
            retail_price = round(random.uniform(300, 500), 2)
            wholesale_profit_margin = round(((wholesale_price - production_cost) / production_cost) * 100, 2)
            retail_profit_margin = round(((retail_price - wholesale_price) / wholesale_price) * 100, 2)
            market_demand = random.randint(100, 1000)
            competition = random.randint(1, 10)
            production_capacity = random.randint(500, 2000)
            weather_factor = random.choice(weather_conditions)
            value_added_cost = round(random.uniform(200, 400), 2)
            value_added_wholesale_price = round(random.uniform(400, 600), 2)
            value_added_retail_price = round(random.uniform(600, 800), 2)
            expected_wholesale_profit = round(value_added_wholesale_price - wholesale_price, 2)
            expected_retail_profit = round(value_added_retail_price - retail_price, 2)
            year = random.randint(start_year, end_year)

            entry = {
                "fruit_type": fruit,
                "location": location,
                "production_cost": {"value": production_cost, "unit": "LKR/kg"},
                "wholesale_price": {"value": wholesale_price, "unit": "LKR/kg"},
                "retail_price": {"value": retail_price, "unit": "LKR/kg"},
                "wholesale_profit_margin": {"value": wholesale_profit_margin, "unit": "%"},
                "retail_profit_margin": {"value": retail_profit_margin, "unit": "%"},
                "market_demand": {"value": market_demand, "unit": "units/day"},
                "competition": competition,
                "production_capacity": {"value": production_capacity, "unit": "kg/month"},
                "weather_factors": weather_factor,
                "alternative_product": {
                    "name": alternative_product,
                    "cost_to_produce": {"value": value_added_cost, "unit": "LKR/kg"},
                    "wholesale_price": {"value": value_added_wholesale_price, "unit": "LKR/kg"},
                    "retail_price": {"value": value_added_retail_price, "unit": "LKR/kg"},
                    "expected_wholesale_profit": {"value": expected_wholesale_profit, "unit": "LKR/kg"},
                    "expected_retail_profit": {"value": expected_retail_profit, "unit": "LKR/kg"}
                },
                "time_range": {"start_year": start_year, "end_year": end_year, "selected_year": year}
            }
            generated_data.append(entry)
            used_combinations[(fruit, location)].add(alternative_product)

    try:
        with open(output_file_path, "w") as json_file:
            json.dump(generated_data, json_file, indent=4)
        print(f"Marketplace data saved to {output_file_path}")
    except Exception as e:
        print(f"Error saving to file: {e}")

# Example Usage:
output_file_path = "unique_fruit_data.json"
generate_fruit_marketplace_data(output_file_path)