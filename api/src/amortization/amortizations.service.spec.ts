import {AmortizationsService} from "./amortizations.service";
import {Amortization} from "../database/entities/amortization.entity";
import {Repository} from "typeorm";

describe('AmortizationsService', () => {

    const getAmortiozation = {
        id:1,
        name: 'Test',
        from: 0,
        to: 2,
        isDeleted: false
    };

    const getAmortizationService = () => {
        const amortizationsRepository = new Repository<Amortization>();

        jest.spyOn(amortizationsRepository, 'find')
            .mockImplementation(async () => Promise.resolve([]));

        jest.spyOn(amortizationsRepository, 'findOne')
            .mockImplementation(async () => Promise.resolve(getAmortiozation));

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

    describe('deleteAmortization method should', () => {

        it('Throw error if filter with this name all ready exist', () => {
            // Arrange
            const { service } = getAmortizationService();
            const id = 1;

            expect(service.deleteAmortization(id)).rejects.toThrow('Amortization not found');
        });
    });
});