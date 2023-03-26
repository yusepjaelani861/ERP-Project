import deepClone from "./deepClone"

const produce = <Data>(data: Data, callback: (draft: Data) => void) => {
  if (typeof data === "object") {
    const draft = deepClone(data as Record<any, any>) as Data
    callback(draft)
    return draft
  }

  return data
}
export default produce
