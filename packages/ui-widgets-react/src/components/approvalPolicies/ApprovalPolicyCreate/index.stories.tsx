import ApprovalPolicyCreate from './ApprovalPolicyCreate';

const Story = {
  title: 'Approval Policies/Approval Policies — Form Create',
  component: ApprovalPolicyCreate,
};
export default Story;

export const DefaultForm = () => (
  <ApprovalPolicyCreate handleOnCancel={() => {}} />
);
