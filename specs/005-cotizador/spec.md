# SPEC 005 — Cotizador DFR · Documento de Diseño (v1)

App web para generar cotizaciones de ESPACIOSDFR reemplazando el formato Excel
`Formato de cotización v5.xlsx`. Fase inicial: **solo Angular (sin backend)**.

## 1. Contexto y problema

ESPACIOSDFR (mobiliarios a medida, cortinería, papeles de colgaduras y películas
solares) cotiza con un formato Excel que creció en complejidad:

- Muchas filas de ítems (cantidad variable) y columnas fijas.
- Fórmulas manuales (TOTAL = CANT. × P. UNITARIO, suma general, "válido hasta" = fecha + 15).
- Sin historial: buscar una cotización vieja depende de archivos en la PC.
- Copiar el archivo base sin borrar datos del cliente anterior → riesgo de fugas de datos entre clientes.
- Las imágenes de producto se pegan a mano en cada celda.

## 2. Objetivo y alcance

### 2.1 Objetivo
App web interna que permita crear, editar, duplicar, buscar y exportar cotizaciones
con un PDF idéntico al formato actual, eliminando el manejo manual del Excel.

### 2.2 Alcance MVP (fase 1)
| # | Funcionalidad |
|---|---|
| F1 | Crear cotización: datos del cliente (nombre, dirección, correo, teléfonos) |
| F2 | Ítems dinámicos: agregar/quitar/reordenar filas (imagen, cantidad, descripción, precio unitario) |
| F3 | Cálculo automático: total por línea, subtotal, descuento opcional, IVA opcional, total general |
| F4 | N° de cotización correlativo automático (formato `DFR-AAAA-NNNN`) |
| F5 | Fechas: fecha de emisión y "válido hasta" (default: fecha + 15 días, editable) |
| F6 | Términos editables: tiempo de entrega (días hábiles), forma de pago (60/40), nota |
| F7 | Exportar PDF A4 fiel al formato actual |
| F8 | Guardar borradores y editar cotizaciones existentes |
| F9 | Duplicar cotización (base para cotizaciones similares) |
| F10 | Buscar/filtrar cotizaciones (n°, cliente, fecha, estado) |
| F11 | Copiar ítems desde una cotización previa (cada producto es personalizado: no hay catálogo; se reutiliza la línea completa de otra cotización como punto de partida) |
| F12 | Mini-CRM de clientes: autocompletar cliente existente al escribir el nombre |
| F13 | Configuración editable: % IVA, validez por defecto, % anticipo, datos bancarios, moneda |

**Nota de diseño**: los ítems son **100% libres** por cotización (cantidad, descripción,
precio e imagen se capturan desde cero). No existe un catálogo de productos con precio
fijo porque todo se personaliza; la única reutilización permitida es copiar líneas
completas de cotizaciones anteriores (F11).

### 2.3 Fuera de alcance (fase 1)
- Backend, base de datos en la nube, sincronización entre PCs.
- Login/usuarios (herramienta para uso en una PC).
- Envío automático por correo/WhatsApp (el PDF se comparte manualmente).
- Estados de flujo (aprobada/rechazada) más allá de un flag simple.
- Firma digital del cliente.

## 3. Stack y justificación

| Capa | Elección | Por qué |
|---|---|---|
| Framework | **Angular 21** (standalone, signals) | Ya dominado; mismo stack de la web corporativa; Reactive Forms tipados para el formulario complejo de cotización |
| UI | **Tailwind CSS** | Consistente con la web existente; rápido para maquetar la vista "papel" A4 |
| Estado | **Signals** | Estado predecible sin librerías externas |
| Persistencia | **localStorage/IndexedDB** vía repositorio abstracto | Fase 1 sin backend; capa de abstracción para migrar después |
| PDF | **Vista HTML/CSS con `@media print`** (`window.print()` → Guardar como PDF) | Texto seleccionable y editable con CSS, formato mantenido en un solo lugar, sin coordenadas frágiles |
| Imágenes | **`browser-image-compression`** o canvas propio | Fotos de celular de 3-8 MB → max ~1200 px antes de guardar |
| Tests | **Vitest** | Convención del repo |

**No se usa** jsPDF/pdf-lib con coordenadas a mano: es frágil, caro de mantener y el
formato ya existe como maquetación (Excel) que se traslada naturalmente a HTML/CSS.

## 4. Arquitectura

