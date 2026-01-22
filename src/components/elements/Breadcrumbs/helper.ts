import { toUpperFirst } from '@utils/index'

export const mappedPath = (pathname: string) => {
  return pathname
    .split('/')
    .filter((item) => !['detail', 'edit', 'send', ''].includes(item))
    .map((item) => ({
      name: item
        .split('-')
        .map((word) => toUpperFirst(word))
        .join(' '),
      path: item,
    }))
}

export const slicePath = (path: string, index: number) => {
  // const pathNotUsed = array.slice(-1)
  // const arrFilter = array.filter((item) => item.name !== pathNotUsed[0].name)
  // let newPath = ''
  // for (let i = 0; i < arrFilter.length; i++) {
  //   newPath += `/${arrFilter[i].path}`
  // }

  const pathname = path.split('/').filter((item) => ![''].includes(item))
  const actionKey = pathname.findIndex((item) =>
    ['detail', 'edit', 'send'].includes(item)
  )

  let newPath = pathname.slice(0, -1).join('/')

  if (index === 0 && pathname[0] !== 'sistem') {
    newPath = `/${pathname[0]}`
  }

  if (index === 0 && pathname[0] !== 'settings') {
    newPath = `/${pathname[0]}`
  }

  if (actionKey >= 2) {
    newPath = pathname.slice(0, -actionKey).join('/')
  }

  return newPath
}
