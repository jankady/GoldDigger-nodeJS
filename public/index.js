
const investBtn = document.getElementById('invest-btn')
const dialogMessage = document.getElementById('dialog-message')
const closeDialogBtn = document.getElementById('close-dialog-btn')
const investmentAmount = document.getElementById('investment-amount')

investBtn.addEventListener('click',  async (e) => {
    try {
        e.preventDefault()
        const response = await fetch('/api/events/price')
        const data = await response.json()
        // console.log(data.price_libra)
        const currentOunces =  (investmentAmount.value / data.price_libra).toFixed(3)
        document.getElementById('investment-summary').textContent = `You just bought ${currentOunces} ounces (ozt) for £${investmentAmount.value}.
    \n You will receive documentation shortly.`

        dialogMessage.showModal()

        const mailResponse = await fetch('/api/invest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                investmentAmount: investmentAmount.value,
                ounces: currentOunces
            })
        })

        const result = await mailResponse.json()
        if (result.success) document.getElementById('investment-summary').textContent = `
        You just bought ${currentOunces} ounces (ozt) for £${investmentAmount.value}.
        \n A confirmation email has been sent to your inbox.`
        else alert('Error: ' + result.error)

    } catch (err) {
        console.error('Error:', err)
        alert('Connection error. Please try again.')
    }
})

closeDialogBtn.addEventListener('click', (e) => {
    e.preventDefault()
    investmentAmount.value = ''
    dialogMessage.close()
})
