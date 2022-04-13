/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */


/**
 * Define Global Variables and Constants
 *
 */

// Set time when countdown must stop
const COUNTDOWN_STOP = '2022-11-21T10:00:00Z';

// Container for top navigation
const NAVIGATION_TOP = document.querySelector('.menu-items');
// Container for footer navigation
const NAVIGATION_BOTTOM = document.querySelector('.footer-menu');
// Sections extracted from DOM
const DOM_SECTIONS = document.querySelectorAll('[data-nav], [data-nav-bind]');
// Checkbox to operate hamburger navigation
const CHECKBOX = document.querySelector('.navbar-container [type=checkbox]');

// Global array to store sections' data
let sections = [];
// Variable to store scrolling action
let isScrolling = false;
// Variable to store timer data for requestAnimationFrame
let rafTimer = 0;


/**
 * End Global Variables
 *
 */

/**
 * Helper functions
 */

/**
 * @description Throttle function to limit scroll event handling
 * 
 * @param {function} callback - Function to call 
 * 
 * @param {number} timeFrame - Timeframe to limit function call
 * 
 * @returns {function}
 */

throttle = (callback, timeFrame) => {
    let lastTime = 0;
    return () => {
        const now = new Date();
        if (now - lastTime >= timeFrame) {
            callback();
            lastTime = now;
        }
    };
};

/**
 * @description Run routines which require smooth animation
 * 
 * @param {number} timer - requestAnimationFrame internal timer 
 * 
 * @returns void
 */

rafCallback = (timer) => {

    // Throttle routines execution for performance
    if (timer - rafTimer > 100) {

        // Handle scroll to top button visibility
        scrollTopButtonVisibility();

        // Update countdown timer
        countdownUpdate();

        rafTimer = timer;
    }
    window.requestAnimationFrame(rafCallback);
};

/**
 * @description Handle scroll events
 * 
 * @returns void
 */

onScroll = () => {

    setActiveSectionNavigationItem();
    navbarVisibility();
    animatedVisibility();
};

/**
 * @description Hide side menu on mobile browsers with narrow screen
 * 
 * @returns void
 */
hideSideMenu = () => {

    // Make click on helper checkbox if it's checked
    if (CHECKBOX.checked) {
        CHECKBOX.click();
    }

}

/**
 * End of helper functions
 */


/**
 * Components manipulating functions
 * 
 */

/**
 * @description Get sections from DOM
 * 
 * @returns void
 */

getSections = () => {
    const elements = Array.from(DOM_SECTIONS);

    // First "Home" element with preset values
    sections = [{
        id: 'home',
        top: 0,
        dataset: {
            nav: 'Home'
        },
        class: 'active'
    }];

    // Collect data for each section into object and push to the global variable
    elements.forEach((section) => {
        sections.push({
            id: section.id,
            // 'top' is a getter in order to be able to dynamically calculate section position each time
            // if browser window was resized
            get top() {
                const rect = section.getBoundingClientRect();
                const offset = window.scrollY + rect.top;
                return offset;
            },
            dataset: section.dataset,
        });
    });
};



/**
 * @description Dynamically create navigation from sections in HTML page
 * 
 * @returns void
 */

navigationCreate = () => {

    sections.forEach((section) => {

        // Do not add bound sections to menu
        if (!section.dataset.nav) {
            return;
        }
        // Dynamically create anchor element for top navigation
        const aTop = document.createElement('a');
        aTop.setAttribute('data-id', section.id);
        aTop.innerHTML = section.dataset.nav.toUpperCase();

        // Copy anchor element for bottom navigation
        const aBottom = aTop.cloneNode(true);

        if (section.class) {
            aTop.className = section.class;
        }

        // Create navigation elements and put anchors inside
        const navigationItemTop = document.createElement('li');
        const navigationItemBottom = document.createElement('li');
        navigationItemTop.appendChild(aTop);
        navigationItemBottom.appendChild(aBottom);

        // Add created navigation elements to the containers
        NAVIGATION_TOP.appendChild(navigationItemTop);
        NAVIGATION_BOTTOM.appendChild(navigationItemBottom);
    });
};


/**
 * @description Update countdown timer
 * 
 * @returns void
 */

