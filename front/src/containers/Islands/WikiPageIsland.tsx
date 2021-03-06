import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'reducers';
import RichTextEditor, { EditorValue } from 'react-rte';
import { WikiPageQuery } from 'types/WikiPageQuery';
import styled from 'styled-components';
import { Panel, FormControl } from 'react-bootstrap';
import useUrlParams, { queryStringAll } from 'utils/UrlParamsProvider';
import { useHistory, useLocation, useRouteMatch, Prompt } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { Switch, Route } from 'react-router';
import { trimPath } from 'utils/helpers';
import ThemedButton from 'components/StyledComponents/index';
import * as FontAwesome from 'react-fontawesome';
import WikiPageEditor from '../../components/WikiPageEditor/WikiPageEditor';
import WorkFlowAnimation from '../StudyPage/components/StarAnimation';
import { CurrentUserQuery_me } from 'services/user/model/CurrentUserQuery';
import { useTheme } from 'containers/ThemeProvider/ThemeProvider';
import LoginModal from '../../components/LoginModal';
import { wikiPageUpdateContentMutation, fetchWikiPage } from 'services/study/actions';

interface Props {
  nctId: string;
}

const StyledPanel = styled(Panel)`
  /* padding: 16px;
  border: none !important */
`;

const StyledRTE = styled(RichTextEditor)`
  border: none !important;
`
const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

export default function WikiPageIsland(props: Props) {
  const { nctId } = props;
  let history = useHistory();
  let location = useLocation();
  let match = useRouteMatch();
  const theme = useTheme();

  const [editorState, setEditorState] = useState('rich');
  const [plainEditorText, setplainEditorText] = useState('');
  const [richEditorText, setRichEditorText] = useState('');
  const [flashAnimation, setFlashAnimation] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const user = useSelector((state: RootState) => state.user.current);
  const params = useUrlParams();
  //const user = userData ? userData.me : null;
  // TODO: This query should be pushed up as a fragment to the Page

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWikiPage( nctId ));
    }, [dispatch, nctId])
  const wikiPageData = useSelector((state: RootState) => state.study.wikiPage);

/*   const updateContentMutation = (action) => {
    if (!action.variables.key) return
    return dispatch(wikiPageUpdateContentMutation(nctId, action.content))
  } */

  const readOnly = !location.pathname.includes('/wiki/edit');
  const editPath = `${trimPath(match.path)}/wiki/edit`;

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

  const handleRichEditorChange = (richEditorText: EditorValue) => {
    setRichEditorText(richEditorText);
  };

  const handlePlainEditorChange = (e: any) => {
    setplainEditorText(e.currentTarget.value);
  };


  const handleEdit = () => {
    history.push(`${trimPath(match.url)}/wiki/edit${queryStringAll(params)}`);
  };
  const handleUpdateText = (text) => {
    setRichEditorText(text)

  }
  const handleEditSubmit = () => {
    let content = getEditorText() || ''
    dispatch(wikiPageUpdateContentMutation(nctId, content ));

    history.push(`${match.url}${queryStringAll(params)}`);
    setFlashAnimation(true)
  };

  const renderSubmitButton = (
    data: WikiPageQuery,
    isAuthenticated: boolean,
    readOnly: boolean
  ) => {
    if (!isAuthenticated) return false;
    if (readOnly) return false;
    const editorTextState = getEditorText();
    const editorTextData =
      data.study && data.study.wikiPage && data.study.wikiPage.content;

    let editMessage = `Changes not saved. Are you sure you want to leave while editing?`;

    return (
      <div>
        <Prompt
          when={!readOnly}
          message={location => editMessage}
        />
        <ThemedButton
          onClick={() => { editMessage = "Save changes?"; handleEditSubmit(); }}
          disabled={editorTextState === editorTextData}
          style={{ marginLeft: '10px' }}>
          Save <FontAwesome name="pencil" />
        </ThemedButton>
      </div>
    );
  };

  const renderEditButton = (isAuthenticated: boolean) => {
    return (
      <ThemedButton
        type="button"
        onClick={isAuthenticated ? () => handleEdit() : () => setShowLoginModal(true)}
        style={{ marginLeft: '10px' }}>
        Edit <FontAwesome name="edit" />
      </ThemedButton>
    );
  };

  const renderToolbar = (
    
    data: WikiPageQuery,
    //@ts-ignore
    user: CurrentUserQuery_me | null | undefined,
    readOnly: boolean
  ) => {

    const isAuthenticated = user !== null;

    return (
      <Toolbar>
        <Switch>
          <Route
            path={editPath}
            render={() => (
              <>
                {renderSubmitButton(data, isAuthenticated, readOnly)}
              </>
            )}
          />
          <Route render={() => <>{renderEditButton(isAuthenticated)}</>} />
        </Switch>
      </Toolbar>
    );
  };
  const resetHelper = () => {
    setFlashAnimation(false)
    //refetch()
  }
  const handleResetAnimation = () => {
    setTimeout(resetHelper, 6500);

  }

  const renderEditor = (data: WikiPageQuery) => {
    //console.log("EDITOOR - WIKI DATA: ", data?.study?.wikiPage)
    if (!data || !data.study || !data.study.wikiPage) return null;
    const text = getEditorText() || '';

    if (text !== data.study.wikiPage.content || !text) {
      if (editorState === 'rich') {
       // console.log("RICH Editor 111111111111", richEditorText)
        const {content} = data.study.wikiPage
        const richEditorText = RichTextEditor.createValueFromString(
          content || '',
          'markdown'
        );
        setRichEditorText(richEditorText);
      } else {
        setplainEditorText(text);
      }
    }

    const readOnly = !location.pathname.includes('/wiki/edit');

    if (editorState === 'rich') {
      return (
        <Panel style={{ border: "none", padding: "0px" }}>
          <Panel.Body >
            <StyledRTE
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
  };

  if (!wikiPageData || !nctId) return <BeatLoader />;
  
  if (showLoginModal) return <LoginModal
    show={showLoginModal}
    cancel={() => setShowLoginModal(false)}
  />
  //console.log("WIKI DATA", wikiPageData.data.study.wikiPage)

  return (
    <>
      {flashAnimation == true ?
        <WorkFlowAnimation
          resetAnimation={handleResetAnimation}
          rankColor={theme ? theme.button : 'default'}
        /> : null}
      <div>
        <StyledPanel>
          <div>
            <Route exact path={editPath} render={props => <WikiPageEditor updateText={handleUpdateText} data={wikiPageData.data} />} />
            {readOnly ? <Route render={() => renderEditor(wikiPageData.data)} /> : null}
            {renderToolbar(wikiPageData.data, user, readOnly)}
          </div>
        </StyledPanel>
      </div>
    </>
  );
}
