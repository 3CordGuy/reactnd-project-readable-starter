export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const openModal = ({ id, context }) => ({
  type: OPEN_MODAL,
  id,
  context
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});
