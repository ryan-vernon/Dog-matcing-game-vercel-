import type { DetailedHTMLProps, HTMLAttributes } from 'react'

type MaterialElementProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, unknown>

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      [key: `md-${string}`]: MaterialElementProps
      'md-icon': MaterialElementProps
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [key: `md-${string}`]: MaterialElementProps
      'md-icon': MaterialElementProps
    }
  }
}

export {}
