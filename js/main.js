/*=============== LOAD LAZY IMAGES ===============*/
document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages;

    if ("IntersectionObserver" in window) {
        lazyloadImages = document.querySelectorAll(".lazy");
        var imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove("lazy");
                    imageObserver.unobserve(image);
                }
            });
        });

        lazyloadImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    } else {
        var lazyloadThrottleTimeout;
        lazyloadImages = document.querySelectorAll(".lazy");

        function lazyload () {
            if(lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout);
            }

            lazyloadThrottleTimeout = setTimeout(function() {
                var scrollTop = window.pageYOffset;
                lazyloadImages.forEach(function(img) {
                    if(img.offsetTop < (window.innerHeight + scrollTop)) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                    }
                });
                if(lazyloadImages.length == 0) {
                    document.removeEventListener("scroll", lazyload);
                    window.removeEventListener("resize", lazyload);
                    window.removeEventListener("orientationChange", lazyload);
                }
            }, 20);
        }

        document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);
    }
})

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
