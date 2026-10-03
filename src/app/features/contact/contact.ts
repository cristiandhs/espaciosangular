// ESTUDIO: formulario de contacto con ReactiveForms (sin backend).
// - FormGroup/FormControl: modelo del form en TS (no en el HTML).
// - Validators: reglas (required, minLength, pattern de teléfono).
// - formControlName: conecta cada <input> con su FormControl.
// - submit(): si es inválido marca todo como touched (muestra errores);
//   si es válido abre WhatsApp con el texto codificado y activa sent().
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageHeader } from '../../shared/ui/page-header/page-header';

@Component({
  selector: 'app-contact',
  imports: [PageHeader, ReactiveFormsModule],
  templateUrl: './contact.html',
})
export class Contact {
  protected readonly sent = signal(false);
  protected readonly whatsappBase = 'https://wa.me/573014667781';
  protected readonly form = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    telefono: new FormControl('', [Validators.required, Validators.pattern(/^[+0-9 ]{7,15}$/)]),
    tipo: new FormControl('', [Validators.required]),
    mensaje: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.value;
    const text = `Hola Espacios DFR, soy ${v.nombre} (${v.telefono}). Tipo: ${v.tipo}. ${v.mensaje}`;
    window.open(`${this.whatsappBase}?text=${encodeURIComponent(text)}`, '_blank');
    this.sent.set(true);
  }
}
