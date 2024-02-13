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