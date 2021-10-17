const append = document.getElementById('append')

const btn = document.getElementById('fileAdd')
const field = document.getElementById('fileInput')

const preview = document.getElementById('userImage')

// TRIGGER INPUT VIA BUTTON
btn.addEventListener('click', () => {
    field.click()
})

// INPUT LISTENER

// window.addEventListener('load', function() {
//     document.querySelector('input[type="file"]').addEventListener('change', function() {
//         const upload = this.files

//         // Check for input value
//         if (upload && upload[0]) {
//             append.innerHTML = field.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1] + "?"

//         } else {
//             append.innerHTML = "No file selected"
//         }

//         // Save
//         const files = this.files[0]

//         // Handle image
//         const preview = document.getElementById('userImage')

//         if (files) {
//             const reader = new FileReader()

//             // fileReader.addEventListener('load', () => {
//             //     preview.style.backgroundImage = `url("${this.result}")`
//             //     console.log(this.result)
//             // })
//             // fileReader.readAsDataURL(files)

//             reader.onload = () => {
//                 preview.style.backgroundImage = `url("${this.result}")`
//                 console.log(reader.result)
//             }
//             reader.readAsDataURL(files)
//         }

//     })
// })

// Get image

field.addEventListener('change', function() {

    // use filereader to convert to 64 bit string
    const reader = new FileReader()

    reader.onload = () => {
        console.log(reader.result)
            // save to local storage
        localStorage.setItem('study-image', reader.result)
    }

    reader.readAsDataURL(this.files[0])
})

// Use image
document.addEventListener('DOMContentLoaded', () => {
    const studyImageDataUrl = localStorage.getItem('study-image')

    if (studyImageDataUrl) {
        preview.style.backgroundImage = `url("${studyImageDataUrl}")`
    }
})