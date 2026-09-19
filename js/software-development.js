/* =========================================
   SOFTWARE DEVELOPMENT PAGE JS
========================================= */
document.addEventListener("DOMContentLoaded", function () {

    /* ================= MOBILE MENU ================= */

    const menuBtn = document.getElementById("eceMenuBtn");
    const navigation = document.getElementById("eceNavigation");

    if (menuBtn && navigation) {

        menuBtn.addEventListener("click", function () {
            navigation.classList.toggle("active");
        });

        // Close menu when a navigation link is clicked
        navigation.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {
                navigation.classList.remove("active");
            });

        });
    }


    /* ================= CURRENT YEAR ================= */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* ================= SMOOTH SCROLL ================= */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });

});

document.addEventListener("DOMContentLoaded", function () {

    /* Mobile Menu */

    const menuBtn = document.getElementById("menuBtn");
    const mainNav = document.getElementById("mainNav");

    if (menuBtn && mainNav) {

        menuBtn.addEventListener("click", function () {
            mainNav.classList.toggle("active");
        });

        mainNav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                mainNav.classList.remove("active");
            });
        });
    }


    /* Current Year */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* Smooth Scroll */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (e) {

            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });
            }

        });

    });

});


// ==========================================
// COMING SOON POPUP
// ==========================================

function showComingSoon(sectionName) {

    const popup = document.getElementById("comingSoonPopup");
    const text = document.getElementById("comingSoonText");

    if (!popup || !text) return;

    text.textContent =
        sectionName + " is coming soon. Stay updated!";

    popup.classList.add("active");
}


function closeComingSoon() {

    const popup = document.getElementById("comingSoonPopup");

    if (!popup) return;

    popup.classList.remove("active");
}


// Close popup when clicking outside the box
document.addEventListener("click", function (event) {

    const popup = document.getElementById("comingSoonPopup");

    if (
        popup &&
        event.target === popup
    ) {
        popup.classList.remove("active");
    }

});