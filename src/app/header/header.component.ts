import { Component, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
    searchActivated: boolean = true
    @Output() emitSearch = new EventEmitter<string>();
    searchInput: string = ''

    openSearchMode() {
        this.searchActivated = true
    }
    onEmitSearch() {
        this.emitSearch.emit(this.searchInput)
    }
}