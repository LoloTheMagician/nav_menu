import Lenis from "lenis";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)
// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis({
    lerp: 0.125,
    // easing: (x) => {
    //     return 1 - Math.pow(1 - x, 3);
    // },
});

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', () => {
    ScrollTrigger.update
    // console.log('SCROLL!')
});

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    // console.log(lenis.progress)
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);


requestAnimationFrame(lenis.raf);


const tl_image = gsap.timeline({
    // onComplete: () => console.log('COMPLETE!'),
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
    .from('.main__image h2 p', {
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

const lg = () => console.log('PEPE')

const footerTl = gsap.timeline({
    scrollTrigger: {
        trigger: '#footer',
        end: '25% center',
        markers: true,
        scrub: 1,
    },
    onRepeat: () => {
        console.log('STARTED TIMELINE FOOTER')
        // gsap.to('main:is(article::last-of-type)', { opacity: 0 })
        // gsap.to('main', {backgroundColor: 'red'})
    },
    onComplete: () => {
        gsap.to('main', {backgroundColor: 'red'})
    },
    onReverseComplete: () => {
        gsap.to('main', {backgroundColor: 'transparent'})
    }
})


footerTl.from('.footer__wrapper', {
    y: 200,
    ease: 'sine.in',
})