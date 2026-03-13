const services = [
  {
    title: "Lawn Mowing",
    short: "Weekly or biweekly mowing for a clean, maintained yard.",
    details: "Professional mowing, edging, trimming, and blow-off service for residential and small commercial properties.",
    icon: "🌱",
    price: "Starting at $45+"
  },
  {
    title: "Yard Clean Up",
    short: "Seasonal cleanups and overgrown property refreshes.",
    details: "Leaf removal, brush cleanup, trimming, hauling debris, and restoring curb appeal after storms or seasonal buildup.",
    icon: "🍂",
    price: "Custom quote"
  },
  {
    title: "Junk Removal",
    short: "Fast removal of unwanted items, debris, and bulk trash.",
    details: "Garage cleanouts, yard debris pickup, furniture removal, construction debris hauling, and general property cleanouts.",
    icon: "🛻",
    price: "Custom quote"
  },
  {
    title: "Concrete Replacement",
    short: "Replace cracked, uneven, or damaged concrete surfaces.",
    details: "Driveways, sidewalks, patios, and walkways replaced with durable concrete work built to last.",
    icon: "🧱",
    price: "Free estimate"
  },
  {
    title: "Flower Bedding",
    short: "Fresh flower bed installation and seasonal planting.",
    details: "Flower bed design, planting, mulch touch-up, and seasonal flower installation to improve curb appeal and brighten your property.",
    icon: "🌸",
    price: "Custom quote"
  }
];

let selectedService = null;

const servicePicker = document.getElementById("servicePicker");
const serviceCards = document.getElementById("serviceCards");
const serviceSelect = document.getElementById("service");
const quoteForm = document.getElementById("quoteRequestForm");
const successMessage = document.getElementById("successMessage");
const heroQuoteButton = document.getElementById("heroQuoteButton");

function renderServices() {
  servicePicker.innerHTML = "";
  serviceCards.innerHTML = "";
  serviceSelect.innerHTML = "";

  services.forEach((service) => {
    const optionButton = document.createElement("button");
    optionButton.type = "button";
    optionButton.className = "service-option" + (service.title === selectedService ? " active" : "");
    optionButton.innerHTML = `
      <span class="icon">${service.icon}</span>
      <strong>${service.title}</strong>
      <p style="margin-top: 8px; font-size: 14px; color: #cbd5e1;">${service.short}</p>
    `;
    optionButton.addEventListener("click", () => chooseService(service.title));
    servicePicker.appendChild(optionButton);

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="icon">${service.icon}</div>
      <h4>${service.title}</h4>
      <p>${service.details}</p>
      <span class="price">${service.price}</span>
      <button type="button" class="btn btn-primary">Request ${service.title}</button>
    `;
    card.querySelector("button").addEventListener("click", () => chooseService(service.title, true));
    serviceCards.appendChild(card);

    const selectOption = document.createElement("option");
    selectOption.value = service.title;
    selectOption.textContent = service.title;
    serviceSelect.appendChild(selectOption);
  });

  serviceSelect.value = selectedService;
  updateSelectedServiceContent();
}

function updateSelectedServiceContent() {
  const service = services.find((item) => item.title === selectedService) || services[0];

  document.getElementById("selectedServiceTitle").textContent = service.title;
  document.getElementById("selectedServiceDetails").textContent = service.details;
  document.getElementById("selectedServicePrice").textContent = service.price;

  document.getElementById("sidebarServiceTitle").textContent = service.title;
  document.getElementById("sidebarServiceDetails").textContent = service.details;
  document.getElementById("sidebarServicePrice").textContent = service.price;

  serviceSelect.value = service.title;
}

function chooseService(serviceTitle, scrollToForm = true) {
  selectedService = serviceTitle;
  renderServices();

  if (scrollToForm) {
    document.getElementById("quote-form").scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

serviceSelect.addEventListener("change", (event) => {
  selectedService = event.target.value;
  renderServices();
});

heroQuoteButton.addEventListener("click", () => {
  chooseService(selectedService, true);
});

quoteForm.addEventListener("submit", () => {
  serviceSelect.value = selectedService;
});

renderServices();