document.addEventListener("DOMContentLoaded", function () {
  // Range slider
  const rangeInput = document.querySelector(".order-form__control_range");
  const rangeOutput = document.querySelector("[data-range-output]");

  if (rangeInput && rangeOutput) {
    const updateRangeOutput = function () {
      rangeOutput.innerHTML = rangeInput.value + "&nbsp;%";
    };

    updateRangeOutput();

    rangeInput.addEventListener("input", updateRangeOutput);
    rangeInput.addEventListener("change", updateRangeOutput);
  }

  // Attach file button
  const fileInput = document.querySelector(".order-form__control_file");
  const fileButton = document.querySelector(".order-form__file-text");
  const fileIcon = document.querySelector(".order-form__file-icon");

  if (fileInput && fileButton && fileIcon) {
    fileInput.addEventListener("change", function () {
      if (this.files && this.files.length > 0) {
        fileButton.textContent = this.files[0].name;
        fileIcon.classList.add("order-form__file-icon_selected");
      } else {
        fileButton.textContent = "Прикрепить файл";
        fileIcon.classList.remove("order-form__file-icon_selected");
      }
    });
  }

  // Submit button
  const submitButton = document.getElementById("submit_button");
  if (submitButton) {
    submitButton.addEventListener("click", function (e) {
      e.preventDefault();
    });
  }
});
