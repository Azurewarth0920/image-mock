import { createCanvas as CreateCanvas, CanvasRenderingContext2D } from 'canvas'

const defaultArgs = {
  width: 100,
  height: 100,
  backgroundColor: '#000000',
  text: '',
  font: 'Roboto',
  fontSize: 20,
  color: '#fff',
  imageType: 'png',
} as const

type Args = {
  width: number
  height: number
  backgroundColor?: string
  text?: string
  font?: string
  fontSize?: number
  color?: string
  borderRadius?: number | { tl?: number; tr?: number; br?: number; bl?: number }
  imageType?: 'png' | 'jpeg'
}

type NormalizedArgs = Omit<Required<Args>, 'borderRadius' | 'imageType'> & {
  borderRadius: { tl: number; tr: number; br: number; bl: number }
  imageType?: 'png' | 'jpeg' | 'webp'
}

type ClientArgs = Omit<Args, 'imageType'> & {
  imageType?: 'png' | 'jpeg' | 'webp'
}

const normalizeArgs = (args: Args | ClientArgs) => {
  const { borderRadius, ...rest } = args

  return {
    ...defaultArgs,
    ...rest,
    borderRadius:
      typeof borderRadius === 'number'
        ? {
            tl: borderRadius,
            tr: borderRadius,
            br: borderRadius,
            bl: borderRadius,
          }
        : {
            ...{ tl: 0, tr: 0, br: 0, bl: 0 },
            ...borderRadius,
          },
  }
}

const write = (
  ctx: CanvasRenderingContext2D | globalThis.CanvasRenderingContext2D,
  normalizedArgs: NormalizedArgs
) => {
  const {
    width,
    height,
    backgroundColor,
    text,
    font,
    fontSize,
    color,
    borderRadius,
  } = normalizedArgs

  // Fill image
  const { tl, tr, bl, br } = borderRadius
  ctx.fillStyle = backgroundColor
  ctx.beginPath()
  ctx.moveTo(0 + tl, 0)
  ctx.lineTo(0 + width - tr, 0)
  ctx.quadraticCurveTo(0 + width, 0, width, tr)
  ctx.lineTo(width, height - br)
  ctx.quadraticCurveTo(width, height, width - br, height)
  ctx.lineTo(bl, height)
  ctx.quadraticCurveTo(0, height, 0, height - bl)
  ctx.lineTo(0, tl)
  ctx.quadraticCurveTo(0, 0, tl, 0)
  ctx.closePath()
  ctx.fill()

  // Fill text
  ctx.font = `${fontSize}px ${font}`
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, width / 2, height / 2)
}

export const server = (args: Args) => {
  const { createCanvas } = require('canvas')
  const normalizedArgs = normalizeArgs(args)
  const canvas = createCanvas(
    normalizedArgs.width,
    normalizedArgs.height
  ) as ReturnType<typeof CreateCanvas>
  write(canvas.getContext('2d'), normalizedArgs)

  return {
    toBase64: () => {
      if (normalizedArgs.imageType === 'jpeg') {
        return canvas.toDataURL('image/jpeg')
      }
      return canvas.toDataURL('image/png')
    },
    toBuffer: () => {
      if (normalizedArgs.imageType === 'jpeg') {
        return canvas.toBuffer('image/jpeg')
      }
      return canvas.toBuffer('image/png')
    },
  }
}

export const client = (args: ClientArgs) => {
  if (!window || !window.document) {
    throw new Error(
      'Client mock image can only be created in browser environment'
    )
  }

  const normalizedArgs = normalizeArgs(args)
  const canvas = document.createElement('canvas')
  canvas.width = normalizedArgs.width
  canvas.height = normalizedArgs.height
  const context = canvas.getContext('2d')
  if (!context) return
  write(context, normalizedArgs)

  return canvas.toDataURL(`image/${args.imageType}`)
}

export default (args: Args) => {
  if (typeof window === 'undefined') {
    return server(args).toBase64()
  }

  return client(args)
}
