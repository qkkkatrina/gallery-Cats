document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".gallery__button");
  const imagesContainer = document.querySelector(".gallery__images");
  const loader = document.querySelector(".gallery__loader");
  const API_URL = "https://api.thecatapi.com/v1/images/search?limit=10";

  function showLoader() {
    loader.style.display = "block";
  }

  function hideLoader() {
    loader.style.display = "none";
  }

  async function loadImages() {
    showLoader();

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`); 
      }

      const images = await response.json();
      renderImages(images);
    } catch (error) {
      console.error("Error loading images:", error);
      displayError("Error loading images. Please try again later.");
    } finally {
      hideLoader();
    }
  }

  function renderImages(images) {
    imagesContainer.innerHTML = "";

    images.forEach((image) => {
      if (image?.url) {
        const img = createImageElement(image.url, "Cute cat");
        imagesContainer.appendChild(img);
      }
    });
  }

  function createImageElement(src, altText) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = altText;
    img.className = "gallery__image";
    return img;
  }

  function displayError(message) {
    imagesContainer.innerHTML = `<div class="gallery__error">${message}</div>`;
  }

  // Привязка к кнопке
  if (button) {
    button.addEventListener("click", loadImages);
  } else {
    console.error("Button not found!"); // Проверка наличия кнопки
  }
});