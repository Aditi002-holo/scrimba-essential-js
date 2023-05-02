import { catsData } from './data.js'

// Target elements
const emotionRadio = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')


// Event Listeners
emotionRadio.addEventListener('change', highlightCheckedOption)

memeModalCloseBtn.addEventListener('click', closeModal)

getImageBtn.addEventListener('click', renderCat)



// Functions
function highlightCheckedOption(e) {
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios) {
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal() {
    memeModal.style.display = 'none'
}

/*
Order in which the functions should execute
    3. getMatchingCatsArray
    2. getSingleCatObject
    1. renderCat() on the modal
*/

function renderCat() {
    const catObject = getSingleCatObject()
    memeModalInner.innerHTML =        
    `<img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
    >`
    memeModal.style.display = 'flex'
}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray()

    if(catsArray.length === 1) {
        return catsArray[0]
    } else {
        let randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}

function getMatchingCatsArray(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked

        const matchingCatsArray = catsData.filter(function(catData) {
            if(isGif) {
                return catData.emotionTags.includes(selectedEmotion) && catData.isGif
            } else {
                return catData.emotionTags.includes(selectedEmotion)
            }
        })

        return matchingCatsArray
    }  
}


function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if(!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion)               
            }
        }
    }

    return emotionsArray
}

function renderEmotionsRadio(cats) {
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions) {
        radioItems += 
        `<div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadio.innerHTML = radioItems
}

renderEmotionsRadio(catsData)

