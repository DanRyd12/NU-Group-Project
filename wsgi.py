from app import create_app

app = create_app()
# mod_wsgi looks for "application"
application = app

if __name__ == "__main__":
    app.run(debug=True)
