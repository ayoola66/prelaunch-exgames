// client.js

let cfg;
fetch("/config") // Changed from config.json to /config endpoint
  .then((r) => r.json())
  .then((c) => {
    cfg = c;
    init();
  })
  .catch((error) => console.error("Error loading config:", error));

function init() {
  const stripe = Stripe(
    cfg.stripe.mode === "live" ? cfg.stripe.pk_live : cfg.stripe.pk_test
  );

  function goCheckout() {
    stripe
      .redirectToCheckout({
        lineItems: [{ price: cfg.stripe.priceId, quantity: 1 }],
        mode: "subscription",
        successUrl: `${window.location.origin}/success.html`, // Use current domain
        cancelUrl: window.location.origin, // Use current domain
      })
      .catch((error) => console.error("Checkout error:", error));
  }

  // Add error handling for missing elements
  const primaryBtn = document.getElementById("cta-primary");
  const secondaryBtn = document.getElementById("cta-secondary");

  if (primaryBtn) {
    primaryBtn.addEventListener("click", goCheckout);
  }

  if (secondaryBtn) {
    secondaryBtn.addEventListener("click", goCheckout);
  }
}

// Image load verification
document.addEventListener("DOMContentLoaded", () => {
  // Verify all images
  const allImages = document.querySelectorAll("img");
  allImages.forEach((img) => {
    // Check if image is already loaded
    if (img.complete) {
      handleImageLoad(img);
    } else {
      img.addEventListener("load", () => handleImageLoad(img));
      img.addEventListener("error", () => handleImageError(img));
    }
  });

  function handleImageLoad(img) {
    console.log("Image loaded successfully:", img.src);
  }

  function handleImageError(img) {
    console.error("Error loading image:", img.src);
    // Add a visible error state
    img.style.background = "#f8f9fa";
    img.style.padding = "20px";
    img.style.border = "1px solid #dee2e6";
  }

  // Carousel functionality
  const carousels = document.querySelectorAll(".carousel-container");

  carousels.forEach((carousel) => {
    const images = carousel.querySelectorAll("img");
    const interval = parseInt(carousel.dataset.interval) || 5000;
    let currentIndex = 0;
    let timer;

    // Verify all carousel images are loaded
    let allLoaded = Array.from(images).every((img) => img.complete);
    if (!allLoaded) {
      console.log("Waiting for all carousel images to load...");
      Promise.all(
        Array.from(images).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve, reject) => {
            img.addEventListener("load", resolve);
            img.addEventListener("error", reject);
          });
        })
      )
        .then(() => {
          console.log("All carousel images loaded");
          startCarousel();
        })
        .catch((error) => {
          console.error("Error loading carousel images:", error);
        });
    } else {
      startCarousel();
    }

    function showNextImage() {
      images[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add("active");
    }

    function startCarousel() {
      timer = setInterval(showNextImage, interval);
    }

    function stopCarousel() {
      clearInterval(timer);
    }

    carousel.addEventListener("mouseenter", stopCarousel);
    carousel.addEventListener("mouseleave", startCarousel);
  });
});
