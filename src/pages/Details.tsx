import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch, Form } from '../types';
import { fecthApi } from '../services/fetchApi';
import { setAnyFilterInGlobal, setLoading } from '../redux/actions';

function Details() {
  const dispatch: Dispatch = useDispatch();
  const { id } = useParams();
  const { pathname } = useLocation();
  const keyPage = pathname.includes(`/meals/${id}`) ? 'Details Meals'
    : 'Details Drinks';
  const [product, setProduct] = useState();

  // verifica a rota que está e faz a condicional de forma dinâmica Drinks ou Meals.
  const recipePath = pathname.includes('/meals') ? 'Meal' : 'Drink';

  // faz o fecth e o filtro na API de forma dinâmica e Dispara para qualquer State Global.
  const filterAll = async (form: Form, filter: string = '') => {
    const { search = '', key } = form;
    const data = await fecthApi({ key, search }, recipePath, filter);
    return data;
  };

  useEffect(() => {
    (async () => {
      const data = await filterAll({ key: 'id' }, id);
      setProduct(data);
    })();
    // dispatch(setLoading(true));
    // dispatch(setAnyFilterInGlobal({ key: 'id' }, recipePath, id));
  }, [recipePath, id]);
  return (
    <div>
      <h1>{keyPage}</h1>
      {
        product && (
          <p>{ product[0][`str${recipePath}`]}</p>
        )
      }
    </div>
  );
}

export default Details;
