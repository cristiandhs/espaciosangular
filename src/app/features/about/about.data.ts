import type { ProcessStep } from '../home/data/models';

export interface Metric {
  value: string;
  label: string;
  desc: string;
}

export const METRICS: Metric[] = [
  { value: '+600', label: 'Proyectos realizados', desc: 'Diseños y fabricaciones a medida para hogar y negocio.' },
  { value: '+90', label: 'Clientes satisfechos', desc: 'Acompañamiento cercano y acabados de alta calidad.' },
  { value: '+7', label: 'Años de experiencia', desc: 'Compromiso con la calidad y el servicio.' },
  { value: '4.4/5', label: 'Calificación promedio', desc: 'Recomendación basada en experiencia y resultados.' },
];

export const MISSION = 'Diseñar, fabricar y personalizar mobiliario de alta calidad para hogares y negocios, ofreciendo soluciones funcionales y estéticas con materiales y acabados de excelencia, respaldados por un servicio cercano y personalizado que garantice la satisfacción de nuestros clientes.';
export const VISION = 'Ser la microempresa líder en fabricación y personalización de mobiliario en nuestra región, reconocidos por la calidad, la innovación y el compromiso con el cliente, transformando espacios que mejoren la calidad de vida y la productividad de personas y organizaciones.';

export const VALUES: ProcessStep[] = [
  { n: 1, title: 'Calidad', desc: 'Buscamos la excelencia en cada pieza que creamos, utilizando materiales de primera calidad y cuidando cada detalle del proceso.' },
  { n: 2, title: 'Pasión', desc: 'Amamos lo que hacemos y eso se refleja en cada proyecto que emprendemos, poniendo nuestra dedicación en cada detalle.' },
  { n: 3, title: 'Compromiso', desc: 'Cumplimos con los plazos establecidos y nos responsabilizamos por ofrecer resultados que superen las expectativas.' },
];
