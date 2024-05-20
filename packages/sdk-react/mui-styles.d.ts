import { type PayableStatusChipProps } from '@/components/payables/PayableStatusChip/PayableStatusChip';
import { type MoniteInvoiceActionMenuProps } from '@/components/receivables/InvoicesTable/InvoiceActionMenu';
import { type InvoiceStatusChipProps } from '@/components/receivables/InvoiceStatusChip';
import { type MoniteTablePaginationProps } from '@/ui/table/TablePagination';
import {
  ComponentsOverrides,
  ComponentsPropsList,
  ComponentsVariants,
  Theme as MuiTheme,
} from '@mui/material/styles';

type Theme = Omit<MuiTheme, 'components'>;

/**
 * Extends theme `components` with Monite components,
 * allowing to configure default props, style overrides, and variants.
 */
interface ComponentType<T> {
  defaultProps?: ComponentsPropsList[T];
  styleOverrides?: ComponentsOverrides<Theme>[T];
  variants?: ComponentsVariants[T];
}

declare module '@mui/material/styles' {
  /**
   * Extends `styleOverrides` of the component theme configuration
   * with slots from the component.
   */
  interface ComponentNameToClassKey {
    MoniteInvoiceStatusChip: 'root';
    MonitePayableStatusChip: 'root';
    MoniteTablePagination: 'root' | 'menu';
    MoniteInvoiceActionMenu: 'root';
  }

  /**
   * Extends MUI component list
   */
  interface ComponentsPropsList {
    MoniteInvoiceStatusChip: Partial<InvoiceStatusChipProps>;
    MonitePayableStatusChip: Partial<PayableStatusChipProps>;
    MoniteTablePagination: Partial<MoniteTablePaginationProps>;
    MoniteInvoiceActionMenu: Partial<MoniteInvoiceActionMenuProps>;
  }

  /**
   * Extends theme `components`
   */
  interface Components {
    MoniteInvoiceStatusChip?: ComponentType<'MoniteInvoiceStatusChip'>;
    MonitePayableStatusChip?: ComponentType<'MonitePayableStatusChip'>;
    MoniteTablePagination?: ComponentType<'MoniteTablePagination'>;
    MoniteInvoiceActionMenu?: ComponentType<'MoniteInvoiceActionMenu'>;
  }
}
