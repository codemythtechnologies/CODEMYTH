        // ============ FIREBASE CONFIG ============
        import { initializeApp } from "firebase/app";
        import { getFirestore, collection, addDoc, doc, deleteDoc, serverTimestamp } from "firebase/firestore";
        import { getAnalytics } from "firebase/analytics";
        import { getAuth, onAuthStateChanged, signOut, deleteUser } from "firebase/auth";

        const firebaseConfig = {
            apiKey: "AIzaSyAPjSQWoLIbqSy7K_MT3ED_5V81ul2GAXU",
            authDomain: "codemyth-5abcd.firebaseapp.com",
            projectId: "codemyth-5abcd",
            storageBucket: "codemyth-5abcd.firebasestorage.app",
            messagingSenderId: "893853983652",
            appId: "1:893853983652:web:593a8a3cc53e315000d731",
            measurementId: "G-2GFVT9WKRE"
        };

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const analytics = getAnalytics(app);
        const auth = getAuth(app);

        // ============ AUTH STATE / PROFILE MENU / TERMS / DELETE ACCOUNT ============
        const navSignInLink = document.getElementById('navSignInLink');
        const profileWrap = document.getElementById('profileWrap');
        const profileAvatar = document.getElementById('profileAvatar');
        const profileMenu = document.getElementById('profileMenu');
        const profileInitial = document.getElementById('profileInitial');
        const profileInfoAvatar = document.getElementById('profileInfoAvatar');
        const profileInfoName = document.getElementById('profileInfoName');
        const profileInfoEmail = document.getElementById('profileInfoEmail');
        const nmSignInLink = document.getElementById('nmSignInLink');
        const nmProfileBlock = document.getElementById('nmProfileBlock');
        const nmProfileEmail = document.getElementById('nmProfileEmail');
        const termsModal = document.getElementById('termsModal');
        const deleteConfirmOverlay = document.getElementById('deleteConfirm');
        const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

        function initialsFor(nameOrEmail) {
            if (!nameOrEmail) return '?';
            const trimmed = nameOrEmail.trim();
            const parts = trimmed.split(/\s+/);
            if (parts.length >= 2 && parts[0][0] && parts[1][0]) return (parts[0][0] + parts[1][0]).toUpperCase();
            return trimmed.slice(0, 2).toUpperCase();
        }

        function renderProfile(user) {
            const av = initialsFor(user.displayName || user.email || '');
            profileInfoName.textContent = user.displayName || 'Client';
            profileInfoEmail.textContent = user.email || '';
            if (user.photoURL) {
                profileAvatar.innerHTML = '<img src="' + user.photoURL + '" alt="">';
                profileInfoAvatar.innerHTML = '<img src="' + user.photoURL + '" alt="">';
            } else {
                profileAvatar.innerHTML = '<span id="profileInitial">' + av + '</span>';
                profileInfoAvatar.textContent = av;
            }
        }

        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (navSignInLink) navSignInLink.style.display = 'none';
                if (profileWrap) profileWrap.classList.add('visible');
                if (nmSignInLink) nmSignInLink.style.display = 'none';
                if (nmProfileBlock) { nmProfileBlock.style.display = 'block'; nmProfileEmail.textContent = user.email || ''; }
                renderProfile(user);
            } else {
                if (navSignInLink) navSignInLink.style.display = '';
                if (profileWrap) profileWrap.classList.remove('visible');
                if (profileMenu) profileMenu.classList.remove('open');
                if (nmSignInLink) nmSignInLink.style.display = '';
                if (nmProfileBlock) nmProfileBlock.style.display = 'none';
            }
        });

        // ---- profile menu open / close ----
        if (profileAvatar) {
            profileAvatar.addEventListener('click', (e) => {
                e.stopPropagation();
                const open = profileMenu.classList.toggle('open');
                profileAvatar.setAttribute('aria-expanded', String(open));
            });
        }
        document.addEventListener('click', (e) => {
            if (profileMenu && profileMenu.classList.contains('open') && !e.target.closest('.profile-wrap')) {
                profileMenu.classList.remove('open');
                profileAvatar.setAttribute('aria-expanded', 'false');
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (profileMenu) profileMenu.classList.remove('open');
                window.closeTerms();
                window.closeDeleteConfirm();
                window.closeStepModal();
                window.closeBAConsult();
                window.closeProjectDetail();
            }
        });

        // ---- terms & privacy modal ----
        window.openTerms = function (scrollToData) {
            termsModal.classList.add('open');
            if (profileMenu) profileMenu.classList.remove('open');
            document.body.style.overflow = 'hidden';
            const body = termsModal.querySelector('.modal-body');
            if (scrollToData) {
                setTimeout(() => {
                    const target = document.getElementById('terms-data-section');
                    if (target) target.scrollIntoView({ block: 'start' });
                }, 60);
            } else if (body) {
                body.scrollTop = 0;
            }
        };
        window.closeTerms = function () {
            termsModal.classList.remove('open');
            document.body.style.overflow = '';
        };
        window.openPrivacy = function () { window.openTerms(true); };
        termsModal.addEventListener('click', (e) => { if (e.target === termsModal) window.closeTerms(); });

        // ---- approach step detail popup ----
        const stepModal = document.getElementById('stepModal');
        const stepModalNum = document.getElementById('stepModalNum');
        const stepModalTitleText = document.getElementById('stepModalTitleText');
        const stepTitles = ['Scope', 'Build', 'Quality Assurance', 'Deploy', 'Tech Support'];
        window.openStepModal = function (idx) {
            if (!stepModal) return;
            stepModal.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            const target = stepModal.querySelector('.tab-panel[data-step-content="' + idx + '"]');
            if (target) target.classList.add('active');
            if (stepModalNum) stepModalNum.textContent = String(idx + 1).padStart(2, '0');
            if (stepModalTitleText) stepModalTitleText.textContent = stepTitles[idx] || '';
            stepModal.classList.add('open');
            document.body.style.overflow = 'hidden';
            const body = stepModal.querySelector('.modal-body');
            if (body) body.scrollTop = 0;
        };
        window.closeStepModal = function () {
            if (!stepModal) return;
            stepModal.classList.remove('open');
            document.body.style.overflow = '';
        };
        if (stepModal) stepModal.addEventListener('click', (e) => { if (e.target === stepModal) window.closeStepModal(); });

        // ---- BA consultation request popup ----
        const baConsultModal = document.getElementById('baConsultModal');
        window.openBAConsult = function () {
            if (!baConsultModal) return;
            baConsultModal.classList.add('open');
            document.body.style.overflow = 'hidden';
            const body = baConsultModal.querySelector('.modal-body');
            if (body) body.scrollTop = 0;
        };
        window.closeBAConsult = function () {
            if (!baConsultModal) return;
            baConsultModal.classList.remove('open');
            document.body.style.overflow = '';
        };
        if (baConsultModal) baConsultModal.addEventListener('click', (e) => { if (e.target === baConsultModal) window.closeBAConsult(); });

        // ---- project detail popup (floating card, opened from the Work section) ----
        // To show your own screenshots: create a folder named "assets/projects" next to
        // this index.html file, and drop in PNG files with these exact names —
        // curalink.png, habit-tracker.png, nebula.png, slate-docs.png, flowboard.png.
        // If a file isn't found, a clean placeholder is shown instead, so nothing breaks.
        const PROJECTS = {
            'curalink': {
                name: 'Curalink — AI medical research assistant',
                status: 'Live',
                statusClass: '',
                desc: [
                    'Curalink helps researchers and clinicians query medical literature in plain English instead of wrestling with keyword search. It fetches 100+ relevant research papers per query and returns citation-backed AI answers, so every claim can be traced back to its source paper instead of being taken on faith.',
                    'Under the hood it runs a local DeepSeek-R1 model through Ollama for reasoning, with a Node.js API layer that handles retrieval, ranking, and citation matching before anything reaches the React front end. Query history and saved research threads are stored in MongoDB so a session can be picked back up later.',
                    'It was built for the AI era but engineered with production discipline — response caching, rate limiting, and graceful fallbacks when a source paper can\'t be fetched, so the tool stays usable even under real research workloads.'
                ],
                techs: ['React', 'Node.js', 'DeepSeek-R1', 'MongoDB', 'Ollama'],
                url: 'https://curalink-ai-client.onrender.com/',
                image: 'assets/projects/curalink.png'
            },
            'habit-tracker': {
                name: 'Habit Tracker — daily habit & streak app',
                status: 'Live',
                statusClass: '',
                desc: [
                    'A clean, focused habit-tracking interface that helps users set daily goals, log progress, and hold onto streaks without the clutter most habit apps pile on. The dashboard surfaces today\'s overview, weekly completion rate, and coverage progress at a glance, so the habit itself stays the focus, not the app.',
                    'Built as a fast, mobile-friendly React app deployed on Vercel, with dedicated views for daily entry, analytics, and history so users can review long-term trends and not just today\'s check-in. Achievements and streak milestones are surfaced to keep motivation high over time.'
                ],
                techs: ['React', 'Vercel'],
                url: 'https://habit-tracker-model-ui.vercel.app/',
                image: 'assets/projects/habit-tracker.png'
            },
            'nebula': {
                name: 'Nebula Glass — immersive experience',
                status: 'Sample work',
                statusClass: 'sample',
                desc: [
                    'An interactive landing page built to showcase UI craft — real-time animations and a glassmorphism visual style, with layered depth and motion that responds to user interaction.',
                    'This is a design/UI sample rather than a client project, used to demonstrate what we can build on the front end when a brand wants something more expressive than a standard landing page. Built entirely with vanilla HTML, CSS and JS to keep it lightweight and fast to load.'
                ],
                techs: ['HTML/CSS/JS', 'Vercel'],
                url: 'https://nebula-glass.vercel.app/',
                image: 'assets/projects/nebula.png'
            },
            'slate-docs': {
                name: 'Slate Docs — AI document summarizer',
                status: 'In development',
                statusClass: 'dev',
                desc: [
                    'Upload a PDF and get a clean summary plus a searchable Q&A interface, powered by local LLMs so documents never leave your infrastructure — built for teams handling sensitive or proprietary files.',
                    'A FastAPI backend handles document parsing and chunking, with Llama 3.1 running the summarization and question-answering, so answers stay grounded in the uploaded document instead of drifting into generic AI output.'
                ],
                techs: ['Python', 'Llama 3.1', 'FastAPI'],
                url: '',
                image: 'assets/projects/slate-docs.png'
            },
            'flowboard': {
                name: 'FlowBoard — real-time analytics dashboard',
                status: 'In development',
                statusClass: 'dev',
                desc: [
                    'Live metrics and event streaming for product teams who need answers in seconds, not hours — real-time charts backed by a WebSocket event pipeline instead of slow scheduled reports.',
                    'D3-powered visualizations sit on top of a PostgreSQL data layer, with a React front end that updates in place as new events stream in, so dashboards never need a manual refresh.'
                ],
                techs: ['React', 'D3', 'WebSocket', 'PostgreSQL'],
                url: '',
                image: 'assets/projects/flowboard.png'
            }
        };
        const projectModal = document.getElementById('projectModal');
        window.openProjectDetail = function (key) {
            const p = PROJECTS[key];
            if (!p || !projectModal) return;

            document.getElementById('projectModalTitle').textContent = p.name.split('—')[0].trim();
            document.getElementById('projectModalName').textContent = p.name;

            const descEl = document.getElementById('projectModalDesc');
            const paragraphs = Array.isArray(p.desc) ? p.desc : [p.desc];
            descEl.innerHTML = paragraphs.map(t => '<p></p>').join('');
            descEl.querySelectorAll('p').forEach((el, i) => { el.textContent = paragraphs[i]; });

            const statusEl = document.getElementById('projectModalStatus');
            statusEl.textContent = p.status;
            statusEl.className = 'proj-status' + (p.statusClass ? ' ' + p.statusClass : '');

            const techsEl = document.getElementById('projectModalTechs');
            techsEl.innerHTML = '';
            p.techs.forEach(t => {
                const span = document.createElement('span');
                span.className = 'proj-tech';
                span.textContent = t;
                techsEl.appendChild(span);
            });

            const visualEl = document.getElementById('projectModalVisual');
            visualEl.innerHTML = '';

            if (p.statusClass === 'dev') {
                // In-development projects don't have a live UI to screenshot yet —
                // show a clear status message instead of an image.
                visualEl.innerHTML = '<div class="proj-modal-visual-fallback proj-modal-visual-dev">' +
                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg>' +
                    '<span>This project is under development.<br>UI preview will be added once it ships.</span></div>';
            } else {
                // Full, un-cropped screenshot centered over a softly blurred copy of
                // itself, so the whole UI is visible regardless of its aspect ratio.
                const bg = document.createElement('img');
                bg.className = 'proj-modal-visual-bg';
                bg.src = p.image;
                bg.alt = '';
                bg.setAttribute('aria-hidden', 'true');

                const scrim = document.createElement('div');
                scrim.className = 'proj-modal-visual-scrim';

                const fg = document.createElement('img');
                fg.className = 'proj-modal-visual-fg';
                fg.src = p.image;
                fg.alt = p.name + ' — UI screenshot';

                fg.onerror = function () {
                    visualEl.innerHTML = '<div class="proj-modal-visual-fallback">' +
                        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>' +
                        '<span>Add ' + p.image.split('/').pop() + ' to the assets/projects folder<br>to show this project\'s UI here</span></div>';
                };

                visualEl.appendChild(bg);
                visualEl.appendChild(scrim);
                visualEl.appendChild(fg);
            }

            projectModal.classList.add('open');
            document.body.style.overflow = 'hidden';
        };
        window.closeProjectDetail = function () {
            if (!projectModal) return;
            projectModal.classList.remove('open');
            document.body.style.overflow = '';
        };
        if (projectModal) projectModal.addEventListener('click', (e) => { if (e.target === projectModal) window.closeProjectDetail(); });
        document.querySelectorAll('.proj[data-project]').forEach(el => {
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
            });
        });

        // ---- delete account confirm ----
        window.confirmDeleteAccount = function () {
            if (!auth.currentUser) {
                window.showToast('Sign in required', 'Please sign in to manage your account.', 'info');
                return;
            }
            if (profileMenu) profileMenu.classList.remove('open');
            deleteConfirmOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        };
        window.closeDeleteConfirm = function () {
            deleteConfirmOverlay.classList.remove('open');
            document.body.style.overflow = '';
        };
        deleteConfirmOverlay.addEventListener('click', (e) => { if (e.target === deleteConfirmOverlay) window.closeDeleteConfirm(); });

        window.deleteAccountConfirmed = async function () {
            const user = auth.currentUser;
            if (!user) { window.closeDeleteConfirm(); return; }
            confirmDeleteBtn.disabled = true;
            confirmDeleteBtn.textContent = 'Deleting…';
            try {
                try {
                    await deleteDoc(doc(db, 'users', user.uid));
                } catch (dbErr) {
                    console.warn('Could not remove Firestore data:', dbErr);
                }
                await deleteUser(user);
                window.closeDeleteConfirm();
                window.showToast('Account deleted', 'Your account and all associated data have been removed from our database.', 'success');
            } catch (error) {
                if (error.code === 'auth/requires-recent-login') {
                    window.showToast('Please sign in again', 'For your security, sign out, sign back in, then delete your account again.', 'info');
                } else {
                    window.showToast('Error', error.message, 'info');
                }
            } finally {
                confirmDeleteBtn.disabled = false;
                confirmDeleteBtn.textContent = 'Delete account';
            }
        };

        // ---- sign out ----
        window.signOutUser = async function () {
            if (profileMenu) profileMenu.classList.remove('open');
            try {
                await signOut(auth);
                window.showToast('Signed out', 'Come back soon.', 'success');
            } catch (error) {
                window.showToast('Error', error.message, 'info');
            }
        };

        // ============ EMAILJS INIT ============
        emailjs.init("Znd94r-9x9QlT1eZc");
        const EMAILJS_SERVICE_ID = "service_2trbhbh";
        const EMAILJS_TEMPLATE_ID = "template_xpfz3aj";

        // ============ DOM REFS ============
        const form = document.getElementById('contactForm');
        const nameInput = document.getElementById('cf-name');
        const emailInput = document.getElementById('cf-email');
        const msgInput = document.getElementById('cf-message');
        const stageSelect = document.getElementById('cf-stage');
        const needSelect = document.getElementById('cf-need');
        const charCount = document.getElementById('charCount');
        const submitBtn = document.getElementById('cfSubmit');
        const submitLabel = document.getElementById('cfSubmitLabel');

        // ============ TOAST (already defined in global) ============
        // We'll use window.showToast from the inline script below

        // ============ CONTACT FORM SUBMIT ============
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = msgInput.value.trim();
            const stage = stageSelect.value;
            const need = needSelect.value;

            // Basic validation
            let valid = true;
            document.querySelectorAll('.field.error').forEach(el => el.classList.remove('error'));

            if (name.length < 2) {
                document.getElementById('field-name').classList.add('error');
                valid = false;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                document.getElementById('field-email').classList.add('error');
                valid = false;
            }
            if (message.length < 10) {
                document.getElementById('field-message').classList.add('error');
                valid = false;
            }
            if (!valid) {
                window.showToast('Check the form', 'Please fill in all fields correctly.', 'info');
                return;
            }

            submitBtn.disabled = true;
            submitLabel.textContent = 'Sending…';

            // Save to Firestore and send the EmailJS notification independently, so a
            // failure in one doesn't hide or block the other — and so we always know
            // exactly which step failed (check the browser console for the real reason,
            // e.g. Firestore "permission-denied" almost always means the security rules
            // need to allow writes to the "contacts" collection).
            let savedToDb = false;
            let emailSent = false;

            try {
                await addDoc(collection(db, 'contacts'), {
                    name,
                    email,
                    message,
                    stage,
                    need,
                    formType: 'contact',
                    timestamp: serverTimestamp()
                });
                savedToDb = true;
            } catch (dbErr) {
                console.error('Firestore save failed:', dbErr.code || dbErr.message, dbErr);
            }

            try {
                await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                    name: name,
                    email: email,
                    reply_to: email,
                    title: 'Contact Form — ' + (need || 'General Enquiry'),
                    message: 'From: ' + name + '\nEmail: ' + email + '\nStage: ' + (stage || 'Not specified') + '\nNeed: ' + (need || 'Not specified') + '\n\nMessage:\n' + message,
                    time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
                });
                emailSent = true;
            } catch (emailErr) {
                console.error('EmailJS send failed:', emailErr.text || emailErr.message, emailErr);
            }

            if (savedToDb || emailSent) {
                window.showToast('Message sent', 'Thanks ' + name.split(' ')[0] + ' — we\'ll reply within 24 hours.', 'success');
                form.reset();
                charCount.textContent = '0';
            } else {
                window.showToast('Error', 'Something went wrong. Please try again, or email us directly.', 'info');
            }
            submitBtn.disabled = false;
            submitLabel.textContent = 'Send message';
        });

        // ============ CHAR COUNT ============
        msgInput.addEventListener('input', () => {
            charCount.textContent = msgInput.value.length;
        });

        // ============ BA CONSULTATION FORM ============
        const baForm = document.getElementById('baConsultForm');
        if (baForm) {
            const baNameInput = document.getElementById('ba-name');
            const baEmailInput = document.getElementById('ba-email');
            const baCompanyInput = document.getElementById('ba-company');
            const baPhoneInput = document.getElementById('ba-phone');
            const baNeedSelect = document.getElementById('ba-need');
            const baMsgInput = document.getElementById('ba-message');
            const baCharCount = document.getElementById('baCharCount');
            const baSubmitBtn = document.getElementById('baConsultSubmit');
            const baSubmitLabel = document.getElementById('baConsultSubmitLabel');

            baMsgInput.addEventListener('input', () => {
                baCharCount.textContent = baMsgInput.value.length;
            });

            baForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                const name = baNameInput.value.trim();
                const email = baEmailInput.value.trim();
                const company = baCompanyInput.value.trim();
                const phone = baPhoneInput.value.trim();
                const need = baNeedSelect.value;
                const message = baMsgInput.value.trim();

                let valid = true;
                baForm.querySelectorAll('.field.error').forEach(el => el.classList.remove('error'));

                if (name.length < 2) {
                    document.getElementById('ba-field-name').classList.add('error');
                    valid = false;
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    document.getElementById('ba-field-email').classList.add('error');
                    valid = false;
                }
                if (message.length < 10) {
                    document.getElementById('ba-field-message').classList.add('error');
                    valid = false;
                }
                if (!valid) {
                    window.showToast('Check the form', 'Please fill in all fields correctly.', 'info');
                    return;
                }

                baSubmitBtn.disabled = true;
                baSubmitLabel.textContent = 'Sending…';

                let savedToDb = false;
                let emailSent = false;

                try {
                    await addDoc(collection(db, 'ba_consultations'), {
                        name,
                        email,
                        company,
                        phone,
                        need,
                        message,
                        formType: 'ba_consultation',
                        timestamp: serverTimestamp()
                    });
                    savedToDb = true;
                } catch (dbErr) {
                    console.error('Firestore save failed:', dbErr.code || dbErr.message, dbErr);
                }

                try {
                    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                        name: name,
                        email: email,
                        reply_to: email,
                        title: 'BA Consultation Request — ' + (need || 'General'),
                        message: 'From: ' + name + '\nEmail: ' + email + '\nCompany: ' + (company || 'Not provided') + '\nPhone: ' + (phone || 'Not provided') + '\nService needed: ' + (need || 'Not specified') + '\n\nMessage:\n' + message,
                        time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
                    });
                    emailSent = true;
                } catch (emailErr) {
                    console.error('EmailJS send failed:', emailErr.text || emailErr.message, emailErr);
                }

                if (savedToDb || emailSent) {
                    window.showToast('Request sent', 'Thanks ' + name.split(' ')[0] + ' — our team will reply within 24 hours.', 'success');
                    baForm.reset();
                    baCharCount.textContent = '0';
                    window.closeBAConsult();
                } else {
                    window.showToast('Error', 'Something went wrong. Please try again, or email us directly.', 'info');
                }
                baSubmitBtn.disabled = false;
                baSubmitLabel.textContent = 'Request consultation';
            });
        }

        // Expose functions to global for inline event handlers
        window.scrollToSection = scrollToSection;
        window.openServiceDetail = openServiceDetail;
        window.openAiEraDetail = openAiEraDetail;
        window.copyEmail = copyEmail;

        // ============ EXISTING GLOBAL FUNCTIONS (from inline script) ============
        // We'll keep them defined in the inline <script> below
        // but we need to ensure they are available.
        // Since we are using module, we can attach them to window.
        // The rest of the JS (scroll, nav, tabs, counters, etc.) will remain in the inline script.

        // ============ YEAR ============
        document.getElementById('year').textContent = new Date().getFullYear();

        // ============ TOAST SYSTEM (global) ============
        window.showToast = function(title, desc, type) {
            type = type || 'success';
            const wrap = document.getElementById('toastWrap');
            const el = document.createElement('div');
            el.className = 'toast ' + type;
            const icon = type === 'success' ?
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>' :
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
            el.innerHTML = icon + '<div><div class="tt">' + title + '</div><div class="td">' + desc + '</div></div>';
            wrap.appendChild(el);
            setTimeout(() => {
                el.classList.add('leaving');
                setTimeout(() => el.remove(), 400);
            }, 4200);
        };

        // ============ NAV SCROLL STATE ============
        const nav = document.getElementById('siteNav');
        const toTop = document.getElementById('toTop');
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            nav.classList.toggle('scrolled', y > 20);
            toTop.classList.toggle('show', y > 600);
        }, { passive: true });

        // ============ SMOOTH SCROLL HELPERS ============
        window.scrollToSection = function(id) {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                const target = document.querySelector('#' + id);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };

        function scrollToContact() {
            scrollToSection('contact');
            setTimeout(() => {
                const nameField = document.getElementById('cf-name');
                if (nameField) nameField.focus();
            }, 500);
        }

        toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

        // ============ MOBILE NAV ============
        const navToggle = document.getElementById('navToggle');
        const navMobile = document.getElementById('navMobile');
        navToggle.addEventListener('click', () => {
            const open = navMobile.classList.toggle('open');
            navToggle.innerHTML = open ?
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' :
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
        });
        navMobile.querySelectorAll('a,button').forEach(el => el.addEventListener('click', () => {
            navMobile.classList.remove('open');
            navToggle.innerHTML =
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
        }));

        // ============ HERO ROBOT MASCOT SEQUENCE ============
        (function() {
            const wrap = document.getElementById('heroRobotWrap');
            const content = document.getElementById('heroContent');
            const panel = document.getElementById('heroRevealPanel');
            if (!content) return;
            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const isWide = window.matchMedia('(min-width: 1151px)').matches;

            content.classList.add('card-in');

            if (reduced || !wrap || !panel) {
                if (wrap) wrap.classList.add('enter', 'settled', 'talk', 'leaning');
                if (isWide) content.classList.add('pushed');
                if (panel) panel.classList.add('show');
                return;
            }
            if (!isWide) return;

            setTimeout(() => wrap.classList.add('enter', 'walking'), 500);
            setTimeout(() => wrap.classList.remove('walking'), 2200);
            setTimeout(() => wrap.classList.add('wave', 'talk'), 2450);
            setTimeout(() => wrap.classList.remove('wave'), 4100);
            setTimeout(() => {
                content.classList.add('pushed');
                wrap.classList.add('settled', 'leaning');
            }, 4300);
            setTimeout(() => panel.classList.add('show'), 5100);
            setTimeout(() => wrap.classList.remove('talk'), 7600);
        })();

        // ============ REVEAL ON SCROLL ============
        const revealEls = document.querySelectorAll('.reveal');
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view');
                    io.unobserve(e.target); } });
        }, { threshold: 0.15 });
        revealEls.forEach(el => io.observe(el));

        // ============ COUNT-UP STATS ============
        const counters = document.querySelectorAll('.counter');
        const counterIO = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                const el = e.target;
                const target = parseInt(el.dataset.target, 10);
                let cur = 0;
                const step = Math.max(1, Math.round(target / 40));
                const tick = () => {
                    cur = Math.min(target, cur + step);
                    el.textContent = cur;
                    if (cur < target) requestAnimationFrame(tick);
                };
                tick();
                counterIO.unobserve(el);
            });
        }, { threshold: 0.6 });
        counters.forEach(el => counterIO.observe(el));

        // ============ TECH STACK MARQUEE (robust, resize-safe, jump-free loop) ============
        (function() {
            const track = document.getElementById('marqueeTrack');
            const viewport = track ? track.closest('.marquee') : null;
            if (!track || !viewport) return;

            // Guard against double-duplication (e.g. script re-running) — that was the
            // root cause of the loop occasionally desyncing / stuttering.
            if (!track.dataset.duplicated) {
                track.innerHTML += track.innerHTML;
                track.dataset.duplicated = 'true';
            }

            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const SPEED = 40; // px/sec — constant regardless of content length or screen width
            let setWidth = 0;
            let offset = 0;
            let paused = false;
            let lastTime = null;

            function measure() {
                // one "set" is exactly half of the (now-doubled) track
                setWidth = track.scrollWidth / 2;
            }

            function frame(time) {
                if (lastTime === null) lastTime = time;
                const dt = (time - lastTime) / 1000;
                lastTime = time;
                if (!paused && setWidth > 0) {
                    offset -= SPEED * dt;
                    if (offset <= -setWidth) offset += setWidth; // seamless wrap, never snaps
                    track.style.transform = 'translateX(' + offset + 'px)';
                }
                requestAnimationFrame(frame);
            }

            measure();
            if (!reduced) requestAnimationFrame(frame);

            viewport.addEventListener('mouseenter', () => { paused = true; });
            viewport.addEventListener('mouseleave', () => { paused = false; });
            viewport.addEventListener('focusin', () => { paused = true; });
            viewport.addEventListener('focusout', () => { paused = false; });

            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(measure, 150);
            });

            // avoid a big catch-up jump after the tab was backgrounded a while
            document.addEventListener('visibilitychange', () => {
                if (!document.hidden) lastTime = null;
            });
        })();

        // ============ TABS (generic, per tab-list group) ============
        document.querySelectorAll('.tab-list').forEach(list => {
            const panelsContainer = list.parentElement.querySelector('.tab-panels');
            if (!panelsContainer) return;
            const btns = list.querySelectorAll('.tab-btn');
            btns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const isSvc = btn.dataset.svc !== undefined;
                    const key = isSvc ? btn.dataset.svc : btn.dataset.tab;
                    const panelAttr = isSvc ? 'data-svcpanel' : 'data-panel';
                    btns.forEach(b => { b.classList.remove('active');
                        b.setAttribute('aria-selected', 'false'); });
                    panelsContainer.querySelectorAll('.tab-panel').forEach(p => p.classList.remove(
                        'active'));
                    btn.classList.add('active');
                    btn.setAttribute('aria-selected', 'true');
                    const target = panelsContainer.querySelector('.tab-panel[' + panelAttr + '="' + key +
                        '"]');
                    if (target) target.classList.add('active');
                    const rect = panelsContainer.getBoundingClientRect();
                    if (rect.top < 70 || rect.top > window.innerHeight * 0.6) {
                        panelsContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                });
            });
        });

        // ============ SERVICE CARD -> SERVICE DETAIL DEEP LINK ============
        window.openServiceDetail = function(key) {
            const btn = document.querySelector('#svcTabList .tab-btn[data-svc="' + key + '"]');
            if (btn) btn.click();
            scrollToSection('service-detail');
            flashHighlight('service-detail');
            closeAllDropdowns();
        };
        document.querySelectorAll('.svc').forEach(el => {
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault();
                    el.click(); }
            });
        });

        // ============ AI ERA DROPDOWN DEEP LINK ============
        window.openAiEraDetail = function(key) {
            const map = { pipeline: 'ai-era-pipeline', metrics: 'ai-era-metrics', principles: 'ai-era-principles' };
            const id = map[key] || 'ai-era';
            scrollToSection(id);
            flashHighlight(id);
            closeAllDropdowns();
        };

        function flashHighlight(id) {
            const el = document.getElementById(id);
            if (!el) return;
            el.classList.remove('jump-highlight');
            void el.offsetWidth;
            el.classList.add('jump-highlight');
        }

        // ============ NAV DROPDOWN (touch/keyboard support) ============
        const navDrops = document.querySelectorAll('.nav-drop');

        function closeAllDropdowns() { navDrops.forEach(d => d.classList.remove('open')); }
        navDrops.forEach(drop => {
            const trigger = drop.querySelector('.nav-drop-trigger');
            trigger.addEventListener('click', (e) => {
                if (window.matchMedia('(hover: none)').matches) {
                    e.preventDefault();
                    const wasOpen = drop.classList.contains('open');
                    closeAllDropdowns();
                    drop.classList.toggle('open', !wasOpen);
                }
            });
        });
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-drop')) closeAllDropdowns();
        });

        // ============ VIEW ALL PROJECTS ============
        const viewAllBtn = document.getElementById('viewAllBtn');
        const projMore = document.getElementById('projMore');
        const viewAllLabel = document.getElementById('viewAllLabel');
        const viewAllChevron = document.getElementById('viewAllChevron');
        viewAllBtn.addEventListener('click', () => {
            const open = projMore.classList.toggle('open');
            viewAllLabel.textContent = open ? 'Show fewer projects' : 'View all projects';
            viewAllChevron.style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)';
            if (open) projMore.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });

        // ============ COPY EMAIL ============
        window.copyEmail = function() {
            const email = 'codemyth.technologies@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                showToast('Email copied', email + ' is on your clipboard.', 'success');
            }).catch(() => {
                showToast('Copy failed', 'Please copy manually: ' + email, 'info');
            });
        };
