import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { AddEditGenreComponent } from './add-edit-genre.component';
describe('AddEditGenreComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [AddEditGenreComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AddEditGenreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=add-edit-genre.component.spec.js.map