const modalContainer = document.getElementById('modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const consentFormEle = document.getElementById('consent-form');
const modalText = document.getElementById('modal-text');
const declineBtn = document.getElementById('decline-btn');
const modalBtns = document.getElementById('modal-choice-btns');

setTimeout(function() {
    modalContainer.style.display = 'initial';
}, 1500);

modalCloseBtn.addEventListener('click', function() {
    modalContainer.style.display = 'none';
});

declineBtn.addEventListener('mouseenter', function() {
    modalBtns.classList.toggle('reverse');
})



consentFormEle.addEventListener('submit', function(e) {
    e.preventDefault();

    // FORM DATA
    const consentFormData = new FormData(consentFormEle);
    const name = consentFormData.get('fullName');

    modalText.innerHTML = 
    `<div class="modal-inner-loading">
        <img src="images/loading.svg" class="loading">
        <p id="upload-text">Uploading your data to the dark web...</p>
    </div>`

    setTimeout(() => {
        document.getElementById('upload-text').innerText = `Making the sale...`;
    }, 1500);

    setTimeout(() => {
        document.getElementById('modal-inner').innerHTML =
        `<h2>Thanks you <span class="modal-display-name">${name}</span>, sucker! </h2>
        <p>We just sold the rights to your eternal soul.</p>
        <div class="idiot-gif">
            <img src="images/pirate.gif">
        </div>
        `;
        modalCloseBtn.disabled = false;
    }, 3000);

    
})


/*
Note:
1. always add event listener on the whole form and not on the button when listening to click
2. formdata and get()
*/

