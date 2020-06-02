const localStorageId = 'wfCheclist-85c28a91-2d06-4407-b9d1-722864f5b9e8'

export const getDataFromLocalStorage = () => {
  return localStorage.getItem(localStorageId)
}

export const saveDataToLocalStorage = (data) => {
  localStorage.setItem(localStorageId, JSON.stringify(data))
}
