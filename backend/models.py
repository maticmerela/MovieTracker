from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Media(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    type = db.Column(db.String(10), nullable=False)  # 'film' or 'series'
    status = db.Column(db.String(10), nullable=False, default='planned')  # 'planned', 'watching', 'watched'
    rating = db.Column(db.Integer, nullable=True)  # 1–10
