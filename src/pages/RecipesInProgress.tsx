import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Receita from '../components/RecipesInProgress';
import { setAnyFilterInGlobal } from '../redux/actions';
import { route } from '../utils/FuncsAll';
import { Dispatch } from '../types';

function RecipesInProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const dispatch: Dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAnyFilterInGlobal({ key: 'id' }, route(pathname), id));
  }, [pathname, id]);
  return (
    <div>
      <Receita />
    </div>
  );
}

export default RecipesInProgress;
