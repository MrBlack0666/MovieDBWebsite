import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { MovieFilterComponent } from './movie-filter.component';
describe('MovieFilterComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [MovieFilterComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(MovieFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=movie-filter.component.spec.js.map