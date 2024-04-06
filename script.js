let tablinks = document.getElementsByClassName("tab-links")
let tabcontents = document.getElementsByClassName("tab-contents")

function opentab(tabname) {

  for (tablink of tablinks) {
    tablink.classList.remove("active-link")
  }

  for (tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab")
  }

  event.currentTarget.classList.add("active-link")
  document.getElementById(tabname).classList.add("active-tab")
}

let menu = document.getElementById("myMenu");

function openMenu() {
  menu.style.right = "0";
}

function closeMenu() {
  menu.style.right = "-175px";
}

window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  const nav = document.querySelector('nav');
  const headerHeight = header.offsetHeight;

  if (window.innerWidth > 600) {
    if (window.scrollY> headerHeight) {
      nav.classList.add('nav-sticky');
      nav.style.top = "0%";
    } else {
      if (nav.classList.contains('nav-sticky')) {
        nav.style.top = "-100%";
        setTimeout(() => {
          nav.classList.remove('nav-sticky');
        },100)
      }
    }
  }
});

const DK = document.getElementById("DK")

function enlargeImg() {

  if (window.innerWidth > 600) {
    if (DK.classList.contains('enlarged')) {
      DK.style.transform = "none";
      DK.style.transition = "transform 0.25s ease";
      DK.style.border = "";
      DK.style.cursor = "zoom-in"
      DK.classList.remove('enlarged');
    } else {
        DK.style.transform = "translate(95%, 70%) scale(3)";
        DK.style.transition = "transform 0.25s ease";
        DK.style.border = "none";
        DK.style.cursor = "zoom-out"
        DK.classList.add('enlarged');
      }
  }
}

window.addEventListener('scroll', function() {
  DK.style.transform = "none";
  DK.style.transition = "transform 0.25s ease";
  DK.style.border = "";
  DK.classList.remove('enlarged');
});
  
const scriptURL = 'https://script.google.com/macros/s/AKfycbzpk7Qz3PHcHlFrZlIZrLJZZV8WcYkkmCaV-SxHHkq_5iRsawxu_MnAcvanhUvQ9dBG/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
  e.preventDefault()

  const submitButton = document.querySelector('.btn2');
  const loadingIcon = document.getElementById('loadingIcon');
  submitButton.style.display = 'none';
  loadingIcon.style.display = 'inline-block';

  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      msg.innerHTML = "Message sent successfully"
      msg.style.opacity = 1;
      setTimeout(function() {
        msg.style.opacity = 0;
        setTimeout(function() {
          msg.innerHTML = "‎"
        }, 3000)
      },3000)
      form.reset()
      submitButton.style.display = 'inline-block';
      loadingIcon.style.display = 'none';
    })
    .catch(error => {
      console.error('Error!', error.message)
      submitButton.style.display = 'inline-block';
      loadingIcon.style.display = 'none';
    })
})

fetch('https://api.github.com/users/Jspanglez/repos', {
  headers: {
    Authorization: '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',
  },
})
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('repos');
    data.forEach(repo => {

      /* Create the div to conatin the data */
      const repoElement = document.createElement('div');

      /* Create the initial format for the GitHub repo */
      let html = `
          <h2>${repo.name}</h2><br>`;

      /* Do not make an element for the decription
      or the language if they are null */
      if (repo.description !== null) {
        html += `<p>${repo.description}</p><br>`;
      }

      if (repo.language !== null) {
        html += `<p>Language: ${repo.language}</p>`;
      }

      /* Add the stars and the url */
      html += `
          <br>
          <p>Stars: ${repo.stargazers_count}</p>
          <br>
          <p><a href="${repo.html_url}" target="_blank">Go to repository <i class="fa-solid fa-arrow-up-right-from-square fa-sm"></i></a></p>
          <br>
      `;

      /* Add the created HTML to the div and append it
      to the element created in page2.html */
      repoElement.innerHTML = html;
      container.appendChild(repoElement);
    });
  })
  .catch(error => console.error(error));