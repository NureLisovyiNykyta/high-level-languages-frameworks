from db import db
import uuid
from datetime import date
from sqlalchemy.dialects.postgresql import UUID
from utils.error_handler import ErrorHandler
from models import ExchangeRate

class ExchangeRateHistory(db.Model):
    __tablename__ = "exchange_rates_history"
    __table_args__ = {"schema": "vmp"}

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    rate_id = db.Column(UUID(as_uuid=True), db.ForeignKey("vmp.exchange_rates.id", ondelete="CASCADE"), nullable=False)
    exchange_rates_code = db.Column(db.String(10), nullable=False)
    buy_rate = db.Column(db.Numeric(10, 4), nullable=False)
    sell_rate = db.Column(db.Numeric(10, 4), nullable=False)
    date = db.Column(db.Date, nullable=False, server_default=db.func.current_date())

    def __repr__(self):
        return f"<ExchangeRateHistory {self.rate_id}: {self.buy_rate}/{self.sell_rate} on {self.date}>"


    @classmethod
    def get_history_by_date(cls, date):
        """Отримує всі записи курсу валют за задану дату."""
        try:
            rate_list = ExchangeRateHistory.query.filter_by(date=date).all()

            if not rate_list:
                return {"message": "No exchange rates found for this date", "date": str(date)}, 404
            history_rate_list = [
                {
                    "rate_id": rate.rate_id,
                    "exchange_rates_code": rate.exchange_rates_code,
                    "buy_rate": float(rate.buy_rate),
                    "sell_rate": float(rate.sell_rate),
                    "date": str(rate.date)
                }
                for rate in rate_list
            ]

            return {"history": history_rate_list}, 200

        except Exception as e:
            return ErrorHandler.handle_error(
                e,
                message="Database error while retrieving exchange rates history",
                status_code=500
            )

    @classmethod
    def save_daily_exchange_rates(cls):
        """Зберігає всі поточні курси валют у історію з однією датою."""
        try:
            today = date.today()

            exchange_rates = ExchangeRate.query.all()

            history_entries = [
                cls(
                    rate_id=rate.id,
                    exchange_rates_code=rate.exchange_rates_code,
                    buy_rate=rate.buy_rate,
                    sell_rate=rate.sell_rate,
                    date=today
                )
                for rate in exchange_rates
            ]

            db.session.bulk_save_objects(history_entries)
            db.session.commit()

            return {"message": "Exchange rates saved successfully", "count": len(history_entries)}
        except Exception as e:
            db.session.rollback()
            return ErrorHandler.handle_error(
                e,
                message="Database error while saving daily exchange rates history",
                status_code=500
            )
