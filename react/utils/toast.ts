export const showToast = (message: string) => {
  window.top.postMessage(
    {
      action: {
        type: 'SHOW_TOAST',
        payload: { message, horizontalPosition: 'right' },
      },
    },
    '*'
  )
}
