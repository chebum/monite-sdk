import { components } from '@/api';
import { CounterpartResponse } from '@/core/queries';

export const isIndividualCounterpart = (
  counterpart: CounterpartResponse
): counterpart is components['schemas']['CounterpartIndividualRootResponse'] =>
  counterpart.type === 'individual';

export const isOrganizationCounterpart = (
  counterpart: CounterpartResponse
): counterpart is components['schemas']['CounterpartOrganizationRootResponse'] =>
  counterpart.type === 'organization';

export function getIndividualName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

export function getCounterpartName(counterpart?: CounterpartResponse): string {
  if (!counterpart) {
    return '';
  }

  if (isIndividualCounterpart(counterpart)) {
    const {
      individual: { first_name, last_name },
    } = counterpart;

    return getIndividualName(first_name, last_name);
  }

  if (isOrganizationCounterpart(counterpart)) {
    const {
      organization: { legal_name },
    } = counterpart;

    return legal_name;
  }

  return '';
}
