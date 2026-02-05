const CONFIG = {
    basePrice: 3423,
    baseSupply: 500,
    volatility: 0.05,
    priceElasticity: 0.8
}

function calculatePrice(supply) {
    const supplyRatio = supply / CONFIG.baseSupply
    let priceFactor = 1 / Math.pow(supplyRatio, CONFIG.priceElasticity)
    let rawPrice = CONFIG.basePrice * priceFactor
    const randomFluctuation = 1 + (Math.random() * CONFIG.volatility * 2 - CONFIG.volatility)
    return (rawPrice * randomFluctuation).toFixed(2)
}
export function simulateMarketActivity(currentPrice, currentSupply) {
    const change = Math.floor(currentSupply * 0.1 * (Math.random() - 0.5))
    currentSupply += change
    const newPrice = calculatePrice(currentSupply)
    return {
        price_libra: parseFloat(newPrice),
        supply: currentSupply
    }
}
