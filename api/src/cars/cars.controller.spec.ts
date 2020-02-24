import {Test, TestingModule} from "@nestjs/testing";
import {CarsController} from "./cars.controller";
import {CarsService} from "./cars.service";

describe('Cars Controller', () => {
    let controller: CarsController;
    const carsService = {
        getCars() {
            /* empty */
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CarsController],
            providers: [
                {
                    provide: CarsService,
                    useValue: carsService,
                },
            ],
        }).compile();

        controller = module.get<CarsController>(CarsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getCars method should', () => {
        it('calls carsService.getCars', async () => {
            // Arrange
            const spy = jest.spyOn(carsService, 'getCars');
            // Act
            await controller.getCars();
            // Expect

            expect(carsService.getCars).toHaveBeenCalledTimes(1);
            spy.mockClear();
        });
        it('returns the result from carsService.getCars method', async () => {
            // Arrange
            const spy = jest
                .spyOn(carsService, 'getCars')
                .mockImplementation(async () => 'test');
            // Act
            const response = await controller.getCars();
            // Assert
            expect(response).toBe('test');
            spy.mockClear();
        });
    });

});