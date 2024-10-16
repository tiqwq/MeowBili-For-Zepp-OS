from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/get_video_info', methods=['GET'])
def get_video_info():
    bvid = request.args.get('bvid')
    if not bvid:
        return jsonify({"error": "Missing bvid parameter"}), 400

    api_url = f"https://api.bilibili.com/x/web-interface/view?bvid={bvid}"
    response = requests.get(api_url)

    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Failed to fetch video info"}), 500

if __name__ == "__main__":
    app.run(port=5000)