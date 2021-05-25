import "./app/database/index";
import Customer from "./app/model/Customer";

class Playground {
    static async play() {
        // select * form customer where something
        // const customers = await Customer.findAll({
        //     attributes: { exclude: ["id"] },
        // });
        // console.log(JSON.stringify(customers, null, 2));

        // const customer = await Customer.scope("active").findAll();
        // console.log(JSON.stringify(customer, null, 2));

        const customers = await Customer.scope({
            method: ["created", new Date(2020, 1, 1)],
        });
        console.log(JSON.stringify(customers, null, 2));
    }
}

Playground.play();
