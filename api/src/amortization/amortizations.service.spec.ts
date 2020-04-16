import {ContractsService} from "../contracts/contracts.service";
import {Test, TestingModule} from "@nestjs/testing";
import {getRepositoryToken} from "@nestjs/typeorm";
import {Contract} from "../database/entities/contract.entity";
import {Car} from "../database/entities/car.entity";
import {AmortizationsService} from "./amortizations.service";
import {Amortization} from "../database/entities/amortization.entity";
import {Repository} from "typeorm";

describe('AmortizationsService', () => {

    // let service: AmortizationsService;
    // let amortizationsRepository: any;
    //
    // beforeEach(async () => {
    //     amortizationsRepository = {
    //         find() {
    //             /* empty */
    //         },
    //         findOne() {
    //             /* empty */
    //         },
    //     };
    //
    //     const module: TestingModule = await Test.createTestingModule({
    //         providers: [
    //             AmortizationsService,
    //             {
    //                 provide: getRepositoryToken(Amortization),
    //                 useValue: amortizationsRepository,
    //             },
    //         ],
    //     }).compile();
    //
    //     service = module.get<AmortizationsService>(AmortizationsService);
    // });

    const getAmortizationService = () => {
        const amortizationsRepository = new Repository<Amortization>();

        jest.spyOn(amortizationsRepository, 'find')
            .mockImplementation(async () => Promise.resolve([]));

        const service = new AmortizationsService(amortizationsRepository);
        // jest.spyOn(service, 'getToday')
        //     .mockImplementation(() => today);

        return { service, amortizationsRepository };
    };

    it('should be defined', () => {
        const { service } = getAmortizationService();
        expect(service).toBeDefined();
    });

    describe('getAmortizations method should', () => {

        it('Call find method', async () => {
            // Arrange
            const { service, amortizationsRepository } = getAmortizationService();
            const foundAmortizations = [];
            const spy = jest
                .spyOn(amortizationsRepository, 'find')
                .mockReturnValue(Promise.resolve(foundAmortizations));
            // Act
            await service.getAmortizations();
            // Assert
            expect(spy).toBeCalledTimes(1);
        });
    });

    describe('createAmortization method should', () => {

        it('Throw error if filter with this name all ready exist', () => {
            // Arrange
            const { service } = getAmortizationService();
            const body = {
                name: 'Test',
                from: 0,
                to: 2
            };

            expect(service.createAmortization(body)).rejects.toThrow();
        });

        it('Throw error if range is incorrect', () => {
            // Arrange
            const { service } = getAmortizationService();
            const body = {
                name: 'Test',
                from: 0,
                to: 1
            };

            expect(service.createAmortization(body)).rejects.toThrow('Range must be at leas one year');
        });
    });
});