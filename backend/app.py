from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Media
# from flasgger import Swagger

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
CORS(app)
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
# CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)



# print(app)
# print(dir(app))


# # @app.before_first_request
# def create_tables():
#     db.create_all()

# app = Flask(__name__)
# app.config['SWAGGER'] = {
#     'title': 'Media API',
#     'uiversion': 3
# }
# swagger = Swagger(app, template_file='openapi.yaml')

# app = Flask(__name__)
# swagger = Swagger(app)

@app.route('/media', methods=['GET'])
def get_all_media():
    media = Media.query.all()
    return jsonify([{
        "id": m.id,
        "title": m.title,
        "type": m.type,
        "status": m.status,
        "rating": m.rating
    } for m in media])

@app.route('/media', methods=['POST'])
def add_media():
    data = request.json
    new_media = Media(
        title=data['title'],
        type=data['type'],
        status=data.get('status', 'planned'),
        rating=data.get('rating')
    )
    db.session.add(new_media)
    db.session.commit()
    return jsonify({"message": "Media added"}), 201

@app.route('/media/<int:id>', methods=['PUT'])
def update_media(id):
    data = request.json
    media = Media.query.get_or_404(id)
    media.status = data.get('status', media.status)
    media.rating = data.get('rating', media.rating)
    db.session.commit()
    return jsonify({"message": "Media updated"})

@app.route('/media/<int:id>', methods=['DELETE'])
def delete_media(id):
    media = Media.query.get_or_404(id)
    db.session.delete(media)
    db.session.commit()
    return jsonify({"message": "Media deleted"})

@app.before_request
def handle_options():
    if request.method == 'OPTIONS':
        return '', 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)
