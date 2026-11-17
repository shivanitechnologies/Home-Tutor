document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#tutor-grid');
    const controls = {
        search: document.querySelector('#search-tutor'),
        subject: document.querySelector('#filter-subject'),
        grade: document.querySelector('#filter-grade'),
        location: document.querySelector('#filter-location'),
        price: document.querySelector('#filter-price'),
        experience: document.querySelector('#filter-experience'),
        verified: document.querySelector('#filter-verified'),
        sort: document.querySelector('#sort-tutors')
    };
    const params = new URLSearchParams(location.search);
    if (params.get('q')) controls.search.value = params.get('q');
    if (params.get('subject')) controls.subject.value = params.get('subject');
    if (params.get('grade')) controls.grade.value = params.get('grade');
    if (params.get('location')) controls.location.value = params.get('location');

    const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
    function render() {
        const search = controls.search.value.trim().toLowerCase();
        const subject = controls.subject.value;
        const grade = controls.grade.value;
        const city = controls.location.value.trim().toLowerCase();
        const maxPrice = controls.price.value === 'all' ? Infinity : Number(controls.price.value);
        const minExperience = controls.experience.value === 'all' ? 0 : Number(controls.experience.value);
        let results = TUTOR_DATA.filter(tutor =>
            (!search || [tutor.name, tutor.qualification, ...tutor.subjects].join(' ').toLowerCase().includes(search)) &&
            (subject === 'all' || tutor.subjects.includes(subject)) &&
            (grade === 'all' || tutor.grades.includes(grade)) &&
            (!city || tutor.location.toLowerCase().includes(city)) &&
            tutor.price <= maxPrice &&
            tutor.experienceYears >= minExperience &&
            (!controls.verified.checked || tutor.verified)
        );
        if (controls.sort.value === 'rating') results.sort((a,b) => b.rating-a.rating);
        if (controls.sort.value === 'price-low') results.sort((a,b) => a.price-b.price);
        document.querySelector('#tutor-count').textContent = results.length;
        if (!results.length) {
            grid.innerHTML = '<div class="empty-state card"><i data-lucide="search-x"></i><h3>No tutors match just yet</h3><p>Try broadening your filters to see more teachers.</p></div>';
            if (window.lucide) lucide.createIcons();
            return;
        }
        grid.innerHTML = results.map(tutor => `
            <article class="card tutor-card">
              <img class="tutor-photo" src="${escapeHTML(tutor.image)}" alt="${escapeHTML(tutor.name)}" loading="lazy">
              <div class="tutor-card-body">
                <div class="d-flex justify-content-between align-items-center"><span class="${tutor.verified ? 'verified' : 'muted'}">${tutor.verified ? '✓ Verified tutor' : 'Profile in review'}</span><span class="rating">★ ${tutor.rating.toFixed(1)}</span></div>
                <h3 class="mt-2">${escapeHTML(tutor.name)}</h3><p class="text-primary">${escapeHTML(tutor.subjects.join(' · '))}</p>
                <div class="tutor-details"><span><i data-lucide="briefcase"></i>${escapeHTML(tutor.experience)}</span><span><i data-lucide="graduation-cap"></i>${escapeHTML(tutor.qualification)}</span><span><i data-lucide="map-pin"></i>${escapeHTML(tutor.location)}</span><span><i data-lucide="users"></i>${escapeHTML(tutor.grades.join(', '))}</span></div>
                <div class="d-flex justify-content-between align-items-center" style="border-top:1px solid var(--border-color);padding-top:14px"><strong>$${tutor.price}<span class="muted">/hr</span></strong><div class="d-flex gap-2"><button class="btn btn-sm btn-outline profile-open" data-id="${tutor.id}">View profile</button><button class="btn btn-sm btn-primary book-demo" data-name="${escapeHTML(tutor.name)}">Book demo</button></div></div>
              </div>
            </article>`).join('');
        if (window.lucide) lucide.createIcons();
    }
    Object.values(controls).forEach(control => {
        control.addEventListener(control.tagName === 'INPUT' && control.type !== 'checkbox' ? 'input' : 'change', render);
    });
    document.querySelector('#reset-filters').addEventListener('click', () => {
        Object.values(controls).forEach(control => {
            if (control.type === 'checkbox') control.checked = false;
            else if (control.tagName === 'SELECT') control.selectedIndex = 0;
            else control.value = '';
        });
        history.replaceState(null, '', location.pathname);
        render();
    });
    render();
});
