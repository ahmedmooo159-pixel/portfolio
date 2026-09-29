/**
 * i18n.js — Comprehensive Bilingual Localization Engine (English & Arabic)
 * Handles instantaneous language switching, DOM translation, RTL/LTR layout flipping,
 * document meta updates, and localStorage persistence without page reloads.
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'portfolio-lang';
  const html = document.documentElement;

  const TRANSLATIONS = {
    en: {
      // Document metadata
      "meta_title": "Ahmed Mourad | Information Technology – Software Track & Freelance Web Developer",
      "meta_desc": "Ahmed Mourad is an Information Technology student (Software Track) at Delta University and freelance web developer building production web applications with Vanilla JS, Firebase, Supabase, and Node.js.",
      "meta_keywords": "Ahmed Mourad, Freelance Web Developer, Information Technology, Software Developer, Vanilla JavaScript, HTML5, CSS3, Node.js, Firebase, Supabase, C#, C++, Delta University, Egypt",
      "og_title": "Ahmed Mourad | Information Technology – Software Track & Freelance Web Developer",
      "og_desc": "Building high-performance, real-world web applications with Vanilla JavaScript, Node.js, Firebase, Supabase, and solid CS foundations.",

      // Nav
      "nav_home": "Home",
      "nav_about": "About",
      "nav_education": "Education",
      "nav_experience": "Experience",
      "nav_skills": "Skills",
      "nav_deliver": "What I Deliver",
      "nav_projects": "Projects",
      "nav_feedback": "Client Feedback",
      "nav_contact": "Contact",
      "nav_lang_btn": "عربي",
      "nav_lang_title": "تغيير اللغة إلى العربية",
      "theme_toggle_light": "Switch to light mode",
      "theme_toggle_dark": "Switch to dark mode",

      // Hero
      "hero_meta_role": "Information Technology (Software Track) · DEPI Scholar · Freelance Web Developer",
      "hero_meta_sub": "Pure Vanilla Web · Firebase & Supabase · Node.js Backend",
      "hero_name": "Ahmed Mourad",
      "hero_tagline": "I build fast, reliable, and clean web applications using <strong>HTML, CSS, and modern Vanilla JavaScript</strong>, powered by <strong>Firebase, Supabase, and Node.js</strong> on the backend. Combining engineering discipline with dedicated post-launch client commitment.",
      "hero_btn_projects": "View Projects",
      "hero_btn_about": "About Me",
      "hero_status_badge": "Available for projects",
      "hero_scroll": "scroll",

      // About
      "about_label": "Who I Am",
      "about_title_1": "Clean Code & Disciplined Engineering.",
      "about_title_2": "Long-Term Commitment to What I Build.",
      "about_usp_badge": "My Commitment to Clients",
      "about_usp_statement": "I don't just deliver code and disappear.",
      "about_usp_supporting": "I stay with my clients after launch: checking in regularly, improving, and growing their product with them, because I genuinely love what I build.",
      "about_bio_p1": "I'm Ahmed, an Information Technology student (Software Track) at Delta University for Science and Technology, a Full Stack .NET scholar in the Digital Egypt Pioneers Initiative (DEPI), and a graduate of ITEC (Italian Technical and Technological Complex).",
      "about_bio_p2": "As a freelance web developer, I build production-ready, ultra-fast web applications using pure Vanilla JavaScript, modern CSS, and HTML on the frontend, backed by Firebase, Supabase, and Node.js for real-time data, authentication, and custom APIs.",
      "about_bio_p3": "My technical education and multilingual foundation give me both deep problem-solving skills and a clear, client-focused mindset: delivering robust solutions on schedule and supporting clients throughout their product's journey.",
      "about_card_1_title": "Vanilla Precision & Speed",
      "about_card_1_desc": "Zero unnecessary dependencies. Clean DOM architecture, modern CSS layouts, and native JS delivering instant loading times.",
      "about_card_2_title": "Real-Time Cloud & BaaS",
      "about_card_2_desc": "Building live synchronized apps using Firebase Firestore, Supabase, Firebase Auth, and Node.js REST APIs.",
      "about_card_3_title": "Strong Tech Foundations",
      "about_card_3_desc": "Deep algorithmic thinking, data structures, OOP architectures, and enterprise .NET foundations.",

      // Education
      "edu_label": "Academic Path",
      "edu_title_1": "Education &",
      "edu_title_2": "Scholarships",
      "edu_card_1_institution": "Delta University for Science and Technology",
      "edu_card_1_program": "B.Sc. Information Technology, Software Track",
      "edu_card_1_date": "Expected graduation: 2027",
      "edu_card_1_desc": "Comprehensive curriculum covering software development principles, advanced data structures, algorithms, database systems, web architecture, and computer systems.",
      "edu_card_2_institution": "DEPI (Digital Egypt Pioneers Initiative)",
      "edu_card_2_program": "Full Stack .NET Track Scholarship",
      "edu_card_2_desc": "Intensive national scholarship sponsored by the Ministry of Communications and Information Technology (MCIT), focusing on enterprise application development with C#, ASP.NET Core, Entity Framework, SQL Server, and RESTful architectures.",
      "edu_card_3_institution": "ITEC (Italian Technical and Technological Complex)",
      "edu_card_3_program": "Photovoltaic Energy Department (Secondary Education)",
      "edu_card_3_desc": "Technical secondary education combining engineering fundamentals, electrical and renewable systems, and intensive Italian language education.",

      // Experience
      "exp_label": "Track Record",
      "exp_title_1": "Freelance",
      "exp_title_2": "Experience",
      "exp_role_badge": "Production Delivery",
      "exp_role_title": "Freelance Web Developer",
      "exp_role_desc": "Delivering custom, production-grade web applications to real clients with full lifecycle ownership: requirement analysis, frontend architecture, backend database design, deployment, and ongoing post-launch support.",
      
      "exp_item_1_title": "Clinic Management System (CMS)",
      "exp_item_1_built": "Built a multi-role clinic management and booking platform featuring doctor, receptionist, and patient dashboards with real-time patient queue updates.",
      "exp_item_1_tech": "Technologies: HTML5, CSS3, JavaScript, Firebase Firestore (onSnapshot), Cloudinary, Firebase Auth",
      "exp_item_1_outcome": "Outcome: Replaced paper records, eliminated double-booking with instant multi-device sync, and streamlined daily medical workflows.",
      
      "exp_item_2_title": "Sports Booking Platforms (Mla3b El Sadat & Al-Andalus)",
      "exp_item_2_built": "Developed responsive sports facility portals for Sadat City court reservations and Al-Andalus Sports Club activities.",
      "exp_item_2_tech": "Technologies: Vanilla JavaScript, Modern CSS, Semantic HTML, Interactive UI/UX",
      "exp_item_2_outcome": "Outcome: Enabled streamlined time-slot browsing and court reservations with a high-performance, mobile-first interface.",
      
      "exp_item_3_title": "Soo Academy Kindergarten Platform",
      "exp_item_3_built": "Designed and deployed a modern kindergarten educational platform showcasing academic programs, activities, and enrollment information.",
      "exp_item_3_tech": "Technologies: HTML5, CSS3, JavaScript, Responsive Animations",
      "exp_item_3_outcome": "Outcome: Provided parents with an engaging, easy-to-navigate portal that effectively represented the academy's values and programs.",
      
      "exp_item_4_title": "Flower Art Storefront & Workshop Platform",
      "exp_item_4_built": "Crafted an artisan floral storefront and workshop registration platform with smooth visual micro-animations and catalog showcase.",
      "exp_item_4_tech": "Technologies: Vanilla JavaScript, Modern CSS Grid/Flexbox, Micro-Animations",
      "exp_item_4_outcome": "Outcome: Delivered a high-aesthetic digital storefront with fast page loads and smooth user interactions.",
      
      "exp_item_5_title": "4x6 Personal Photo Generator",
      "exp_item_5_built": "Engineered a client-side web utility that processes, crops, and formats individual photos into print-ready 4x6 photo sheets with millimeter accuracy.",
      "exp_item_5_tech": "Technologies: HTML5 Canvas API, Vanilla JavaScript, Image Processing, CSS",
      "exp_item_5_outcome": "Outcome: Enabled instant, high-precision personal photo sheet generation directly in the browser with zero server latency.",
      
      "exp_item_6_title": "Fingerprint Attendance System",
      "exp_item_6_built": "Developed an internal attendance verification and logging web system for workplace staff management.",
      "exp_item_6_tech": "Technologies: HTML, CSS, JavaScript, Firebase Realtime Database / Firestore",
      "exp_item_6_outcome": "Outcome: Automated staff attendance tracking and reporting, replacing manual attendance logs with cloud-synced records.",
      
      "exp_transferable_title": "Transferable Professional Strengths",
      "exp_transferable_desc": "End-to-end responsibility, strict adherence to deadlines, transparent client communication, and dedicated post-delivery support.",

      // Skills
      "skills_label": "Capabilities",
      "skills_title_1": "Skills &",
      "skills_title_2": "Expertise",
      "skills_sub_soft": "Soft Skills",
      "skills_sub_tech": "Technical Skills",
      "skills_sub_tools": "Tools & Technologies",
      "skills_sub_langs": "Languages",
      "lang_native": "Native",
      "lang_very_good": "Very Good",
      "lang_intermediate": "Intermediate",

      // What I Deliver
      "deliver_label": "Offerings",
      "deliver_title_1": "What I",
      "deliver_title_2": "Deliver",
      "deliver_card_1_title": "Vanilla Web Applications",
      "deliver_card_1_desc": "High-performance, lightweight web applications built with pure semantic HTML5, modern CSS3 layouts/animations, and modular JavaScript (ES6+). Zero heavy dependencies, ultra-fast load times, and clean code.",
      "deliver_card_2_title": "Real-Time Cloud Backends & BaaS",
      "deliver_card_2_desc": "Dynamic administration portals, live booking platforms, and secure data pipelines featuring instant real-time sync with Firebase Firestore onSnapshot listeners, Supabase, and robust authentication.",
      "deliver_card_3_title": "Node.js APIs & Custom Tooling",
      "deliver_card_3_desc": "Custom Node.js server endpoints, RESTful APIs, cloud media pipelines using Cloudinary, specialized web utilities, structured database schemas, and seamless 3rd-party integrations.",

      // Projects
      "projects_label": "Portfolio",
      "projects_title_1": "Featured",
      "projects_title_2": "Projects",
      "project_featured_badge": "Featured Case Study",
      "project_cms_title": "Clinic Management System",
      "project_cms_problem_lbl": "The Problem",
      "project_cms_problem_txt": "Clinics struggled with manual paper records, lost patient histories, and overlapping appointment scheduling.",
      "project_cms_solution_lbl": "The Solution",
      "project_cms_solution_txt": "Built a real-time cloud-based booking system with role-based access (doctor, reception, patient) using Firebase/Firestore and Cloudinary for media.",
      "project_cms_features_lbl": "Key Features",
      "project_cms_features_txt": "Real-time listeners (onSnapshot) instead of polling across reception/booking/admin pages, secure media handling via Cloudinary, and granular role permissions.",
      "project_cms_result_lbl": "Result",
      "project_cms_result_txt": "Eliminated manual paper-based scheduling, achieved zero booking conflicts, and enabled instant real-time synchronization across all staff dashboards.",
      "project_live_demo": "Live Demo",
      "project_github": "GitHub",
      "project_sadat_title": "Mla3b El Sadat",
      "project_sadat_desc": "A sports facility booking platform for Sadat City. Users browse courts, select time slots, and complete reservations through an intuitive interface.",
      "project_andalus_title": "Al-Andalus Sports Club",
      "project_andalus_desc": "A full club website showcasing sports activities, announcements, and training schedules with a responsive visual experience for members.",
      "project_flower_title": "Flower Art",
      "project_flower_desc": "An artisan floral shop storefront with clean layout, smooth micro-animations, and an experience crafted for high conversion and elegance.",
      "projects_more_github": "View More on GitHub",

      // Client Feedback
      "feedback_label": "Client Trust",
      "feedback_title_1": "What Clients Appreciate",
      "feedback_title_2": "About Working With Me",
      "feedback_intro": "Real collaboration is built on consistency, responsiveness, and genuine care for the final product. Here is what my clients consistently value throughout our work together:",
      "feedback_card_1_title": "Service-Minded & Always Available",
      "feedback_card_1_desc": "Clear, prompt communication across every project phase. Readily accessible to resolve urgent requests, discuss ideas, and adapt to evolving needs.",
      "feedback_card_2_title": "Regular Follow-Up & Post-Delivery Support",
      "feedback_card_2_desc": "The relationship doesn't stop at deployment. Regular check-ins, performance monitoring, and proactive enhancements to ensure the system keeps running smoothly.",
      "feedback_card_3_title": "Pleasant Collaboration & Genuine Passion",
      "feedback_card_3_desc": "A friendly, professional attitude that makes working together enjoyable. A deep love for craft and quality that shows in every detail of the application.",

      // Contact
      "contact_label": "Get In Touch",
      "contact_title_1": "Have a project in mind?",
      "contact_title_2": "Let's build something real.",
      "contact_left_heading": "Let's talk business.",
      "contact_left_desc": "Whether you need a full-stack web application, a real-time management dashboard, or have an open role, feel free to reach out directly or send a message through the form.",
      "contact_whatsapp_title": "WhatsApp Direct",
      "contact_linkedin_title": "LinkedIn Connection",
      "contact_github_title": "GitHub Repositories",
      "contact_copy_phone_title": "Copy Phone Number",
      "contact_form_name": "Name *",
      "contact_form_name_ph": "Your Name",
      "contact_form_email": "Email *",
      "contact_form_email_ph": "you@company.com",
      "contact_form_phone": "Phone",
      "contact_form_optional": "(Optional)",
      "contact_form_phone_ph": "+20 1...",
      "contact_form_subject": "Subject *",
      "contact_form_subject_ph": "Project Inquiry / Opportunity",
      "contact_form_message": "Message *",
      "contact_form_message_ph": "Tell me about your project, timeline, and goals...",
      "contact_form_submit": "Send Message",
      "contact_form_sending": "Sending Message...",
      "contact_val_name": "Please enter your name.",
      "contact_val_email": "Please enter your email address.",
      "contact_val_email_valid": "Please provide a valid email address.",
      "contact_val_subject": "Please provide a subject.",
      "contact_val_message": "Please write your message.",
      "contact_val_message_len": "Message should be at least 10 characters.",
      "contact_cooldown": "⏳ Please wait {s}s before sending another message.",
      "contact_success_toast": "✓ Message sent — I'll get back to you soon.",
      "contact_error_toast": "✕ Error sending message. Please reach out via WhatsApp.",
      "contact_success_heading": "Message sent",
      "contact_success_desc": "Thank you! I will get back to you as soon as possible.",
      "contact_error_heading": "Couldn't send message",
      "contact_error_desc": "Feel free to message me directly via WhatsApp at +20 109 172 8680.",

      // Thank You
      "thanks_label": "Appreciation",
      "thanks_title": "Thank You for Visiting",
      "thanks_desc": "I appreciate your time exploring my portfolio. Whether you're looking to build a new web application, collaborate on a project, or just connect — I look forward to hearing from you.",
      "thanks_btn": "Start a Conversation",

      // Footer
      "footer_copy": "© 2026 Ahmed Mourad. Built with precision, honesty, and purpose."
    },

    ar: {
      // Document metadata
      "meta_title": "أحمد مراد | تكنولوجيا المعلومات – مسار البرمجيات ومطور ويب حر",
      "meta_desc": "أحمد مراد، طالب تكنولوجيا المعلومات (مسار البرمجيات) بجامعة الدلتا للعلوم والتكنولوجيا ومطور ويب حر، متخصص في بناء تطبيقات ويب حقيقية باستخدام Vanilla JS وFirebase وSupabase وNode.js.",
      "meta_keywords": "أحمد مراد, مطور ويب حر, تكنولوجيا المعلومات, مبرمج برمجيات, Vanilla JavaScript, HTML5, CSS3, Node.js, Firebase, Supabase, C#, C++, جامعة الدلتا, مصر",
      "og_title": "أحمد مراد | تكنولوجيا المعلومات – مسار البرمجيات ومطور ويب حر",
      "og_desc": "بناء تطبيقات ويب حقيقية وسريعة باستخدام Vanilla JavaScript وNode.js وFirebase وSupabase مع أساس برمجي وهندسي متين.",

      // Nav
      "nav_home": "الرئيسية",
      "nav_about": "عني",
      "nav_education": "التعليم",
      "nav_experience": "الخبرة",
      "nav_skills": "المهارات",
      "nav_deliver": "ما أقدمه",
      "nav_projects": "المشاريع",
      "nav_feedback": "آراء العملاء",
      "nav_contact": "تواصل معي",
      "nav_lang_btn": "EN",
      "nav_lang_title": "Switch language to English",
      "theme_toggle_light": "التحويل للوضع الفاتح",
      "theme_toggle_dark": "التحويل للوضع الداكن",

      // Hero
      "hero_meta_role": "تكنولوجيا المعلومات (مسار البرمجيات) · منحة DEPI · مطور ويب حر",
      "hero_meta_sub": "تطوير ويب نقي (Vanilla) · قواعد بيانات Firebase وSupabase · خوادم Node.js",
      "hero_name": "أحمد مراد",
      "hero_tagline": "أقوم ببناء تطبيقات ويب حقيقية، سريعة ومتقنة باستخدام <strong>HTML وCSS وVanilla JavaScript الحديثة</strong>، مع حلول سحابية وقواعد بيانات متطورة عبر <strong>Firebase وSupabase وNode.js</strong>. أجمع بين الأساس الهندسي الدقيق والالتزام الحقيقي مع العملاء بعد الإطلاق.",
      "hero_btn_projects": "شاهد المشاريع",
      "hero_btn_about": "عني",
      "hero_status_badge": "متاح للمشاريع الجديدة",
      "hero_scroll": "تمرير",

      // About
      "about_label": "من أنا",
      "about_title_1": "برمجة متقنة وأساس تكنولوجي متين.",
      "about_title_2": "والتزام حقيقي يدوم بعد تسليم المشروع.",
      "about_usp_badge": "التزامي مع العملاء",
      "about_usp_statement": "مش بسلّم الكود وأختفي.",
      "about_usp_supporting": "بفضل مع عملائي بعد الإطلاق، بتابعهم بشكل دوري وبطوّر معاهم منتجاتهم، لأني بحب اللي بعمله بجد.",
      "about_bio_p1": "أنا أحمد، طالب تكنولوجيا المعلومات (مسار البرمجيات) بجامعة الدلتا للعلوم والتكنولوجيا، متدرب في منحة مبادرة رواد مصر الرقمية (DEPI) في مسار Full Stack .NET، وخريج المجمع التكنولوجي المتكامل الإيطالي (ITEC).",
      "about_bio_p2": "أعمل كمطور ويب حر متخصص في بناء تطبيقات ويب حقيقية فائقة السرعة والأداء باستخدام Vanilla JavaScript وHTML وCSS على الواجهة الأمامية، مع حلول سحابية وقواعد بيانات فورية عبر Firebase وSupabase وواجهات برمجة التطبيقات Node.js.",
      "about_bio_p3": "يمنحني تأهيلي التكنولوجي واللغوي أساساً قوياً في حل المشكلات البرمجية المعقدة، مع التركيز التام على خدمة العميل والتسليم في المواعيد المحددة والاستمرار في المتابعة والتطوير.",
      "about_card_1_title": "سرعة ودقة الـ Vanilla",
      "about_card_1_desc": "بدون أطر عمل ثقيلة أو اعتمادات غير ضرورية. هيكلية DOM نظيفة وتنسيقات CSS حديثة تمنحك سرعة تحميل فائقة.",
      "about_card_2_title": "حلول سحابية وقواعد بيانات فورية",
      "about_card_2_desc": "بناء تطبيقات متزامنة لحظياً عبر Firebase Firestore وSupabase وFirebase Auth وخوادم REST في Node.js.",
      "about_card_3_title": "أساس تكنولوجي متين",
      "about_card_3_desc": "تفكير خوارزمي متعمق، هياكل بيانات متقدمة، مبادئ OOP، ومسار مؤسسي قوي في تقنيات .NET.",

      // Education
      "edu_label": "المسار التعليمي",
      "edu_title_1": "التعليم و",
      "edu_title_2": "المنح الدراسية",
      "edu_card_1_institution": "جامعة الدلتا للعلوم والتكنولوجيا",
      "edu_card_1_program": "بكالوريوس تكنولوجيا المعلومات (مسار البرمجيات)",
      "edu_card_1_date": "تاريخ التخرج المتوقع: 2027",
      "edu_card_1_desc": "دراسة متعمقة في هندسة البرمجيات، هياكل البيانات والخوارزميات المتقدمة، أنظمة قواعد البيانات، تقنيات الويب، وتصميم وهيكلة النظم البرمجية.",
      "edu_card_2_institution": "مبادرة رواد مصر الرقمية (DEPI)",
      "edu_card_2_program": "منحة مسار Full Stack .NET",
      "edu_card_2_desc": "منحة تدريبية مكثفة برعاية وزارة الاتصالات وتكنولوجيا المعلومات المصرية، تركز على بناء تطبيقات المؤسسات باستخدام C# وASP.NET Core وEntity Framework وSQL Server وبنى RESTful.",
      "edu_card_3_institution": "المجمع التكنولوجي المتكامل الإيطالي (ITEC)",
      "edu_card_3_program": "قسم الطاقة الكهروضوئية (التعليم الثانوي الفني)",
      "edu_card_3_desc": "تعليم ثانوي فني وتكنولوجي يجمع بين أسس الهندسة العملية، الأنظمة الكهربائية والمتجددة، وتعلم وإتقان اللغة الإيطالية.",

      // Experience
      "exp_label": "سجل الأعمال",
      "exp_title_1": "الخبرة",
      "exp_title_2": "المهنية والعمل الحر",
      "exp_role_badge": "مشاريع إنتاجية حقيقية",
      "exp_role_title": "مطور ويب حر (Freelance Web Developer)",
      "exp_role_desc": "تقديم تطبيقات ويب مخصصة وجاهزة للإنتاج لعملاء حقيقيين مع تحمل المسؤولية الكاملة للمشروع: من تحليل المتطلبات وهيكلة الواجهات وقواعد البيانات، وحتى النشر والدعم المستمر بعد الإطلاق.",
      
      "exp_item_1_title": "نظام إدارة العيادات والمراكز الطبية (CMS)",
      "exp_item_1_built": "بناء منصة متكاملة لإدارة العيادات والحجوزات بلوحات تحكم متعددة الصلاحيات (أطباء، موظفي استقبال، مرضى) مع تحديث فوري لقوائم الانتظار.",
      "exp_item_1_tech": "التقنيات: HTML5, CSS3, JavaScript, Firebase Firestore (onSnapshot), Cloudinary, Firebase Auth",
      "exp_item_1_outcome": "النتيجة: القضاء التام على السجلات الورقية، منع تداخل المواعيد بفضل المزامنة اللحظية بين الأجهزة، وتبسيط دورة العمل اليومية في العيادة.",
      
      "exp_item_2_title": "منصات حجز الملاعب والأنشطة الرياضية (ملاعب السادات ونادي الأندلس)",
      "exp_item_2_built": "تطوير منصات ويب تفاعلية وسريعة لحجز الملاعب واستعراض الأنشطة الرياضية والجداول الزمنية لأعضاء الأندية.",
      "exp_item_2_tech": "التقنيات: Vanilla JavaScript, Modern CSS, Semantic HTML, Responsive UI/UX",
      "exp_item_2_outcome": "النتيجة: تسهيل حجز الفترات الزمنية وتصفح الملاعب عبر واجهة مستخدم متجاوبة وسلسة جداً على الهواتف.",
      
      "exp_item_3_title": "منصة أكاديمية سو كيدز (Soo Academy)",
      "exp_item_3_built": "تصميم ونشر منصة تعريفية حديثة لحضانة Soo Academy لاستعراض البرامج التعليمية والأنشطة ومعلومات التسجيل لأولياء الأمور.",
      "exp_item_3_tech": "التقنيات: HTML5, CSS3, JavaScript, Responsive Animations",
      "exp_item_3_outcome": "النتيجة: تقديم واجهة دافئة وسهلة الاستخدام عززت من تفاعل أولياء الأمور وسهلت عملية التعرف على الأكاديمية.",
      
      "exp_item_4_title": "متجر ومنصة دورات Flower Art",
      "exp_item_4_built": "تطوير متجر إلكتروني أنيق ومنصة للتسجيل في ورش العمل الفنية وتنسيق الزهور مع لمسات جمالية ورسوم سلسة.",
      "exp_item_4_tech": "التقنيات: Vanilla JavaScript, Modern CSS Grid/Flexbox, Micro-Animations",
      "exp_item_4_outcome": "النتيجة: تقديم واجهة عرض راقية وسريعة التحميل لزيادة نسب التحويل وجذب عملاء الورش والمنتجات.",
      
      "exp_item_5_title": "أداة تجهيز الصور الشخصية 4x6 (Personal Photo Generator)",
      "exp_item_5_built": "برمجة أداة ويب متخصصة لمعالجة وقص وتنسيق الصور الشخصية وتحويلها إلى لوحات طباعة مقاس 4x6 بدقة مليمترية جاهزة للاستخراج المباشر.",
      "exp_item_5_tech": "التقنيات: HTML5 Canvas API, Vanilla JavaScript, Image Processing, CSS",
      "exp_item_5_outcome": "النتيجة: إمكانية توليد قوالب صور جاهزة للطباعة الفورية مباشرة داخل المتصفح بدون أي تأخير على الخادم.",
      
      "exp_item_6_title": "نظام تسجيل حضور البصمة (Fingerprint Attendance System)",
      "exp_item_6_built": "تطوير نظام ويب داخلي لمقر عملي لتسجيل ومتابعة حضور وانصراف الموظفين وإدارة السجلات.",
      "exp_item_6_tech": "التقنيات: HTML, CSS, JavaScript, Firebase Realtime Database / Firestore",
      "exp_item_6_outcome": "النتيجة: أتمتة تسجيل بيانات الحضور واستبدال الدفاتر اليدوية بسجلات مركزية متزامنة سحابياً.",
      
      "exp_transferable_title": "مهارات مهنية أساسية قابلة للنقل",
      "exp_transferable_desc": "تحمل المسؤولية الكاملة عن المخرجات، الالتزام الصارم بالمواعيد، التواصل الشفاف والواضح مع العملاء، والدعم الفني المستمر بعد التسليم.",

      // Skills
      "skills_label": "القدرات الفنية",
      "skills_title_1": "المهارات و",
      "skills_title_2": "الخبرات",
      "skills_sub_soft": "المهارات الشخصية (Soft Skills)",
      "skills_sub_tech": "المهارات التقنية (Technical Skills)",
      "skills_sub_tools": "الأدوات والتقنيات (Tools & Tech)",
      "skills_sub_langs": "اللغات (Languages)",
      "lang_native": "اللغة الأم",
      "lang_very_good": "جيد جداً",
      "lang_intermediate": "متوسط (خريج ITEC)",

      // What I Deliver
      "deliver_label": "ما أقدمه",
      "deliver_title_1": "حلول برمجية",
      "deliver_title_2": "متكاملة",
      "deliver_card_1_title": "تطبيقات ويب نقية وفائقة السرعة",
      "deliver_card_1_desc": "تطبيقات ويب خفيفة الوزن وعالية الأداء مبنية باستخدام HTML5 الدلالي، وتنسيقات ورسوم CSS3 الحديثة، وجافاسكريبت الموديلية (ES6+). بدون اعتمادات ثقيلة، مع أوقات تحميل شبه فورية وكود نظيف.",
      "deliver_card_2_title": "حلول سحابية وقواعد بيانات فورية (BaaS)",
      "deliver_card_2_desc": "لوحات تحكم إدارية تفاعلية، وأنظمة حجز فورية، وربط متقدم مع Firebase Firestore وSupabase، وإدارة تسجيل الدخول وصلاحيات المستخدمين بأمان كامل.",
      "deliver_card_3_title": "واجهات Node.js REST والأدوات المخصصة",
      "deliver_card_3_desc": "بناء نقاط اتصال برمجية (APIs) مخصصة عبر Node.js، وربط الوسائط السحابية عبر Cloudinary، وتطوير أدوات ويب مخصصة، وهيكلة قواعد بيانات محكمة.",

      // Projects
      "projects_label": "معرض الأعمال",
      "projects_title_1": "أبرز",
      "projects_title_2": "المشاريع",
      "project_featured_badge": "دراسة حالة تفصيلية",
      "project_cms_title": "نظام إدارة العيادات (Clinic Management System)",
      "project_cms_problem_lbl": "المشكلة",
      "project_cms_problem_txt": "عانت العيادات من السجلات الورقية اليدوية، وفقدان تاريخ المرضى، وتداخل مواعيد الحجوزات بين الأطباء والاستقبال.",
      "project_cms_solution_lbl": "الحل",
      "project_cms_solution_txt": "بناء نظام سحابي فوري للحجز والإدارة بصلاحيات وصول محددة (طبيب، استقبال، مريض) بالاعتماد على Firebase Firestore وCloudinary للوسائط الطبية.",
      "project_cms_features_lbl": "أبرز المزايا",
      "project_cms_features_txt": "استخدام مستمعات فورية (onSnapshot) بدلاً من إعادة التحميل، وإدارة وسائط آمنة عبر Cloudinary، وتوزيع دقيق لصلاحيات المستخدمين.",
      "project_cms_result_lbl": "النتيجة",
      "project_cms_result_txt": "إنهاء الاعتماد على الجداول الورقية، وانعدام تعارض المواعيد، ومزامنة لحظية فورية عبر كافة لوحات تحكم الموظفين.",
      "project_live_demo": "معاينة حية",
      "project_github": "كود المشروع (GitHub)",
      "project_sadat_title": "ملاعب السادات (Mla3b El Sadat)",
      "project_sadat_desc": "منصة حجز ملاعب لمدينة السادات. يتيح للمستخدمين استعراض الملاعب واختيار المواعيد وتأكيد الحجوزات عبر واجهة سهلة وتفاعلية.",
      "project_andalus_title": "نادي الأندلس الرياضي (Al-Andalus)",
      "project_andalus_desc": "موقع إلكتروني متكامل للنادي يعرض الأنشطة الرياضية، والإعلانات، وجداول التدريب مع تجربة بصرية متجاوبة للأعضاء.",
      "project_flower_title": "Flower Art",
      "project_flower_desc": "متجر لعرض وتنسيق الزهور والورش التدريبية بواجهة أنيقة، ورسوم تفاعلية ناعمة صممت لتحقيق أعلى نسب تحويل وأناقة.",
      "projects_more_github": "شاهد المزيد على GitHub",

      // Client Feedback
      "feedback_label": "ثقة العملاء",
      "feedback_title_1": "ما يقدّره العملاء",
      "feedback_title_2": "في العمل معي",
      "feedback_intro": "التعاون الحقيقي يبنى على الاستمرارية، سرعة الاستجابة، والاهتمام الصادق بنجاح المنتج. إليك ما يقدّره العملاء دائماً في شراكتنا:",
      "feedback_card_1_title": "تفكير يركز على الخدمة وسرعة الاستجابة",
      "feedback_card_1_desc": "تواصل سريع وواضح في كافة مراحل المشروع، وتواجد دائم لحل المتطلبات العاجلة ومناقشة الأفكار وتعديل المسار حسب الحاجة.",
      "feedback_card_2_title": "متابعة دورية ودعم مستمر حتى بعد التسليم",
      "feedback_card_2_desc": "العلاقة لا تنتهي بمجرد تسليم المشروع؛ بل أحرص على المتابعة الدورية، والتأكد من استقرار النظام وتطويره خطوة بخطوة مع نمو عمل العميل.",
      "feedback_card_3_title": "سلاسة في التعامل وشغف حقيقي بالعمل",
      "feedback_card_3_desc": "أسلوب عمل إيجابي واحترافي يجعل تجربة العمل مريحة وممتعة، مع شغف حقيقي بالبرمجة ينعكس على أدق تفاصيل وجودة التطبيق.",

      // Contact
      "contact_label": "تواصل معي",
      "contact_title_1": "هل لديك فكرة مشروع؟",
      "contact_title_2": "دعنا نبني تطبيقاً ناجحاً معاً.",
      "contact_left_heading": "لنتحدث عن مشروعك القادم.",
      "contact_left_desc": "سواء كنت بحاجة إلى تطبيق ويب متكامل، أو لوحة تحكم فورية، أو فرصة عمل تقنية، يسعدني تواصلك المباشر أو إرسال رسالتك عبر النموذج.",
      "contact_whatsapp_title": "محادثة واتساب مباشرة",
      "contact_linkedin_title": "حساب LinkedIn المهني",
      "contact_github_title": "مستودعات GitHub",
      "contact_copy_phone_title": "نسخ رقم الهاتف",
      "contact_form_name": "الاسم *",
      "contact_form_name_ph": "اسمك الكريم",
      "contact_form_email": "البريد الإلكتروني *",
      "contact_form_email_ph": "you@company.com",
      "contact_form_phone": "رقم الهاتف",
      "contact_form_optional": "(اختياري)",
      "contact_form_phone_ph": "+20 1...",
      "contact_form_subject": "الموضوع *",
      "contact_form_subject_ph": "استفسار عن مشروع / فرصة عمل",
      "contact_form_message": "الرسالة *",
      "contact_form_message_ph": "أخبرني بتفاصيل مشروعك، أهدافك، والجدول الزمني المقترح...",
      "contact_form_submit": "إرسال الرسالة",
      "contact_form_sending": "جاري الإرسال...",
      "contact_val_name": "يرجى كتابة الاسم.",
      "contact_val_email": "يرجى كتابة البريد الإلكتروني.",
      "contact_val_email_valid": "يرجى إدخال بريد إلكتروني صالح.",
      "contact_val_subject": "يرجى كتابة عنوان الموضوع.",
      "contact_val_message": "يرجى كتابة رسالتك.",
      "contact_val_message_len": "يجب ألا تقل الرسالة عن 10 أحرف.",
      "contact_cooldown": "⏳ يرجى الانتظار {s} ثانية قبل إرسال رسالة أخرى.",
      "contact_success_toast": "✓ تم إرسال رسالتك بنجاح — سأرد عليك في أقرب وقت.",
      "contact_error_toast": "✕ حدث خطأ في إرسال الرسالة. يرجى التواصل مباشرة عبر واتساب.",
      "contact_success_heading": "تم إرسال الرسالة بنجاح",
      "contact_success_desc": "شكراً لتواصلك! سأقوم بالرد عليك في أقرب وقت ممكن.",
      "contact_error_heading": "تعذر إرسال الرسالة",
      "contact_error_desc": "يمكنك التواصل معي مباشرة عبر واتساب على الرقم: 01091728680 20+",

      // Thank You
      "thanks_label": "شكر وتقدير",
      "thanks_title": "شكراً لزيارتك",
      "thanks_desc": "سعيد وممتن لوقتك في تصفح ملف أعمالي. سواء كنت ترغب في بناء تطبيق ويب جديد، أو التعاون في مشروع، أو التواصل المهني — يسعدني دائماً التحدث معك.",
      "thanks_btn": "ابدأ المحادثة الآن",

      // Footer
      "footer_copy": "© 2026 أحمد مراد. صُنع بدقة وشغف واحترافية."
    }
  };

  function getCurrentLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'ar' || saved === 'en') return saved;
    } catch (e) {}
    return 'en';
  }

  function setLanguage(lang) {
    if (lang !== 'ar' && lang !== 'en') lang = 'en';

    const isAr = lang === 'ar';
    html.setAttribute('lang', lang);
    html.setAttribute('dir', isAr ? 'rtl' : 'ltr');

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}

    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;

    // Update Document Title & Meta tags
    if (dict.meta_title) document.title = dict.meta_title;
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta && dict.meta_desc) descMeta.setAttribute('content', dict.meta_desc);
    const kwMeta = document.querySelector('meta[name="keywords"]');
    if (kwMeta && dict.meta_keywords) kwMeta.setAttribute('content', dict.meta_keywords);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && dict.og_title) ogTitle.setAttribute('content', dict.og_title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && dict.og_desc) ogDesc.setAttribute('content', dict.og_desc);

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        // If element has HTML tags in translation, use innerHTML
        if (dict[key].includes('<') && dict[key].includes('>')) {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (dict[key] !== undefined) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    // Update aria-labels
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      if (dict[key] !== undefined) {
        el.setAttribute('aria-label', dict[key]);
      }
    });

    // Update titles / tooltips
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (dict[key] !== undefined) {
        el.setAttribute('title', dict[key]);
      }
    });

    // Update language switcher buttons text
    const langBtns = document.querySelectorAll('.nav__lang-btn');
    langBtns.forEach(btn => {
      btn.textContent = isAr ? 'EN' : 'عربي';
      btn.setAttribute('aria-label', isAr ? 'Switch language to English' : 'تغيير اللغة إلى العربية');
      btn.setAttribute('title', isAr ? 'Switch language to English' : 'تغيير اللغة إلى العربية');
    });

    // Dispatch event so typewriter, contact form, or animations can react
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang, isAr, dict } }));
  }

  function initSwitcher() {
    const langBtns = document.querySelectorAll('.nav__lang-btn');
    langBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const current = html.getAttribute('lang') || 'en';
        setLanguage(current === 'ar' ? 'en' : 'ar');
      });
    });

    // Apply current on load
    setLanguage(getCurrentLang());
  }

  // Expose helper globally
  window.portfolioI18n = {
    get: function (key, fallback = '') {
      const lang = html.getAttribute('lang') || 'en';
      const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return dict[key] !== undefined ? dict[key] : fallback;
    },
    getCurrentLang,
    setLanguage,
    dict: TRANSLATIONS
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSwitcher);
  } else {
    initSwitcher();
  }
})();
