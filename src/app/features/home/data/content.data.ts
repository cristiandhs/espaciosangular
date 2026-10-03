// ESTUDIO: fuente única de contenido (textos e imágenes del sitio origen).
// - Separar DATOS de COMPONENTES permite editar textos sin tocar HTML.
// - Las rutas '/img/...' apuntan a public/img (Angular sirve public/ en la raíz).
import type { GalleryItem, HeroSlide, ProcessStep, ServiceItem, Testimonial } from './models';

export const WHATSAPP = 'https://wa.me/573014667781';

export const HERO_SLIDES: HeroSlide[] = [
  {
    image: '/img/carousel-1.png',
    eyebrow: 'Espacios',
    title: 'Diseño, Fabricación & Restauración De Mobiliarios',
    cta: '¡COTIZA YA!',
    ctaLink: WHATSAPP,
  },
  {
    image: '/img/carousel-2.png',
    eyebrow: 'Cortineria',
    title: 'Descubre que tipo de cortina es la mejor para tu espacio',
    cta: '¡COTIZA YA!',
    ctaLink: WHATSAPP,
  },
  {
    image: '/img/carousel-3.png',
    eyebrow: 'Muebles RH',
    title: 'Mira todas las posibilidades',
    cta: '¡COTIZA YA!',
    ctaLink: WHATSAPP,
  },
];

export const SERVICES: ServiceItem[] = [
  {
    title: 'Fabricación a Medida',
    desc: 'Diseñamos y fabricamos muebles únicos adaptados a tus necesidades específicas, espacios y estilo personal.',
  },
  {
    title: 'Restauración y Retapizado',
    desc: 'Devolvemos la vida a muebles antiguos y damos nueva apariencia a piezas existentes con técnicas profesionales.',
  },
  {
    title: 'Cortinera',
    desc: 'Soluciones integrales en cortinas, persianas y toldos para controlar la luz y mejorar el confort de tus espacios.',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  { n: 1, title: 'Consulta Inicial', desc: 'Evaluamos tus necesidades, presupuesto y visión para el proyecto. Realizamos una visita técnica si es necesario.' },
  { n: 2, title: 'Diseño y planificación', desc: 'Creamos diseños personalizados, seleccionamos materiales y establecemos cronogramas detallados.' },
  { n: 3, title: 'Fabricación', desc: 'Producimos los componentes según los diseños y especificaciones establecidas con el cliente.' },
  { n: 4, title: 'Entrega y Soporte', desc: 'Entregamos el proyecto terminado y proporcionamos soporte postventa para garantizar la satisfacción.' },
];

export const TESTIMONIALS: Testimonial[] = [
  { quote: 'No pense que la diferencia entre mis muebles viejos y los nuevos fuera tan grande, el cambio es increíble, me encanta como quedaron mis muebles', name: 'Rodrigo Herrera', role: 'Ingeniero' },
  { quote: 'Excelente servicio y calidad en la ejecución del proyecto. Muy satisfecha con el resultado final.', name: 'Maria Rodriguez', role: 'Ama de casa' },
  { quote: 'El equipo de Espacios DFR superó mis expectativas. La atención al detalle y la calidad del trabajo fueron excepcionales.', name: 'Angel Martínez', role: 'Diseñador' },
  { quote: 'Estoy encantado con el resultado de mi proyecto. El equipo de Espacios DFR fue profesional, eficiente y entregó un trabajo de alta calidad.', name: 'Luis García', role: 'Arquitecto' },
];

export const GALLERY: GalleryItem[] = [
  { image: '/img/blog-11.png', label: 'proyecto 1' },
  { image: '/img/blog-2.png', label: 'proyecto 2' },
  { image: '/img/blog-3.png', label: 'proyecto 3' },
];

export const OFFER_ITEMS: string[] = [
  'Retapizado de muebles, poltronas y sillas',
  'Promociones en cortinería',
  'Descuentos en accesorios',
];
