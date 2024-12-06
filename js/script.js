///////////////////////////
// Aktuelles Jahr setzen //
///////////////////////////

const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////
// Mobile Navigation //
///////////////////////

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

//////////////////////
// Smooth scrolling //
//////////////////////

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile naviagtion
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

///////////////////////
// Sticky navigation //
///////////////////////

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

if (!sectionHeroEl) {
  console.error("Element .section-hero not found");
}

////////////////////////////////
// Flexbox gap fix für Safari //
////////////////////////////////

function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

/////////////////////
// Preis Kategorie //
/////////////////////

function bowlingPrices() {
  var bowling = document.getElementById("bowling-prices");
  var event = document.getElementById("event-prices");

  event.parentNode.classList.remove("pricing-category-active");
  bowling.parentNode.classList.add("pricing-category-active");
}

function eventPrices() {
  var bowling = document.getElementById("bowling-prices");
  var event = document.getElementById("event-prices");

  event.parentNode.classList.add("pricing-category-active");
  bowling.parentNode.classList.remove("pricing-category-active");
}

// Sticky on Scroll
// window.addEventListener('scroll', function() {
//   if (window.scrollY > 0) {
//       document.body.classList.add('sticky');
//   } else {
//       document.body.classList.remove('sticky');
//   }
// });

function closeAlert() {
  const alertBox = document.getElementById("free-dates-alert");
  alertBox.style.display = "none"; // Hide the alert box
}

/////////////////////////////
// Enlarge Images on Click //
/////////////////////////////

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.querySelector(".close");

// Add click event to images with class 'enlargeable'
document.querySelectorAll(".enlargeable").forEach((img) => {
  img.addEventListener("click", function () {
    modal.style.display = "block";
    modalImg.src = this.src;
  });
});

closeBtn.onclick = function () {
  modal.style.display = "none";
};

modal.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

/////////////
// Cookies //
/////////////

function checkCookieConsent() {
  return document.cookie.includes("cookies-accepted=true");
}

function removeMap() {
  const mapContainer = document.getElementById("map-placeholder");
  mapContainer.innerHTML = `<img src="img/map.avif" loading="lazy" class="step-img" alt="Map placeholder" />`;
}

function loadMap() {
  const mapContainer = document.getElementById("map-placeholder");
  mapContainer.innerHTML = `
    <iframe width="100%" height="300"
      src="https://maps.google.de/maps?hl=de&q=%20Staffelder+Str.+13a%20Kremmen&t=&z=14&ie=utf8&iwloc=b&output=embed"
      frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
      style="height:300px;width:100%; overflow: hidden;">
    </iframe>`;
}

// Event: Accept Cookies
document.getElementById('accept-cookies').addEventListener('click', function () {
  document.cookie = "cookies-accepted=true; path=/; max-age=31536000"; // Set the cookie for 1 year
  document.getElementById("cookie-banner").style.display = "none";
  loadMap();

  adjustAlertPosition(); // Adjust the position of the alert box
});

// Event: Deny Cookies
document.getElementById('deny-cookies').addEventListener('click', function () {
  document.cookie = "cookies-accepted=false; path=/; max-age=31536000"; // Set the cookie for 1 year
  document.getElementById("cookie-banner").style.display = "none";
  removeMap();

  adjustAlertPosition(); // Adjust the position of the alert box
});

// Adjust the position of the alert box on mobile screens
function adjustAlertPosition() {
  const cookieBanner = document.getElementById("cookie-banner");
  const alertBox = document.getElementById("free-dates-alert");

  if (window.matchMedia("(max-width: 34em)").matches) {
    // Only adjust position if the screen width is <= 34em
    if (cookieBanner && alertBox) {
      const bannerHeight = cookieBanner.offsetHeight;
      const isBannerVisible = cookieBanner.style.visibility !== "hidden";

      if (isBannerVisible) {
        alertBox.style.bottom = `${bannerHeight + 16}px`; // 1rem = 16px
      } else {
        alertBox.style.bottom = "1rem"; // Return to bottom after banner is hidden
      }
    }
  }
}

// Initial load logic
window.onload = function () {
  if (checkCookieConsent()) {
    document.getElementById("cookie-banner").style.visibility = "hidden"; 
    loadMap(); 
  } else {
    document.getElementById("cookie-banner").style.visibility = "visible"; 
    removeMap(); 
  }

  adjustAlertPosition(); 
};