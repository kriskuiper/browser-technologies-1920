const notificationIsAvailable = Boolean(window.Notification)
const nativeShareIsAvailable = typeof navigator.share === 'function'
const requestIsAvailable = typeof XMLHttpRequest !== null && typeof XMLHttpRequest !== undefined
const pushstateIsAvailable = typeof window.history.pushState !== null && typeof window.history.pushState !== undefined

console.log('joejoe', typeof navigator.share)

const formContentsElement = document.getElementById('form-contents')
const notificationButton = document.getElementById('js-notify-button')
const shareLink = document.getElementById('share-link')
const snackbarElement = document.getElementById('js-snackbar')
const snackbarTextElement = snackbarElement.querySelector('p')
const rankingLinks = document.querySelectorAll('.stage-page__ranking > a')

let formIsShown = false

if (notificationIsAvailable && notificationButton) {
    notificationButton.removeAttribute('disabled')
    notificationButton.classList.remove('is--hidden')
    notificationButton.textContent = 'Keep me updated'
    notificationButton.addEventListener('click', handleNotificationPermission)
}

if (pushstateIsAvailable && rankingLinks) {
    for (link of rankingLinks) {
        link.addEventListener('click', handleRankingChange)
    }
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
        return navigator.share({
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

            if (!formIsShown) {
                form.addEventListener('submit', handleFormSubmit)
                formContentsElement.appendChild(form)

                formIsShown = true
            } else {
                const currentForm = formContentsElement.querySelector('form')

                formContentsElement.removeChild(currentForm)

                formIsShown = false
            }
        })
        .catch(function(error) {
            toggleSnackbar(error)
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

function handleRankingChange(event) {
    event.preventDefault()

    for (link of rankingLinks) {
        // I'd prefer a link.closest('li') here but that doesn't work
        // in IE...
        
        const listElement = link.parentNode

        if (listElement.classList.contains('stage-page__ranking--is-active')) {
            listElement.classList.remove('stage-page__ranking--is-active')
        }
    }

    const href = event.target.href
    const url = new URL(href)
    const pathname = url.pathname
    const li = event.target.parentNode

    li.classList.add('stage-page__ranking--is-active')

    window.history.pushState(null, null, pathname)

    getHTMLContents('GET', href)
        .then(function(responseDocument) {
            const standingsContainerElement = document.querySelector('.stage-page__standings')
            const currentStandings = document.querySelector('.stage-page__standings-list')
            const newStandings = responseDocument.querySelector('.stage-page__standings-list')

            standingsContainerElement.replaceChild(newStandings, currentStandings)
        })
        .catch(function(error) {
            toggleSnackbar(OverconstrainedError)
        })
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