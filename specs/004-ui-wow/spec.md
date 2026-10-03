# SPEC 004 — UI Wow Pack 1 (incremental)

Objetivo: impresionar sin romper marca (#5aadfd, #212121) ni performance. De a poco:

T1 Hero cinematográfico: zoom lento Ken Burns, overlay gradiente, barra progreso 6s, dots premium.
T2 Reveal on scroll: directiva `appReveal` con IntersectionObserver, clase `.reveal-visible`.
T3 Contadores animados About: +600, +90, +7, 4.4/5 con `signal` + rAF.
T4 Flotantes layout: WhatsApp sticky + back-to-top en `app.html`.

Reglas: solo Tailwind + CSS keyframes en `styles.css`, sin libs. Respetar `prefers-reduced-motion`. Verificación: build + tests ok.