```
src/app/
├── core/                       # singletons y reglas de negocio
│   ├── models/                 # interfaces de dominio
│   ├── services/
│   │   ├── cotizacion-calculo.service.ts   # totales, IVA, descuento (puro)
│   │   ├── numeracion.service.ts           # correlativo DFR-AAAA-NNNN
│   │   └── configuracion.service.ts        # IVA, validez, datos bancarios
│   └── repositories/
│       ├── cotizacion.repository.ts        # INTERFAZ (puerta al storage)
│       ├── local/cotizacion-local.repository.ts  # impl. localStorage/IDB
│       └── (futuro) supabase/cotizacion-supabase.repository.ts
├── features/
│   ├── cotizador/
│   │   ├── lista-cotizaciones/    # buscador + tabla de historial
│   │   ├── editor-cotizacion/     # formulario principal
│   │   └── vista-pdf/             # vista "papel" A4 (print preview)
│   └── clientes/
└── shared/                      # botones, pipes moneda/fecha, directivas
```

**Regla de arquitectura**: ningún componente accede directamente a `localStorage`.
Todo pasa por las interfaces de `core/repositories/`. Esto hace que migrar a
Supabase u otra API sea implementar la interfaz e inyectar la nueva impl.
(`providedIn: 'root'` + token de DI).

## 5. Modelo de datos

```ts
interface Cotizacion {
  id: string;                    // uuid local
  numero: string;                // "DFR-2026-0043"
  fecha: string;                 // ISO date
  validoHasta: string;           // ISO date (default: fecha + 15 días)
  estado: 'borrador' | 'emitida';
  cliente: Cliente;
  items: ItemCotizacion[];
  // totales (calculados, se guardan para historial inmutable)
  subtotal: number;
  descuentoPct: number | null;   // null = sin descuento
  descuentoValor: number;
  ivaPct: number | null;         // null = sin IVA
  ivaValor: number;
  total: number;
  terminos: Terminos;
}

interface ItemCotizacion {
  id: string;
  orden: number;
  imagenUrl: string | null;      // blob:/data: o URL remota
  cantidad: number;
  descripcion: string;
  precioUnitario: number;
  total: number;                 // cantidad × precioUnitario
}

interface Cliente {
  id: string;
  nombre: string;
  direccion: string;
  correo: string;
  telefonos: string;
}

// No existe entidad de catálogo de productos: todo producto cotizado es único
// (imagen, descripción y precio varían siempre). Ver F11 (copiar ítems previos).

interface Terminos {
  tiempoEntregaDias: number | null;
  formaPago: string;             // default "(60%) Anticipo… (40%) Saldo…"
  nota: string;
}

interface Configuracion {
  moneda: 'COP';
  ivaPctDefault: number | null;  // 19 en Colombia, null = desactivado
  validezDiasDefault: number;    // 15
  anticipoPct: number;           // 60
  datosBancarios: string;
  telefono: string;
}
```

## 6. Reglas de negocio

1. **Numeración**: `DFR-{año}-{secuencial 4 dígitos}`; el secuencial se incrementa
   por año y vive en un contador persistente. Se asigna al guardar, no al abrir el editor.
2. **Fechas**: "válido hasta" default = fecha + `validezDiasDefault` días, editable.
3. **Total por línea** = `cantidad × precioUnitario` (redondeo a 2 decimales, COP sin decimales en display si el usuario lo configura).
4. **Subtotal** = Σ totales de líneas.
5. **Descuento** (opcional): porcentaje global sobre el subtotal. `null` = no aplica.
6. **IVA** (opcional): porcentaje sobre `subtotal − descuento`. `null` = no aplica.
7. **Total** = `(subtotal − descuento) + IVA`.
8. **Validación por línea**: cantidad > 0, descripción no vacía, precio ≥ 0. Líneas incompletas se excluyen del PDF con aviso explícito.
9. **Duplicar**: copia cliente, ítems y términos; nuevo número y fecha; estado = borrador.
10. **Historial inmutable**: al "emitir" (exportar PDF por primera vez) el snapshot de totales se congela; reabrir y editar regenera el snapshot.

## 7. Pantallas y flujo

```
Lista de cotizaciones (home del cotizador)
 ├── [Nueva cotización] → Editor
 ├── buscar/filtrar → fila → Editor | Duplicar | Ver PDF | Eliminar (confirm)
 ├── Botón "Copiar ítems de…" → selector de cotización previa (F11)
 └── Pestana: Clientes → CRUD simple

Editor de cotización
 ├── Datos del cliente (autocompletado si existe)
 ├── Cabecera: n°, fecha, válido hasta
 ├── Ítems: tabla editable en línea + "Copiar ítems de cotización previa" (F11)
 │    (móvil: tarjetas apiladas)
 ├── Totales: subtotal → descuento (checkbox + %) → IVA (checkbox + %) → TOTAL
 ├── Términos: días de entrega, forma de pago, nota
 └── Acciones: [Guardar borrador] [Vista previa PDF]

Vista previa PDF (vista-papel A4)
 ├── Renderiza exactamente el layout del Excel actual
 └── [Imprimir/Guardar PDF] → window.print() con @media print
```

