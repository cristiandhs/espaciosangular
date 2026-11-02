# Flujo de desarrollo — ODD (Organic Driven Development)

> Decisión de 2026-10-25: se reemplaza SSD (spec-driven) por ODD.
> El producto crece **orgánicamente**: se codifica primero, se itera por necesidad real y la documentación vive en el código.

## Principios
1. **Código primero.** No se exige `spec.md` / `plan.md` / `tasks.md` por cada cambio. Se habla brevemente de lo que se va a hacer y se implementa.
2. **Verificación siempre.** Todo cambio cierra con `npm run build` + `npm test` + búsqueda de hex hardcodeado si aplica. Nada se da por hecho.
3. **Aprendizaje en el código.** Los comentarios `// ESTUDIO:` son la documentación viva del proyecto (Angular, signals, forms, directivas...). Nuevas piezas importantes deben llevarlos.
4. **Incrementos pequeños.** Cambios acotados y revisables; si algo crece demasiado, se parte en dos.
5. **Refactor cuando duela, no por adelantado.** La arquitectura (`core/`, `shared/ui/`, `layout/`, `features/`) guía dónde vive cada cosa; no se especula abstracciones sin uso real.

## Carpeta specs/
- Es **historial**, no proceso obligatorio. Las carpetas `001-…` a `005-…` quedan como registro de decisiones pasadas.
- Nuevas carpetas en `specs/` solo cuando un cambio sea grande/ambiguo y valga la pena escribirlo antes (ej: integración de backend).

## Registro de cambios
- Cada cambio relevante se anota en commit con mensaje claro en español.
- La bitácora improvisada va en el chat/commits, no en documentos paralelos que nadie mantiene.
