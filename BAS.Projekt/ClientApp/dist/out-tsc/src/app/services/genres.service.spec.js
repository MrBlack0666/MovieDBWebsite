import { TestBed } from '@angular/core/testing';
import { GenresService } from './genres.service';
describe('GenresService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GenresService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=genres.service.spec.js.map