
const goldEvent = new EventSource('/api/events')

const priceDisplay = document.getElementById('price-display')
const connectionStatus = document.getElementById('connection-status')

goldEvent.onmessage = (event) => {
    const data = JSON.parse(event.data)
    connectionStatus.textContent = 'Live Price 🟢'
    priceDisplay.textContent = '0'
}

goldEvent.onerror = (error) => {
    console.log('connection lost', error)
    connectionStatus.textContent = 'Offline 🔴'
    priceDisplay.textContent = '----.--'
}