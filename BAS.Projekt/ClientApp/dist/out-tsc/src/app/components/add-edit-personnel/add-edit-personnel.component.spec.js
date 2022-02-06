import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { AddEditPersonnelComponent } from './add-edit-personnel.component';
describe('AddEditPersonnelComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [AddEditPersonnelComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AddEditPersonnelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=add-edit-personnel.component.spec.js.map