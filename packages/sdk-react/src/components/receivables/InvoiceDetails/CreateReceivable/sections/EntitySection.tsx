'use client';

import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { CountryInvoiceOption } from '@/components/receivables/InvoiceDetails/CreateReceivable/components/CountryInvoiceOption';
import { CreateReceivablesFormProps } from '@/components/receivables/InvoiceDetails/CreateReceivable/validation';
import { useRootElements } from '@/core/context/RootElementsProvider';
import { useEntityVatIdList, useMyEntity } from '@/core/queries/useEntities';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import {
  Stack,
  Grid,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  MenuItem,
  FormHelperText,
  TextField,
  Collapse,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import type { SectionGeneralProps } from './Section.types';

/** All available fields for current component */
const allFields = [
  'entity_vat_id_id',
  'tax_id',
  'fulfillment_date',
  'purchase_order',
] as const;

interface EntitySectionProps extends SectionGeneralProps {
  /**
   * Describes which fields should be hidden from the user
   *  (example: `purchaise_order` is not available for editing
   *   and we want to hide it. But for [CREATE] request it should be sent)
   */
  hidden?: ['purchase_order'];
}

export const EntitySection = ({ disabled, hidden }: EntitySectionProps) => {
  const { i18n } = useLingui();
  const { control, watch, resetField, setValue } =
    useFormContext<CreateReceivablesFormProps>();

  const { root } = useRootElements();

  const { data: entityVatIds, isLoading: isEntityVatIdsLoading } =
    useEntityVatIdList();
  const { data: entity, isLoading: isEntityLoading } = useMyEntity();

  /** Describes if `Same as invoice date` checkbox is checked */
  const [isSameAsInvoiceDateChecked, setIsSameAsInvoiceDateChecked] =
    useState<boolean>(false);

  const visibleFields = allFields.filter((field) =>
    hidden ? field !== 'purchase_order' : true
  );

  const gridItemProps = {
    xs: 12,
    sm: 6,
    md: Math.floor(12 / visibleFields.length),
  };

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2">{t(i18n)`Details`}</Typography>
      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item {...gridItemProps}>
              <Controller
                name="entity_vat_id_id"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormControl
                    variant="outlined"
                    fullWidth
                    required
                    disabled={isEntityVatIdsLoading || disabled}
                    error={Boolean(error)}
                  >
                    <InputLabel id={field.name}>{t(
                      i18n
                    )`Your VAT ID`}</InputLabel>
                    <Select
                      labelId={field.name}
                      label={t(i18n)`Your VAT ID`}
                      MenuProps={{ container: root }}
                      startAdornment={
                        isEntityVatIdsLoading ? (
                          <CircularProgress size={20} />
                        ) : entity?.address.country ? (
                          <CountryInvoiceOption code={entity.address.country} />
                        ) : null
                      }
                      {...field}
                    >
                      {entityVatIds?.data.map((vatId) => (
                        <MenuItem key={vatId.id} value={vatId.id}>
                          {vatId.value}
                        </MenuItem>
                      ))}
                    </Select>
                    {error && <FormHelperText>{error.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item {...gridItemProps}>
              <TextField
                disabled
                fullWidth
                variant="outlined"
                label={t(i18n)`Your TAX ID`}
                value={entity?.tax_id ?? ''}
                InputProps={{
                  startAdornment: isEntityLoading ? (
                    <CircularProgress size={20} />
                  ) : entity?.address.country ? (
                    <CountryInvoiceOption code={entity.address.country} />
                  ) : null,
                }}
              />
              <Collapse in={Boolean(!entity?.tax_id) && !isEntityLoading}>
                <FormHelperText>{t(i18n)`No TAX ID available`}</FormHelperText>
              </Collapse>
            </Grid>
            <Grid item {...gridItemProps}>
              <Controller
                name="fulfillment_date"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <DatePicker
                      {...field}
                      minDate={new Date()}
                      disabled={disabled}
                      onChange={(date) => {
                        const today = new Date();

                        if (today.toDateString() === date?.toDateString()) {
                          setIsSameAsInvoiceDateChecked(true);
                        } else {
                          setIsSameAsInvoiceDateChecked(false);
                        }

                        field.onChange(date);
                      }}
                      label={t(i18n)`Fulfillment date`}
                      slotProps={{
                        popper: {
                          container: root,
                        },
                        actionBar: {
                          actions: ['today'],
                        },
                        textField: {
                          fullWidth: true,
                          helperText: error?.message,
                        },
                        field: {
                          clearable: true,
                          onClear: () => {
                            resetField(field.name);
                            setIsSameAsInvoiceDateChecked(false);
                          },
                        },
                      }}
                      views={['year', 'month', 'day']}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={isSameAsInvoiceDateChecked}
                          onChange={(event) => {
                            const checked = event.target.checked;

                            if (checked) {
                              setValue(field.name, new Date(), {
                                shouldValidate: true,
                              });
                            } else {
                              resetField(field.name);
                            }

                            setIsSameAsInvoiceDateChecked(checked);
                          }}
                        />
                      }
                      label={t(i18n)`Same as invoice date`}
                    />
                  </>
                )}
              />
            </Grid>
            {visibleFields.includes('purchase_order') && (
              <Grid item {...gridItemProps}>
                <Controller
                  name="purchase_order"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      fullWidth
                      variant="outlined"
                      label={t(i18n)`Purchase order`}
                      error={Boolean(error)}
                      helperText={error?.message}
                      disabled={disabled}
                      {...field}
                    />
                  )}
                />
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};
