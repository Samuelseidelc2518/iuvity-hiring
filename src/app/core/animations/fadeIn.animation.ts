import {
    trigger,
    style,
    animate,
    transition,
    AnimationTriggerMetadata,
  } from "@angular/animations";
  
  export class FadeIn {
    static animations = FadeIn.getAnimations();
  
    static getAnimations(): Array<AnimationTriggerMetadata> {
      return [
        trigger("fadeIn", [
          transition(":enter", [
            style({ opacity: "0" }),
            animate(".5s ease-out", style({ opacity: "1" })),
          ]),
        ]),
      ];
    }
  }
  