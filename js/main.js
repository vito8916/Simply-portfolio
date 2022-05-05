/*=============== LOAD LAZY IMAGES ===============*/
document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries ) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.srcset = lazyImage.dataset.srcset;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});

const themeButton = document.getElementById('btn-change-theme')
const darkTheme = 'dark-theme'

const selectedTheme = localStorage.getItem('selected-theme')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    localStorage.setItem('selected-theme', getCurrentTheme())
})

/*=============== TABS ===============*/
const tabs = document.querySelectorAll('.tab__button'),
    tabContent = document.querySelectorAll('.tab_content')

tabs.forEach(tab => {
    tab.addEventListener('click', () =>{
        tabContent.forEach(tc =>{
            tc.classList.toggle('active')
        })
        tabs.forEach(t =>{
            t.classList.toggle('tab-active')
        })
    })
})


/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '20px',
    duration: 1500,
})

sr.reveal(`.profile__picture`)
sr.reveal(`.profile__name`, {delay: 400})
sr.reveal(`.profile__description`, {delay: 500})
sr.reveal(`.profile__social`, {delay: 600})
sr.reveal(`.profile__facts-fact`, {interval: 100, delay: 600})
sr.reveal(`.profile__buttons`, {interval: 100, delay: 700})
sr.reveal(`.projects__card`, {interval: 100, delay: 800})
sr.reveal(`.tabs`, {delay: 800})
