import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Form, Input, Label } from 'semantic-ui-react'
import get from 'lodash/get'

const Text = observer(
  ({
    label,
    path,
    model,
    getter,
    getErrors,
    hasErrors,
    handleChange,
    defaultValue,
    dynamicProps,
    inline,
    required,
    width,
    ...otherProps
  }) => {
    // const touched = model.isTouched(path)
    const doesHaveErrors = hasErrors ? hasErrors(path) : false
    const calculatedProps = dynamicProps ? dynamicProps(model) : {}
    if (!getter) {
      getter = path => get(model, path, defaultValue)
    }

    return (
      <Form.Field error={doesHaveErrors} inline={inline} required={required} width={width}>
        {label || <label htmlFor={path}>{path}</label>}
        <Input
          name={path}
          value={getter(path) || ''}
          onChange={handleChange}
          {...calculatedProps}
          {...otherProps}
        />
        {doesHaveErrors && (
          <Label basic color="red" pointing>
            {getErrors(path)}
          </Label>
        )}
      </Form.Field>
    )
  }
)

/*
 <Form.Input
 label={path}
 name={path}
 value={get(model, path)}
 onChange={model.handleChange}
 error={hasErrors}
 {...conditionalProps}
 {...otherProps}
 />
 */

Text.propTypes = {
  path: PropTypes.string.isRequired,
  // label: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  defaultValue: PropTypes.string,
  getErrors: PropTypes.func,
  hasErrors: PropTypes.func,
  handleChange: PropTypes.func,
  model: PropTypes.object,
}

Text.defaultProps = {
  defaultValue: '',
}

export default Text
