import {
  GET_LOGS,
  ADD_LOG,
  DELETE_LOG,
  SET_LOADING,
  LOGS_ERROR,
  CLEAR_CURRENT,
  SET_CURRENT,
  SEARCH_LOGS,
  UPDATE_LOG,
} from "./types";

//Get logs
export const getLogs = () => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch("/logs");
    const data = await res.json();
    dispatch({
      type: GET_LOGS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.message,
    });
  }
};
//Delete log
export const deleteLog = (id) => async (dispatch) => {
  try {
    setLoading();
    await fetch(`/logs/${id}`, {
      method: "DELETE",
    });
    dispatch({
      type: DELETE_LOG,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.message,
    });
  }
};
//Update log
export const updateLog = (log) => async (dispatch) => {
  try {
    setLoading();
    console.log(log, "before fetch");
    const res = await fetch(`/logs/${log.id}`, {
      method: "PUT",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    dispatch({
      type: UPDATE_LOG,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.message,
    });
  }
};
//Add log
export const addLog = (log) => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch("/logs", {
      method: "POST",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    dispatch({
      type: ADD_LOG,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.message,
    });
  }
};

//Search logs
export const searchLogs = (text) => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch(`/logs?q=${text}`);
    const data = await res.json();
    dispatch({
      type: SEARCH_LOGS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.message,
    });
  }
};
//set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
//set current log
export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    payload: log,
  };
};
//Clear current log
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};
