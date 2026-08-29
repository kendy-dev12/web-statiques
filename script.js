document.addEventListener("DOMContentLoaded", () => {

    // 1. POP-UP BYENVENI SOU PAJ AKÈY LA
    const isHomePage = window.location.pathname.endsWith("index.html") ||
                       window.location.pathname === "/" ||
                       document.querySelector(".welcome-banner");
    if (isHomePage) {
        alert("Bienvenue sur le site touristique de Jacmel!");
    }

    // 2. MENU HAMBURGER RESPONSIVE
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // 3. CHANJMAN TÈM (MODE JOUR / NUIT)
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-theme");
            themeToggle.textContent = document.body.classList.contains("dark-theme")
                ? "☀️ Mode Jour"
                : "🌙 Mode Nuit";
        });
    }

    // 4. DIAPORAMA AUTOMATIK IMAY (SLIDER)
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active");
        }, 3000);
    }

    // 5. MIZIK DE FON (JWE SOU NENPÒT PREMYE KLIKE OSOA TOUCHE)
    const bgMusic = document.getElementById("bgMusic");
    if (bgMusic) {
        bgMusic.volume = 0.5;

        const playAudio = () => {
            bgMusic.play().then(() => {
                // Si l reyalize jwe, retire tout koutè sa yo
                window.removeEventListener("click", playAudio);
                window.removeEventListener("touchstart", playAudio);
                window.removeEventListener("scroll", playAudio);
                window.removeEventListener("keydown", playAudio);
            }).catch(() => {
                // Navigatè a toujou bloke l, l ap tann yon lòt klike
            });
        };

        // Koute sou tout fenèt la nèt (window)
        window.addEventListener("click", playAudio);
        window.addEventListener("touchstart", playAudio);
        window.addEventListener("scroll", playAudio);
        window.addEventListener("keydown", playAudio);

        // Kòmanse jwe touswit si navigatè a pèmèt li san blokaj
        playAudio();

        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                bgMusic.pause();
            } else {
                bgMusic.play().catch(() => {});
            }
        });
    }

    // 6. BOUTON RETOUR EN HAUT
    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 200) {
                backToTopBtn.style.display = "flex";
            } else {
                backToTopBtn.style.display = "none";
            }
        });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 7. DAT AK LÈ NAN FOOTER (EN TAN REYÈL AK SEGONN)
    const datetime = document.getElementById("datetime");
    if (datetime) {
        const updateTime = () => {
            const now = new Date();
            const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            };
            datetime.textContent = "📅 " + now.toLocaleDateString("fr-FR", options);
        };
        updateTime();
        setInterval(updateTime, 1000);
    }
});

// 8. MESAJ KONFIMASYON SOU PAJ VYÈJ APRE VALIDASYON
function validerFormulaire(event) {
    event.preventDefault();

    const nom = document.getElementById("nom") ? document.getElementById("nom").value.trim() : "";
    const prenom = document.getElementById("prenom") ? document.getElementById("prenom").value.trim() : "";
    const email = document.getElementById("email") ? document.getElementById("email").value.trim() : "";
    const tel = document.getElementById("tel") ? document.getElementById("tel").value.trim() : "";
    const message = document.getElementById("message") ? document.getElementById("message").value.trim() : "";

    if (!nom || !prenom || !email || !tel || !message) {
        alert("Tanpri ranpli tout chan yo.");
        return false;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Tanpri antre yon adrès email ki valid.");
        return false;
    }

    const contactSection = document.querySelector(".contact-section");

    if (contactSection) {
        contactSection.innerHTML = `
            <div class="confirmation-container" style="text-align: center; padding: 40px 10px;">
                <div style="background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; padding: 30px; border-radius: 12px; display: inline-block; text-align: left; max-width: 550px; width: 100%; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                    <h2 style="margin-top: 0; color: #155724; text-align: center;">✅ Message Envoyé avec Succès !</h2>
                    <p style="text-align: center;">Merci <strong>${prenom} ${nom}</strong>, vos informations ont été bien reçues :</p>
                    <hr style="border: 0.5px solid #c3e6cb; margin: 15px 0;">
                    <ul style="list-style: none; padding: 0; line-height: 2;">
                        <li><strong>Nom :</strong> ${nom}</li>
                        <li><strong>Prénom :</strong> ${prenom}</li>
                        <li><strong>Email :</strong> ${email}</li>
                        <li><strong>Téléphone :</strong> ${tel}</li>
                        <li><strong>Message :</strong> ${message}</li>
                    </ul>
                    <div style="text-align: center; margin-top: 25px;">
                        <a href="contact.html" style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Nouveau message</a>
                    </div>
                </div>
            </div>
        `;
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return false;
}