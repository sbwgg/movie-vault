import os
import json

def replace_in_json_files(directory):
    for filename in os.listdir(directory):
        if filename.endswith('.json'):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r', encoding='utf-8') as file:
                data = json.load(file)

            if isinstance(data, dict):

                updated_data = recursive_replace(data, 'movie-web', 'movie-vault')

                with open(filepath, 'w', encoding='utf-8') as file:
                    json.dump(updated_data, file, ensure_ascii=False, indent=4)

def recursive_replace(data, old_value, new_value):
    if isinstance(data, dict):
        for key, value in data.items():
            if isinstance(value, (dict, list)):
                data[key] = recursive_replace(value, old_value, new_value)
            elif isinstance(value, str):
                data[key] = value.replace(old_value, new_value)
    elif isinstance(data, list):
        for index, item in enumerate(data):
            if isinstance(item, (dict, list)):
                data[index] = recursive_replace(item, old_value, new_value)
            elif isinstance(item, str):
                data[index] = item.replace(old_value, new_value)
    return data

replace_in_json_files(os.getcwd())
