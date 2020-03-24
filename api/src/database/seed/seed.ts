import {createConnection} from 'typeorm';
import {CarClass} from "../entities/car-class.entity";
import {Car} from "../entities/car.entity";
import {Contract} from "../entities/contract.entity";

const main = async () => {

    const connection = await createConnection();
    const classRepo = connection.getRepository(CarClass);
    const carRepo = connection.getRepository(Car);
    const contractRepo = connection.getRepository(Contract);
    const rentDate = new Date(new Date()
        .setMonth(new Date()
            .getMonth() + 1));

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
    const classCSaved =  await classRepo.save(carClassB);

    const carA = carRepo.create();
    carA.model = 'VW polo';
    carA.img = 'https://img.drivemag.net/media' +
        '' +
        '/default/0001/57/2018-VW-Polo-GTI-at-Frankfurt-Motor-Show-0-2633-default-large.jpeg';
    carA.isFree = false;
    carA.carClass = classASaved;
    carA.isDeleted = false;
    const carAsaved = await carRepo.save(carA);

    const carB = carRepo.create();
    carB.model = 'VW golf';
    carB.img = 'https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/99-vw-golf-mk8-front.jpg?itok=dVq1_mix';
    carB.isFree = true;
    carB.carClass = classBSaved;
    carB.isDeleted = false;
    const carBsaved = await carRepo.save(carB);

    const carC = carRepo.create();
    carC.model = 'VW passat';
    carC.img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/VW_Passat_B8_Limousine_2.0_TDI_Highline.JPG/1200px-VW_Passat_B8_Limousine_2.0_TDI_Highline.JPG\n';
    carC.isFree = false;
    carC.carClass = classCSaved;
    carC.isDeleted = false;
    const carCsaved = await carRepo.save(carC);

    const contract = contractRepo.create();
    contract.firstName = 'Ivan';
    contract.lastName = 'Ivanov';
    contract.car = carAsaved;
    contract.age = 20;
    contract.initialDateTime = new Date();
    contract.expectedReturnDateTime = rentDate;
    await contractRepo.save(contract);

    const contract2 = contractRepo.create();
    contract2.firstName = 'Smilen';
    contract2.lastName = 'Lyubenov';
    contract2.car = carCsaved;
    contract2.age = 30;
    contract2.initialDateTime = new Date();
    contract2.expectedReturnDateTime = rentDate;
    await contractRepo.save(contract2);

    await connection.close();

    // tslint:disable-next-line:no-console
    console.log(`Data seeded successfully`);

};


main()
    // tslint:disable-next-line:no-console
    .catch(console.log);
