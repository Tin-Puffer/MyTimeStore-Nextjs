
import { all, call } from 'redux-saga/effects';
import { authSaga } from './saga/authSaga';
import { cartSaga } from './saga/cartSaga'
export default function* () {
    yield all([call(cartSaga),call(authSaga)]);
}
