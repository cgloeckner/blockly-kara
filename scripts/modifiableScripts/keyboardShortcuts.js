document.addEventListener('keydown', (event) => {
    console.log('keydown')
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
