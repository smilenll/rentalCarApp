import {ContractsService} from "./contracts.service";
import {Contract} from "../database/entities/contract.entity";
import {Test, TestingModule} from "@nestjs/testing";
import {getRepositoryToken} from "@nestjs/typeorm";
import {Car} from "../database/entities/car.entity";

describe('ContractsService', () => {

    const now = new Date();
    const afterOneYearUnix = now.setFullYear(now.getFullYear() + 1);
    const afterOneYear = new Date (afterOneYearUnix).toISOString();

    let service: ContractsService;
    let contractRepository: any;
    let carRepository: any;

    beforeEach(async () => {
        contractRepository = {
            find() {
                /* empty */
            },
            findOne() {
                /* empty */
            },
            create() {
                return {
                    car: ''
                }
            },
        };
        carRepository = {
            findOne() {
                return {
                    car: ''
                }
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ContractsService,
                {
                    provide: getRepositoryToken(Contract),
                    useValue: contractRepository,
                },
                {
                    provide: getRepositoryToken(Car),
                    useValue: carRepository
                },
            ],
        }).compile();

        service = module.get<ContractsService>(ContractsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getOpenContracts method should', () => {

        it('Call find method', async () => {
            // Arrange

            const foundContracts = [];
            const spy = jest
                .spyOn(contractRepository, 'find')
                .mockReturnValue(Promise.resolve(foundContracts));
            // Act
            await service.getOpenContracts();
            // Assert
            expect(spy).toBeCalledTimes(1);
        });

        it('return correct value when find method have been called', async () => {
            // Arrange
            const spy = jest.spyOn(contractRepository, 'find').mockReturnValue('test');
            // Act
            const result = await service.getOpenContracts();
            // Assert
            expect(result).toBe('test');
        });
    });

    describe('createContract method should', () => {

        it('Find first Car',() => {
            // Arrange
            const spy = jest.spyOn(carRepository, 'findOne');
            const findCar = {"id": 1, "isDeleted": false, "isFree": true};
            const body = {
                car: 1,
                initialDateTime: now,
                expectedReturnDateTime: afterOneYear
            };

            // Act
            service.createContract(body);
            // Assert
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(findCar);
        });

        it('Throw error if car do not exist', () => {
            // Arrange
            const spy = jest.spyOn(carRepository, 'findOne');
            const findCar = {"id": 1, "isDeleted": false, "isFree": true};
            const body = {
                car: 1,
                initialDateTime: now,
                expectedReturnDateTime: afterOneYear
            };

            expect(service.createContract(body)).rejects.toThrow();
        });
    });

    describe('returnCar method should', () => {

        it('Find contract',() => {
            // Arrange
            const spy = jest.spyOn(contractRepository, 'findOne');
            const contract = {id:1};
            const findContract = {"id": contract.id, "isDeleted": false, "returnDateTime": null};
            const body = { returnDateTime: now };

            // Act
            service.returnCar(contract, body);
            // Assert
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(findContract);
        });

        it('Throw error if car do not exist', () => {
            // Arrange
            const spy = jest.spyOn(contractRepository, 'findOne');
            const contract = 1;
            const findContract = {"id": contract, "isDeleted": false, "returnDateTime": null};
            const body = { returnDateTime: now };


            expect(service.createContract(body)).rejects.toThrow();
        });
    });
});