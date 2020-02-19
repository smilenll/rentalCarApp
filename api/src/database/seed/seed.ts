import {createConnection} from 'typeorm';
import {CarClass} from "../entities/car-class.entity";
import {Car} from "../entities/car.entity";
import {Contract} from "../entities/contract.entity";

const main = async () => {

    const connection = await createConnection();
    const classRepo = connection.getRepository(CarClass);
    const carRepo = connection.getRepository(Car);
    const contractRepo = connection.getRepository(Contract);

    const carClassA = classRepo.create();
    carClassA.name = 'A';
    carClassA.price = 20;
    carClassA.isDeleted = false;
    const classASaved = await classRepo.save(carClassA);

    const carClassB = classRepo.create();
    carClassB.name = 'B';
    carClassB.price = 30;
    carClassB.isDeleted = false;
    const classBSaved =await classRepo.save(carClassB);

    const carClassC = classRepo.create();
    carClassC.name = 'C';
    carClassC.price = 40;
    carClassC.isDeleted = false;
    await classRepo.save(carClassB);

    const carA = carRepo.create();
    carA.model = 'VW polo';
    carA.img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT02WvrL6ErmOuV8XfhAyOdRP_PzRC3RzFyYaLRoIvULYitBol4';
    carA.isFree = false;
    carA.carClass = classASaved;
    carA.isDeleted = false;
    const carAsaved = await carRepo.save(carA);

    const contract = contractRepo.create();
    contract.firstName = 'Smilen',
    contract.lastName = 'Lyubenov',
    contract.car = carAsaved,
    contract.age = 20,
    contract.days = 2,
    contract.pickUpDateTime = '2020-02-19 15:19:06';
    await contractRepo.save(contract);

    await connection.close();

    // tslint:disable-next-line:no-console
    console.log(`Data seeded successfully`);

};

main()
    // tslint:disable-next-line:no-console
    .catch(console.log);
