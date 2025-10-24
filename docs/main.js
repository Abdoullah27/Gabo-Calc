document.addEventListener("DOMContentLoaded", function () {
  const presetRadio = document.getElementById("preset-package");
  const customRadio = document.getElementById("custom-package");
  const presetSection = document.getElementById("preset-packages");
  const customSection = document.getElementById("custom-packages");
  const finalPriceDisplay = document.getElementById("final-price");

  const numVideosInput = document.getElementById("num-videos");
  const numImagesInput = document.getElementById("num-images");
  const presetPackages = document.querySelectorAll(
    '#preset-packages input[type="radio"]'
  );

  function toggleSections() {
    if (presetRadio.checked) {
      presetSection.classList.remove("hidden");
      customSection.classList.add("hidden");
    } else {
      presetSection.classList.add("hidden");
      customSection.classList.remove("hidden");
    }
    calculatePrice();
  }

  function calculatePrice() {
    let price = 0;

    document
      .querySelectorAll(".package")
      .forEach((pkg) => pkg.classList.remove("selected"));

    if (presetRadio.checked) {
      const selectedPackage = document.querySelector(
        '#preset-packages input[name="package"]:checked'
      );
      if (selectedPackage) {
        const packageDiv = selectedPackage.closest(".package");
        packageDiv.classList.add("selected");
        price = parseFloat(packageDiv.getAttribute("data-price")) || 0;
      }
    } else {
      const videoCount = parseInt(numVideosInput.value) || 0;
      const imageCount = parseInt(numImagesInput.value) || 0;

      const videoPrice = 1000;
      const imagePrice = 500;

      price += videoCount * videoPrice;
      price += imageCount * imagePrice;
    }

    finalPriceDisplay.textContent = price.toLocaleString("en-US", {
      style: "currency",
      currency: "EGP",
      minimumFractionDigits: 2,
    });
  }

  presetRadio.addEventListener("change", toggleSections);
  customRadio.addEventListener("change", toggleSections);

  presetPackages.forEach((radio) =>
    radio.addEventListener("change", calculatePrice)
  );

  numVideosInput.addEventListener("input", calculatePrice);
  numImagesInput.addEventListener("input", calculatePrice);

  toggleSections();
});
