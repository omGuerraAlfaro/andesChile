export interface WebpayRespuesta {
    "vci": string,
    "amount": number,
    "status": string,
    "buy_order": string,
    "session_id": string,
    "card_detail": any,
    "accounting_date": string,
    "transaction_date": string,
    "authorization_code": string,
    "payment_type_code": string,
    "response_code": number,
    "installments_number": number
}
