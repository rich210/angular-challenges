import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingComponent } from './loading.component';
import { of } from 'rxjs';
import { LoadingService } from '../../services/loading.service';
import { By } from '@angular/platform-browser';

// Mock the LoadingService
class MockLoadingService {
  // Define any properties or methods you need to mock
  loading$ = of(true); // Mock observable for loading state
}
describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let loadingService: MockLoadingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingComponent],
      providers: [
        { provide: LoadingService, useClass: MockLoadingService }, // Provide the mock service
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    loadingService = TestBed.inject(
      LoadingService
    ) as unknown as MockLoadingService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use LoadingService', () => {
    // Test if the LoadingService is used correctly
    expect(component.loadingService).toBeTruthy();
  });

  it('should display a loading spinner when loading$', () => {
    // Assuming you have a loading spinner or similar in the template
    const spinner = fixture.debugElement.query(By.css('.loading-spinner'));
    expect(spinner).toBeTruthy();
  });

  // LoadingService is injected successfully
  // it('should inject LoadingService successfully', function() {
  //     const loadingService = jasmine.createSpyObj('LoadingService', ['start', 'stop']);
  //     expect(component.loadingService).toBe(loadingService);
  // });
});
