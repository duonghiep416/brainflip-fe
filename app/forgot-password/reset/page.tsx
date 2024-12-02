import { ModalForm } from '@/components/Modal/ModalForm';
import { FormResetPassword } from '@/app/forgot-password/reset/FormResetPassword';
export const metadata = {
  title: 'Forgot Password | Brain Flip',
  description: 'Login to your account',
};

const ForgotPasswordPage = () => {
  return (
    <ModalForm
      header="Reset password"
      backdrop="opaque"
      isCloseBtn={false}
      hideCloseButton
    >
      <FormResetPassword />
    </ModalForm>
  );
};

export default ForgotPasswordPage;
