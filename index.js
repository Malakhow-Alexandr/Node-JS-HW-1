const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.log(allContacts);

    case "get":
      const oneContact = await contacts.getContactById(id);
      return console.log(oneContact);

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);

    case "update":
      const updateContact = await contacts.updateContactById(id, {
        name,
        email,
        phone,
      });
      return console.log(updateContact);

    case "remove":
      const removeResult = await contacts.removeContact(id);
      return console.log(removeResult);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "drsAJ4SHPYqZeG-83QTVW" });
// invokeAction({
//   action: "add",
//   name: "John Krawitz",
//   email: "JohnK@gmail.com",
//   phone: "(542) 451-7038",
// });
// invokeAction({
//   action: "update",
//   id: "AeHIrLTr6JkxGE6SN-0Rw",
//   name: "Eleonor Kuktible",
//   email: "Kuktible@gmail.com",
//   phone: "(992) 914-3792",
// });
// invokeAction({ action: "remove", id: "D7wIVs9_ejTyV9xb7yAsy" });

invokeAction(argv);
