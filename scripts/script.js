import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger)
// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis({
    lerp: 0.125,
    syncTouch: true,
});

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', () => {
    ScrollTrigger.update
});


window.ontouchstart = () => console.log(lenis.isTouching)

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    // console.log(lenis.progress)
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);


requestAnimationFrame(lenis.raf);


const tl_intro = gsap.timeline()


tl_intro
    .from('.body__header', {
        delay: .25,
        x: 100,
        opacity: 0,
        ease: 'back.out',
        duration: .75
    })
    .fromTo('body> nav > *', {
        y: -25,
        opacity: 0,
    }, {
        ease: 'back.out',
        stagger: .25,
        y: 0,
        opacity: 1,
    })
    .fromTo('body > main .gallery .gallery__card', {
        y: 150,
        opacity: 0,
    }, {
        y: 0,
        opacity: 1,
        ease: 'back.out',
        stagger: .125,
        duration: .75

    })


const tl_image = gsap.timeline({
    scrollTrigger: {
        trigger: '.main__image',
        start: '-75% center',
        end: '45% center',
        // markers: true,
        scrub: 1,
    }
})


tl_image
    .from('.main__image', {
        scaleX: .5,
        ease: 'sine.in',
    })
    .from('.main__image h2 .main__image__word', {
        opacity: 0,
        y: 50,
        stagger: .25,
    })


// const tl_nav = gsap.timeline()

// tl_nav.to('nav', {
//     translateY: '-100%',
//     ease: 'sine',

//     scrollTrigger: {
//         trigger: 'footer',
//         start: 'start center',
//         end: 'center center',
//         markers: true,
//         scrub: true,
//     },

//     // onComplete: () => {
//     //     gsap.to('footer', {
//     //         duration: 0.25,
//     //         ease: 'sine',
//     //         backgroundColor: 'transparent',
//     //     })
//     // },
//     // onReverseComplete: () => gsap.to('footer', {
//     //     backgroundColor: '#608BC1',
//     // })
// })

// const options = {
//     root: null,
//     rootMargin: '0px',
//     threshold: 0.25
// };

// const observer = new IntersectionObserver((e) => {
//     const intersection = e.at(0)
//     const { isIntersecting } = intersection
//     if (isIntersecting) {
//         console.info(`INSIDE ${intersection.target.tagName}`, intersection.boundingClientRect)

//     }
// }, options)

// observer.observe(document.querySelector('#footer'))

const [navYMovement, duration, ease] = [20, .15, 'sine.in']
const animProps = {
    y: navYMovement,
    duration,
    ease
}
const tl = gsap.timeline({

    scrollTrigger: {
        trigger: 'footer',
        start: 'start center',
        end: 'center center',
        // markers: true,
        onLeaveBack: () => tl.reverse(),
    },
})

tl
    .to('body > nav h2', {
        ...animProps
    })
    .to('body > nav ul li', {
        ...animProps
    })
tl
    .to('body > nav', {
        translateY: '-100%',
        duration,
        ease
    })


// const tl_main = gsap.timeline({
//     duration: .125,
//     scrollTrigger: {
//         trigger: '#footer',
//         start: 'start center',
//         end: 'center center',
//         markers: true,

//         onLeaveBack: () => tl_main.reverse()
//     }
// })

// tl_main.to('main', {
//     ease: 'sine ',
//     opacity: 0,
// })

const footerTl = gsap.timeline({
    scrollTrigger: {
        trigger: '#footer',
        end: '25% center',
        scrub: 1,
    },
})


footerTl
    .from('.footer__wrapper', {
        y: 200,
        ease: 'sine.in',
    })
