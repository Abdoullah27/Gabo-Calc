document.addEventListener("DOMContentLoaded", function () {
  const presetRadio = document.getElementById("preset-package");
  const customRadio = document.getElementById("custom-package");
  const presetSection = document.getElementById("preset-packages");
  const customSection = document.getElementById("custom-packages");
  const finalPriceDisplay = document.getElementById("final-price");

  const numVideosInput = document.getElementById("num-videos");
  const numImagesInput = document.getElementById("num-images");
  const extraFeaturesSelect = document.getElementById("extra-features");
  const presetPackages = document.querySelectorAll(
    '#preset-packages input[type="radio"]'
  );

  // دالة لإظهار وإخفاء الأقسام
  function toggleSections() {
    if (presetRadio.checked) {
      presetSection.classList.remove("hidden");
      customSection.classList.add("hidden");
    } else {
      presetSection.classList.add("hidden");
      customSection.classList.remove("hidden");
    }
    calculatePrice(); // إعادة حساب السعر عند التبديل
  }

  // دالة لحساب السعر (هذا يحتاج تطوير حقيقي في جافاسكريبت لاحقاً)
  function calculatePrice() {
    let price = 0;
    if (presetRadio.checked) {
      // حساب سعر الباقة الجاهزة
      const selectedPackage = document.querySelector(
        '#preset-packages input[name="package"]:checked'
      );
      if (selectedPackage) {
        price =
          parseFloat(
            selectedPackage.closest(".package").getAttribute("data-price")
          ) || 0;
      }
    } else {
      // حساب سعر الباقة المخصصة
      const videoCount = parseInt(numVideosInput.value) || 0;
      const imageCount = parseInt(numImagesInput.value) || 0;
      const videoPrice = 300;
      const imagePrice = 150;

      price += videoCount * videoPrice;
      price += imageCount * imagePrice;

      // إضافة سعر المميزات الإضافية
      const selectedOptions = Array.from(extraFeaturesSelect.selectedOptions);
      selectedOptions.forEach((option) => {
        price += parseFloat(option.getAttribute("data-price")) || 0;
      });
    }

    finalPriceDisplay.textContent = price.toLocaleString("ar-SA", {
      style: "currency",
      currency: "SAR",
      minimumFractionDigits: 2,
    });
  }

  // الاستماع لتغيير اختيار نوع الباقة
  presetRadio.addEventListener("change", toggleSections);
  customRadio.addEventListener("change", toggleSections);

  // الاستماع لتغيير اختيارات الباقة الجاهزة
  presetPackages.forEach((radio) =>
    radio.addEventListener("change", calculatePrice)
  );

  // الاستماع لتغيير مدخلات الباقة المخصصة
  numVideosInput.addEventListener("input", calculatePrice);
  numImagesInput.addEventListener("input", calculatePrice);
  extraFeaturesSelect.addEventListener("change", calculatePrice);

  // تشغيل الدالة عند تحميل الصفحة
  toggleSections();
});
