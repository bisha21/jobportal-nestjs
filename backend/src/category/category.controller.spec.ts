/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from 'src/common/guards/auth/auth.guard';
import { RoleGuard } from 'src/common/guards/role/role.guard';
import { CreateCategoryDto } from './dto/createCategory.dto';

class MockJwtAuthGuard {
  canActivate() {
    return true; // always allow
  }
}

class MockRoleGuard {
  canActivate() {
    return true; // always allow
  }
}


const mockCategoryService = {
  getCategories: jest.fn(() => Promise.resolve([])),
  getCategoryById: jest.fn((id: number) =>
    Promise.resolve({ id, categoryName: 'Mock Category' }),
  ),
  createCategory: jest.fn((dto: CreateCategoryDto, userId: number) =>
    Promise.resolve({ id: 1, ...dto, userId }),
  ),
  updateCategory: jest.fn((id: number, dto: CreateCategoryDto) =>
    Promise.resolve({ id, ...dto }),
  ),
  deleteCategory: jest.fn((id: number) =>
    Promise.resolve({ success: true, id }),
  ),
};

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: mockCategoryService, // use our mock instead of real service
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useClass(MockJwtAuthGuard)
      .overrideGuard(RoleGuard)
      .useClass(MockRoleGuard)
      .compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);

    jest.clearAllMocks(); // clear previous mock calls before each test
  });

 
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('getCategories', () => {
    it('should return all categories', async () => {
      const mockCategories = [
        { id: 1, categoryName: 'Tech' },
        { id: 2, categoryName: 'Design' },
      ];

      mockCategoryService.getCategories.mockResolvedValue(mockCategories);

      const result = await controller.getCategories();

      expect(service.getCategories).toHaveBeenCalled(); // check method call
      expect(result).toEqual(mockCategories); // check response
    });
  });

  
  describe('getCategoryById', () => {
    it('should return a category by ID', async () => {
      const mockCategory = { id: 1, categoryName: 'Tech' };
      mockCategoryService.getCategoryById.mockResolvedValue(mockCategory);

      const result = await controller.getCategoryById(1);

      expect(service.getCategoryById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockCategory);
    });
  });

  
  describe('createCategory', () => {
    it('should create a new category', async () => {
      const dto: CreateCategoryDto = { categoryName: 'Science' };
      const req = { user: { id: 10 } }; // mock request
      const mockResponse = { id: 3, categoryName: 'Science', userId: 10 };

      mockCategoryService.createCategory.mockResolvedValue(mockResponse);

      const result = await controller.createCategory(dto, req as any);

      expect(service.createCategory).toHaveBeenCalledWith(dto, 10);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateCategory', () => {
    it('should update a category by ID', async () => {
      const dto: CreateCategoryDto = { categoryName: 'Updated Tech' };
      const mockResponse = { id: 1, categoryName: 'Updated Tech' };

      mockCategoryService.updateCategory.mockResolvedValue(mockResponse);

      const result = await controller.updateCategory(1, dto);

      expect(service.updateCategory).toHaveBeenCalledWith(1, dto);
      expect(result).toEqual(mockResponse);
    });
  });

  /**
   * 🧪 TEST 6: Delete a category
   */
  describe('deleteCategory', () => {
    it('should delete a category by ID', async () => {
      const mockResponse = { success: true };
      mockCategoryService.deleteCategory.mockResolvedValue(mockResponse);

      const result = await controller.deleteCategory(1);

      expect(service.deleteCategory).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockResponse);
    });
  });
});
