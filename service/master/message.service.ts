export const toastMessage = (
  toast: any,
  summary: string,
  detail: string,
  severity: string,
  life: number
) => {
  toast.current?.show({
    severity,
    summary,
    detail,
    life
  })
}
