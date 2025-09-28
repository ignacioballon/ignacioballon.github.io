"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// portfolio modal variables
const portfolioModal = document.querySelector(
  "[data-portfolio-modal-container]"
);
const portfolioModalImg = document.querySelector(
  "[data-portfolio-modal-image]"
);
const portfolioModalTitle = document.querySelector(
  "[data-portfolio-modal-title]"
);
const portfolioModalCategory = document.querySelector(
  "[data-portfolio-modal-category]"
);
const portfolioModalDescription = document.querySelector(
  "[data-portfolio-modal-description]"
);
const portfolioModalCloseBtn = document.querySelector(
  "[data-portfolio-modal-close-btn]"
);
const portfolioOverlay = document.querySelector("[data-portfolio-overlay]");
const prevBtn = document.querySelector("[data-prev-image]");
const nextBtn = document.querySelector("[data-next-image]");
const imageCounter = document.querySelector("[data-image-counter]");
const thumbnailContainer = document.querySelector("[data-image-thumbnails]");

// portfolio modal toggle function
const portfolioModalFunc = function () {
  portfolioModal.classList.toggle("active");
  portfolioOverlay.classList.toggle("active");
};

// portfolio modal object
const portfolioModalHandler = {
  currentProject: null,
  currentImageIndex: 0,

  // Sample project data - you can expand this with real project information
  projectData: {
    BAMBOO: {
      title: "BAMBOO Electoral Analysis - Pipeline & Dashboards",
      category: "Dashboards",
      description:
        "Developed a complete data pipeline and interactive Power BI dashboards for BAMBOO, enabling in-depth analysis of electoral data and verification of vote integrity. The solution includes statistical models to detect irregularities, providing transparency and actionable insights for stakeholders. It empowers users to monitor elections with confidence and supports data-driven decision-making in the electoral process.",
      images: [
        "./assets/images/powerbi7.png",
        "./assets/images/powerbi6.png",
        "./assets/images/powerbi1.png",
        "./assets/images/powerbi5.png",
        "./assets/images/powerbi2.png",
        "./assets/images/powerbi8.png",
        "./assets/images/powerbi10.png",
      ],
    },
    Sanat: {
      title: "Sanat Pharma - Dashboards",
      category: "Dashboards",
      description:
        "I built Power BI dashboards for Sanat Pharma to support executives, sales teams, and analysts with sales, financial, and forecasting insights. Featuring KPIs, real-time data, and drill-down reports, these dashboards streamlined access to critical information, boosting efficiency and enabling smarter, faster decision-making across the organization.",
      images: [
        "./assets/images/sanatPowerBi1.png",
        "./assets/images/sanatPowerBi2.png",
      ],
    },
    Fab: {
      title: "Federación de Atletismo de Bolivia - Web Page",
      category: "Web Development",
      description:
        "I led the design of the Federación de Atletismo de Bolivia’s official website, collaborating with a developer to deliver a modern, mobile-friendly platform. Featuring news, event calendars, results, athlete profiles, and registrations, it enhanced visibility and streamlined access, helping athletes and coaches easily view schedules and register for competitions.",
      images: [
        "./assets/images/fab.png",
        "./assets/images/fab2.png",
        "./assets/images/fab3.png",
      ],
    },
    SanatWeb: {
      title: "Federación de Atletismo de Bolivia - Web Page",
      category: "Web Development",
      description:
        "I developed a web application for Sanat Pharma using Angular and Supabase, featuring multiple modules tailored to different management areas of the company. The app streamlined workflows, centralized operations, and improved data accessibility, enabling teams across departments to manage processes efficiently and make informed, data-driven decisions.",
      images: [
        "./assets/images/sanatWeb1.png",
        "./assets/images/sanatWeb2.png",
        "./assets/images/sanatWeb3.png",
        "./assets/images/sanatWeb4.png",
      ],
    },
    Iglu: {
      title: "Federación de Atletismo de Bolivia - Web Page",
      category: "Web Development",
      description:
        "I designed and developed the Iglu Ventures website using Next.js and Vercel, creating a modern, fast, and responsive platform. The site highlights the startup’s vision, services, and portfolio, providing a sleek, user-friendly experience that effectively communicates the brand and engages visitors across devices.",
      images: [
        "./assets/images/iglu1.png",
        "./assets/images/iglu2.png",
        "./assets/images/iglu3.png",
      ],
    },
  },

  currentProject: null,
  currentImageIndex: 0,

  openModal: function (projectTitle) {
    this.currentProject = this.projectData[projectTitle];
    if (!this.currentProject) {
      // Fallback for projects without detailed data
      this.currentProject = {
        title: projectTitle,
        category: "Project",
        description: "Project details coming soon...",
        images: ["./assets/images/project-placeholder.jpg"],
      };
    }

    this.currentImageIndex = 0;
    this.updateModalContent();
    portfolioModalFunc();
    document.body.style.overflow = "hidden";
  },

  closeModal: function () {
    portfolioModalFunc();
    document.body.style.overflow = "auto";
    this.currentProject = null;
    this.currentImageIndex = 0;
  },

  updateModalContent: function () {
    if (!this.currentProject) return;

    // Update text content
    if (portfolioModalTitle)
      portfolioModalTitle.textContent = this.currentProject.title;
    if (portfolioModalCategory)
      portfolioModalCategory.textContent = this.currentProject.category;
    if (portfolioModalDescription)
      portfolioModalDescription.textContent = this.currentProject.description;

    // Update image
    this.updateImage();

    // Update thumbnails
    this.updateThumbnails();

    // Update navigation buttons
    this.updateNavigationButtons();
  },

  updateImage: function () {
    if (portfolioModalImg && this.currentProject.images) {
      portfolioModalImg.src =
        this.currentProject.images[this.currentImageIndex];
      portfolioModalImg.alt = `${this.currentProject.title} - Image ${
        this.currentImageIndex + 1
      }`;

      // Update counter
      if (imageCounter) {
        imageCounter.textContent = `${this.currentImageIndex + 1} / ${
          this.currentProject.images.length
        }`;
      }
    }
  },

  updateThumbnails: function () {
    if (!thumbnailContainer || !this.currentProject.images) return;

    thumbnailContainer.innerHTML = "";

    this.currentProject.images.forEach((imageSrc, index) => {
      const thumbnail = document.createElement("img");
      thumbnail.src = imageSrc;
      thumbnail.alt = `Thumbnail ${index + 1}`;
      thumbnail.classList.add("thumbnail-img");

      if (index === this.currentImageIndex) {
        thumbnail.classList.add("active");
      }

      thumbnail.addEventListener("click", function () {
        portfolioModalHandler.currentImageIndex = index;
        portfolioModalHandler.updateModalContent();
      });

      thumbnailContainer.appendChild(thumbnail);
    });
  },

  updateNavigationButtons: function () {
    if (!this.currentProject.images) return;

    const isFirstImage = this.currentImageIndex === 0;
    const isLastImage =
      this.currentImageIndex === this.currentProject.images.length - 1;

    if (prevBtn) {
      prevBtn.disabled = isFirstImage;
    }

    if (nextBtn) {
      nextBtn.disabled = isLastImage;
    }
  },

  previousImage: function () {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.updateModalContent();
    }
  },

  nextImage: function () {
    if (
      this.currentProject.images &&
      this.currentImageIndex < this.currentProject.images.length - 1
    ) {
      this.currentImageIndex++;
      this.updateModalContent();
    }
  },
};

