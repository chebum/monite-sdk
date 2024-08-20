import { useState } from 'react';

import { useApprovalPolicyById } from '@/core/queries';
import { LoadingPage } from '@/ui/loadingPage';

export interface ApprovalPolicyDetailsProps {
  /** Approval policy ID */
  id?: string;

  /** Callback is fired when a policy is created and sync with server is successful
   *
   * @param id - the ID of the created policy
   */
  onCreated?: (id: string) => void;

  /** Callback is fired when a policy is updated and sync with server is successful
   *
   * @param id - the ID of the updated policy
   */
  onUpdated?: (id: string) => void;
}

/**
 * ApprovalPolicyDetails component
 *
 * This component renders the approval policy details form. It includes fields for the policy name, description, trigger, and script.
 * The `useApprovalPolicyDetails` hook is used to handle the creation of a new approval policy.
 *
 */
export const ApprovalPolicyDetails = ({
  id,
  onCreated,
  onUpdated,
}: ApprovalPolicyDetailsProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { isLoading, data: approvalPolicy } = useApprovalPolicyById(id);

  if (id && isLoading) {
    return <LoadingPage />;
  }

  if (!isEdit && approvalPolicy) {
    // READ
    return <div>READ</div>;
  }

  if (isEdit && id) {
    // UPDATE
    return <div>UPDATE</div>;
  }

  // CREATE by default
  return <div>CREATE</div>;
};
