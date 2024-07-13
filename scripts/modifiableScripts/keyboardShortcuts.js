let last_active = null

document.addEventListener('keydown', (event) => {
    console.log(document.activeElement.tagName)
    if (document.activeElement.tagName == 'INPUT' || last_active == 'INPUT') {
        // ignore controls
        console.log('ignore')
        last_active = document.activeElement.tagName
        if (event.key == 'Enter') {
            last_active = null
        }
        return
    }

    if (event.key == 'ArrowUp' || event.key == 'w') {
        event.preventDefault()
        document.getElementById('move').click()
    }
    if (event.key == 'ArrowLeft' || event.key == 'a' || event.key == 'q') {
        event.preventDefault()
        document.getElementById('left').click()
    }
    if (event.key == 'ArrowRight' || event.key == 'd' || event.key == 'e') {
        event.preventDefault()
        document.getElementById('right').click()
    }
    if (event.key == 'Enter') {
        event.preventDefault()
        document.getElementById('take').click()
    }
    if (event.key == ' ') {
        event.preventDefault()
        document.getElementById('put').click()
    }
})
