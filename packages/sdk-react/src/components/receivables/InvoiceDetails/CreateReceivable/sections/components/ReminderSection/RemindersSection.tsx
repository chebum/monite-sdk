import { useState } from 'react';
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from 'react-hook-form';

import { CreateReceivablesFormProps } from '@/components/receivables/InvoiceDetails/CreateReceivable/validation';
import { useMoniteContext } from '@/core/context/MoniteContext';
import { useRootElements } from '@/core/context/RootElementsProvider';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Grid,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';

import type { SectionGeneralProps } from '../../Section.types';
import { ReminderDetail } from './ReminderDetail';
import { SelectFieldWithEdit } from './SelectFieldWithEdit';
import { useReminderPermissions } from './useReminderPermissions';
import { useValidateCounterpart } from './useValidateCounterpart';

export const ReminderSection = ({ disabled }: SectionGeneralProps) => {
  const { i18n } = useLingui();
  const { control } = useFormContext<CreateReceivablesFormProps>();
  const { root } = useRootElements();
  const { api } = useMoniteContext();

  const {
    isReadPaymentReminderAllowedLoading,
    isReadOverdueReminderAllowedLoading,
  } = useReminderPermissions();

  const { isEmailValid, areRemindersEnabled } = useValidateCounterpart();

  const { data: paymentReminders, isLoading: isPaymentRemindersLoading } =
    api.paymentReminders.getPaymentReminders.useQuery({});
  const { data: overdueReminders, isLoading: isOverdueRemindersLoading } =
    api.overdueReminders.getOverdueReminders.useQuery({});

  const [selectedPaymentReminderDetails, setSelectedReminderDetails] = useState<
    ReminderDetail[]
  >([]);

  const [selectedOverdueReminderDetails, setSelectedOverdueReminderDetails] =
    useState<ReminderDetail[]>([]);

  const handleSelectChangeAsync = async (
    field: ControllerRenderProps<FieldValues, string>,
    type: 'payment' | 'overdue',
    value: string | number
  ) => {
    field.onChange(value);

    if (value === 'create') {
      // eslint-disable-next-line lingui/no-unlocalized-strings
      alert('You have selected Create a reminder preset');
      field.onChange('');
      return;
    }

    try {
      if (type === 'payment') {
        // ToDO: move this to top of the function unfortunately we can't call hooks inside of hooks
        const { data: paymentIDReminder } =
          api.paymentReminders.getPaymentRemindersId.useQuery({
            path: {
              payment_reminder_id: value.toString(),
            },
          });
        if (paymentIDReminder) {
          setSelectedReminderDetails(
            paymentIDReminder as unknown as ReminderDetail[]
          );
        }
      } else if (type === 'overdue') {
        // ToDO: move this to top of the function unfortunately we can't call hooks inside of hooks
        const { data: overdueIDReminder } =
          api.overdueReminders.getOverdueRemindersId.useQuery({
            path: {
              overdue_reminder_id: value.toString(),
            },
          });
        if (overdueIDReminder) {
          setSelectedReminderDetails(
            overdueIDReminder as unknown as ReminderDetail[]
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChange =
    (
      field: ControllerRenderProps<FieldValues, string>,
      type: 'payment' | 'overdue'
    ) =>
    async (event: SelectChangeEvent<string | number>) => {
      await handleSelectChangeAsync(field, type, event.target.value);
    };

  const renderRemindersSection = () => {
    if (
      isReadPaymentReminderAllowedLoading ||
      isReadOverdueReminderAllowedLoading ||
      isPaymentRemindersLoading ||
      isOverdueRemindersLoading
    ) {
      return <Typography>{t(i18n)`Loading...`}</Typography>;
    }

    if (!areRemindersEnabled) {
      return (
        <Alert severity="warning">
          {t(i18n)`Reminders are disabled for this counterpart.`}
        </Alert>
      );
    }

    return (
      <>
        {!isEmailValid && (
          <Alert severity="warning">
            {t(
              i18n
            )`No default email for selected Counterpart. Reminders will not be sent.`}
          </Alert>
        )}
        <Box mt={2} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="payment_terms_id"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <SelectFieldWithEdit
                  field={field}
                  error={error}
                  label={t(i18n)`Before due date`}
                  options={paymentReminders?.data || []}
                  noOptionsText={t(i18n)`No payment reminders available`}
                  disabled={disabled}
                  root={root as HTMLElement}
                  details={selectedPaymentReminderDetails}
                  handleSelectChange={(event) =>
                    handleSelectChange(event, 'payment')
                  }
                  control={control}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name={'overdue_reminder_id' as keyof CreateReceivablesFormProps}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <SelectFieldWithEdit
                  field={field}
                  error={error}
                  label={t(i18n)`Overdue reminders`}
                  options={overdueReminders?.data || []}
                  noOptionsText={t(i18n)`No overdue reminders available`}
                  disabled={disabled}
                  details={selectedOverdueReminderDetails}
                  root={root as HTMLElement}
                  handleSelectChange={(event) =>
                    handleSelectChange(event, 'overdue')
                  }
                  control={control}
                />
              )}
            />
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2">{t(i18n)`Reminders`}</Typography>
      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardContent>{renderRemindersSection()}</CardContent>
      </Card>
    </Stack>
  );
};
