import { useState } from 'react'

import { PickerInline } from 'filestack-react'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const ImageForm = (props) => {
  const [url, setUrl] = useState(props?.image?.url)

  const onSubmit = (data) => {
    const dataWithUrl = Object.assign(data, { url })
    props.onSave(dataWithUrl, props?.image?.id)
  }

  const onFileUpload = (res) => {
    setUrl(res.filesUploaded[0].url)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>

        <TextField
          name="title"
          defaultValue={props.image?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <PickerInline
          apikey={process.env.REDWOOD_ENV_FILESTACK_API_KEY}
          onUploadDone={onFileUpload}
        >
          <div
            style={{
              display: url ? 'none' : 'block',
              height: '500px',
            }}
          ></div>
        </PickerInline>

        {url && (
          <div>
            <img
              src={url}
              alt="thumbnail"
              style={{ display: 'block', margin: '2rem 0', maxWidth: '500px' }}
            />
            <button
              onClick={() => setUrl(null)}
              className="rw-button rw-button-blue"
            >
              Replace Image
            </button>
          </div>
        )}

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ImageForm
