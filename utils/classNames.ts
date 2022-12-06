export const classNames = (...classes) => {
  console.log(classes)
  return classes.filter(Boolean).join(' ')
}
