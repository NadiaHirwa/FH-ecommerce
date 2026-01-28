import React from 'react';

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

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}

export const AddressCard: React.FC<AddressCardProps> = ({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}) => {
  return (
    <div className={`address-card ${address.isDefault ? 'default' : ''}`}>
      {address.isDefault && (
        <div className="default-badge">✓ Default</div>
      )}
      <div className="address-header">
        <h4>{address.type}</h4>
        <p className="address-name">{address.name}</p>
      </div>
      <div className="address-content">
        <p>{address.street}</p>
        <p>
          {address.city}, {address.state} {address.zip}
        </p>
        <p className="phone">📱 {address.phone}</p>
      </div>
      <div className="address-actions">
        <button
          className="btn-small btn-secondary"
          onClick={() => onEdit(address)}
        >
          Edit
        </button>
        <button
          className="btn-small btn-secondary"
          onClick={() => onDelete(address.id)}
        >
          Delete
        </button>
        {!address.isDefault && (
          <button
            className="btn-small btn-secondary"
            onClick={() => onSetDefault(address.id)}
          >
            Set Default
          </button>
        )}
      </div>
    </div>
  );
};
