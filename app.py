import os

from flask import Flask, render_template, request, redirect, url_for
import requests #biblioteca para fazer requisições HTTP
from dotenv import load_dotenv # carrega variaveis de ambiente de um arquivo .env local, onde reside mina API_KEY

load_dotenv() # carrega a variavel no .env


API_KEY = os.getenv("KEY")
if not API_KEY:
    raise RuntimeError ("Erro ao recuperar sua chave da API")
    #raise interrompe a execução do codigo

def get_coordinate_by_city(city):
    url = "http://api.openweathermap.org/geo/1.0/direct"
    params = {
        "q" : city,
        "limit" : 1,
        "appid" : API_KEY
    }

    resp = requests.get(url, params=params, timeout=15)
    resp.raise_for_status()
    data = resp.json()

    if not data:
        raise ValueError ("Cidade não encontrada, tente novamente!")

    return data[0]["lat"], data[0]["lon"], data[0].get("name"), data[0].get("country")


def get_datas_weather(lat, lon):
    url = "https://api.openweathermap.org/data/2.5/weather"
    params = {
        "lat" : lat,
        "lon" : lon,
        "appid" : API_KEY,
        "units": "metric",
        "lang": "pt_br"
    }

    resp = requests.get(url, params=params, timeout=15)
    resp.raise_for_status()
    data = resp.json()

    return {
        "temp": data["main"]["temp"],
        "feels_like": data["main"]["feels_like"],
        "temp_min": data["main"]["temp_min"],
        "temp_max": data["main"]["temp_max"],
        "humidity": data["main"]["humidity"],
        "condition": data["weather"][0]["description"],
        "wind_speed": data["wind"]["speed"],
        "wind_deg": data["wind"]["deg"],
        "wind_gust": data["wind"].get("gust", 0),
        "icon": data["weather"][0]["icon"]
    }


app = Flask(__name__)
@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == 'POST':
        city = request.form['city'].strip()

        try:
            lat, lon, name, country = get_coordinate_by_city(city)
            weather = get_datas_weather(lat, lon)

            data = {
                "city" : f"{name}, {country}",
                **weather
            }

            return render_template("result.html", data=data)
        except Exception as e:
            return render_template("index.html", error=f"Erro ao consultar os dados, por favor tente novamente \nError: {e}")

    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)