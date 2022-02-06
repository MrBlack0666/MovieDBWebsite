import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { AdminPersonnelComponent } from './admin-personnel.component';
describe('AdminPersonnelComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [AdminPersonnelComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AdminPersonnelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=admin-personnel.component.spec.js.map