document.addEventListener('DOMContentLoaded', () => {
    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
    const subjects = [
        ['Mathematics','calculator','Build confidence in numbers, algebra, geometry and exam problem-solving.'],
        ['Science','flask-conical','Explore the world through clear, practical lessons across the sciences.'],
        ['English','book-open','Strengthen reading, writing, grammar and communication skills.'],
        ['Physics','atom','Make mechanics, energy and electricity easier to understand.'],
        ['Chemistry','beaker','Learn reactions, elements and equations with confidence.'],
        ['Biology','dna','Discover living systems from cells to ecosystems.'],
        ['Computer Science','code-2','Learn computational thinking, coding and digital foundations.'],
        ['Social Studies','globe-2','Connect history, geography and the world around us.'],
        ['Hindi','languages','Grow fluency, comprehension and writing in Hindi.'],
        ['Tamil','languages','Build strong Tamil reading, speaking and writing skills.']
    ];
    const esc = text => String(text).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
    const pageLink = view => `content.html?view=${encodeURIComponent(view)}`;
    const setControlIcon = (button, name) => {
        const icon = button.querySelector('svg,[data-lucide]');
        if (!icon) return;
        const replacement = document.createElement('i');
        replacement.dataset.lucide = name;
        icon.replaceWith(replacement);
        window.lucide?.createIcons();
    };

    document.documentElement.dataset.theme = localStorage.getItem('theme') || 'light';
    document.documentElement.dir = localStorage.getItem('dir') || document.documentElement.dir || 'ltr';

    $$('#theme-toggle').forEach(button => button.addEventListener('click', () => {
        const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('theme', theme);
    }));
    const directionToggle = $('#rtl-toggle') || $('.mobile-rtl');
    const oldDirectionControls = $$('#rtl-toggle, .mobile-rtl');
    if (directionToggle) {
        const group = document.createElement('div');
        group.className = 'direction-switch';
        group.setAttribute('role', 'group');
        group.setAttribute('aria-label', 'Text direction');
        group.style.cssText = directionToggle.style.cssText;
        const ltrButton = document.createElement('button');
        ltrButton.type = 'button';
        ltrButton.className = 'direction-option';
        ltrButton.dataset.layoutDir = 'ltr';
        ltrButton.textContent = 'LTR';
        const separator = document.createElement('span');
        separator.className = 'direction-separator';
        separator.setAttribute('aria-hidden', 'true');
        separator.textContent = '|';
        const rtlButton = document.createElement('button');
        rtlButton.type = 'button';
        rtlButton.className = 'direction-option';
        rtlButton.dataset.layoutDir = 'rtl';
        rtlButton.textContent = 'RTL';
        group.append(ltrButton, separator, rtlButton);
        directionToggle.replaceWith(group);
        oldDirectionControls.forEach(control => { if (control !== directionToggle) control.remove(); });

        const setDirection = dir => {
            document.documentElement.dir = dir;
            document.documentElement.lang = dir === 'rtl' ? 'ar' : 'en';
            localStorage.setItem('dir', dir);
            group.querySelectorAll('[data-layout-dir]').forEach(button => {
                const active = button.dataset.layoutDir === dir;
                button.setAttribute('aria-pressed', String(active));
                button.setAttribute('aria-label', `Set ${button.dataset.layoutDir.toUpperCase()} reading direction`);
            });
        };
        group.querySelectorAll('[data-layout-dir]').forEach(button => {
            button.addEventListener('click', () => setDirection(button.dataset.layoutDir));
        });
        setDirection(document.documentElement.dir === 'rtl' ? 'rtl' : 'ltr');
    }
    $$('.mobile-toggle').forEach(button => button.addEventListener('click', () => {
        const nav = $('.nav-links');
        const expanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!expanded));
        nav?.classList.toggle('active', !expanded);
    }));

    const revealEls = $$('.reveal,.reveal-left,.reveal-right,[data-reveal-repeat]');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
            if (entry.target.hasAttribute('data-reveal-repeat')) {
                entry.target.classList.toggle('active', entry.isIntersecting);
            } else if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        }), { threshold: .12 });
        window.observeHomeReveals = elements => elements.forEach(el => revealObserver.observe(el));
        window.observeHomeReveals(revealEls);
    } else {
        window.observeHomeReveals = elements => elements.forEach(el => el.classList.add('active'));
        window.observeHomeReveals(revealEls);
    }
    const counters = $$('.count-up');
    const animateCount = element => {
        const target = Number(element.dataset.count);
        const prefix = element.dataset.prefix || '';
        const suffix = element.dataset.suffix || '';
        if (!Number.isFinite(target)) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            element.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
            return;
        }
        const startedAt = performance.now();
        const update = now => {
            const progress = Math.min((now - startedAt) / 1100, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            element.textContent = `${prefix}${Math.round(target * eased).toLocaleString()}${progress === 1 ? suffix : ''}`;
            if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    };
    if ('IntersectionObserver' in window) {
        const countObserver = new IntersectionObserver(entries => entries.forEach(entry => {
            if (entry.isIntersecting) { animateCount(entry.target); countObserver.unobserve(entry.target); }
        }), { threshold: .6 });
        counters.forEach(counter => countObserver.observe(counter));
    } else counters.forEach(animateCount);

    $$('.faq-question').forEach(button => button.addEventListener('click', () => {
        const item = button.closest('.faq-item');
        const open = item.classList.toggle('active');
        button.setAttribute('aria-expanded', String(open));
    }));

    function populateSubjects(subjectGrid) {
        subjectGrid.innerHTML = subjects.map(([name, icon, desc]) => `
            <article class="card subject-tile reveal">
                <div class="subject-icon"><i data-lucide="${icon}"></i></div>
                <h3>${name}</h3><p>${desc}</p>
                <a class="btn btn-sm btn-outline mt-3" href="${pageLink(`subject-${name.toLowerCase().replaceAll(' ','-')}`)}">View tutors</a>
            </article>`).join('');
    }
    if ($('#subject-list')) populateSubjects($('#subject-list'));

    const subjectRail = $('#subject-rail');
    if (subjectRail) {
        const railItems = document.body.classList.contains('premium-home') ? PREMIUM_SUBJECT_DATA : SUBJECT_DATA;
        const renderTile = (subject, index, duplicate = false) => {
            const slug = subject.name.toLowerCase().replaceAll(' ', '-');
            const image = document.body.classList.contains('premium-home')
                ? `https://images.unsplash.com/${subject.image}?auto=format&fit=crop&w=720&q=82`
                : subject.image.replace('w=500', 'w=720');
            return `<a class="card subject-tile subject-image-tile${document.body.classList.contains('premium-home') ? ' premium-subject-tile' : ''}" data-subject-index="${index}" href="${pageLink(`subject-${slug}`)}"${duplicate ? ' aria-hidden="true" inert' : ''}><img src="${image}" alt="${subject.alt || `${subject.name} learning`}" width="720" height="460" loading="${index === 0 && !duplicate ? 'eager' : 'lazy'}" decoding="async"><span class="subject-tile-label"><i data-lucide="${subject.icon}"></i><strong>${subject.name}</strong></span></a>`;
        };
        subjectRail.innerHTML = railItems.map((subject, index) => renderTile(subject, index)).join('')
            + railItems.map((subject, index) => renderTile(subject, index, true)).join('');
        window.lucide?.createIcons();
    }

    $$('.search-form').forEach(form => form.addEventListener('submit', event => {
        event.preventDefault();
        const data = new FormData(form);
        const params = new URLSearchParams();
        for (const [key, value] of data) if (value) params.set(key, value);
        location.href = `find-tutor.html?${params}`;
    }));
    document.addEventListener('click', event => {
        const button = event.target.closest('.profile-open');
        if (!button) return;
        const modal = $('#profile-modal');
        if (!modal) return;
        const tutor = window.PREMIUM_TUTOR_DATA?.find(item => String(item.id) === button.dataset.premiumId)
            || window.TUTOR_DATA?.find(item => String(item.id) === button.dataset.id);
        if (tutor) {
            const displayImage = button.dataset.image || tutor.image;
            $('#profile-modal-content', modal).innerHTML = `<div class="d-flex gap-3 align-items-center mb-3"><img src="${esc(displayImage)}" alt="${esc(tutor.name)}" width="72" height="72" style="object-fit:cover;border-radius:16px"><div><h2>${esc(tutor.name)}</h2><p class="muted">${esc(tutor.qualification)}</p></div></div><p>${esc(tutor.name)} teaches ${esc(tutor.subjects.join(', '))} for ${esc(tutor.grades.join(', '))}. ${esc(tutor.experience)} of teaching experience in ${esc(tutor.location)}.</p><p class="rating">★ ${tutor.rating} · $${tutor.price}/hour</p><button class="btn btn-primary book-demo" data-name="${esc(tutor.name)}">Book a demo class</button>`;
        }
        modal.classList.add('open');
        modal.setAttribute('aria-hidden','false');
        window.lucide?.createIcons();
    });
    $$('.modal-close').forEach(button => button.addEventListener('click', () => {
        const modal = button.closest('.profile-modal');
        modal?.classList.remove('open');
        modal?.setAttribute('aria-hidden','true');
    }));
    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;
        const modal = $('.profile-modal.open');
        modal?.classList.remove('open');
        modal?.setAttribute('aria-hidden','true');
    });
    document.addEventListener('click', event => {
        const trigger = event.target.closest('[data-dropdown-toggle]');
        if (trigger) {
            const panel = trigger.nextElementSibling;
            const open = panel.classList.toggle('open');
            trigger.setAttribute('aria-expanded', String(open));
            return;
        }
        if (!event.target.closest('.dashboard-dropdown')) {
            $$('.dropdown-panel.open').forEach(panel => panel.classList.remove('open'));
            $$('[data-dropdown-toggle]').forEach(button => button.setAttribute('aria-expanded','false'));
        }
    });
    document.addEventListener('click', event => {
        const book = event.target.closest('.book-demo');
        if (book) {
            const name = book.dataset.name || book.closest('.tutor-card')?.querySelector('h3')?.textContent || 'your tutor';
            showNotice(`Demo request started for ${name}. Sign in to choose a time.`);
            setTimeout(() => location.href='auth/login.html', 1200);
        }
    });

    const slides = $$('.testimonial-slide');
    if (slides.length > 1) {
        let current = 0;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const toggle = $('#testimonial-toggle');
        let paused = reducedMotion;
        let interactionPaused = false;
        const show = index => {
            current = (index + slides.length) % slides.length;
            slides.forEach((slide, i) => {
                slide.classList.toggle('is-active', i === current);
                slide.setAttribute('aria-hidden', String(i !== current));
            });
        };
        const updateToggle = () => {
            if (!toggle) return;
            toggle.setAttribute('aria-pressed', String(paused));
            toggle.setAttribute('aria-label', `${paused ? 'Play' : 'Pause'} testimonials`);
            toggle.querySelector('.sr-only').textContent = `${paused ? 'Play' : 'Pause'} testimonials`;
            setControlIcon(toggle, paused ? 'play' : 'pause');
        };
        show(0);
        $('#testimonial-next')?.addEventListener('click', () => show(current + 1));
        $('#testimonial-prev')?.addEventListener('click', () => show(current - 1));
        toggle?.addEventListener('click', () => { paused = !paused; updateToggle(); });
        window.setInterval(() => { if (!paused && !interactionPaused && !document.hidden) show(current + 1); }, 7000);
        updateToggle();
        const carousel = $('.testimonial-card');
        let startX = null;
        carousel?.addEventListener('mouseenter', () => { interactionPaused = true; });
        carousel?.addEventListener('mouseleave', () => { interactionPaused = false; });
        carousel?.addEventListener('focusin', () => { interactionPaused = true; });
        carousel?.addEventListener('focusout', event => {
            if (!carousel.contains(event.relatedTarget)) interactionPaused = false;
        });
        carousel?.addEventListener('touchstart', event => { startX = event.changedTouches[0].clientX; }, {passive:true});
        carousel?.addEventListener('touchend', event => {
            if (startX === null) return;
            const distance = event.changedTouches[0].clientX - startX;
            if (Math.abs(distance) > 45) show(current + (distance < 0 ? 1 : -1));
            startX = null;
        }, {passive:true});
    }
    $$('.password-toggle').forEach(button => button.addEventListener('click', () => {
        const input = $(button.dataset.target);
        input.type = input.type === 'password' ? 'text' : 'password';
        button.setAttribute('aria-label', input.type === 'password' ? 'Show password' : 'Hide password');
    }));
    $$('.auth-form').forEach(form => form.addEventListener('submit', event => {
        event.preventDefault();
        showNotice('This frontend demo is ready. Connect an authentication service to enable accounts.');
    }));
    document.addEventListener('submit', event => {
        const form = event.target.closest('.contact-form');
        if (!form) return;
        event.preventDefault();
        form.reset();
        showNotice('Thanks for reaching out. Our family support team will be in touch soon.');
    });
    const dashboardPanel = $('#dashboard-panel');
    const dashboardOverview = dashboardPanel?.innerHTML;
    document.addEventListener('click', event => {
        const link = event.target.closest('.dashboard-link');
        if (!link) return;
        const label = link.dataset.section;
        if (!label || link.getAttribute('href') !== '#') return;
        event.preventDefault();
        $$('.dashboard-link').forEach(item => item.classList.toggle('active', item === link));
        const panel = $('#dashboard-panel');
        if (panel) {
            if (label === 'Overview' || label === 'Dashboard Overview') {
                panel.innerHTML = dashboardOverview;
                window.lucide?.createIcons();
                return;
            }
            const title = esc(label);
            panel.innerHTML = `<div class="dashboard-title"><h1>${title}</h1><p class="muted">Manage ${title.toLowerCase()} and keep your learning platform running smoothly.</p></div><div class="grid grid-3 mt-4"><div class="card"><h3>${title} overview</h3><p class="muted">Your latest ${title.toLowerCase()} information and updates appear here.</p><button class="btn btn-primary dashboard-action">Add new</button></div><div class="card"><h3>Recent activity</h3><p class="muted">Records are up to date. Use the controls to review or manage entries.</p></div><div class="card"><h3>Quick tip</h3><p class="muted">Keep profiles and schedules current to make every learning match count.</p></div></div>`;
        }
    });
    document.addEventListener('click', event => {
        const button = event.target.closest('.dashboard-action,[data-message]');
        if (button) showNotice(button.dataset.message || 'Action saved in this frontend preview.');
    });

    const viewRoot = $('#content-view');
    if (viewRoot) renderContentPage(viewRoot);
    function renderContentPage(root) {
        const view = new URLSearchParams(location.search).get('view') || 'subjects';
        const data = pageContent(view);
        document.title = `${data.title} | HomeTutor`;
        root.innerHTML = `<section class="content-hero"><div class="container"><span class="eyebrow">Learning, made personal</span><h1>${data.title}</h1><p class="muted">${data.intro}</p></div></section><main>${data.body}<section class="content-block"><div class="container site-cta"><div class="grid grid-2 align-items-center"><div><span class="eyebrow" style="color:#F2B544">Your next step</span><h2>Find the right tutor for your family</h2><p>Meet trusted educators who make progress feel possible.</p></div><div class="d-flex gap-3 justify-content-end"><a class="btn btn-secondary" href="find-tutor.html">Explore tutors</a><a class="btn btn-outline" style="color:white;border-color:white" href="content.html?view=contact">Talk to our team</a></div></div></div></section></main>`;
        if ($('#subject-list', root)) populateSubjects($('#subject-list', root));
        window.lucide?.createIcons();
        root.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
    }
    function pageContent(view) {
        const subjectsMarkup = `<section class="content-block"><div class="container"><div class="grid grid-3" id="subject-list"></div></div></section>`;
        if (view === 'subjects') return {title:'Subjects for every curious mind',intro:'Meet specialist teachers for the school subjects your learner needs most.',body:subjectsMarkup};
        if (view.startsWith('subject-')) {
            const subject = subjects.find(([name]) => name.toLowerCase().replaceAll(' ','-') === view.slice(8));
            if (!subject) return pageContent('404');
            const name = subject[0];
            return {title:`${name} tutors`,intro:`Build strong foundations and lasting confidence with a tutor who makes ${name.toLowerCase()} click.`,body:`<section class="content-block"><div class="container grid grid-2 align-items-center"><div><h2>Make progress, one clear concept at a time</h2><p class="muted">Personalized lesson plans, patient explanations and regular progress check-ins help students feel capable in class and beyond.</p><a class="btn btn-primary" href="find-tutor.html?subject=${encodeURIComponent(name)}">Browse ${name} tutors</a></div><img class="rounded" src="https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=850&q=80" alt="Student learning with a tutor"></div></section>`};
        }
        const content = {
            'how-it-works': ['How it works','A thoughtful, simple path from your first search to confident learning.',['Search for a tutor|Tell us the subject, grade and learning style you have in mind.','Compare tutor profiles|Review teaching experience, qualifications, reviews and availability.','Book a demo class|Meet your shortlist and find the right personality fit before committing.','Start learning|Set a schedule, follow progress and adjust the plan as your learner grows.']],
            'about': ['About HomeTutor','We bring families and inspiring educators together, with trust and learning at the heart of every match.',['Quality first|Every profile is reviewed so families can discover experienced educators with confidence.','A human match|The right tutor brings subject expertise, patience and a teaching style that fits.','Progress that lasts|Personal support helps learners build confidence, not just prepare for the next test.']],
            'services': ['Learning support, tailored to you','Flexible tutoring services designed around the way each learner grows.',['One-to-one tutoring|Focused lessons for school subjects, exams and everyday confidence.','Exam preparation|Structured practice, revision plans and calm test-taking strategies.','Learning plans|Clear goals and regular feedback for families and tutors.']],
            'service-details': ['One-to-one tutoring','A personal learning plan and a consistent tutor make space for the questions students are often afraid to ask in class.',['A lesson built for them|Tutors adapt pace, examples and practice to your student.','Flexible formats|Choose in-home or online sessions depending on your family schedule.','Meaningful feedback|Track small wins and next steps after each learning milestone.']],
            'blog': ['Ideas for brighter learning','Practical guidance for families, students and tutors.',['How to build a simple after-school study routine|Small, consistent habits can make homework feel more manageable.|8 min read','Choosing a tutor who fits your child|The best match is about teaching style as much as credentials.|6 min read','Five ways to make maths feel less intimidating|A little curiosity and the right practice can change the story.|5 min read']],
            'blog-details': ['Choosing a tutor who fits your child','The strongest learning relationships are built on trust, clear goals and a teaching style that brings out a student’s curiosity.',['Start with the learner|Talk about what feels easy, what feels hard and how your child likes to learn.','Look beyond the subject|Experience and qualifications matter, but patience and communication matter too.','Try a first lesson|A demo session gives everyone a chance to see if the connection feels right.']],
            'contact': ['Let’s find your learner’s next great teacher','Our team is here to help you choose the right subject support and get started.',['Email|hello@hometutor.example','Phone|+1 (800) 555-0148','Office|Learning together, wherever you are']],
            'pricing': ['Simple plans for every learning journey','Choose a flexible path with transparent session pricing and no hidden surprises.',['Starter|$29 / session|One subject · Weekly progress notes','Growth|$49 / session|Up to two subjects · Monthly learning review','Focused|$79 / session|Exam prep · Priority tutor matching']],
            'privacy': ['Your family’s privacy matters','We collect only the information needed to help families find tutors, schedule learning and manage their accounts. We do not sell personal data. Contact our support team to request access, correction or deletion of your account information.',['Information you share|Account details, search preferences and booking information help us provide the directory experience.','How it is used|We use your information to operate the service, support bookings and improve safety.','Your choices|You can update profile information or contact support about data requests at any time.']],
            'terms': ['A clear, respectful learning community','HomeTutor helps families discover independent tutors. Families and tutors are responsible for agreeing on lesson goals, schedules and the terms of their sessions. Treat other members respectfully, keep account details accurate, and contact support if a profile or booking needs attention.',['Tutor profiles|Tutor qualifications and availability are provided for families to compare; verify details directly before beginning lessons.','Bookings|Confirm session details and any changes with your tutor. Cancellation terms should be agreed before a paid package begins.','Community|Use HomeTutor for legitimate education-related purposes and respect the safety and privacy of students.']],
            'grades': ['Support for every school grade','Find an educator who understands the challenges and milestones at every stage.',['Primary · Grades 1–5|Build core skills and curiosity.','Middle school · Grades 6–8|Grow independence and strong study habits.','High school · Grades 9–12|Prepare for exams and future pathways.']],
            '404': ['That page took a study break','We couldn’t find the page you were looking for. Head back to a tutor search and keep learning moving.',['Back to the directory|Browse verified tutors by subject, grade and location.']],
            'maintenance': ['A little learning-space refresh','We’re making HomeTutor even better. Please check back soon or get in touch with our team.',['We’ll be back shortly|Your tutor matches and learning plans will be here when we return.']]
        };
        const item = content[view] || content.about;
        const cards = item[2].map(entry => {
            const parts = entry.split('|');
            return `<article class="card feature-card reveal"><div class="subject-icon"><i data-lucide="book-open-check"></i></div><h3>${parts[0]}</h3><p class="muted">${parts.slice(1).join(' · ')}</p>${view.startsWith('blog')?`<a class="text-primary" href="${pageLink('blog-details')}">Read article →</a>`:''}</article>`;
        }).join('');
        const steps = ['how-it-works','service-details','grades'].includes(view);
        const contactForm = view === 'contact' ? `<section class="content-block"><div class="container"><form class="card contact-form" style="max-width:760px;margin:auto"><h2>Send us a note</h2><p class="muted">Tell us a little about the learning support you need.</p><div class="grid grid-2"><div class="field"><label for="contact-name">Your name</label><input id="contact-name" name="name" required></div><div class="field"><label for="contact-email">Email address</label><input id="contact-email" name="email" type="email" required></div></div><div class="field mt-3"><label for="contact-message">How can we help?</label><textarea id="contact-message" name="message" rows="5" class="form-control" required></textarea></div><button class="btn btn-primary mt-3" type="submit">Send message</button></form></div></section>` : '';
        return {title:item[0],intro:item[1],body:`<section class="content-block"><div class="container grid grid-${item[2].length === 4 ? '4' : item[2].length === 2 ? '2' : '3'} ${steps?'steps-grid':''}">${cards}</div></section>${contactForm}`};
    }
    function showNotice(message) {
        let notice = $('#site-notice');
        if (!notice) { notice = document.createElement('div'); notice.id='site-notice'; notice.className='notice'; notice.setAttribute('role','status'); document.body.appendChild(notice); }
        notice.textContent = message;
        clearTimeout(window.noticeTimeout);
        window.noticeTimeout = setTimeout(() => notice.remove(), 3500);
    }
    window.showSiteNotice = showNotice;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    $$('.image-slideshow').forEach(slideshow => {
        const photos = $$('.hero-photo', slideshow);
        const toggle = $('[data-slideshow-toggle]', slideshow);
        if (photos.length < 2) return;
        let current = Math.max(0, photos.findIndex(photo => photo.classList.contains('is-active')));
        let paused = reducedMotion;
        const showPhoto = index => {
            current = (index + photos.length) % photos.length;
            photos.forEach((photo, i) => {
                photo.classList.toggle('is-active', i === current);
                photo.setAttribute('aria-hidden', String(i !== current));
            });
            prepareNextPhoto();
        };
        const updateToggle = () => {
            if (!toggle) return;
            const label = paused ? 'Play' : 'Pause';
            toggle.setAttribute('aria-label', `${label} hero image rotation`);
            toggle.setAttribute('aria-pressed', String(paused));
            toggle.querySelector('span').textContent = `${label} images`;
            setControlIcon(toggle, paused ? 'play' : 'pause');
        };
        toggle?.addEventListener('click', () => { paused = !paused; updateToggle(); });
        const prepareNextPhoto = () => {
            const nextPhoto = photos[(current + 1) % photos.length];
            if (nextPhoto.loading === 'lazy') nextPhoto.loading = 'eager';
        };
        let swipeStart = null;
        slideshow.addEventListener('pointerdown', event => {
            if (event.pointerType === 'mouse' || event.target.closest('[data-slideshow-toggle]')) return;
            swipeStart = event.clientX;
        });
        slideshow.addEventListener('pointerup', event => {
            if (swipeStart === null) return;
            const distance = event.clientX - swipeStart;
            if (Math.abs(distance) > 45) showPhoto(current + (distance < 0 ? 1 : -1));
            swipeStart = null;
        });
        slideshow.addEventListener('pointercancel', () => { swipeStart = null; });
        prepareNextPhoto();
        window.setInterval(() => { if (!paused && !document.hidden) showPhoto(current + 1); }, 4000);
        updateToggle();
    });

    function setupAutoMarquees() {
        $$('.auto-marquee').forEach(container => {
            const track = $('.marquee-content', container);
            const toggle = $('[data-motion-toggle]', container);
            if (!track || !toggle || !track.children.length || container.dataset.motionReady === 'true') return;
            container.dataset.motionReady = 'true';
            const label = toggle.querySelector('span')?.textContent.trim().replace(/^Pause /, '') || 'content';
            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            let paused = reduced;
            let startX = null;
            let startOffset = 0;
            let moved = false;
            const updateToggle = () => {
                container.classList.toggle('user-paused', paused);
                container.classList.toggle('user-playing', !paused && reduced);
                toggle.setAttribute('aria-pressed', String(paused));
                toggle.setAttribute('aria-label', `${paused ? 'Play' : 'Pause'} ${label.toLowerCase()}`);
                toggle.querySelector('span').textContent = `${paused ? 'Play' : 'Pause'} ${label.toLowerCase()}`;
                setControlIcon(toggle, paused ? 'play' : 'pause');
            };
            toggle.addEventListener('click', () => { paused = !paused; updateToggle(); });
            container.addEventListener('focusin', event => {
                if (!event.target.closest('.motion-toggle')) container.classList.add('interaction-paused');
            });
            container.addEventListener('focusout', event => {
                if (!event.relatedTarget || !container.contains(event.relatedTarget) || event.relatedTarget.closest('.motion-toggle')) {
                    container.classList.remove('interaction-paused');
                }
            });
            container.addEventListener('pointerdown', event => {
                if (event.pointerType === 'mouse' || event.target.closest('button')) return;
                const transform = getComputedStyle(track).transform;
                const matrix = transform === 'none' ? null : new DOMMatrixReadOnly(transform);
                startOffset = matrix?.m41 || 0;
                startX = event.clientX;
                moved = false;
                track.classList.add('gesture-paused');
                track.style.transform = `translate3d(${startOffset}px,0,0)`;
                container.setPointerCapture(event.pointerId);
            });
            container.addEventListener('pointermove', event => {
                if (startX === null) return;
                const delta = event.clientX - startX;
                if (Math.abs(delta) > 5) moved = true;
                track.style.transform = `translate3d(${startOffset + delta}px,0,0)`;
            });
            const finishSwipe = event => {
                if (startX === null) return;
                const position = startOffset + event.clientX - startX;
                if (moved && track.scrollWidth > 0) {
                    const loopWidth = track.scrollWidth / 2;
                    const progress = ((-position % loopWidth) + loopWidth) % loopWidth / loopWidth;
                    const style = getComputedStyle(track);
                    const duration = Number.parseFloat(style.animationDuration) || 44;
                    const reversed = style.animationDirection.split(',')[0].trim() === 'reverse';
                    const animationProgress = reversed ? (1 - progress) % 1 : progress;
                    track.style.animationDelay = `${-animationProgress * duration}s`;
                    container.dataset.suppressClick = 'true';
                    window.setTimeout(() => { delete container.dataset.suppressClick; }, 0);
                }
                track.style.removeProperty('transform');
                track.classList.remove('gesture-paused');
                startX = null;
            };
            container.addEventListener('pointerup', finishSwipe);
            container.addEventListener('pointercancel', finishSwipe);
            container.addEventListener('click', event => {
                if (container.dataset.suppressClick === 'true') {
                    event.preventDefault();
                    event.stopPropagation();
                }
            }, true);
            updateToggle();
        });
    }
    window.initHomeMotion = setupAutoMarquees;
    setupAutoMarquees();
    if (window.lucide) lucide.createIcons();
});
