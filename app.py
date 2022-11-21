from pymongo import MongoClient
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

import certifi
ca = certifi.where()
client = MongoClient('mongodb+srv://test:sparta@cluster0.ovn83ml.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.TPA2

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/members/<string:name>')
def members_get(name):
    return render_template('member/'+name+'.html')

@app.route("/members/<string:target>/comments", methods=["GET"])
def comments_get(target):
    comments = list(db.comment.find(
        {'target': target, 'deleted': False}, {'_id': False}).sort('num', -1))
    return jsonify({'data': comments})

@app.route("/members/<string:target>/comments", methods=["POST"])
def comments_post(target):
    print(request.form)
    author = request.form['author']
    contents = request.form['contents']

    comments = list(db.comment.find({}, {'_id': False}))
    count = len(comments) + 1

    doc = {
        'num': count,
        'target': target,
        'author': author,
        'contents': contents,
        'deleted': False,
    }
    db.comment.insert_one(doc)
    return jsonify({'msg': '방명록 남기기 완료!'})

# @app.route("/members/<string:target>/comments", methods=["DELETE"])
@app.route("/members/<string:target>/comments", methods=["PUT"])
def comments_delete(target):
    num = request.form['num']
    # db.comment.delete_one({'num': int(num)})
    db.comment.update_one({'num': int(num)}, {'$set': {'deleted': True}})
    return jsonify({'msg': '방명록 삭제 완료!'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)


