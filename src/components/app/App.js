import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from '../contactForm/ContactForm';
import Filter from '../filter/Filter';
import ContactList from '../contactList/ContactList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: '',
    };
  }

  onFilter = e => {
    this.setState(() => {
      return {
        filter: e.target.value,
      };
    });
  };

  onAddContact = (name, number) => {
    if (
      this.state.contacts.filter(contact => contact.name === name).length >= 1
    ) {
      alert(`${name} is already in contacts`);
      return;
    }

    if (
      this.state.contacts.filter(contact => contact.number === number).length >=
      1
    ) {
      alert(`${number} is already in contacts`);
      return;
    }

    const newUser = {
      name,
      number,
      id: nanoid(),
    };

    this.setState(() => {
      return {
        contacts: [newUser, ...this.state.contacts],
      };
    });
  };

  onDeleteContact = id => {
    this.setState(() => {
      return {
        contacts: this.state.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = !filter
      ? contacts
      : contacts.filter(
          contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase()) ||
            (contact.number + '').includes(filter)
        );

    return (
      <div>
        <h1 className="title">Phonebook</h1>
        <ContactForm onAddContact={this.onAddContact} />
        <h2 className="title">Contacts</h2>
        <Filter onFilter={this.onFilter} />
        <ContactList
          filteredContacts={filteredContacts}
          onDeleteContact={this.onDeleteContact}
        />
      </div>
    );
  }
}

export default App;
