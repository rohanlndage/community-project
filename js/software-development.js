

/* =========================================================
   ECE COMMUNITY
   SOFTWARE DEVELOPMENT PAGE
   software-development.js
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuButton = document.querySelector(".mobile-menu-btn");
    const mobileDrawer = document.querySelector(".mobile-drawer");
    const closeButton = document.querySelector(".mobile-drawer-close");

    // Open menu
    if (menuButton && mobileDrawer) {

        menuButton.addEventListener("click", function () {

            mobileDrawer.classList.add("active");
            document.body.classList.add("menu-open");

        });

    }

    // Close menu
    if (closeButton && mobileDrawer) {

        closeButton.addEventListener("click", function () {

            mobileDrawer.classList.remove("active");
            document.body.classList.remove("menu-open");

        });

    }

    // Close menu when navigation link is clicked
    const mobileLinks = document.querySelectorAll(".mobile-nav a");

    mobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (mobileDrawer) {
                mobileDrawer.classList.remove("active");
            }

            document.body.classList.remove("menu-open");

        });

    });


    /* =====================================================
       CLOSE MENU WITH ESC KEY
    ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape" && mobileDrawer) {

            mobileDrawer.classList.remove("active");
            document.body.classList.remove("menu-open");

        }

    });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".sd-intro, " +
        ".sd-roadmap-card, " +
        ".sd-resource-card, " +
        ".sd-material-card, " +
        ".sd-project-card, " +
        ".sd-expert-box, " +
        ".sd-skill, " +
        ".sd-final-cta-box"
    );

    if ("IntersectionObserver" in window && revealElements.length > 0) {

        const revealObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        revealObserver.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(function (element) {

            element.classList.add("reveal-item");

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("is-visible");

        });

    }


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop = document.querySelector(".back-to-top");

    if (backToTop) {

        function toggleBackToTop() {

            if (window.scrollY > 500) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        }

        window.addEventListener("scroll", toggleBackToTop, {
            passive: true
        });

        toggleBackToTop();

        backToTop.addEventListener("click", function (event) {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const mainHeader = document.querySelector(".main-header");

    if (mainHeader) {

        function updateHeader() {

            if (window.scrollY > 30) {

                mainHeader.classList.add("scrolled");

            } else {

                mainHeader.classList.remove("scrolled");

            }

        }

        window.addEventListener("scroll", updateHeader, {
            passive: true
        });

        updateHeader();

    }


    /* =====================================================
       ROADMAP LINKS
    ===================================================== */

    const roadmapLinks = document.querySelectorAll(".sd-roadmap-link");

    roadmapLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            const card = link.closest(".sd-roadmap-card");

            if (card) {
                card.classList.add("visited");
            }

        });

    });


    /* =====================================================
       LEARNING MATERIAL BUTTONS
    ===================================================== */

    const materialButtons = document.querySelectorAll(".sd-material-btn");

    materialButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const card = button.closest(".sd-material-card");

            if (card) {
                card.classList.add("selected");
            }

        });

    });


    /* =====================================================
       PROJECT CARDS
    ===================================================== */

    const projectCards = document.querySelectorAll(".sd-project-card");

    projectCards.forEach(function (card) {

        card.addEventListener("click", function () {

            projectCards.forEach(function (item) {

                item.classList.remove("selected");

            });

            card.classList.add("selected");

        });

    });


    /* =====================================================
       SKILLS
    ===================================================== */

    const skills = document.querySelectorAll(".sd-skill");

    skills.forEach(function (skill) {

        skill.addEventListener("click", function () {

            skills.forEach(function (item) {

                item.classList.remove("active");

            });

            skill.classList.add("active");

        });

    });


    /* =====================================================
       BUTTON CLICK FEEDBACK
    ===================================================== */

    const actionButtons = document.querySelectorAll(
        ".sd-hero-btn, " +
        ".sd-final-btn, " +
        ".sd-material-btn"
    );

    actionButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            button.classList.add("clicked");

            setTimeout(function () {

                button.classList.remove("clicked");

            }, 250);

        });

    });


    /* =====================================================
       RESET MOBILE MENU ON DESKTOP RESIZE
    ===================================================== */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 900 && mobileDrawer) {

            mobileDrawer.classList.remove("active");
            document.body.classList.remove("menu-open");

        }

    });


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add("software-page-ready");

});
