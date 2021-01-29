import * as React from 'react';
import { FormControl, DropdownButton, MenuItem, Checkbox } from 'react-bootstrap';
import styled from 'styled-components';
import { useState } from 'react';
import { PageViewsQuery_site_pageViews } from 'services/study/model/PageViewsQuery';
import MailMergeFormControl from 'components/MailMerge/MailMergeFormControl';
import { useTheme } from 'containers/ThemeProvider/ThemeProvider';
import ThemedButton from 'components/StyledComponents/index';
import { studyIslands } from 'containers/Islands/CommonIslands'
import { updatePageView, deletePageView  } from 'services/study/actions';
import { useDispatch, useSelector } from 'react-redux';

const StyledFormControl = styled(FormControl)`
  margin-bottom: 15px;
`;
interface Props {
  siteId: number;
  page: PageViewsQuery_site_pageViews;
}

function formControl(
  label: string,
  value: string,
  setValue: (s: string) => void
) {
  return (
    <StyledFormControl
      placeholder={label}
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
}
function checkboxHelper(
  isDefault: boolean,
  setValue: (b: boolean) => void
) {
  setValue(!isDefault)
}
export default function PageForm(props: Props) {
  const page = props.page;
  const [url, setUrl] = useState(page.url);
  const [title, setTitle] = useState(page.title);
  const [template, setTemplate] = useState(page.template);
  const [isDefault, setDefault] = useState(page.default);
  const theme = useTheme();

  const dispatch = useDispatch();
  let input = { id: page.id, title, url, template, default: isDefault };

  return (
    <div style={{ padding: '10px' }}>
      <label>Url</label>
      {formControl('Url', url, setUrl)}
      <label>Default?</label>
      <Checkbox
        checked={isDefault}
        onChange={() => checkboxHelper(isDefault, setDefault)}
      />
      <label>Page Type</label>
      <div>
        <DropdownButton
          bsStyle="default"
          title="Type: Study"
          key="default"
          disabled
          style={{
            marginBottom: '10px',
            background: theme?.button,
          }}>
          <MenuItem>Study</MenuItem>
        </DropdownButton>
      </div>
      <label>Title</label>
      {formControl('Title', title, setTitle)}
      <label>Content Template</label>
      <MailMergeFormControl
        template={template}
        onTemplateChanged={setTemplate}
        islands={studyIslands}
      />
      <hr />
      <ThemedButton
        onClick={_ => dispatch(updatePageView(input))}
        style={{ margin: '10px' }}>
        Save '{url}'
      </ThemedButton>
      <ThemedButton
        onClick={_ => dispatch(deletePageView(page.id))}
        style={{ background: theme?.buttonDanger }}>
        Delete
      </ThemedButton>
    </div>
  );
}
