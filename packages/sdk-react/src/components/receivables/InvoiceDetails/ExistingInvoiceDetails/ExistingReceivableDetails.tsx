import { useDialog } from '@/components/Dialog';
import { ExistingInvoiceDetails } from '@/components/receivables/InvoiceDetails/ExistingInvoiceDetails/ExistingInvoiceDetails';
import { MoniteStyleProvider } from '@/core/context/MoniteProvider';
import { useIsActionAllowed } from '@/core/queries/usePermissions';
import {
  useInvoiceDetails,
  InvoiceDetailsPermissions,
} from '@/core/queries/useReceivables';
import { LoadingPage } from '@/ui/loadingPage';
import { NotFound } from '@/ui/notFound';
import { DateTimeFormatOptions } from '@/utils/DateTimeFormatOptions';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ActionEnum, InvoiceResponsePayload } from '@monite/sdk-api';
import CloseIcon from '@mui/icons-material/Close';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';

import { addDays } from 'date-fns';

import { ROW_TO_TAG_STATUS_MUI_MAP } from '../../consts';
import {
  ExistingReceivableDetailsProps,
  getReceivableStatusNameMap,
} from '../InvoiceDetails.types';
import { InvoiceError } from '../InvoiceError';
import { InvoiceItems } from '../InvoiceItems';
import { InvoicePaymentDetails } from '../InvoicePaymentDetails';
import { InvoiceTo } from '../InvoiceTo';
import { InvoiceTotal } from '../InvoiceTotal';

import type = InvoiceResponsePayload.type;

type GetComponentProps<T> = T extends
  | React.ComponentType<infer P>
  | React.Component<infer P>
  ? P
  : never;

/**
 * General component for all Receivables (Invoices, Credit Notes, Quotes)
 * */
export const ExistingReceivableDetails = (
  props: ExistingReceivableDetailsProps
) => (
  <MoniteStyleProvider>
    <ExistingReceivableDetailsBase {...props} />
  </MoniteStyleProvider>
);

const ExistingReceivableDetailsBase = (
  props: ExistingReceivableDetailsProps
) => {
  const { i18n } = useLingui();

  const {
    receivable: invoice,
    error,
    isLoading,
    isButtonsLoading,
    permissions,
    actions: queryActions,
  } = useInvoiceDetails(props);

  const dialogContext = useDialog();
  const { data: isDeleteAllowed } = useIsActionAllowed({
    method: 'receivable',
    action: ActionEnum.DELETE,
    entityUserId: invoice?.entity_user_id,
  });
  const { data: isUpdateAllowed } = useIsActionAllowed({
    method: 'receivable',
    action: ActionEnum.UPDATE,
    entityUserId: invoice?.entity_user_id,
  });

  const fulfillmentDate = (invoice as InvoiceResponsePayload)?.fulfillment_date;
  const issueDate = (invoice as InvoiceResponsePayload)?.issue_date;
  const numberOfDueDays = (invoice as InvoiceResponsePayload)?.payment_terms
    ?.term_final.number_of_days;
  const dueDate =
    invoice &&
    issueDate &&
    numberOfDueDays &&
    addDays(new Date(issueDate), numberOfDueDays);

  const avatarSymbol =
    (invoice?.counterpart_name && invoice?.counterpart_name[0]) || '/';

  if (!props.id) return null;

  if (isLoading) return <LoadingPage />;

  if (!invoice) {
    return (
      <NotFound
        title={t(i18n)`Invoice not found`}
        description={t(
          i18n
        )`There is no receivable by provided id: ${props.id}`}
      />
    );
  }

  if (error) {
    return (
      <InvoiceError
        onClose={dialogContext?.onClose}
        errorMessage={error?.body?.error?.message}
      />
    );
  }

  if (invoice.type === type.INVOICE) {
    return <ExistingInvoiceDetails {...props} />;
  }

  return (
    <>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={3}>
            <Avatar sx={{ width: 44, height: 44 }}>{avatarSymbol}</Avatar>
            <Typography variant="h3">
              {t(i18n)`Invoice ${invoice.document_id || ''}`}
            </Typography>
            <Chip
              color={ROW_TO_TAG_STATUS_MUI_MAP[invoice.status]}
              label={getReceivableStatusNameMap(i18n)[invoice.status]}
              variant="outlined"
            />
          </Box>
          {dialogContext?.isDialogContent && (
            <IconButton
              aria-label={t(i18n)`Close invoice details`}
              onClick={dialogContext.onClose}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box mt={2}>
          <Card variant="outlined">
            <Table>
              <TableBody>
                <TableRow key="fulfillment-date">
                  <TableCell>
                    <Typography>{t(i18n)`Fulfillment date`}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {fulfillmentDate
                        ? i18n.date(
                            fulfillmentDate,
                            DateTimeFormatOptions.EightDigitDate
                          )
                        : '—'}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow key="due-date">
                  <TableCell>
                    <Typography>{t(i18n)`Due Date`}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {dueDate
                        ? i18n.date(
                            dueDate,
                            DateTimeFormatOptions.EightDigitDate
                          )
                        : '—'}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </Box>

        <InvoiceTo
          counterpartName={invoice.counterpart_name}
          counterpartType={invoice.counterpart_type}
          counterpartContact={invoice.counterpart_contact}
          counterpartAddress={invoice.counterpart_address}
        />

        {invoice.entity_bank_account && (
          <InvoicePaymentDetails
            entityBankAccount={invoice.entity_bank_account}
          />
        )}

        {invoice?.line_items?.length === 0 ? (
          <Box
            mt={2}
            sx={{
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 6,
            }}
          >
            <TextSnippetIcon fontSize="large" color="secondary" />
            <Typography variant="h3" padding={2}>
              {t(i18n)`There are no items here`}
            </Typography>
          </Box>
        ) : (
          <>
            <InvoiceItems invoice={invoice} />
            <InvoiceTotal invoice={invoice} />
          </>
        )}
      </DialogContent>
      <Divider />
      <DialogActions data-testid="InvoiceDetailsFooter">
        {permissions.includes(InvoiceDetailsPermissions.Cancel) && (
          <Button
            aria-label={t(i18n)`Cancel invoice`}
            variant="outlined"
            color="error"
            disabled={isButtonsLoading || !isUpdateAllowed}
            onClick={queryActions.cancelInvoice}
          >
            {t(i18n)`Cancel`}
          </Button>
        )}
        {permissions.includes(InvoiceDetailsPermissions.Delete) && (
          <Button
            aria-label={t(i18n)`Delete invoice`}
            variant="outlined"
            color="error"
            disabled={isButtonsLoading || !isDeleteAllowed}
            onClick={queryActions.deleteInvoice}
          >
            {t(i18n)`Delete`}
          </Button>
        )}
        {permissions.includes(InvoiceDetailsPermissions.Issue) && (
          <Button
            aria-label={t(i18n)`Issue invoice`}
            onClick={queryActions.issueInvoice}
            variant="outlined"
            disabled={isButtonsLoading || !isUpdateAllowed}
          >
            {t(i18n)`Issue`}
          </Button>
        )}
        {permissions.includes(
          InvoiceDetailsPermissions.MarkAsUncollectible
        ) && (
          <Button
            aria-label={t(i18n)`Mark as uncollectible invoice`}
            onClick={queryActions.markAsUncollectibleInvoice}
            variant="outlined"
            disabled={isButtonsLoading || !isUpdateAllowed}
          >
            {t(i18n)`Mark as uncollectible`}
          </Button>
        )}
      </DialogActions>
    </>
  );
};
