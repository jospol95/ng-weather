import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'auto-complete-component',
    templateUrl: './auto-complete.component.html',
    styleUrls: ['auto-complete.component.css']
})

export class AutoCompleteComponent implements OnInit {
    show = false;
    searchForm: FormGroup;
    @Input() placeholder = 'Search';
    @Input() searchContent: string[] = [];
    @Input() search = '';
    @Output() searchChange = new EventEmitter<string>();

    constructor(private fb: FormBuilder) {
        this.initForm();
    }

    public ngOnInit() {
        this.searchForm.valueChanges.subscribe((changes) => {
            this.search = changes.search;
            this.searchChange.emit(this.search);
        })
    }

    public toggleDropdown(){
        this.show = !this.show;
    }

    public getSearchValue() {
        return this.searchForm.value.search;
    }

    public reset(){
        this.searchForm.patchValue({'search': ''});
    }

    public setValue(value) {
        this.searchForm.patchValue({'search': value});
        this.toggleDropdown();
    }
    private initForm(): FormGroup {
        return this.searchForm = this.fb.group({
            search: [null]
        });
    }

}
