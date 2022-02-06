import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { AddEditMovieComponent } from './add-edit-movie.component';
describe('AddEditMovieComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [AddEditMovieComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AddEditMovieComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=add-edit-movie.component.spec.js.map