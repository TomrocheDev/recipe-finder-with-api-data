from flask import Flask, request, render_template, redirect, url_for, session
from functions.functions import get_recipes

app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def home():
    data = None
    if request.method == "POST":
        user_input = request.form["user-input"]
        data = get_recipes(user_input)
    return render_template("index.html", recipes=data)


@app.route("/saved_recipes")
def saved_recipes():
    return render_template("saved-recipes.html")


if __name__ == "__main__":
    app.run(debug=True, port=5003)