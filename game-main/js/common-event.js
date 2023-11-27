document.querySelectorAll('.card')
    .forEach(card => {
        card.classList.add("is-flipped");
        setTimeout(() => {
            card.classList.remove("is-flipped");
            card.style.pointerEvents = "auto";
        }, visibleTime);
    });
document.querySelectorAll('.card')
    .forEach(h => {
        h.addEventListener('click', Card.flipEvent)
        h.addEventListener('click', reset)
    });

