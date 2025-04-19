
import { store } from "../../../app/stores/store";
import { hideLoading, showLoading } from "./loadingSlice";


export const waitControlShow = (message = "Cargando...") => {
    store.dispatch(showLoading(message));
};

export const waitControlHide = () => {
    store.dispatch(hideLoading());
};