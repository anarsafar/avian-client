import { ContactInterface } from './contact.interface';

function groupContactsByFirstLetter(contacts: ContactInterface[]) {
  return contacts.reduce(
    (acc, contact) => {
      const firstLetter = contact.user.userInfo.name.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(contact);
      return acc;
    },
    {} as Record<string, ContactInterface[]>
  );
}

export default groupContactsByFirstLetter;
