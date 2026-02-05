 
const goldEvent = new EventSource('/api/events')

const priceDisplay = document.getElementById('price-display')
const connectionStatus = document.getElementById('connection-status')

// Listen for messages from the server
goldEvent.onmessage = (event) => {
    const data = JSON.parse(event.data)
    connectionStatus.textContent = 'Live Price 🟢'
    priceDisplay.textContent = data.price_libra
}
// error connection
goldEvent.onerror = (error) => {
    console.log('connection lost', error)
    connectionStatus.textContent = 'Offline 🔴'
    priceDisplay.textContent = '----.--'
}