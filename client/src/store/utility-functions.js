export const initialState = { loading: true, userInfo: {}, isNew: true };

export function saveUserInfo(state, action) {
  const userInfo = action.payload;
  return { ...state, userInfo, isNew: true };
}

export function startLoading(state) {
  return { ...state, loading: true };
}

export function endLoading(state) {
  return { ...state, loading: false };
}

export function create(state, action) {
  const { result, token } = action.payload;
  localStorage.setItem("profile", JSON.stringify({ token }));
  return { ...state, userInfo: result, loading: false, isNew: true };
}

export function logout(state) {
  localStorage.clear();
  return { ...state, ...initialState };
}

export function setOld(state) {
  return { ...state, isNew: false };
}
