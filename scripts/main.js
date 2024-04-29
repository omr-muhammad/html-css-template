// VARIBLES
const headerLinks = document.querySelector('.header-links');
const typingElement = document.querySelector('[data-type]');
const skillsSection = document.querySelector('#skills');
const statsSection = document.querySelector('#stats');
const counters = document.querySelectorAll('[data-counter]');
//
const seconds = document.querySelector('[data-sec]');
const minutes = document.querySelector('[data-min]');
const hours = document.querySelector('[data-hours]');
const days = document.querySelector('[data-days]');
//
const videosList = document.querySelector('[data-videos-list]');
const videoPrevImg = document.querySelector('[data-video-prev-img]');
const videoTitle = document.querySelector('[data-video-title]');

// Go To Section When Click The Link
headerLinks.addEventListener('click', e => {
  if (e.target.closest('li').hasAttribute('data-section-link')) {
    const id = e.target.closest('li').getAttribute('data-section-link');
    const section = document.getElementById(id);
    section.scrollIntoView();
  }
});

// TYPING
const title = 'Welcome To, Elzero World';
let index = 0;
typingElement.textContent = '|';

// Make The Typing Animation
function typingAnimation(name, index) {
  typingElement.textContent = typingElement.textContent.slice(0, -1) + name[index] + '|';
}

// Make The Delete Animation
function deletingAnimation() {
  typingElement.textContent = typingElement.textContent.slice(0, -2) + '|';
}

function handleTyping() {
  if (typingElement.textContent === '|') {
    const typingInterval = setInterval(() => {
      typingAnimation(title, index);
      index++;

      if (index === title.length) clearInterval(typingInterval);
    }, 100);


  } else if (typingElement.textContent === title + '|') {
    index = 0;
    const deletingInterval = setInterval(() => {
      deletingAnimation();

      if (typingElement.textContent === '|') clearInterval(deletingInterval);
    }, 50);

  }
}

setInterval(() => {
  handleTyping();
}, 2400);

// Animation Happens While Scrolling
window.addEventListener('scroll', () => {

  // Fill The Bars While Scrolling
  const skillsDistance = skillsSection.getBoundingClientRect().top;

  if (skillsDistance >= 0 && skillsDistance <= 250) {

    if (!skillsSection.classList.contains('animate')) {
      skillsSection.classList.add('animate');
    }
  }

  //Increase Numbers While Scrolling
  const statsDistance = statsSection.getBoundingClientRect().top;

  if (statsDistance >= 0 && statsDistance <= 250) {
    increaseNumbers();
  }
});

// Increase numbers while scrolling just one time call for the function not to much
let calls = 0;
function increaseNumbers() {

  if (calls === 1) return;

  calls = 1;

  counters.forEach((counterEl, index) => {
    const number = counterEl.getAttribute('data-counter');

    const counterInterval = setInterval(() => {
      counterEl.textContent = +(counterEl.textContent) + 1;
      console.log(counterEl.textContent);
      if (counterEl.textContent === number) clearInterval(counterInterval);
    }, 2000 / number);
  });
}

// Count Down Timer
document.querySelector('.event-year').textContent = new Date().getFullYear();

const currentYear = new Date().getFullYear();
const eventTime = new Date(`Dec 31, ${currentYear} 23:59:59`).getTime();

setInterval(() => {
  const now = new Date().getTime();

  const timeBetween = eventTime - now;

  // Times That Will Be Rendered In Browser
  const secondsBetween = Math.floor(timeBetween % (1000 * 60) / 1000);
  const minutesBetween = Math.floor(timeBetween % (1000 * 60 * 60) / (1000 * 60));
  const hoursBetween = Math.floor(timeBetween % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
  const daysBetween = Math.floor(timeBetween / (1000 * 60 * 60 * 24));

  // display Times In Elements
  seconds.textContent = secondsBetween >= 10 ? `${secondsBetween}` : `0${secondsBetween}`;
  minutes.textContent = minutesBetween >= 10 ? `${minutesBetween}` : `0${minutesBetween}`;
  hours.textContent = hoursBetween >= 10 ? `${hoursBetween}` : `0${hoursBetween}`;
  days.textContent = daysBetween >= 10 ? `${daysBetween}` : `0${daysBetween}`;

}, 1000);

// Swap Between Videos
videoTitle.textContent = 'How To Creat Sub Domain';

videosList.addEventListener('click', e => {
  if (e.target.hasAttribute('data-img-src')) {
    const imgSrc = e.target.getAttribute('data-img-src');
    const title = e.target.textContent;

    videoPrevImg.setAttribute('src', imgSrc);
    videoTitle.textContent = title;
  }
});