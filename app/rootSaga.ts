
import { all, call } from 'redux-saga/effects';
import { cartSaga } from './saga/cartSaga';
// import { commentSaga } from '../features/anime/AnimeSaga/commentSaga';
// import { authMCSaga } from '../features/auth/authMCSaga';
// import { authSaga } from '../features/auth/authSaga';

export default function* () {

    // yield all([call(authSaga), call(authMCSaga), call(commentSaga)]);
    yield all([call(cartSaga)]);


}
