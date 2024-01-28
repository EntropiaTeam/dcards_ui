import React, { FC, useEffect } from 'react';
import {
  Route, Switch, useLocation
} from 'react-router-dom';
import PhotoEditor from '../PhotoEditor';
import TextEditor from '../TextEditor';
import Categories from '../Categories';
import Catalog from '../Catalog';
import Agreement from '../Agreement';
import Message from '../Message';
import { useNavigationContext } from '../../context/navigation';
import { RoutePath } from '../../enums/Routes';

export function useQuery(): URLSearchParams {
  return new URLSearchParams(useLocation().search);
}

const Routes: FC = () => {
  const {
    actions: { changeIframeParams }
  } = useNavigationContext();
  const query = useQuery();

  useEffect(() => {
    const token = query.get('token') ?? '';
    const occasion = query.get('occasionID') ?? '';
    const locale = query.get('locale') ?? '';
    const iframeParams = {
      token,
      occasion,
      locale
    };
    changeIframeParams(iframeParams);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Switch>
      <Route exact path={RoutePath.Catalog} component={Catalog} />
      <Route exact path={RoutePath.Agreement} component={Agreement} />
      <Route path={RoutePath.PhotoEditor} component={PhotoEditor} />
      <Route path={RoutePath.Message} component={Message} />
      <Route exact path={RoutePath.TextEditor} component={TextEditor} />
      <Route exact path={RoutePath.Root} component={Categories} />
    </Switch>
  );
};

export default Routes;
