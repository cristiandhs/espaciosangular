# PLAN 001 — Setup Base

Origen: `specs/001-setup-base/spec.md`. Sin código aún, solo decisiones técnicas.

## 1. Decisión Tailwind
Usar **Tailwind CSS v4 vía PostCSS** (compatible con `@angular/build:application` 21.1 sin eject de Vite).
- Instalar: `tailwindcss@4`, `@tailwindcss/postcss`, `postcss`
- Crear `.postcssrc.json`: `{ "plugins": { "@tailwindcss/postcss": {} } }`
- En `src/styles.css`: `@import "tailwindcss";` + `@theme` con tokens marca.
- Alternativa descartada: `@tailwindcss/vite` directo (requiere custom Vite config que Angular CLI 21 no expone por defecto).

## 2. Tokens marca (`src/styles.css`)
Definir con `@theme`:
```css
@theme {
  --color-brand-dark: #1a1512;
  --color-brand-brown: #6b4a2f;
  --color-brand-beige: #f5efe6;
  --color-brand-accent: #c67a2e;
  --font-display: "Poppins", sans-serif;
  --font-body: "Jost", sans-serif;
}
```
Valores iniciales estimados del sitio actual; ajustar con captura `img/carousel-*.png` en TASK de auditoría. Regla: resto del código solo usa `bg-brand-*`, `text-brand-*`.

## 3. Archivos a crear / modificar / borrar
Crear:
- `.postcssrc.json`
- `src/app/layout/header/header.ts|header.html|header.css`
- `src/app/layout/footer/footer.ts|footer.html|footer.css`
- `src/app/features/home/home.ts|home.html` (placeholder con 1 hero simple)
- `src/app/features/about/about.ts` (placeholder)
- `src/app/features/blog/blog.ts` (placeholder Reciente)
- `src/app/features/contact/contact.ts` (placeholder)
- `src/app/shared/ui/section-title/` (para reutilizar en SPEC 002+)
- `public/` o `src/assets/img/` — copiar `img/*.png` origen (decidir en tasks)

Modificar:
- `src/styles.css` (Tailwind + theme + fonts Google)
- `src/index.html` (`lang="es"`, title `Espacios DFR | Diseño, Fabricación y Restauración`, meta description, fonts preconnect)
- `src/app/app.routes.ts` (lazy: `loadComponent`)
- `src/app/app.ts` (imports Header, Footer, RouterOutlet, quitar `signal title`)
- `src/app/app.html` (borrar placeholder 342 líneas, reemplazar por shell layout)
- `src/app/app.css` (limpiar, dejar vacío o clases layout mínimas)
- `angular.json` solo si hace falta `"assets"` para `src/assets` (ya tiene `public/**`)

Borrar:
- Contenido demo `src/app/app.html:1-342` y `src/app/app.spec.ts` demo si bloquea build.

## 4. Rutas lazy
```ts
export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home').then(m => m.Home) },
  { path: 'about', loadComponent: () => import('./features/about/about').then(m => m.About) },
  { path: 'blog', loadComponent: () => import('./features/blog/blog').then(m => m.Blog) },
  { path: 'contact', loadComponent: () => import('./features/contact/contact').then(m => m.Contact) },
  { path: '**', redirectTo: '' }
];
```

## 5. Orden de implementación (para tasks.md)
1. Instalar deps + PostCSS + verificar `@import "tailwindcss"` compila.
2. Tokens + fonts + `index.html` es.
3. Layout header/footer (Tailwind, responsive, CTA WhatsApp).
4. Shell `app.html` + rutas lazy + placeholders.
5. Copiar assets y verificar `ng build`.
6. Limpieza demo + verificación responsive.

## 6. Verificación
- `npm run build` ok (budgets `angular.json:32-46`).
- `npm start` → `/`, `/about`, `/blog`, `/contact` renderizan shell sin 404.
- `grep -r "oklch\|pill-group\|angular-logo" src/app` = 0 (demo eliminada).
- `grep -r "#[0-9a-fA-F]\{6\}" src/app --include="*.html"` = 0 (cero hex hardcodeado).

## 7. Riesgos
- PostCSS v4 vs Angular cache: si falla, borrar `.angular/` y reintentar.
- Fuentes Google offline: usar `system-ui` fallback.
- Imágenes pesadas: no optimizar aquí, solo copiar 3-4 para hero test.

---
Siguiente: `tasks.md` checklist ejecutable. Luego, con tu OK, implemento.
