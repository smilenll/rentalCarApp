
import {Test, TestingModule} from "@nestjs/testing";
import {getRepositoryToken} from "@nestjs/typeorm";
import {CarsService} from "./cars.service";
import {Car} from "../database/entities/car.entity";

describe('CarsService', () => {

    let service: CarsService;
    let carRepository: any;

    beforeEach(async () => {
        carRepository = {
            find() {
                /* empty */
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CarsService,
                {
                    provide: getRepositoryToken(Car),
                    useValue: carRepository,
                },
            ],
        }).compile();

        service = module.get<CarsService>(CarsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getCars method should', () => {

        it('Call find method', async () => {
            // Arrange
            const foundCars = [];
            const spy = jest
                .spyOn(carRepository, 'find')
                .mockReturnValue(Promise.resolve(foundCars));
            // Act
            await service.getCars();
            // Assert
            expect(spy).toBeCalledTimes(1);
        });

        it('return correct value when find method have been called', async () => {
            // Arrange
            const spy = jest.spyOn(carRepository, 'find').mockReturnValue('test');
            // Act
            const result = await service.getCars();
            // Assert
            expect(result).toBe('test');
        });
    });
});