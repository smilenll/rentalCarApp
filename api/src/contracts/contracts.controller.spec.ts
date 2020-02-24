import {ContractsController} from "./contracts.controller";
import {Test, TestingModule} from "@nestjs/testing";
import {ContractsService} from "./contracts.service";

describe('Contracts Controller', () => {
    let controller: ContractsController;
    const contractService = {
        getOpen() {
            /* empty */
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ContractsController],
            providers: [
                {
                    provide: ContractsService,
                    useValue: contractService,
                },
            ],
        }).compile();

        controller = module.get<ContractsController>(ContractsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getOpenContracts method should', () => {
        it('calls contractsService.getOpen', async () => {
            // Arrange
            const spy = jest.spyOn(contractService, 'getOpen');
            // Act
            await controller.getOpenContracts();
            // Expect

            expect(contractService.getOpen).toHaveBeenCalledTimes(1);
            spy.mockClear();
        });
        it('returns the result from contractsService.getOpen method', async () => {
            // Arrange
            const spy = jest
                .spyOn(contractService, 'getOpen')
                .mockImplementation(async () => 'test');
            // Act
            const response = await controller.getOpenContracts();
            // Assert
            expect(response).toBe('test');
            spy.mockClear();
        });
    });

});