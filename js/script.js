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
