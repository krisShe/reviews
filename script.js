const swiper = new Swiper('.reviews-slider-widget', {
    direction: 'horizontal',
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

document.querySelectorAll('.client-quote p').forEach((item) => {
    const fullText = item.textContent.replace(/\s+/g, ' ').trim();

    if (fullText.length > 90) {
        const visible = fullText.slice(0, 90);
        const hidden = fullText.slice(90);

        item.textContent = '';

        const visibleTextNode = document.createTextNode(visible);
        item.appendChild(visibleTextNode);

        const dots = document.createElement('span');
        dots.className = 'dots clickable';
        dots.textContent = '•••';
        item.appendChild(dots);

        const hiddenSpan = document.createElement('span');
        hiddenSpan.className = 'more-text';
        hiddenSpan.style.display = 'none';
        hiddenSpan.textContent = hidden;
        item.appendChild(hiddenSpan);

        dots.addEventListener('click', () => {
            const isHidden = hiddenSpan.style.display === 'none';
            hiddenSpan.style.display = isHidden ? 'inline' : 'none';
            dots.textContent = isHidden ? '' : '•••';
            dots.classList.remove('dots')
        });
    }
});


// Before After
document.addEventListener("DOMContentLoaded", function () {
    const sliders = document.querySelectorAll(".before-after-container");

    sliders.forEach(container => {
        const slider = container.querySelector(".slider");
        const afterImage = container.querySelector(".after-image");
        const handle = container.querySelector(".slider-handle");
        const slickContainer = container.closest(".before-after__container");

        let isDragging = false;

        handle.addEventListener("pointerdown", function (event) {
            isDragging = true;
            document.body.style.userSelect = "none";
            swiper.allowTouchMove = false;
            event.preventDefault();
        });

        document.addEventListener("pointermove", function (event) {
            if (isDragging) {
                let rect = container.getBoundingClientRect();
                let percentage = ((event.clientX - rect.left) / rect.width) * 100;
                percentage = Math.max(0, Math.min(100, percentage));

                slider.value = percentage;
                afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
                let containerWidth = container.offsetWidth;
                let newPosition = (containerWidth * percentage) / 100;
                handle.style.left = `${newPosition}px`;
            }
        });

        document.addEventListener("pointerup", function () {
            isDragging = false;
            document.body.style.userSelect = "";
            swiper.allowTouchMove = true;

            if (slickContainer) {
                $(slickContainer).slick("slickSetOption", "swipe", true, false);
            }
        });

        handle.addEventListener("touchmove", function (event) {
            event.stopPropagation();
        });

        handle.addEventListener("mousedown", function (event) {
            event.stopPropagation();
        });
    });
});