document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal with Intersection Observer
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Infinite Marquee Duplicate Content for Seamless Loop
    const marquees = document.querySelectorAll('.marquee-content');
    marquees.forEach(marquee => {
        const content = marquee.innerHTML;
        marquee.innerHTML = content + content; // Duplicate once for loop
    });

    // Simple FAQ Accordion Interaction
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
});
