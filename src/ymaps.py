#c:/python/python37
from flask import Flask, render_template
import os 
import logging
from flask_cors import CORS, cross_origin


logging.basicConfig(level=logging.INFO)

app = Flask(__name__, static_folder="./static/dist", template_folder="../public")
app.secret_key = os.urandom(24)

@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
