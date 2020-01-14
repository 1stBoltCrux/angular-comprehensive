import {
  Directive,
  ElementRef,
  OnInit,
  HostListener,
  HostBinding
} from "@angular/core";

@Directive({
  selector: "[appBasicHighlight]"
})
export class BasicHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.style.backgroundColor = "green";
  }

  @HostBinding("style.backgroundColor") backgroundColor: string;
}
