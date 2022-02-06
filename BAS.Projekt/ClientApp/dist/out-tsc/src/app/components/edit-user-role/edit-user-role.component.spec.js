import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { EditUserRoleComponent } from './edit-user-role.component';
describe('AddEditGenreComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [EditUserRoleComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(EditUserRoleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=edit-user-role.component.spec.js.map