export const customerDetailsConfig = [
    { id: 'name', label: 'Name', type: 'text', required: true },
    { id: 'email', label: 'Email', type: 'email', required: true },
    { id: 'phone', label: 'Phone', type: 'text', required: true },
    { id: 'address', label: 'Address', type: 'text', required: true },
    { id: 'city', label: 'City', type: 'text', required: true },
    { id: 'state', label: 'State', type: 'text', required: true },
    { id: 'zip', label: 'Zip', type: 'text', required: true },
    { id: 'country', label: 'Country', type: 'text', required: true },
];

export const paymentMethodConfig = [
    { id: 'cardHolder', label: 'Card Holder', type: 'text', required: true },
    { id: 'cardNumber', label: 'Card Number', type: 'text', required: true },
    { id: 'validityDate', label: 'Validity Date', type: 'date', required: true },
    { id: 'cvv', label: 'CVV', type: 'text', required: true },
];