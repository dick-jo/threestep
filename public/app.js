var Jimp = require('jimp')

// GLOBALS
const levelsColour = 8;
const levelsMono = 4;

// IMAGE STORAGE
// target = target html element
// stored = base64 data url in local storage
const studyOriginal = {
    target: document.querySelector('#studyOriginal'),
    stored: localStorage.getItem('study-image')
}
const studyPostColour = {
    target: document.querySelector('#studyPostColour'),
    stored: localStorage.getItem('study-image-post-colour')
}
const studyPostMono = {
    target: document.querySelector('#studyPostMono'),
    stored: localStorage.getItem('study-image-post-mono')
}
const allImages = [studyOriginal, studyPostColour, studyPostMono]

// SOLO OVERLAY IMAGE
const soloOverlay = {
    target: document.querySelector('#soloOverlay'),
    stored: localStorage.getItem('study-image'),
    child: document.querySelector('#soloImage')
}

// RENDER IMAGES
const renderImage = (image) => {
    image.target.style.backgroundImage = `url("${image.stored}")`
    setState(image.target, 'ready')
}

const renderAllImages = (images) => {
    images.forEach((image, index) => {
        setTimeout(function() {
            image.target.style.backgroundImage = `url("${image.stored}")`
            setState(image.target, 'ready')
        }, (index + 1) * 600)
    })
}

// SET STATES
const setState = (target, state) => {
    target.dataset.state = state
}

const setStateAll = (images, state) => {
    images.forEach((image, index) => {
        setTimeout(function() {
            setState(image.target, state)
        }, (index + 1) * 120)
    })
}

// GET IMAGES FROM STORAGE
if (studyOriginal.target) {
    renderAllImages(allImages)
}

// UPLOAD LISTENER
const field = document.getElementById('fileInput')

field.addEventListener('change', function() {

    // use filereader to convert to 64 bit string
    const reader = new FileReader()
    reader.onload = () => {
        // update local storage
        localStorage.setItem('study-image', reader.result)
        studyOriginal.stored = reader.result

        processStudy("colour", reader.result)
        processStudy("mono", reader.result)
        renderAfterProcess()
    }
    reader.readAsDataURL(this.files[0])
})

// RENDER STUDIES
async function processStudy(process, url) {
    Jimp.read(url).then(image => {
        if (process == "colour") {
            image.posterize(levelsColour)
        } else {
            image.posterize(levelsMono).greyscale().brightness(.18).contrast(.12)
        }
        image.getBase64Async(Jimp.AUTO).then(base64 => {
            if (process == "colour") {
                localStorage.setItem('study-image-post-colour', base64)
                studyPostColour.stored = base64
            } else {
                localStorage.setItem('study-image-post-mono', base64)
                studyPostMono.stored = base64
            }
        })
    })
}

// FINAL RENDER AFTER PROCESSING
async function renderAfterProcess() {
    renderAllImages(allImages)
        // temp fix to stop solo overlay flash
    soloOverlay.child.style.backgroundImage = `url("${studyOriginal.stored}")`
}

// 
// ONCLICKS
// 

// TRIGGER INPUT VIA BUTTON
const btnFileAdd = document.getElementById('fileAdd')

btnFileAdd.addEventListener('click', () => {
    setStateAll(allImages, 'pending')
    field.click()
})

// CHANGE ORIENTATION
const btnChangeOrientation = document.querySelector('#changeOrientation')
const mainContainer = document.querySelector('main')

btnChangeOrientation.addEventListener('click', () => {
    mainContainer.dataset.orientation == 'portrait' ? mainContainer.dataset.orientation = 'landscape' : mainContainer.dataset.orientation = 'portrait'
    console.log("clicky")
})

// FULLSCREEN
soloOverlay.target.addEventListener('click', () => {
    soloOverlay.target.dataset.focus = 'false'
})

studyOriginal.target.addEventListener('click', () => {
    soloOverlay.target.dataset.focus = 'true'
    soloOverlay.child.style.backgroundImage = `url("${studyOriginal.stored}")`
})

studyPostColour.target.addEventListener('click', () => {
    soloOverlay.target.dataset.focus = 'true'
    soloOverlay.child.style.backgroundImage = `url("${studyPostColour.stored}")`
})

studyPostMono.target.addEventListener('click', () => {
    soloOverlay.target.dataset.focus = 'true'
    soloOverlay.child.style.backgroundImage = `url("${studyPostMono.stored}")`
})