from flask import Blueprint, render_template

templates_bp = Blueprint('templates', __name__)

@templates_bp.route('/')
def rates_page():
    return render_template('rates.html')

@templates_bp.route('/history')
def history_page():
    return render_template('history.html')
