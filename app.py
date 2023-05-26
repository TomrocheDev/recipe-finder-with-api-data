from flask import Flask, request, render_template, session
import requests
import os

app = Flask(__name__)
app.secret_key = "123456"

app_id = os.environ["EDAMAM-APP-ID"]
api_key = os.environ["EDAMAM-API-KEY"]

@app.route("/", methods=["GET", "POST"])
def index():
    data = None
    if request.method == "POST":
        session["input"] = request.form["user-input"]
        response = requests.get(f"https://api.edamam.com/api/recipes/v2?type=public&q={session['input']}&app_id={app_id}"
                                f"&app_key={api_key}").json()
        data = response["hits"]
        session["next"] = response["_links"]["next"]["href"]

    return render_template("index.html", recipes=data)


@app.route("/next_page")
def next_page():
    next_page_url = session["next"]
    new_response = requests.get(next_page_url).json()

    data = new_response["hits"]
    session["next"] = new_response["_links"]["next"]["href"]

    return render_template("index.html", recipes=data)


@app.route("/saved_recipes")
def saved_recipes():
    return render_template("saved-recipes.html")


if __name__ == "__main__":
    app.run(debug=True, port=5003)