import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import useUrlParams, { queryStringAll } from 'utils/UrlParamsProvider';
import { WikiPageQuery } from 'types/WikiPageQuery';
import RichTextEditor, { EditorValue } from 'react-rte';
import { Panel, FormControl } from 'react-bootstrap';
import { useUnload } from "../../hooks/useUnload";
import { BeatLoader } from 'react-spinners';

interface Props {
  data: WikiPageQuery;
  updateText: (string) => void;
}

export default function WikiPageEditor(props: Props) {
  useUnload(e => {
    e.preventDefault();
    e.returnValue = '';
  });
  let history = useHistory();
  let match = useRouteMatch();
  const params = useUrlParams();

  const [plainEditorText, setplainEditorText] = useState('');
  const [richEditorText, setRichEditorText] = useState('');

  const [editorState, setEditorState] = useState('rich');

/*   useEffect(() => {
    //console.log("HELLO!!!!!!!!!!!!!!!!!!!!!", data)
    }, [props.data]) */

  const handleRichEditorChange = (richEditorText: EditorValue) => {
    props.updateText(richEditorText)
    setRichEditorText(richEditorText);
  };

  const handlePlainEditorChange = (e: any) => {
    setplainEditorText(e.currentTarget.value);
  };

  let location = useLocation();

  const getEditorText = () => {
    if (editorState === 'rich') {
      return (
        richEditorText &&
        //@ts-ignore
        richEditorText.toString('markdown')
      );
    }
    return plainEditorText;
  };
  const handlePreview = () => {
    if (editorState === 'plain') {
      const text = getEditorText() || '';
      setEditorState('rich');
      setRichEditorText(RichTextEditor.createValueFromString(text, 'markdown'));
    }

    history.push(`${match.url}${queryStringAll(params)}`);
  };

  const { data, } = props;
  if (!data || !data.study || !data.study.wikiPage) return null;
  const text = getEditorText() || '';
  if (text !== data.study.wikiPage.content && !text) {
    handlePreview()

    if (editorState === 'rich') {
      const richEditorText = RichTextEditor.createValueFromString(
        data.study.wikiPage.content || '',
        'markdown'
      );
      setRichEditorText(richEditorText);
    } else {
      setplainEditorText(text);
    }
  }

  const readOnly = !location.pathname.includes('/wiki/edit');
  if (!data) return <BeatLoader />;

  if (editorState === 'rich') {
    return (
      <Panel>
        <Panel.Body>
          <RichTextEditor
            readOnly={readOnly}
            onChange={handleRichEditorChange}
            value={richEditorText || RichTextEditor.createEmptyValue()}
          />
        </Panel.Body>
      </Panel>
    );
  }
 
  return (

    <Panel>
      <Panel.Body>
        <FormControl
          style={{ minHeight: '200px' }}
          componentClass="textarea"
          defaultValue={plainEditorText || ''}
          onChange={handlePlainEditorChange}
        />
      </Panel.Body>
    </Panel>
  );
}
