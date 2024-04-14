import {
  Form,
  TextField,
  Submit,
  TextAreaField,
  FieldError,
  Label,
  FormError,
  useForm,
} from '@redwoodjs/forms'
import { Metadata, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm({ mode: 'onBlur' })
  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Submitted!')
      formMethods.reset()
    },
  })

  const onSubmit = (data) => {
    create({ variables: { input: data } })
  }

  return (
    <>
      <Metadata title="Contact" description="Contact page" />

      <Toaster />
      <Form onSubmit={onSubmit} error={error} formMethods={formMethods}>
        <FormError
          error={error}
          wrapperClassName="py-2 px-6 rounded-lg bg-red-100 text-red-700"
          listClassName="list-disc ml-4"
        />

        <Label
          name="name"
          errorClassName="error"
          className="block text-gray-700 uppercase text-sm"
        >
          Name
        </Label>
        <TextField
          name="name"
          validation={{ required: true }}
          errorClassName="error"
          className="border rounded-sm px-2 py-1 outline-none"
        />
        <FieldError name="name" className="error" />

        <Label
          name="email"
          errorClassName="error"
          className="block text-gray-700 uppercase text-sm"
        >
          Email
        </Label>
        <TextField
          name="email"
          validation={{
            required: true,
            pattern: {
              value: /^[^@]+[^.]+\..+$/,
              message: 'Please enter a valid email address',
            },
          }}
          className="border rounded-sm px-2 py-1"
          errorClassName="error"
        />
        <FieldError name="email" className="error" />

        <Label
          name="message"
          errorClassName="error"
          className="block text-gray-700 uppercase text-sm"
        >
          Message
        </Label>
        <TextAreaField
          name="message"
          validation={{ required: true }}
          className="block border rounded-sm px-2 py-1"
          errorClassName="error"
        />
        <FieldError name="message" className="error" />

        <Submit
          className="block bg-blue-700 text-white mt-8 px-4 py-2 rounded"
          disabled={loading}
        >
          Save
        </Submit>
      </Form>
    </>
  )
}

export default ContactPage
