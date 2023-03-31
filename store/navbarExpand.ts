import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface ExpandState {
  expanded: boolean
  toggleExpand: () => void
}

const useNavbarExpand = create<ExpandState>()(
  devtools((set) => ({
    expanded: true,
    toggleExpand: () => set(({ expanded }) => ({ expanded: !expanded })),
  }))
)

export default useNavbarExpand
