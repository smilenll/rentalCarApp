import {ContractsService} from "./contracts.service";
import {Contract} from "../database/entities/contract.entity";
import {Test, TestingModule} from "@nestjs/testing";
import {getRepositoryToken} from "@nestjs/typeorm";

describe('ContractsService', () => {

    let service: ContractsService;
    let contractRepository: any;

    beforeEach(async () => {
        contractRepository = {
            find() {
                /* empty */
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ContractsService,
                {
                    provide: getRepositoryToken(Contract),
                    useValue: contractRepository,
                },
            ],
        }).compile();

        service = module.get<ContractsService>(ContractsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getOpen method should', () => {

        it('Call find method', async () => {
            // Arrange

            const foundContracts = [];
            const spy = jest
                .spyOn(contractRepository, 'find')
                .mockReturnValue(Promise.resolve(foundContracts));
            // Act
            await service.getOpen();
            // Assert
            expect(spy).toBeCalledTimes(1);
        });

        it('return correct value when find method have been called', async () => {
            // Arrange
            const spy = jest.spyOn(contractRepository, 'find').mockReturnValue('test');
            // Act
            const result = await service.getOpen();
            // Assert
            expect(result).toBe('test');
        });
    });
});