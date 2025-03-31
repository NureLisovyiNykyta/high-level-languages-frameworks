from config import Config
from flask import Flask
from db import db

app = Flask(__name__)

app.config.from_object(Config)

db.init_app(app)

with app.app_context():
    db.create_all()

from routes import rates_bp, templates_bp
app.register_blueprint(rates_bp, url_prefix='/api')
app.register_blueprint(templates_bp)


if __name__ == '__main__':
    app.run()
