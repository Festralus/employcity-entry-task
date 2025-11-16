document.addEventListener("DOMContentLoaded", function () {
  // Burger menu
  const burger = document.querySelector(".header__burger-menu");
  const overlay = document.querySelector(".header__burger-overlay");
  const nav = document.querySelector(".header__nav");

  if (!burger || !nav) return;

  function openMenu() {
    nav.classList.add("nav_open");
    overlay.classList.add("active");
  }

  function closeMenu() {
    nav.classList.remove("nav_open");
    overlay.classList.remove("active");
  }

  function toggleMenu() {
    nav.classList.contains("nav_open") ? closeMenu() : openMenu();
  }

  // Toggle
  burger.addEventListener("click", function (event) {
    event.stopPropagation();
    toggleMenu();
  });

  nav.addEventListener("click", function (event) {
    if (event.target.closest(".nav__link")) {
      closeMenu();
    }
  });

  document.addEventListener("click", function (event) {
    if (!nav.classList.contains("nav_open")) return;

    const clickInsideMenu = event.target.closest(".header__nav");
    const clickOnBurger = event.target.closest(".header__burger-menu");

    if (!clickInsideMenu && !clickOnBurger) {
      closeMenu();
    }
  });

  // Range slider
  const rangeInput = document.querySelector(".order-form__control_range");
  const rangeOutput = document.querySelector("[data-range-output]");

  if (rangeInput && rangeOutput) {
    function updateRangeOutput() {
      rangeOutput.innerHTML = rangeInput.value + "&nbsp;%";
    }

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
        fileIcon.classList.remove("not-selected");
        fileIcon.classList.add("selected");
      } else {
        fileButton.textContent = "ПРИКРЕПИТЬ ФАЙЛ";
        fileIcon.classList.remove("selected");
        fileIcon.classList.add("not-selected");
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

  // Custom select dropdown
  (function () {
    const selects = document.querySelectorAll("[data-select]");
    if (!selects.length) return;

    function closeSelect(select) {
      if (!select) return;

      const dropdown = select.querySelector("[data-select-dropdown]");
      const toggle = select.querySelector("[data-select-toggle]");

      if (dropdown) {
        dropdown.hidden = true;
      }

      select.classList.remove("order-form__select_open");

      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
      }
    }

    function closeAllSelects(except) {
      selects.forEach(function (select) {
        if (except && select === except) return;
        closeSelect(select);
      });
    }

    selects.forEach(function (select) {
      const toggle = select.querySelector("[data-select-toggle]");
      const dropdown = select.querySelector("[data-select-dropdown]");
      const input = select.querySelector("[data-select-input]");
      const label = select.querySelector("[data-select-label]");
      const options = select.querySelectorAll(".order-form__select-option");

      if (!toggle || !dropdown || !input || !label) return;

      // Toggle on button click
      toggle.addEventListener("click", function (event) {
        event.stopPropagation();

        let isOpen = !dropdown.hidden;

        if (isOpen) {
          closeSelect(select);
        } else {
          closeAllSelects(select);
          dropdown.hidden = false;
          select.classList.add("order-form__select_open");
          toggle.setAttribute("aria-expanded", "true");
        }
      });

      // Options click
      options.forEach(function (option) {
        option.addEventListener("click", function (event) {
          const value = option.getAttribute("data-value");
          const text = option.textContent.trim();

          input.value = value || "";
          label.textContent = text;

          options.forEach(function (opt) {
            opt.classList.toggle("is-selected", opt === option);
          });

          closeSelect(select);
        });
      });
    });

    // Outside click closing
    document.addEventListener("click", function (event) {
      const target = event.target;
      if (!target.closest("[data-select]")) {
        closeAllSelects();
      }
    });

    // "Esc" key
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" || event.key === "Esc") {
        closeAllSelects();
      }
    });
  })();
});
