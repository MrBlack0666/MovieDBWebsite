import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AdminPanelComponent = class AdminPanelComponent {
    constructor(route, location) {
        this.route = route;
        this.location = location;
        this.tabNames = ["movie", "genre", "personnel", "user", "rating"];
        this.tabError = false;
        this.isLoading = true;
    }
    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            let tab = params.get('tab');
            if (tab == null) {
                this.tabError = true;
            }
            else {
                let index = this.tabNames.findIndex(t => t === tab);
                if (index < 0) {
                    this.tabError = true;
                }
                else {
                    this.currentTab = index;
                }
            }
            this.isLoading = false;
        });
    }
    changeUrl(event) {
        this.location.go(`/admin/${this.tabNames[event.index]}`);
    }
};
AdminPanelComponent = __decorate([
    Component({
        selector: 'admin-panel',
        templateUrl: './admin-panel.component.html',
        styleUrls: ['./admin-panel.component.css']
    })
], AdminPanelComponent);
export { AdminPanelComponent };
//# sourceMappingURL=admin-panel.component.js.map