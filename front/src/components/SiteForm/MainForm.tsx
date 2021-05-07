import * as React from 'react';
import styled from 'styled-components';
import { StyledContainer, StyledLabel } from './Styled';
import { CreateSiteInput } from 'services/site/model/InputTypes';
import { Checkbox, Row, Col, Table, FormControl } from 'react-bootstrap';
import StyledFormControl from 'containers/LoginPage/StyledFormControl';
import { set, lensPath, over, reject, equals } from 'ramda';
import ThemedButton from 'components/StyledComponents/index';

interface MainFormProps {
  form: CreateSiteInput;
  onFormChange: (form: CreateSiteInput) => void;
  handleThemeError: (boolean) => void;
}

interface MainFormState {
  addEditorEmail: string;
  themeError: string;
}

export const AddEditorContainer = styled.div`
  display: flex;
  button {
    margin: 15px 0 15px 10px;
  }
`;

const AddButton = styled(ThemedButton)`
  margin: 15px 0 15px 10px;
  padding-top: 10px;
`;

export const EditorActions = styled.td`
  display: flex;
  justify-content: flex-end;
`;

const StyledFormInput = styled(FormControl)`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  margin: 15px 0 15px 0;
  min-height: 10em;
  box-shadow: none !important;
  color: #333;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
    opacity: 1;
  }
`;

class MainForm extends React.Component<MainFormProps, MainFormState> {
  state: MainFormState = {
    addEditorEmail: '',
    themeError: '',
  };

  handleAddEditor = () => {
    if (!this.state.addEditorEmail) return;

    const editorsLens = lensPath([
      'editorEmails',
      (this.props.form.editorEmails || []).length,
    ]);
    const newForm = set(
      editorsLens,
      this.state.addEditorEmail,
      this.props.form
    ) as any;

    this.props.onFormChange(newForm);
    this.setState({ addEditorEmail: '' });
  };

  handleDeleteEditor = (email: string) => () => {
    const editorsLens = lensPath(['editorEmails']);
    const newForm = over(
      editorsLens,
      reject(equals(email)),
      this.props.form
    ) as any;

    this.props.onFormChange(newForm);
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === 'themes' || name === 'userRank' || name === 'reactionsConfig') {
      try {
        let parseResponse = JSON.parse(value);
        if (parseResponse && parseResponse.error)
          throw new Error(parseResponse.error);
        this.props.onFormChange({
          ...this.props.form,
          [name]: JSON.stringify(value),
        });
        this.props.handleThemeError(false);
        this.setState({ themeError: '' });
      } catch (e) {
        this.setState({
          themeError: `There is an error in your ${name} object.`,
        });
        this.props.handleThemeError(true);
      }
    }
    this.props.onFormChange({ ...this.props.form, [name]: value });
  };

  handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.currentTarget;
    this.props.onFormChange({ ...this.props.form, [name]: checked });
  };

  handleEditorEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ addEditorEmail: e.currentTarget.value });
  };
  render() {
    const noEditors =
      !this.props.form.editorEmails || !this.props.form.editorEmails.length;
console.log("FORM", this.props.form)
    return (
      <StyledContainer>
        <Row>
          <Col md={6}>
            <h3>Site params</h3>
            <StyledLabel htmlFor="name">Name</StyledLabel>
            <StyledFormControl
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              value={this.props.form.name}
              onChange={this.handleInputChange}
            />
            <StyledLabel htmlFor="subdomain">Subdomain</StyledLabel>
            <StyledFormControl
              id="subdomain"
              name="subdomain"
              type="text"
              placeholder="Subdomain"
              value={this.props.form.subdomain}
              onChange={this.handleInputChange}
            />
            <StyledFormControl
              id="defaultHash"
              name="defaultHash"
              type="text"
              placeholder="Default Hash"
              value={this.props.form.defaultHash}
              onChange={this.handleInputChange}
            />
            <StyledFormControl
              id="defaultSearchPage"
              name="defaultSearchPage"
              type="text"
              placeholder="Default Hash"
              value={this.props.form.defaultSearchPage}
              onChange={this.handleInputChange}
            />
            <StyledLabel htmlFor="subdomain">Skip landing page</StyledLabel>
            <Checkbox
              id="skipLanding"
              name="skipLanding"
              type="checkbox"
              checked={this.props.form.skipLanding}
              onChange={this.handleCheckboxChange}
            />
            <StyledLabel htmlFor="subdomain">Hide Donation</StyledLabel>
            <Checkbox
              id="hideDonation"
              name="hideDonation"
              type="checkbox"
              checked={this.props.form.hideDonation}
              onChange={this.handleCheckboxChange}
            />
            <div>
              <h3>Editors</h3>
              {noEditors && <h5>No editors</h5>}
              {!noEditors && (
                <Table striped bordered condensed>
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th style={{ width: '20%' }} />
                    </tr>
                  </thead>
                  <tbody>
                    {(this.props.form.editorEmails || []).map(email => (
                      <tr key={email}>
                        <td>{email}</td>
                        <EditorActions>
                          <ThemedButton
                            onClick={this.handleDeleteEditor(email)}>
                            Delete
                          </ThemedButton>
                        </EditorActions>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
              <AddEditorContainer>
                <StyledFormControl
                  name="editor"
                  type="text"
                  placeholder="Editor email"
                  value={this.state.addEditorEmail}
                  onChange={this.handleEditorEmailChange}
                />
                <AddButton onClick={this.handleAddEditor}>Add</AddButton>
              </AddEditorContainer>
            </div>
            <h3>Theme</h3>
            <StyledFormInput
              componentClass="textarea"
              name="themes"
              placeholder={this.props.form.themes}
              value={this.props.form.themes}
              onChange={this.handleInputChange}
            />
            {/* <div>{this.state.themeError}</div> */}
            <h3>User Ranking</h3>
            <StyledFormInput
              componentClass="textarea"
              name="userRank"
              //@ts-ignore
              placeholder={this.props.form.userRank}
              //@ts-ignore
              value={this.props.form.userRank}
              onChange={this.handleInputChange}
            />
            <h3>Reaction Configuration</h3>
            <StyledFormInput
              componentClass="textarea"
              name="reactionsConfig"
              placeholder={this.props.form.reactionsConfig}
              value={this.props.form.reactionsConfig}
              onChange={this.handleInputChange}
            />
          </Col>
          {/* <div>{this.state.themeError}</div> */}
        </Row>
        <div>{this.state.themeError}</div>
      </StyledContainer>
    );
  }
}

export default MainForm;
