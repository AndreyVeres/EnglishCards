if (!document.cookie) {
    preloader();
}
function preloader() {
    const buttons = document.querySelectorAll('.popup__btn');
    const preloader = document.querySelector('.preloader');
    const popups = document.querySelectorAll('.popup');
    let popupCount = 0;
    popups[popupCount].style.display = 'flex';
    preloader.style.opacity = '1';
    preloader.style.visibility = 'visible';
    function nextPopup() {
        popupCount++;
        if (popupCount === popups.length) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            document.cookie = "preloader = true";
            return;
        }
        popups.forEach(popup => {
            popup.style.display = 'none';
        });
        popups[popupCount].style.display = 'flex';
    }
    buttons.forEach(btn => btn.addEventListener('click', nextPopup));
}




