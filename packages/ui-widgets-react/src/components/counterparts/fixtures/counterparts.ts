import { CounterpartType, AllowedCountriesCodes } from '@team-monite/sdk-api';

const data = {
  firstPage: {
    data: [
      {
        id: '44ac3882-1d32-415e-a3bb-fa375c576855',
        created_at: '2022-05-20T14:37:04.383441+00:00',
        updated_at: '2022-05-20T14:37:04.383455+00:00',
        type: CounterpartType.ORGANIZATION,
        organization: {
          legal_name: 'SMART Agency',
          vat_number: 'vat_number1',
          is_vendor: true,
          is_customer: true,
          phone: '+31 6 12 34 56 78',
          email: 'zachary.walters@hotmail.com',
          registered_address: {
            country: AllowedCountriesCodes.AF,
            city: 'Berlin',
            postal_code: 'code123',
            state: 'state',
            line1: 'line1',
            line2: 'line2',
          },
          contacts: [
            {
              first_name: 'John Doe',
              last_name: 'last_name',
              email: 'user@example.com',
              phone: '123',
              is_default: true,
              address: {
                country: AllowedCountriesCodes.AF,
                city: 'city',
                postal_code: 'code123',
                state: 'state',
                line1: 'line1',
                line2: 'line2',
              },
              title: 'string',
            },
          ],
        },
      },
      {
        id: 'dbe1aa12-6960-4e44-a5b0-f2a931a077c7',
        created_at: '2022-05-22T20:09:17.890428+00:00',
        updated_at: '2022-05-22T20:09:17.890440+00:00',
        type: CounterpartType.INDIVIDUAL,
        individual: {
          first_name: 'Nikolay Murzin',
          last_name: 'last_name1',
          // title: null,
          is_vendor: true,
          is_customer: true,
          phone: '+31 6 12 34 56 78',
          email: 'john@mixmax.com',
          // tax_id: null,
          residential_address: {
            country: AllowedCountriesCodes.NE,
            city: 'Amsterdam',
            postal_code: 'code123',
            state: 'state',
            line1: 'line1',
            line2: 'line2',
          },
        },
      },
      {
        id: '16b06441-d45c-4597-9016-912f9f087e50',
        created_at: '2022-05-20T14:43:06.671732+00:00',
        updated_at: '2022-05-20T14:43:06.671745+00:00',
        type: CounterpartType.ORGANIZATION,
        organization: {
          legal_name: 'SMART Agency 1',
          vat_number: 'vat_number1',
          is_vendor: true,
          is_customer: false,
          phone: '+31 6 12 34 56 78',
          email: 'zachary.walters@hotmail.com',
          registered_address: {
            country: AllowedCountriesCodes.AF,
            city: 'Berlin',
            postal_code: 'code123',
            state: 'state',
            line1: 'line1',
            line2: 'line2',
          },
          contacts: [
            {
              first_name: 'Nina Bridgit',
              last_name: 'last_name',
              email: 'user@example.com',
              phone: '123',
              is_default: true,
              address: {
                country: AllowedCountriesCodes.AF,
                city: 'city',
                postal_code: 'code123',
                state: 'state',
                line1: 'line1',
                line2: 'line2',
              },
              title: 'string',
            },
          ],
        },
      },
      {
        id: 'e939f1da-5973-43a5-a738-2a190b69d4fa',
        created_at: '2022-05-20T14:46:41.620729+00:00',
        updated_at: '2022-05-20T14:46:41.620742+00:00',
        type: CounterpartType.ORGANIZATION,
        organization: {
          legal_name: 'legal_name2',
          vat_number: 'vat_number1',
          is_vendor: false,
          is_customer: true,
          phone: '123',
          email: 'email@legal_name1.com',
          registered_address: {
            country: AllowedCountriesCodes.AF,
            city: 'city',
            postal_code: 'code123',
            state: 'state',
            line1: 'line1',
            line2: 'line2',
          },
          contacts: [
            {
              first_name: 'first_name',
              last_name: 'last_name',
              email: 'user@example.com',
              phone: '123',
              is_default: true,
              address: {
                country: AllowedCountriesCodes.AF,
                city: 'city',
                postal_code: 'code123',
                state: 'state',
                line1: 'line1',
                line2: 'line2',
              },
              title: 'string',
            },
          ],
        },
      },
    ],
    prev_pagination_token: null,
    next_pagination_token: 'next_page',
  },
  secondPage: {
    data: [
      {
        id: '44ac3882-1d32-415e-a3bb-fa375c576855',
        created_at: '2022-05-20T14:37:04.383441+00:00',
        updated_at: '2022-05-20T14:37:04.383455+00:00',
        type: CounterpartType.ORGANIZATION,
        organization: {
          legal_name: 'SMART Agency',
          vat_number: 'vat_number1',
          is_vendor: true,
          is_customer: true,
          phone: '+31 6 12 34 56 78',
          email: 'zachary.walters@hotmail.com',
          registered_address: {
            country: AllowedCountriesCodes.AF,
            city: 'Berlin',
            postal_code: 'code123',
            state: 'state',
            line1: 'line1',
            line2: 'line2',
          },
          contacts: [
            {
              first_name: 'John Doe',
              last_name: 'last_name',
              email: 'user@example.com',
              phone: '123',
              is_default: true,
              address: {
                country: AllowedCountriesCodes.AF,
                city: 'city',
                postal_code: 'code123',
                state: 'state',
                line1: 'line1',
                line2: 'line2',
              },
              title: 'string',
            },
          ],
        },
      },
      {
        id: 'dbe1aa12-6960-4e44-a5b0-f2a931a077c7',
        created_at: '2022-05-22T20:09:17.890428+00:00',
        updated_at: '2022-05-22T20:09:17.890440+00:00',
        type: CounterpartType.INDIVIDUAL,
        individual: {
          first_name: 'Nikolay Murzin',
          last_name: 'last_name1',
          // title: null,
          is_vendor: true,
          is_customer: true,
          phone: '+31 6 12 34 56 78',
          email: 'john@mixmax.com',
          // tax_id: null,
          residential_address: {
            country: AllowedCountriesCodes.NE,
            city: 'Amsterdam',
            postal_code: 'code123',
            state: 'state',
            line1: 'line1',
            line2: 'line2',
          },
        },
      },
      {
        id: '16b06441-d45c-4597-9016-912f9f087e50',
        created_at: '2022-05-20T14:43:06.671732+00:00',
        updated_at: '2022-05-20T14:43:06.671745+00:00',
        type: CounterpartType.ORGANIZATION,
        organization: {
          legal_name: 'SMART Agency 1',
          vat_number: 'vat_number1',
          is_vendor: true,
          is_customer: false,
          phone: '+31 6 12 34 56 78',
          email: 'zachary.walters@hotmail.com',
          registered_address: {
            country: AllowedCountriesCodes.AF,
            city: 'Berlin',
            postal_code: 'code123',
            state: 'state',
            line1: 'line1',
            line2: 'line2',
          },
          contacts: [
            {
              first_name: 'Nina Bridgit',
              last_name: 'last_name',
              email: 'user@example.com',
              phone: '123',
              is_default: true,
              address: {
                country: AllowedCountriesCodes.AF,
                city: 'city',
                postal_code: 'code123',
                state: 'state',
                line1: 'line1',
                line2: 'line2',
              },
              title: 'string',
            },
          ],
        },
      },
      {
        id: 'e939f1da-5973-43a5-a738-2a190b69d4fa',
        created_at: '2022-05-20T14:46:41.620729+00:00',
        updated_at: '2022-05-20T14:46:41.620742+00:00',
        type: CounterpartType.ORGANIZATION,
        organization: {
          legal_name: 'legal_name2',
          vat_number: 'vat_number1',
          is_vendor: false,
          is_customer: true,
          phone: '123',
          email: 'email@legal_name1.com',
          registered_address: {
            country: AllowedCountriesCodes.AF,
            city: 'city',
            postal_code: 'code123',
            state: 'state',
            line1: 'line1',
            line2: 'line2',
          },
          contacts: [
            {
              first_name: 'first_name',
              last_name: 'last_name',
              email: 'user@example.com',
              phone: '123',
              is_default: true,
              address: {
                country: AllowedCountriesCodes.AF,
                city: 'city',
                postal_code: 'code123',
                state: 'state',
                line1: 'line1',
                line2: 'line2',
              },
              title: 'string',
            },
          ],
        },
      },
    ],
    prev_pagination_token: 'prev_page',
    next_pagination_token: null,
  },
};

export default data;
