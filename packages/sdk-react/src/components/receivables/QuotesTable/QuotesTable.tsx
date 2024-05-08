import React, { useState } from 'react';

import { ScopedCssBaselineContainerClassName } from '@/components/ContainerCssBaseline';
import {
  FILTER_TYPE_CUSTOMER,
  FILTER_TYPE_SEARCH,
  FILTER_TYPE_STATUS,
} from '@/components/receivables/consts';
import { InvoiceStatusChip } from '@/components/receivables/InvoiceStatusChip';
import { PAGE_LIMITS } from '@/constants';
import { MoniteScopedProviders } from '@/core/context/MoniteScopedProviders';
import { useCurrencies } from '@/core/hooks/useCurrencies';
import { useReceivables } from '@/core/queries';
import { TablePagination } from '@/ui/table/TablePagination';
import { DateTimeFormatOptions } from '@/utils/DateTimeFormatOptions';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import {
  OrderEnum,
  QuoteResponsePayload,
  ReceivableCursorFields,
  ReceivablesStatusEnum,
  ReceivableType,
} from '@monite/sdk-api';
import { Box } from '@mui/material';
import {
  DataGrid,
  GridSortModel,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import { GridSortDirection } from '@mui/x-data-grid/models/gridSortModel';

import { Filters } from '../Filters';
import { useReceivablesFilters } from '../Filters/useReceivablesFilters';

export interface QuotesTableSortModel {
  field: ReceivableCursorFields;
  sort: GridSortDirection;
}

type QuotesTableProps = {
  /**
   * The event handler for a row click.
   *
   * @param id - The identifier of the clicked row, a string.
   */
  onRowClick?: (id: string) => void;

  /**
   * The event handler for a sort change.
   *
   * @param {QuotesTableSortModel} params - The sort model.
   */
  onChangeSort?: (params: QuotesTableSortModel) => void;
};

export const QuotesTable = (props: QuotesTableProps) => (
  <MoniteScopedProviders>
    <QuotesTableBase {...props} />
  </MoniteScopedProviders>
);

const QuotesTableBase = ({
  onRowClick,
  onChangeSort: onChangeSortCallback,
}: QuotesTableProps) => {
  const { i18n } = useLingui();
  const [currentPaginationToken, setCurrentPaginationToken] = useState<
    string | null
  >(null);
  const [rowsPerPage, setRowsPerPage] = useState<number>(PAGE_LIMITS[0]);

  const { formatCurrencyToDisplay } = useCurrencies();
  const { onChangeFilter, currentFilters } = useReceivablesFilters();
  const [sortModel, setSortModel] = useState<Array<QuotesTableSortModel>>([]);
  const sortModelItem = sortModel[0];

  const { data: quotes, isLoading } = useReceivables(
    sortModelItem ? (sortModelItem.sort as OrderEnum) : undefined,
    rowsPerPage,
    currentPaginationToken || undefined,
    sortModelItem ? sortModelItem.field : undefined,
    ReceivableType.QUOTE,
    undefined,
    currentFilters[FILTER_TYPE_SEARCH] || undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    currentFilters[FILTER_TYPE_CUSTOMER] || undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    currentFilters[FILTER_TYPE_STATUS] || undefined
  );

  const onChangeSort = (m: GridSortModel) => {
    const model = m as Array<QuotesTableSortModel>;
    setSortModel(model);
    setCurrentPaginationToken(null);

    onChangeSortCallback?.(model[0]);
  };

  return (
    <>
      <Box
        sx={{ padding: 2, width: '100%' }}
        className={ScopedCssBaselineContainerClassName}
      >
        <Box sx={{ marginBottom: 2 }}>
          <Filters onChangeFilter={onChangeFilter} />
        </Box>
        <DataGrid
          loading={isLoading}
          sortModel={sortModel}
          onSortModelChange={onChangeSort}
          sx={{
            '& .MuiDataGrid-withBorderColor': {
              borderColor: 'divider',
            },
            '&.MuiDataGrid-withBorderColor': {
              borderColor: 'divider',
            },
          }}
          onRowClick={(params) => onRowClick?.(params.row.id)}
          slots={{
            pagination: () => (
              <TablePagination
                pageSizeOptions={PAGE_LIMITS}
                nextPage={quotes?.next_pagination_token}
                prevPage={quotes?.prev_pagination_token}
                paginationModel={{
                  page: currentPaginationToken,
                  pageSize: rowsPerPage,
                }}
                onPaginationModelChange={({ page, pageSize }) => {
                  setRowsPerPage(pageSize);
                  setCurrentPaginationToken(page);
                }}
              />
            ),
          }}
          columns={[
            {
              field: 'document_id',
              sortable: false,
              headerName: t(i18n)`Number`,
              flex: 1.2,
            },
            {
              field: 'created_at',
              sortable: false,
              headerName: t(i18n)`Created on`,
              valueFormatter: ({ value }) =>
                value
                  ? i18n.date(value, DateTimeFormatOptions.EightDigitDate)
                  : '—',
              flex: 1,
            },
            {
              field: 'issue_date',
              sortable: false,
              headerName: t(i18n)`Issue Date`,
              valueFormatter: ({
                value,
              }: GridValueFormatterParams<
                QuoteResponsePayload['issue_date']
              >) =>
                value && i18n.date(value, DateTimeFormatOptions.EightDigitDate),
              flex: 1,
            },
            {
              field: 'counterpart_name',
              sortable: false,
              headerName: t(i18n)`Customer`,
              flex: 1,
            },
            {
              field: 'expiry_date',
              sortable: false,
              headerName: t(i18n)`Due date`,
              valueFormatter: ({
                value,
              }: GridValueFormatterParams<
                QuoteResponsePayload['expiry_date']
              >) =>
                value && i18n.date(value, DateTimeFormatOptions.EightDigitDate),
              flex: 1,
            },
            {
              field: 'status',
              sortable: false,
              headerName: t(i18n)`Status`,
              renderCell: (params) => {
                const status = params.value as ReceivablesStatusEnum;

                return <InvoiceStatusChip status={status} />;
              },
              flex: 1,
            },
            {
              field: 'amount',
              headerName: t(i18n)`Amount`,
              valueGetter: (params) => {
                const row = params.row as QuoteResponsePayload;
                const value = row.total_amount;

                return value
                  ? formatCurrencyToDisplay(value, row.currency)
                  : '';
              },
              flex: 0.8,
            },
          ]}
          rows={quotes?.data || []}
        />
      </Box>
    </>
  );
};
