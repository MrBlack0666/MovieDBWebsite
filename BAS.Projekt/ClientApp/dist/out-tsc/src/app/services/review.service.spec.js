import { TestBed } from '@angular/core/testing';
import { ReviewService } from './review.service';
describe('ReviewService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ReviewService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=review.service.spec.js.map