export enum Position {
  CENITAL = 'cenital',
  RIGHT = 'right',
  NADIR = 'nadir',
  LEFT = 'left',
  CENTER = 'center'
}

export type Positions = typeof Position[keyof typeof Position]

export enum Layout {
  FULL = 'full',
  FREE = 'free'
}

export type Layouts = typeof Layout[keyof typeof Layout]
