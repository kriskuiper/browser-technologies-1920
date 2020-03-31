if ('querySelector' in document) {
    document.body.classList.add('js-enabled')
}

const notificationIsAvailable = Boolean(window.Notification)
const nativeShareIsAvailable = typeof Navigator.share === 'function'
const requestIsAvailable = typeof XMLHttpRequest !== null || typeof XMLHttpRequest !== undefined

const formContentsElement = document.getElementById('form-contents')
const notificationButton = document.getElementById('js-notify-button')
const shareLink = document.getElementById('share-link')
const snackbarElement = document.getElementById('js-snackbar')
const snackbarTextElement = snackbarElement.querySelector('p')

if (notificationIsAvailable && notificationButton) {
    notificationButton.removeAttribute('disabled')
    notificationButton.classList.remove('is--hidden')
    notificationButton.textContent = 'Keep me updated'
    notificationButton.addEventListener('click', handleNotificationPermission)
}

shareLink.addEventListener('click', handleShare)

function handleNotificationPermission() {
    return Notification.requestPermission()
        .then(function(result) {
            if (result === 'granted') {
                toggleSnackbar('We will send you updates')
            } else {
                notificationButton.toggleAttribute('disabled')
                toggleSnackbar('You will not recieve updates about the stage')
            }
        })
        .catch(function(error) {
            console.error(error)
            
            toggleSnackbar('Something went wrong')
        })
}

function handleShare(event) {
    if (requestIsAvailable || nativeShareIsAvailable) {
        event.preventDefault()
    }

    if (nativeShareIsAvailable) {
        return Navigator.share({
            title: 'Standings in the Tour de France',
            text: 'I like you to watch the standings in the current stage in the tour de france',
            url: window.location.href
        })
    }

    // Display form contents in a below the share buttons
    displayFormContents(event.target)
}

function displayFormContents(target) {
    const url = target.href

    return getHTMLContents('GET', url)
        .then(function(responseDocument) {
            const form = responseDocument.querySelector('form')

            form.addEventListener('submit', handleFormSubmit)
            formContentsElement.appendChild(form)
        })
        .catch(function(error) {
            toggleSnackbar(error)
        })
}

function getHTMLContents(method, url) {
    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest()

        xhr.open(method, url)
        xhr.responseType = 'document'

        xhr.onload = function() {
            resolve(xhr.response)
        }

        xhr.onerror = function() {
            reject('An error happened')
        }
        
        xhr.send()
    })
}

function handleFormSubmit(event) {
    event.preventDefault()
    
    const link = document.createElement('a')
    const emailInput = event.target.querySelector('[type="email"]')
    const messageInput = event.target.querySelector('textarea')
    const emailInputValue = emailInput.value
    const messageInputValue = messageInput.value

    link.href = `mailto:${emailInputValue}?subject=Something happened in the tour!&body=${messageInputValue}`
    link.classList.add('button')
    link.textContent = 'Email your friend'

    event.target.appendChild(link)
}

function toggleSnackbar(message) {
    showSnackbar(message)
    setTimeout(hideSnackbar, 3000)
}

function showSnackbar(message) {
    snackbarTextElement.textContent = message
    snackbarElement.classList.toggle('is--shown')
}

function hideSnackbar() {
    snackbarElement.classList.toggle('is--shown')
}