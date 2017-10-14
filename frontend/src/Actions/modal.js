export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const openModal = postId => ({
  type: OPEN_MODAL,
  postId
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});
