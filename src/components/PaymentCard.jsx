import React from 'react';

import { ReactComponent as Visa } from '../assets/icons/visa.svg';
import { ReactComponent as Mastercard } from '../assets/icons/mastercard.svg';

import './PaymentCard.scss';

const PaymentCard = (data) => {
    return (
        <div className="payment-card">
            {data.carte && (
                <>
                    <div className="payment-card__flex">
                        <p className="payment-card__title">Carte de paiement</p>
                        {data.carte.card === 'Visa' ? (
                            <Visa className="visa" />
                        ) : (
                            <Mastercard className="visa" />
                        )}
                    </div>
                    <p className="payment-card__number">
                        •••• •••• •••• {data.carte.number.slice(-4)}
                    </p>

                    <div className="payment-card__flex payment-card__flex--bottom">
                        <p className="payment-card__title payment-card__title--min">
                            2.456 €
                        </p>
                        <p className="payment-card__title payment-card__title--min">
                            {data.carte.expiration}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default PaymentCard;
