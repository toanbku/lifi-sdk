import {
  CrossStep,
  LifiStep,
  Route,
  RouteOptions,
  Step,
  SwapStep,
  Token,
} from '@lifinance/types'
import BigNumber from 'bignumber.js'
import { Signer } from 'ethers'
import StatusManager from '../StatusManager'
import { ChainId } from '.'
import { StepExecutor } from '../executionFiles/StepExecutor'
import {
  TransactionReceipt,
  TransactionResponse,
} from '@ethersproject/providers'

export interface TokenWithAmounts extends Token {
  amount?: BigNumber
  amountRendered?: string
}

export type ParsedReceipt = {
  fromAmount?: string
  toAmount: string
  gasUsed: string
  gasPrice: string
  gasFee: string
  toTokenAddress?: string
}

interface ExecutionParams {
  signer: Signer
  step: Step
  statusManager: StatusManager
  hooks: Hooks
}

export interface ExecuteSwapParams extends ExecutionParams {
  step: SwapStep
  parseReceipt: (
    tx: TransactionResponse,
    receipt: TransactionReceipt
  ) => Promise<ParsedReceipt>
}

export interface ExecuteCrossParams extends ExecutionParams {
  step: CrossStep | LifiStep
}

export type CallbackFunction = (updatedRoute: Route) => void

export type Config = {
  apiUrl: string
  rpcs: Record<ChainId, string[]>
  multicallAddresses: Record<ChainId, string | undefined>
  defaultExecutionSettings: Hooks
  defaultRouteOptions: RouteOptions
}

export type ConfigUpdate = {
  apiUrl?: string
  rpcs?: Record<number, string[]>
  multicallAddresses?: Record<number, string | undefined>
  defaultExecutionSettings?: ExecutionSettings
  defaultRouteOptions?: RouteOptions
}

export type SwitchChainHook = (
  requiredChainId: number
) => Promise<Signer | undefined>

export interface ExecutionData {
  route: Route
  executors: StepExecutor[]
  settings: Hooks
}

export interface ExecutionSettings {
  updateCallback?: CallbackFunction
  switchChainHook?: SwitchChainHook
}

export interface Hooks extends ExecutionSettings {
  updateCallback: CallbackFunction
  switchChainHook: SwitchChainHook
}

// Hard to read but this creates a new type that enforces all optional properties in a given interface
export type EnforcedObjectProperties<T> = T & {
  [P in keyof T]-?: T[P]
}

export interface ActiveRouteDictionary {
  [k: string]: ExecutionData
}
