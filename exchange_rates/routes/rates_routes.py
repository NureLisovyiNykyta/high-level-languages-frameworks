from flask import Blueprint, request
from models import ExchangeRate
from models import ExchangeRateHistory

rates_bp = Blueprint('rates', __name__)


@rates_bp.route('/add_rate', methods=['POST'])
def add_rate():
    data = request.get_json()
    return ExchangeRate.add_rate(data)

@rates_bp.route('/update_rate', methods=['PUT'])
def update_rate():
    data = request.get_json()
    return ExchangeRate.update_rate(data)

@rates_bp.route('/get_rates', methods=['GET'])
def get_rates():
    return ExchangeRate.get_rates()

@rates_bp.route('/save_daily_rates', methods=['POST'])
def save_daily_rates():
    return ExchangeRateHistory.save_daily_exchange_rates()

@rates_bp.route("/get_rates_history_by_date", methods=["POST"])
def get_rates_history():
    data = request.get_json()
    date = data.get("date")
    return ExchangeRateHistory.get_history_by_date(date)
