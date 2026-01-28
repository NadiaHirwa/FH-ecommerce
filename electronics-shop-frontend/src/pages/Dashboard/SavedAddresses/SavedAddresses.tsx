import React, { useState } from 'react';
import { AddressCard } from '../../../components/Dashboard/AddressCard';
import './SavedAddresses.css';

interface Address {
  id: string;
  type: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  isDefault: boolean;
}

const SavedAddresses: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      type: 'Home',
      name: 'John Doe',
      street: '123 Main St, Apt 4B',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      phone: '+1-555-0101',
      isDefault: true,
    },
    {
      id: '2',
      type: 'Office',
      name: 'John Doe',
      street: '456 Business Ave, Suite 200',
      city: 'New York',
      state: 'NY',
      zip: '10002',
      phone: '+1-555-0102',
      isDefault: false,
    },
  ]);

  const handleEdit = (address: Address) => {
    alert(`Edit address: ${address.type}`);
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(a => ({
      ...a,
      isDefault: a.id === id,
    })));
  };

  const handleAddAddress = () => {
    alert('Open add address form');
  };

  return (
    <div className="addresses-page">
      <div className="page-header">
        <h1>Saved Addresses</h1>
        <p>Manage your delivery and billing addresses</p>
      </div>

      <button className="btn btn-primary add-btn" onClick={handleAddAddress}>
        + Add New Address
      </button>

      <div className="addresses-grid">
        {addresses.length > 0 ? (
          addresses.map(address => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSetDefault={handleSetDefault}
            />
          ))
        ) : (
          <div className="empty-state">
            <p className="empty-icon">📭</p>
            <h3>No Addresses Yet</h3>
            <p>Add your first address to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedAddresses;
