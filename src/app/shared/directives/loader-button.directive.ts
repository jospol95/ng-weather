import { Directive, TemplateRef } from "@angular/core";
@Directive({
    selector: "ng-template[buttonLoader]"
})
export class ButtonLoaderIconDirective {
    constructor(public tpl: TemplateRef<any>) {}
}