// add click event to all portfolio items
const portfolioItems = document.querySelectorAll(".project-item a");
for (let i = 0; i < portfolioItems.length; i++) {
  portfolioItems[i].addEventListener("click", function (event) {
    event.preventDefault();
    const projectItem = this.closest(".project-item");
    const projectKey = projectItem.getAttribute("data-project");
    portfolioModalHandler.openModal(projectKey);
  });
}

// add click event to portfolio modal close button and overlay
if (portfolioModalCloseBtn) {
  portfolioModalCloseBtn.addEventListener("click", function () {
    portfolioModalHandler.closeModal();
  });
}

if (portfolioOverlay) {
  portfolioOverlay.addEventListener("click", function () {
    portfolioModalHandler.closeModal();
  });
}

// add click event to image navigation buttons
if (prevBtn) {
  prevBtn.addEventListener("click", function () {
    portfolioModalHandler.previousImage();
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", function () {
    portfolioModalHandler.nextImage();
  });
}

// keyboard navigation for portfolio modal
document.addEventListener("keydown", function (e) {
  if (portfolioModal && portfolioModal.classList.contains("active")) {
    if (e.key === "Escape") portfolioModalHandler.closeModal();
    if (e.key === "ArrowLeft") portfolioModalHandler.previousImage();
    if (e.key === "ArrowRight") portfolioModalHandler.nextImage();
  }
});

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}
