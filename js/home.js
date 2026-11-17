document.addEventListener('DOMContentLoaded', () => {
    const imageUrl = (image, width = 720) => `https://images.unsplash.com/${image}?auto=format&fit=crop&w=${width}&q=82`;
    const featured = document.querySelector('#featured-tutors');
    if (featured && window.TUTOR_DATA) {
        const cards = TUTOR_DATA.map(tutor => `
            <article class="card tutor-card classic-tutor-card">
                <img class="tutor-photo" src="${tutor.image}" alt="${tutor.name}" width="700" height="500" loading="lazy" decoding="async">
                <div class="tutor-card-body"><div class="d-flex justify-content-between align-items-center"><span class="verified">${tutor.verified ? '✓ Verified tutor' : 'Profile in review'}</span><span class="rating" aria-label="${tutor.rating} out of 5 stars">★ ${tutor.rating}</span></div>
                <h3 class="mt-2">${tutor.name}</h3><p class="muted">${tutor.subjects.join(' · ')}</p>
                <div class="classic-tutor-facts"><span>${tutor.experience} experience</span><span>${tutor.qualification}</span><span>${tutor.grades.join(' · ')}</span></div>
                <div class="d-flex justify-content-between align-items-center mt-3"><strong>$${tutor.price}/hr</strong><button class="btn btn-sm btn-outline profile-open" data-id="${tutor.id}">View profile</button></div></div>
            </article>`).join('');
        const duplicates = cards.replaceAll('<article class="card tutor-card classic-tutor-card"', '<article class="card tutor-card classic-tutor-card" aria-hidden="true" inert');
        featured.innerHTML = cards + duplicates;
    }
    const premiumRows = [
        document.querySelector('#premium-tutors-row-one'),
        document.querySelector('#premium-tutors-row-two')
    ];
    if (premiumRows.every(Boolean) && window.PREMIUM_TUTOR_DATA) {
        const renderPremiumTutor = tutor => {
            const photo = imageUrl(tutor.image, 700);
            return `<article class="card tutor-card premium-tutor-card reveal-repeat" data-reveal-repeat>
                <img class="tutor-photo" src="${photo}" alt="${tutor.name}, ${tutor.role.toLowerCase()}" width="700" height="500" loading="lazy" decoding="async">
                <div class="tutor-card-body"><div class="premium-tutor-heading"><span class="verified">✓ Verified educator</span><span class="rating" aria-label="${tutor.rating} out of 5 stars">★ ${tutor.rating}</span></div>
                <h3 class="mt-2">${tutor.name}</h3><p class="premium-tutor-role">${tutor.role}</p><p class="muted">${tutor.qualification}</p>
                <div class="premium-tutor-facts"><span>${tutor.experience}</span><span>${tutor.grades.join(' · ')}</span></div>
                <button class="btn btn-sm btn-primary profile-open" data-id="${tutor.id}" data-premium-id="${tutor.id}" data-image="${photo}">View profile</button></div>
              </article>`;
        };
        const groups = [PREMIUM_TUTOR_DATA.slice(0, 4), PREMIUM_TUTOR_DATA.slice(4)];
        groups.forEach((group, index) => {
            const cards = group.map(renderPremiumTutor).join('');
            const duplicates = cards.replaceAll('<article class="card tutor-card premium-tutor-card reveal-repeat"', '<article class="card tutor-card premium-tutor-card reveal-repeat" aria-hidden="true" inert');
            premiumRows[index].innerHTML = cards + duplicates;
        });
        window.observeHomeReveals?.(document.querySelectorAll('.premium-tutor-card:not([inert])'));
    }
    const gallery = document.querySelector('#learning-gallery');
    if (gallery && window.CLASSIC_GALLERY_DATA) {
        const renderPhoto = ({image, alt, label}) => `
            <article class="learning-gallery-card">
                <img src="${imageUrl(image)}" alt="${alt}" loading="lazy" decoding="async" width="720" height="460">
                <span>${label}</span>
            </article>`;
        const cards = CLASSIC_GALLERY_DATA.map(renderPhoto).join('');
        const duplicates = cards.replaceAll('<article class="learning-gallery-card">', '<article class="learning-gallery-card" aria-hidden="true" inert>');
        gallery.innerHTML = cards + duplicates;
    }
    const premiumGallery = document.querySelector('#premium-learning-gallery');
    if (premiumGallery && window.PREMIUM_EXPERIENCE_DATA) {
        const renderPhoto = ({image, alt, label}) => `
            <article class="premium-learning-card">
                <img src="${imageUrl(image)}" alt="${alt}" loading="lazy" decoding="async" width="720" height="520">
                <span>${label}</span>
            </article>`;
        const cards = PREMIUM_EXPERIENCE_DATA.map(renderPhoto).join('');
        const duplicates = cards.replaceAll('<article class="premium-learning-card">', '<article class="premium-learning-card" aria-hidden="true" inert>');
        premiumGallery.innerHTML = cards + duplicates;
    }
    const premiumStories = document.querySelector('#premium-testimonial-gallery');
    if (premiumStories && window.PREMIUM_PARENT_DATA) {
        const cards = PREMIUM_PARENT_DATA.map(parent => `
            <article class="family-story-card"><img src="${imageUrl(parent.image, 160)}" alt="${parent.alt}" width="72" height="72" loading="lazy" decoding="async"><span><strong>${parent.name}</strong><small>${parent.grade}</small></span></article>`).join('');
        const duplicates = cards.replaceAll('<article class="family-story-card">', '<article class="family-story-card" aria-hidden="true" inert>');
        premiumStories.innerHTML = cards + duplicates;
    }
    window.initHomeMotion?.();
    if (window.lucide) lucide.createIcons();
});
