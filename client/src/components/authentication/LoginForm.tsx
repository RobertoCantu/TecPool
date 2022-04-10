import { Formik, Field, Form, FormikHelpers } from 'formik';
import { TextField, Stack, Box, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';


interface Values {
  userName: string;
  password: string;
}


export default function LoginForm() {
  return (
    <div>
      <h1>Log In</h1>
      <Formik
        initialValues={{
          userName: '',
          password: '',
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form>
          <Stack spacing={2}>
            <TextField id="userName" name="userName" type="text" placeholder="Usuario" />
            <TextField id="password" name="password" type="password" placeholder="Contraseña" />
            <LoadingButton
            fullWidth
            size='large'
            type='submit'
            variant='contained'
            //loading={isSubmiting}
            >Log In</LoadingButton>
          </Stack>
        </Form>
      </Formik>
    </div>
  )
}
