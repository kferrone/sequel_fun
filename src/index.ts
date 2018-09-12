#!/usr/bin/env node

import SequelService from './sequel.service';

async function loadApp() {
    try {
        const db: SequelService = new SequelService();
        await db.init();
        saveContact(db);
    } catch (error) {
        console.log(error);
    }
}

function saveContact(db: SequelService): void {
    const contactModel: mdl.Model<mdl.Contact> = db.get<mdl.Contact>( 'Contact' );

    const contact: mdl.Contact = contactModel.build({
        firstName: 'Bob',
        lastName: 'Knob',
        message: 'What is up world!'
    });
    contact.save();
}

loadApp();