countdownUpdate = () => {

    // Initialize date-related variables
    const now = new Date();
    const endDate = new Date(COUNTDOWN_STOP);

    // Calculate time difference
    const left = endDate.getTime() - now.getTime();

    // Calculate days, hours and minutes left
    let daysLeft = left > 0 ? Math.floor(left / (1000 * 60 * 60 * 24)) : 0;
    let hoursLeft = left > 0 ? Math.floor(left / (1000 * 60 * 60) - daysLeft * 24) : 0;
    let minutesLeft = left > 0 ? Math.floor(left / (1000 * 60) - daysLeft * 60 * 24 - hoursLeft * 60) : 0;

    // Add '0' to one-character numbers
    if (daysLeft < 10) {
        daysLeft = '0' + daysLeft;
    }
    if (hoursLeft < 10) {
        hoursLeft = '0' + hoursLeft;
    }
    if (minutesLeft < 10) {
        minutesLeft = '0' + minutesLeft;
    }

    // Update DOM
    document.querySelector('span.day-num').innerHTML = daysLeft;
    document.querySelector('span.hour-num').innerHTML = hoursLeft;
    document.querySelector('span.min-num').innerHTML = minutesLeft;
};

/**
 * @description Detect which section is in the viewport and set active section and navigation item 
 * 
 * @returns void
 */

setActiveSectionNavigationItem = () => {

    // Loop through sections
    for (let i = 0; i < sections.length; i++) {

        // Set position at which section considired as visible
        const offset = window.scrollY + window.innerHeight / 3;

        // Find navigation item that matches the current section
        const item = document.querySelector(`.menu-items [data-id="${sections[i].id}"]`);
        const section = document.querySelector(`#${sections[i].id}`);


        // Check if section top is in required range and highlight navigation item with active class
        // and remove inactive class for navigation item
        if (offset > sections[i].top && sections[i + 1] && offset < sections[i + 1].top ||
            offset > sections[i].top && !sections[i + 1]) {
            if (item) {
                item.classList.add('active');
                item.classList.remove('inactive')
            }
            section.classList.add('your-active-class');

            // remove active class if not and add inactive class to navigation item
        } else {
            if (item) {
                item.classList.add('inactive');
                item.classList.remove('active')
            }
            section.classList.remove('your-active-class');
        }
    }
};

/**
 * @description Show or hide elements with specified class name depending of their position
 *              relative to viewport
 * 
 * @returns void
 */

animatedVisibility = () => {

    // Find all elements to animate
    const elements = document.querySelectorAll('.text-animate');

    // Loop through elements
    elements.forEach((element) => {

        // Get element's boundaries
        const rect = element.getBoundingClientRect();

        // Check if element already has animation class
        if (element.classList.contains('animate-fade-in')) {

            // and element is out if viewport - remove animation class
            if (rect.bottom < 0 || rect.top > window.innerHeight) {
                element.classList.remove('animate-fade-in');
            }

            // If it doesn't have animation class set
        } else {

            // and its top is in viewport - set animation class
            if (rect.top > 0 && rect.top < window.innerHeight) {
                element.classList.add('animate-fade-in');
            }
        }
    });
};

/**
 * @description Hide/show navbar and side navigation on scroll
 * 
 * @returns void
 */

navbarVisibility = () => {

    // Clear timeout if window is still scrolling
    window.clearTimeout(isScrolling);

    // Check if window is scrolled below visibility of the navbar on first screen
    if (window.scrollY > 200) {

        // Hide side navigation in mobile
        hideSideMenu();

        // Hide navbar
        document.querySelector('#navbar').classList.add('navbar-hidden')
    }

    // Make navbar visible after timeout if scroll stops
    isScrolling = setTimeout(function () {
        document.querySelector('#navbar').classList.remove('navbar-hidden')
    }, 300);
}

/**
 * @description Handle navigation click events with event delegation
 * 
 * @returns void
 */

onNavigationClick = (event) => {

    // Check if click happened on desired target
    if (event.target.dataset.id) {

        // Loop through sections to find one matching click target
        sections.forEach((section) => {
            if (section.id === event.target.dataset.id) {
                event.preventDefault();

                // Hide side navigation in mobile
                hideSideMenu();

                // Scroll to the section top
                window.scrollTo({
                    top: section.top,
                    behavior: 'smooth'
                });
            }
        });
    }
};

