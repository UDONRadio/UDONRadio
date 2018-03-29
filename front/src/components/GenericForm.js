import React, { Component } from 'react';
import { Form, Popup, Label, Message } from 'semantic-ui-react';
import { request } from '../networkGenerics';

const makeField = (props) => {

  const form_types = {
    'email':'email',
    'string': 'text',
    'password': 'password',
    'integer': 'number',
  }

  var input_attrs = {};
  input_attrs['type'] = form_types[props.attrs.type]
  if (input_attrs['type'] === 'text' && props.attrs.max_length)
    input_attrs['maxLength'] = props.attrs.max_length;
  if (props.attrs.value !== undefined) {
    input_attrs['value'] = props.attrs.value;
    input_attrs['readOnly'] = true;
  }

  const field = <Form.Field
    key={props.name}
    required={props.attrs.required}
    disabled={props.attrs.read_only}
  >

    <label>{props.attrs.label}</label>

    <input
      onChange={props.onChange}
      {...input_attrs}
    />
    { props.errors &&
      <Label basic color='red' pointing>{props.errors}</Label>
    }

  </Form.Field>


  if (props.attrs.help_text)
    return <Popup key={props.name}
      trigger={field}
      content={props.attrs.help_text}
    />
  else
    return field

}

class GenericForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      'options': null,
    }
  }

  componentDidMount () {
    const req = this.getRequest();
    req(this.props.url, {
      method: 'OPTIONS',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }).then((options) => {
      this.setState({
        options: options,
      })
    }).catch(this.onError)
;  }

  getRequest = () => (
    this.props.request || request
  )

  getActions = () => (
    this.state.options.actions[this.props.method || "POST"]
  )

  getFields = () => (
    this.props.fields || []
  )

  getFieldNames = () => {
    var names = {};
    this.getFields().forEach((item) => {
      names[item.name] = true;
    })
    for (var key in this.getActions()) {
      names[key] = true;
    }
    return Object.keys(names);
  }

  onChange = (name, value) => {
    this.setState({
      ['field_' + name]: value
    });
  }

  onError = (response) => {
    this.setState({'loading':false})
    if (response.status === 400) {
      this.setState({'form_errors': response.json})
    }
    else if (response.networkError)
      this.setState({'error':response.networkError})
    else
      console.log(response)
  }

  onSubmit = () => {

    var form_data = new FormData()
    var data = {};

    this.getFieldNames()
      //.filter((name) => (this.getFieldAttr(name, "read_only") !== true))
      .map((name) => ({name: name, value: this.getFieldValue(name)}))
      .filter(({name, value}) => value !== undefined)
      .forEach(({name, value}) => {
        data[name] = value;
      })

    if (this.props.onSubmit)
      return this.props.onSubmit(data, this.onError)
    else {
      for (var key in data)
        form_data.append(key, data[key]);
      this.getRequest()(this.props.url, {
        method: this.props.method || "POST",
        headers: {
        },
        body: form_data
      }).then((data) => {
        if (this.props.onSuccess)
          this.props.onSuccess(data);
        else
          console.log(data);
      }).catch(this.onError);
    }
  }

  getFieldAttr = (fieldname, attr) => {
    const fields = this.getFields();
    const actions = this.getActions();

    const field = fields.find((field) => field.name === fieldname);
    const action = actions[fieldname];

    if (field && field.attrs && field.attrs[attr])
      return (field.attrs[attr]);
    else if (action && action[attr])
      return (action[attr]);
    else
      return undefined;
  }

  getFieldValue = (fieldname) => {
    if (this.getFieldAttr(fieldname, "value") !== undefined)
      return this.getFieldAttr(fieldname, "value");
    else
      return this.state['field_' + fieldname];
  }

  makeFieldsArray = () => {
    var array = [];
    const actions = this.getActions();

    this.getFields().forEach((field) => {
      array.push({
        name: field.name,
        attrs: Object.assign({...actions[field.name]}, field.attrs)
      })
    })

    for (var key in actions) {
      if (!array.find((field) => field.name === key)) // eslint-disable-line no-loop-func
        array.push({
          name: key,
          attrs: actions[key]
        });
    }
    return array;
  }

  render () {
    const warning = <Message
      warning
      content={this.state.error}
    />
    const errors = <Message
      error
      content={this.state.form_errors && this.state.form_errors.non_field_errors}
    />

    return <div>
      { this.state.error && warning }
      { this.state.options && <Form onSubmit={this.onSubmit}>
        {
          this.makeFieldsArray().map((props) => ({
            onChange: (e) => (this.onChange(props.name, e.target.value)),
            errors: this.state.form_errors && this.state.form_errors[props.name],
            value: this.state['field_' + props.name],
            ...props,
          })).filter(props => props.attrs.show !== false).map(makeField)
        }
        <Form.Button content={this.props.name || this.state.options.name}/>
      </Form> }
      { this.state.form_errors && this.state.form_errors.non_field_errors && errors}
    </div>
  }
}

export default GenericForm;
