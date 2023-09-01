import { createKey } from "next/dist/shared/lib/router/router.js";
import { send_data_to_tinybird, read_tinyb_config } from "./utils/tinybird.js";
import { faker } from '@faker-js/faker';

let account_id_list = [];

const generateSignaturePayload = (account_id, status, signatureType, signature_id, since, until, created_on) => {
    // Types of electron signatures
    // Simple - Sign with one click or enter a PIN sent via SMS.
    // Advance(biometrics) -  Done with a pen stroke, just like signing on paper.
    // Advance(digital certificate) - The signatory uses their digital certificate, issued by third parties.
    // Qualified - The signatory uses a digital certificate issued by Signaturit.

    return {
        signature_id,
        account_id,
        status,
        signatureType,
        since: since.toISOString().substring(0, 10),
        until: until.toISOString().substring(0, 10),
        created_on: created_on.toISOString().substring(0, 10),
        timestamp: Date.now(),
        uuid: faker.string.uuid(),
    }
}

const generateAccountPayload = () => {
    const status = ["active", "inactive", "pending"];
    const id = faker.number.int({ min: 10000, max: 99999 });
    account_id_list.push(id);

    return {
        account_id: id,
        organization: faker.company.name(),
        status: status[faker.number.int({ min: 0, max: 2 })],
        role: faker.person.jobTitle(),
        certified_SMS: faker.datatype.boolean(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        person: faker.person.fullName(),
        certified_email: faker.datatype.boolean(),
        photo_id_certified: faker.datatype.boolean(),
        created_on: (faker.date.between({ from: '2020-01-01', to: '2023-12-31' })).toISOString().substring(0, 10),
        timestamp: Date.now(),
    }
}

// Generates typcial dataflow  for a signature, it looks like this
// Someone creates the signature and requests for signs
// One person sings
// Other person signs
// The signature is finished (complete, expired, canceled, declined, error)

async function sendMessageAtRandomInterval(token, callback) {
    let randomInterval = faker.number.int({ min: 10, max: 50 });

    setTimeout(() => {
        const signatureTypeList = ["simple", "advance(biometrics)", "advance(digital certificate)", "qualified"];
        const signatureType = signatureTypeList[faker.number.int({ min: 0, max: 3 })];
        let signatureID = faker.string.uuid();

        let created_on = faker.date.past({ years: 3 })
        let since = faker.date.soon({ days: 3, refDate: created_on })
        let until = faker.date.soon({ days: 7, refDate: since })

        callback(token, signatureID, signatureType, since, until, created_on)
            .then(() => sendMessageAtRandomInterval(token, callback))
            .catch(err => console.error(err)); // Catch any errors from async operations
    }, randomInterval);
}

const generateTinybirdPayload = async (token, signatureID, signatureType, since, until, created_on) => {
    const statusList = ["in_queue", "ready", "signing", "completed", "expired", "canceled", "declined", "error"];

    const accountPayload = generateAccountPayload();
    await send_data_to_tinybird('accounts', token, accountPayload);
    console.log('Sending account data to Tinybird');

    const accountId1 = account_id_list[faker.number.int({ min: 0, max: account_id_list.length - 1 })];
    created_on = faker.date.soon({ days: 1, refDate: created_on })
    // status either in_queue or ready
    let subscriptionPayload = generateSignaturePayload(accountId1, statusList[faker.number.int({ min: 0, max: 1 })], signatureType, signatureID, since, until, created_on);
    await send_data_to_tinybird("signatures", token, subscriptionPayload);
    console.log('Sending signature data to Tinybird');

    const accountId2 = account_id_list[faker.number.int({ min: 0, max: account_id_list.length - 1 })];
    created_on = faker.date.soon({ days: 1, refDate: created_on })
    subscriptionPayload = generateSignaturePayload(accountId2, 'signing', signatureType, signatureID, since, until, created_on);
    await send_data_to_tinybird("signatures", token, subscriptionPayload);
    console.log('Sending signature data to Tinybird');

    // const accountId3 = account_id_list[faker.number.int({ min: 0, max: account_id_list.length - 1 })];
    // created_on = faker.date.soon({ days: 2, refDate: created_on })
    // subscriptionPayload = generateSignaturePayload(accountId3, 'signing', signatureType, signatureID, since, until, created_on);
    // await send_data_to_tinybird("signatures", token, subscriptionPayload);
    // console.log('Sending signature data to Tinybird');

    const finalStatus = faker.helpers.weightedArrayElement([
        { weight: 7.5, value: 'completed' },
        { weight: 1, value: 'expired' },
        { weight: 0.5, value: 'canceled' },
        { weight: 0.5, value: 'declined' },
        { weight: 0.5, value: 'error' },
    ]) // 7.5/10 chance of being completed, 1/10 chance of being expired, 0.5/10 chance of being canceled, declined or error
    created_on = faker.date.soon({ days: 7, refDate: created_on })
    subscriptionPayload = generateSignaturePayload(accountId1, finalStatus, signatureType, signatureID, since, until, created_on);
    await send_data_to_tinybird("signatures", token, subscriptionPayload);
    console.log('Sending signature data to Tinybird');
}

const main = async () => {
    try {
        console.log("Sending data to Tinybird");
        const token = await read_tinyb_config("./.tinyb");

        console.log("Initial seeding of account data to Tinybird")
        for (let i = 0; i < 10; i++) {
            const accountPayload = generateAccountPayload();
            await send_data_to_tinybird('accounts', token, accountPayload);
            console.log('Sending account data to Tinybird');
        }
        console.log("Initial seeding complete");
        await sendMessageAtRandomInterval(token, async (token, signatureID, signatureType, since, until, created_on) => {
            generateTinybirdPayload(token, signatureID, signatureType, since, until, created_on)
        });
        console.log("Data sent to Tinybird");
    } catch (error) {
        console.error(error);
    }
}

await main();