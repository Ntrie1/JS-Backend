import { Directive, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[ImageUrlValidator]'
})
export class ImageUrlValidatorDirective implements OnInit {

  constructor(private eRef: ElementRef, private renderer: Renderer2, private ngControl: NgControl) {

   }

   ngOnInit() {
    this.eRef.nativeElement.value= 'asdasdd'
  }

  @HostListener('input') onInput() {
    const inputValue = this.eRef.nativeElement.value;
  
    const isValid = inputValue.startsWith('http') && (inputValue.endsWith('jpg') || inputValue.endsWith('png'));

   
    if (isValid) {
      this.renderer.removeClass(this.eRef.nativeElement, 'error');
     // this.ngControl.control.setErrors(null); // Clear any existing custom errors
    } else {
      const controlNg = this.ngControl.control as any;
      this.renderer.addClass(this.eRef.nativeElement, 'error');
      controlNg.setErrors({ 'invalidImageUrl': true }); // herre i set the custom error
    }

    
  }

  


}
