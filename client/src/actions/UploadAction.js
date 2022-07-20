import * as UploadApi from "../api/UploadRequest"

export const uploadImage = (data) => async(dispatch) => {
  try {
    await UploadApi.uploadImage(data)
  } catch (error) {
    console.log(error);
  }
}

export const uploadPost = (desc) => async(dispatch) => {
  dispatch({type: "UPLOAD_START"})
  try {
    const newPost = await UploadApi.uploadPost(desc)
    dispatch({type: "UPLOAD_SUCCESS", data: newPost.data})
  } catch (error) {
    console.log(error);
    dispatch({type: "UPLOAD_FAIL"})
  }
}