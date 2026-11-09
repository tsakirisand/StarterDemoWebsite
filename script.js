const menuFilters = Array.from(document.querySelectorAll("[data-filter]"));
const menuItems = Array.from(document.querySelectorAll("[data-category]"));
const menuCount = document.querySelector(".cafe-menu-count");

function filterMenu(category) {
  let visible = 0;

  menuItems.forEach((item) => {
    const show = category === "all" || item.dataset.category === category;
    item.hidden = !show;
    if (show) visible += 1;
  });

  menuFilters.forEach((button) => {
    const active = button.dataset.filter === category;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (menuCount) menuCount.textContent = `${visible} επιλογές`;
}

menuFilters.forEach((button) => {
  button.addEventListener("click", () => filterMenu(button.dataset.filter));
});

const mobileToggle = document.querySelector(".cafe-mobile-toggle");
const navigation = document.querySelector("#cafe-navigation");

function closeNavigation() {
  navigation?.classList.remove("is-open");
  mobileToggle?.setAttribute("aria-expanded", "false");
  mobileToggle?.setAttribute("aria-label", "Άνοιγμα μενού");
}

mobileToggle?.addEventListener("click", () => {
  const isOpen = navigation?.classList.toggle("is-open") ?? false;
  mobileToggle.setAttribute("aria-expanded", String(isOpen));
  mobileToggle.setAttribute("aria-label", isOpen ? "Κλείσιμο μενού" : "Άνοιγμα μενού");
});

navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNavigation));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNavigation();
});
