interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
  placeholder: string;
}

export const defaultFields: FormField[] = [
  {
    name: "full_name",
    label: "Full Name",
    type: "text",
    required: true,
    placeholder: "Enter full name",
  },
  {
    name: "contact_number",
    label: "Contact Number",
    type: "tel",
    required: true,
    placeholder: "Enter contact number",
  },
  {
    name: "organization",
    label: "Organization",
    type: "text",
    required: false,
    placeholder: "Enter organization",
  },
  {
    name: "address_1",
    label: "Address Line 1",
    type: "text",
    required: true,
    placeholder: "Enter address",
  },
  {
    name: "address_2",
    label: "Address Line 2",
    type: "text",
    required: false,
    placeholder: "Enter address line 2",
  },
  {
    name: "country",
    label: "Country",
    type: "text",
    required: true,
    placeholder: "Enter country",
  },
  {
    name: "town_city",
    label: "Town/City",
    type: "text",
    required: true,
    placeholder: "Enter town/city",
  },
  {
    name: "postcode",
    label: "Postcode",
    type: "text",
    required: true,
    placeholder: "Enter postal code",
  },
];
