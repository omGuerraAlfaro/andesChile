export interface WebpayRequest {
    amount: number,
    buyOrder: string,
    sessionId: string,
    returnUrl: string,
}

export interface confirmTransfRequest {
    buy_order: string,
    correo: string,
}