import { MockMovieService } from './mock_services/MockMovieService';
import { AddEditMovieComponent } from "../components/add-edit-movie/add-edit-movie.component";
export class TestSetting {
    static configureTestingModuleForAddEditMovie() {
        return {
            declarations: [AddEditMovieComponent],
            imports: [MockMovieService],
            providers: []
        };
    }
}
//# sourceMappingURL=test-setting.js.map