## 8. Generación del PDF (pieza central)

- Componente `vista-pdf` maqueta A4 (210×297 mm) con `@page { size: A4; margin: … }`.
- Encabezado: logo, nombre, descriptor, correo, Instagram, N°/fecha/válido hasta.
- Tabla de ítems con columna IMAGEN (thumbnail), quebrando encabezado en cada página (`thead` con `display: table-header-group`).
- Pie: total, firma, datos Bancolombia, Bold 6%, contacto, agradecimiento.
- La maquetación compartida (encabezado/tabla/pie) se extrae a estilos reutilizables para no duplicar CSS.
- Limitación asumida: en algunos navegadores, `window.print()` muestra el diálogo y el usuario elige "Guardar como PDF". Es aceptable para uso interno.

## 9. Persistencia y migración a backend

| Tema | Fase 1 (local) | Fase 2 (backend, ej. Supabase) |
|---|---|---|
| Storage | IndexedDB (cotas + imágenes blob), localStorage solo para contador y config | Postgres + Storage |
| Imágenes | Blob en IDB | URL en Storage |
| Numeración | Contador en storage local | Secuencia/transacción en DB |
| Usuarios | Ninguno | Auth + RLS para los 3 usuarios |
| Riesgo | Datos atados a una PC; limpiar datos del navegador = pérdida | Sincronizado y respaldado |

**Migración**: exportar/importar JSON completo (todas las cotizaciones y clientes)
desde la UI de configuración. Cubre el caso "cambiar de PC" en fase 1
y sirve como vía de carga inicial a la DB en fase 2.

## 10. No funcionales

- **Mobile-first**: tablet/celular para cotizar en visita; la tabla de ítems en móvil se ve como tarjetas.
- **Offline**: al no tener backend, la app funciona 100% offline tras la primera carga (PWA opcional en fase 2).
- **Navegadores soportados**: Chrome/Edge actualizados (impresión a PDF más confiable).
- **Rendimiento**: compresión de imágenes antes de persistir; listas con `trackBy`.
- **Respaldo**: obligatorio el botón "Exportar JSON" visible; recomendar copia periódica.

## 11. Roadmap

| Fase | Contenido |
|---|---|
| **F1 – MVP** | Editor + cálculos + PDF fiel + guardado local + numeración (F1–F8) |
| **F1.5** | Duplicar, buscador/historial, copiar ítems previos, mini-CRM, export/import JSON (F9–F13) |
| **F2 – Backend** | Supabase: auth, DB, storage; repositorios remotos; acceso desde varias PCs |
| **F3 – Extras** | Estados de cotización, link compartible con cliente, envío por WhatsApp/correo, PWA |

## 12. Criterios de aceptación del MVP

1. Crear una cotización con ≥3 ítems (uno con imagen) y exportar un PDF que visualmente
   coincida con `Formato de cotización v5.xlsx` (misma estructura, mismos textos de pie).
2. Los totales calculados coinciden con las fórmulas del Excel en los casos de prueba.
3. Con IVA y descuento desactivados, el layout es idéntico al Excel actual (sin filas fantasma).
4. Cerrar y reabrir la app conserva las cotizaciones; el n° siguiente no se repite.
5. Duplicar una cotización genera un nuevo número y deja intacto el original.
6. En tablet/celular el editor es usable sin scroll horizontal.

## 13. Preguntas abiertas (pendientes del negocio)

1. ¿El N° de cotización actual se controla a mano hoy? ¿Por dónde va la numeración real (para no chocar)?
2. ¿Las cotizaciones se archivan/anulan alguna vez, o solo se corrigen creando otra?
3. ¿La imagen del ítem siempre es una foto del producto, o a veces es un plano/esquema?
4. ¿Alguna vez aplican varios descuentos o descuento por línea (hoy está diseñado solo global)?
5. ¿Quién firma? ¿Se requiere espacio para firma/fecha del cliente en el PDF?
6. ¿El logo actual (PNG ~750 KB) puede optimizarse a ~30 KB sin pérdida visible? (afecta peso del PDF)
