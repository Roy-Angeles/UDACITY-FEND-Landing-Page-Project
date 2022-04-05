# Udacity FEND Landing Page Project
## Screenshot

![Landing Page Screenshot](https://lh3.googleusercontent.com/tGl1pi6XCIHMckW9ZPg-XJb4YaVtR2TNIfWM4L9ptom7RzgpBY1oS51v0iS1gADcpoqh1zQeyGqouZgDNWSYA4omG_FKELZ3QYjHa9ZbEKvHf4HP4R4LvqLfL-dlEejfrjSM0K4VLg=w2400)


Finally, I’ve completed the 2nd Project for the Front End Web Developer Udacity Nanodegree Program. This project has given me an opportunity to fully combine and utilize my skills in HTML, CSS, Javascript, DOM manipulation and UI Design.


## Udacity Project Brief:

“This project requires you to build a multi-section landing page, with a dynamically updating navigational menu based on the amount of content that is added to the page.”

## How to run:
Directly download the project files to your computer, and open index.html using a web browser (i.e. Firefox, Chrome, etc...). 
Also, you can visit the live site by checking the link below.

## Technologies Used:

1.	HTML
2.	CSS
3.	JAVASCRIPT

## Development & Implementation:
- For this project, Udacity has provided an HTML & CSS starter code which has a static, non-interactive version of the project so a student can get a jump-start on development. However, I opted to start without any files. My aim was to learn the most by developing the project on my own. I must admit that it was a challenging experience having to start from scratch. 

- The navigation menu items are dynamic. Every time a section is added, the section's header title is being added to the navigation menu automatically. A total of 6 sections has been added to the page. 
Each navigation item generates an anchor link and scrolls smoothly into the assigned section on click event.

  In addition, for the anchor element on the bottom navigation I used the cloneNode() method. It clones the process of creating an anchor element for the top navigation menu items and applies the same process to the footer navigation menu items.


- As for the section active state, I incorporated a fade-in effect to all section’s title. This functionality distinguishes the section in view while navigating through the page.

- The landing page is responsive across all the devices at different sizes. On mobile screen, the navigation menu bar switches to hamburger button which bring forth an ease on navigating the menu items.

- With regard to handling events for the animation, I employed the requestAnimationFrame method in order for the animation to run smoothly and avoid unnecessary performance hit. Also, to make a scrolling experience smoother and guarantee execution on a timely manner, throttle technique was adopted. 

  Furthermore, to enhance the performance of my landing page, I used event delegation technique which utilizes the event bubbling to handle the event at a higher level in the DOM than the element on which the event originated.
  
- UDACITY has given some suggestions to make this project a stand-out. The suggestions that I implemented are as follows:
1.  Add an active state to your navigation items when a section is in the viewport.
    -  	I implemented a functionality whereby a thick underline becomes visible under the navigation menu item when the corresponding section is in viewport.
2. Update/change the design/content.
    -  	I decided to use my own design and content because I wanted something that would sharpen my UI design skills. The subject that I used was related to the FIFA World Cup Qatar 2022. As a resident of the host nation, I was very interested in this topic. 
3. Add a scroll to top button on the page that’s only visible when the user scrolls below the fold of the page.
    -  	I added a sticky scroll-to-top button which gives ease of navigation to the landing page by allowing a user to scroll to the top of the page with a click of button.
    

## Deployed Version:
<https://qatar-fifaworldcup2022.netlify.app/>

## References and Image Resources:
- <https://www.w3schools.com/>
- <https://developer.mozilla.org/en-US/>
- <https://www.javascripttutorial.net/javascript-dom/javascript-event-delegation/>
- <https://www.fifa.com/>
- <https://www.qatar2022.qa/en/home>

## Special Comments:
Please leave a star in GitHub, if you found this repo helpful.


 
