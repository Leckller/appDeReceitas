import { useLocation, useParams } from 'react-router-dom';

function Details() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const keyPage = pathname.includes(`/meals/${id}`) ? 'Details Meals'
    : 'Details Drinks';
  return (
    <div>
      <h1>{ keyPage }</h1>
    </div>
  );
}

export default Details;
