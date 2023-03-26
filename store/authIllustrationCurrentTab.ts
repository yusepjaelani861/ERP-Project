import produce from "utils/produce"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface TabState {
  currentIndex: number
  setTabIndex: (index: number) => void
  increaseTabIndex: () => void
}
const useAuthIllustrationCurrentTab = create<TabState>()(
  devtools((set) => ({
    currentIndex: 0,
    increaseTabIndex: () => {
      set((state) =>
        produce(state, (draft) => {
          draft.currentIndex += 1
        })
      )
    },
    setTabIndex: (index) =>
      set((state) =>
        produce(state, (draft) => {
          draft.currentIndex = index
        })
      ),
  }))
)
export default useAuthIllustrationCurrentTab
