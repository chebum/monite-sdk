import React from 'react';
import { useTranslation } from 'react-i18next';

import mccCodes from '../dicts/mccCodes';
import countries from '../dicts/countries';
import currencies from '../dicts/currencies';

import OnboardingForm from '../OnboardingLayout/OnboardingForm';
import OnboardingStepContent from '../OnboardingLayout/OnboardingStepContent';

import useOnboardingForm, {
  OnboardingFormProps,
} from '../hooks/useOnboardingForm';

import { getLocalRequirements, LocalRequirements } from '../useOnboardingStep';

import OnboardingFormActions from '../OnboardingLayout/OnboardingFormActions';
import OnboardingSubTitle from '../OnboardingLayout/OnboardingSubTitle';
import OnboardingBusinessRepresentativeView from './OnboardingBusinessRepresentativeView';
import OnboardingBankAccountView from './OnboardingBankAccountView';
import OnboardingBusinessProfileView from './OnboardingBusinessProfileView';

const OnboardingReview = (props: OnboardingFormProps) => {
  const { t } = useTranslation();
  const { onSubmit, onSave, isLoading, onboarding } = useOnboardingForm(props);

  if (!onboarding) return null;

  const list = Object.keys(
    getLocalRequirements(onboarding.business_type)
  ).filter((key) => key !== LocalRequirements.review);

  const translateTitle = (key: string): string =>
    t(`onboarding:${key}Step.title`);

  const {
    data: { individual, bank_account, business_profile },
  } = onboarding;

  return (
    <OnboardingForm
      actions={
        <OnboardingFormActions
          isLoading={isLoading}
          onSave={onSave}
          onSubmit={onSubmit}
        />
      }
    >
      {list.map((key) => (
        <OnboardingStepContent key={key}>
          <OnboardingSubTitle>{translateTitle(key)}</OnboardingSubTitle>
          {key === LocalRequirements.businessRepresentative && (
            <OnboardingBusinessRepresentativeView {...individual} />
          )}
          {key === LocalRequirements.bankAccount && (
            <OnboardingBankAccountView
              {...bank_account}
              country={
                countries.find((c) => c.code === bank_account?.country)?.label
              }
              currency={
                currencies.find((c) => c.code === bank_account?.currency)?.label
              }
            />
          )}
          {key === LocalRequirements.businessProfile && (
            <OnboardingBusinessProfileView
              {...business_profile}
              mcc={
                mccCodes.find((c) => `${c.code}` === business_profile?.mcc)
                  ?.label
              }
            />
          )}
        </OnboardingStepContent>
      ))}
    </OnboardingForm>
  );
};

export default OnboardingReview;
