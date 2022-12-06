import { UserJoinRolePosition } from "@/types/5m1e-setting.type"
import { _5M1ERequestSelect } from "@/types/request.type"

export interface I5M1ESettingState {
  fetchSetting: () => void

  isPositionGroupDirect: (uuid: string) => boolean
  isPositionGroupInDirect: (uuid: string) => boolean
  isPositionLL: (uuid: string) => boolean
  isPositionTL: (uuid: string) => boolean
  isPositionMGR: (uuid: string) => boolean
  isPositionFD: (uuid: string) => boolean
  isPositionFM: (uuid: string) => boolean
  isPositionOF: (uuid: string) => boolean
  isPositionSO: (uuid: string) => boolean

  availableEmailForSubmitList: () => UserJoinRolePosition[]
  availableSupporterList: () => UserJoinRolePosition[]
  availableConfirmationList: () => UserJoinRolePosition[]

  canCreateProblemRequest: () => boolean
  canCreateChangePointRequest: () => boolean
}
