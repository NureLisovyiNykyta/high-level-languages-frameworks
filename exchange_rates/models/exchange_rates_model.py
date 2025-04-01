from db import db
import uuid
from sqlalchemy.dialects.postgresql import UUID
from utils.error_handler import ErrorHandler

class ExchangeRate(db.Model):
    __tablename__ = "exchange_rates"
    __table_args__ = {"schema": "vmp"}

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    exchange_rates_code = db.Column(db.String(10), unique=True, nullable=False)
    buy_rate = db.Column(db.Numeric(10, 4), nullable=False)
    sell_rate = db.Column(db.Numeric(10, 4), nullable=False)
    updated_at = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())

    history = db.relationship(
        "ExchangeRateHistory",
        backref="exchange_rate",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<ExchangeRate {self.exchange_rates_code}: {self.buy_rate}/{self.sell_rate}>"

    @classmethod
    def get_rates(cls):
        try:
            rates = cls.query.all()
            rates_list = [
                {
                    "exchange_rates_code": rate.exchange_rates_code,
                    "buy_rate": float(rate.buy_rate),
                    "sell_rate": float(rate.sell_rate),
                    "updated_at": rate.updated_at.isoformat()
                } for rate in rates
            ]
            return {"rates": rates_list}, 200

        except Exception as e:
            return ErrorHandler.handle_error(
                e,
                message="Database error while retrieving exchange rates",
                status_code=500
            )

    @classmethod
    def add_rate(cls, data):
        try:
            exchange_rates_code = data.get('exchange_rates_code')
            buy_rate = data.get('buy_rate')
            sell_rate = data.get('sell_rate')

            new_rate = cls(
                exchange_rates_code=exchange_rates_code,
                buy_rate=buy_rate,
                sell_rate=sell_rate
            )

            db.session.add(new_rate)
            db.session.commit()

            return {"message": "Exchange rate added successfully"}, 201

        except Exception as e:
            return ErrorHandler.handle_error(
                e,
                message="Database error while adding exchange rate",
                status_code=500
            )

    @classmethod
    def update_rate(cls, data):
        try:
            exchange_rates_code = data.get('exchange_rates_code')
            buy_rate = data.get('buy_rate')
            sell_rate = data.get('sell_rate')

            rate = cls.query.filter_by(exchange_rates_code=exchange_rates_code).first()
            if rate is None:
                raise ValueError("Exchange rate not found.")

            rate.buy_rate = buy_rate
            rate.sell_rate = sell_rate

            db.session.commit()

            return {"message": "Exchange rate updated successfully"}, 200

        except ValueError as ve:
            return ErrorHandler.handle_validation_error(str(ve))

        except Exception as e:
            return ErrorHandler.handle_error(
                e,
                message="Database error while updating exchange rate",
                status_code=500
            )
