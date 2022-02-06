import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { DeleteReviewDialogComponent } from './delete-review-dialog.component';
describe('DeleteReviewDialogComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [DeleteReviewDialogComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(DeleteReviewDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=delete-review-dialog.component.spec.js.map