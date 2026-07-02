const lightbox = document.getElementById("screenshot-lightbox");
const lightboxImage = lightbox?.querySelector(".lightbox-image");
const lightboxCaption = lightbox?.querySelector(".lightbox-caption");
const closeButton = lightbox?.querySelector(".lightbox-close");
const screenshotButtons = document.querySelectorAll(".screenshot-button");

function openLightbox(button) {
  if (!lightbox || !lightboxImage || !lightboxCaption) return;

  const fullImageSrc = button.dataset.full;
  const caption = button.dataset.caption || "";
  const thumbnail = button.querySelector("img");
  const altText = thumbnail?.getAttribute("alt") || caption;

  lightboxImage.src = fullImageSrc;
  lightboxImage.alt = altText;
  lightboxCaption.textContent = caption;

  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  closeButton?.focus();
}

function closeLightbox() {
  if (!lightbox || !lightboxImage || !lightboxCaption) return;

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  lightboxImage.src = "";
  lightboxImage.alt = "";
  lightboxCaption.textContent = "";
}

screenshotButtons.forEach((button) => {
  button.addEventListener("click", () => openLightbox(button));
});

closeButton?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox?.classList.contains("is-open")) {
    closeLightbox();
  }
});