export interface IRequestFilterState {
  selectedRequestType: string | null

  availableCategory: () => string[]

  setSelectedRequestType: (value: string | null) => void

  reset: () => void
}