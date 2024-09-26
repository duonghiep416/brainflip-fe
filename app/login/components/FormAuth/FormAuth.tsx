import Form from '@/components/Form/Form';
import Input from '@/components/Input/Input';
import { Button } from '@nextui-org/react';

export const FormAuth = () => {
  return (
    <Form
      onSubmit={e => {
        console.log('e', e);
      }}
    >
      <Input
        name="email"
        label="Email"
        rules={{
          required: true,
          pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        }}
      />
      <Input name="password" label="Password" rules={{ required: true }} />
      <Button>Login</Button>
    </Form>
  );
};
