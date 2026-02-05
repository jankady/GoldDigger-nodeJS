
const investBtn = document.getElementById('invest-btn')
const dialogMessage = document.getElementById('dialog-message')
const closeDialogBtn = document.getElementById('close-dialog-btn')
const investmentAmount = document.getElementById('investment-amount')

investBtn.addEventListener('click',  async (e) => {
    e.preventDefault()
    const response = await fetch('/api/events/price')
    const data = await response.json()
    console.log(data.price_libra)
    const total =  (investmentAmount.value / data.price_libra).toFixed(3)
    document.getElementById('investment-summary').textContent = `You just bought ${total} ounces (ozt) for £${investmentAmount.value}.
    \n You will receive documentation shortly.`
    dialogMessage.showModal()
})

closeDialogBtn.addEventListener('click', (e) => {
    e.preventDefault()
    investmentAmount.value = ''
    dialogMessage.close()
})