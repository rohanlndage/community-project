document.addEventListener("DOMContentLoaded", function () {

    /* ================= MOBILE MENU ================= */

    const menuBtn = document.getElementById("eceMenuBtn");
    const navigation = document.getElementById("eceNavigation");

    if (menuBtn && navigation) {

        menuBtn.addEventListener("click", function () {
            navigation.classList.toggle("active");
        });

        navigation.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {
                navigation.classList.remove("active");
            });

        });

    }


    /* ================= YEAR ================= */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* ================= SMOOTH SCROLL ================= */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") {
                return;
            }

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


/* ================= COMING SOON ================= */

function showComingSoon(sectionName) {

    const popup = document.getElementById("comingSoonPopup");
    const text = document.getElementById("comingSoonText");

    if (popup && text) {

        text.innerHTML =
            "<strong>" +
            sectionName +
            "</strong> is coming soon.<br>Stay updated!";

        popup.style.display = "flex";
    }

}


/* ================= CLOSE POPUP ================= */

function closeComingSoon() {

    const popup = document.getElementById("comingSoonPopup");

    if (popup) {
        popup.style.display = "none";
    }

}


/* ================= CLICK OUTSIDE POPUP ================= */

document.addEventListener("click", function (event) {

    const popup = document.getElementById("comingSoonPopup");

    if (popup && event.target === popup) {
        closeComingSoon();
    }

});