from flask import request
import requests
import os


def get_recipes(string):
    app_id = os.environ["EDAMAM-APP-ID"]
    api_key = os.environ["EDAMAM-API-KEY"]

    response = requests.get(f"https://api.edamam.com/api/recipes/v2?type=public&q={string}&app_id={app_id}"
                            f"&app_key={api_key}").json()

    return response["hits"]
