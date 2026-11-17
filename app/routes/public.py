from flask import Blueprint, render_template

public = Blueprint("public", __name__)


@public.route("/")
def index():
    return render_template("public/index.html")

@public.route("/quiz")
def quiz():
    return render_template("public/quiz.html")


@public.route("/about")
def about():
    return render_template("public/about.html")

@public.route("/leaderboard")
def leaderboard():
    return render_template("public/leaderboard.html")