/**
 * @description Create scroll to top button
 * 
 * @returns void
 */

createScrollTopButton = () => {

    // Dynamically create element
    const button = document.createElement('div');
    button.classList.add('scroll-top-button');

    // Set listener for click event
    button.addEventListener('click', (event) => {

        // Hide side navigation in mobile
        hideSideMenu();

        // Scroll to the top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Append element to the DOM
    document.body.appendChild(button);

    // Make element visible if page is scrolled at initialization 
    if (window.scrollY > 100) {
        button.classList.add('scroll-top-button-visible');
    }
};

/**
 * @description Manipulate with scroll top button visibility
 * 
 * @returns void
 */

scrollTopButtonVisibility = () => {

    const button = document.querySelector('.scroll-top-button');

    // Add or remove visibility class depending of page scroll position
    if (window.scrollY > 100) {
        button.classList.add('scroll-top-button-visible');
    } else {
        button.classList.remove('scroll-top-button-visible');
    }
};

/**
 * @description Run initial setup
 * 
 * @returns void
 */

init = () => {

    // Get sections from HTML
    getSections();

    // Build navigation 
    navigationCreate();

    // Add scroll to the top button
    createScrollTopButton();

    // Start routines required for smooth animation
    window.requestAnimationFrame(rafCallback);

    // Listen for scroll events
    window.addEventListener('scroll', throttle(onScroll, 100));

    // Listen for navigation click events
    NAVIGATION_TOP.addEventListener('click', onNavigationClick);
    NAVIGATION_BOTTOM.addEventListener('click', onNavigationClick);
};


// Initialize 

init();


/**
 *
 * Minimalistic scroll slider with a few parameters
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

class Slider {

    // Reference to an aelement that contains slides
    container = null;

    // Reference to an element that contains control dots
    dotsContainer = null;

    // Array of slides elements
    elements = [];

    // Array of control dots element
    dots = [];

    // Variable that keeps timer id
    sliderTimer = false;

    // Options object
    options = {};

    /**
     * @description Constructor of Slider class
     * 
     * @param {string} selector - CSS selector of element which contains slides
     * @param {object} options - Options object
     */

    constructor(selector, options) {

        // Default options for slider
        const defaultOptions = { speed: 3000, autoStart: true };

        // Find container by CSS selector
        const container = document.querySelector(selector);

        // Assign class properties
        this.options = { ...defaultOptions, ...options };
        this.container = container;

        if (!container) {
            throw Error('Slider container not found: ', container);
        }

        // Initialize slider
        this.init();

    }

    /**
     * @description Slider initialization
     * 
     */

    init = () => {

        // Assign slider's classes
        this.prepareContainer();

        // Create dots navigation
        this.makeDots();

        // Run auto-start
        this.startAutoSlider();

        // Apply scroll handler
        this.container.addEventListener('scroll', this.onScroll);

        // Highlight active dot controller
        // window.requestAnimationFrame(this.setActiveDot)
        this.setActiveDot();
    }


    /**
     * @description Remove slider presence from DOM
     * 
     */
    destroy = () => {

        // Remove timer
        clearTimeout(this.sliderTimer);

        // Remove scroll handler
        this.container.removeEventListener('scroll', this.onScroll);

        // Remove slider container class
        this.container.classList.remove('slider-container');

        // Remove dots controller from DOM
        this.dotsContainer.remove();

        // Remove slider classes from slides
        this.elements.forEach(element => element.classList.remove('slider-element'));

    }

    /**
     * @description Apply slider's classes to container and slides
     * 
     */
    prepareContainer = () => {

        // Apply slider container class
        this.container.classList.add('slider-container');

        // Apply slider element's classes to slides and add these elements to array
        Array.from(this.container.children).forEach((child, i) => {
            child.classList.add('slider-element');
            this.elements.push(child);
        });
    }


    /**
     * @description Create dot navigation
     * 
     */
    makeDots = () => {

        // Create container and apply dot class
        const dotsContainer = document.createElement('div');
        dotsContainer.classList.add('slider-dots');

        // Loop through slides elements
        this.elements.forEach((element) => {

            // Create individual dot for each slide
            const dot = document.createElement('div');

            // Highlight firs dot as active
            if (!this.dots.length) {
                dot.classList.add('active')
            }

            // Apply classes for each dot
            dot.classList.add('slider-dots-dot');

            // Add click handler
            dot.addEventListener('click', (e) => { this.onDotClick(dot, element) })

            // Add dot elements to array
            this.dots.push(dot);

            // Add dot element to container
            dotsContainer.appendChild(dot);
        });

        // Add dot controller container to DOM
        this.container.parentElement.appendChild(dotsContainer);

        // Make a reference to dots container
        this.dotsContainer = dotsContainer;
    }


    /**
     * @description Click handler for dot controller
     * 
     * @param {HTMLElement} dot - Dot which was clicked
     * @param {HTMLElement} slide - Slide related to clicket dot
     */
    onDotClick = (dot, slide) => {

        // Stop auto-scroll timer
        clearTimeout(this.sliderTimer);

        // Clear active class from every dot
        Array.from(this.dotsContainer.children).forEach((el) => el.classList.remove('active'));

        // Add active class to clicked dot
        dot.classList.add('active')

        // Scroll container to related slide
        this.container.scrollLeft = slide.offsetLeft - this.container.offsetLeft + slide.clientWidth / 2 - this.container.clientWidth / 2;

        // Start auto-scroll
        this.startAutoSlider();
    }

    /**
     * @description Scroll handler
     * 
     */
    onScroll = () => {

        // Stop auto-scroll timer while user is scrolling
        clearTimeout(this.sliderTimer);

        // Start auto-scroll when user stops scrolling 
        this.startAutoSlider();
    }

    /**
     * @description Highlight active dot controller
     * 
     */
    setActiveDot = () => {

        // Calculate container's center
        const centerX = this.container.scrollLeft + this.container.clientWidth / 2;

        // Remove active class from all dots
        this.dots.forEach(dot => dot.classList.remove('active'));

        //  Highlight first dot if container scrolled to the left 
        if (this.container.scrollLeft == 0) {
            this.dots[0].classList.add('active');
        }
        // Highlight last dot if controller scrolled to the right
        else if (this.container.scrollLeft == this.container.scrollWidth - this.container.clientWidth) {
            this.dots[this.dots.length - 1].classList.add('active');
        } else {

            // Loop through slides elements array
            this.elements.forEach((element, i) => {
                // Check if slide element is in center position and highlight it with active class
                if (element.offsetLeft - this.container.offsetLeft < centerX && centerX < element.offsetLeft - this.container.offsetLeft + element.clientWidth) {
                    this.dots[i].classList.add('active');
                }
            });
        }

        requestAnimationFrame(this.setActiveDot);
    }

    /**
     * @description Start auto-scroll
     * 
     */
    startAutoSlider = () => {

        // Check if autoStart option is on
        if (this.options.autoStart) {

            // Set timer to start auto-scroll after 'speed' option of time
            this.sliderTimer = setTimeout(this.nextSlide, this.options.speed);
        }
    }

    /**
     * @description Scroll slider to the next slide
     * 
     */
    nextSlide = () => {

        // Variable to keep number of next slide
        let nextActive = -1;

        // Loop through all dots
        for (let i = 0; i < this.dots.length; i++) {

            // Check current highlighted dot
            if (this.dots[i].classList.contains('active')) {
                
                // Remove active class from it
                this.dots[i].classList.remove('active');

                // Calculate the number of next slide element
                if (i == this.dots.length - 1) {
                    nextActive = 0
                } else {
                    nextActive = i + 1
                }
            }
        }

        // If next slide element is calculated
        if (nextActive > -1) {

            // Scroll container to next slide element
            this.container.scrollLeft = this.elements[nextActive].offsetLeft - this.container.offsetLeft + this.elements[nextActive].clientWidth / 2 - this.container.clientWidth / 2;

            // Highlight next dot with active class
            this.dots[nextActive].classList.add('active');
        }

        // Start auto-scroll
        this.startAutoSlider();
    }
}