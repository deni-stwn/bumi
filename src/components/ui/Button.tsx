import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router'
import { buttonClasses, type ButtonSize, type ButtonVariant } from './buttonStyles'

type ButtonStyleProps = {
  /** Design property `Style` (fill / outline / nofill); `nofill` is called `ghost` here. */
  variant?: ButtonVariant
  size?: ButtonSize
  /** "Show Left Icon" / "Show Right Icon" in the design: pass the icon itself. */
  iconLeft?: ReactNode
  iconRight?: ReactNode
}

function Content({
  iconLeft,
  iconRight,
  children,
}: Pick<ButtonStyleProps, 'iconLeft' | 'iconRight'> & { children?: ReactNode }) {
  return (
    <>
      {iconLeft}
      {children}
      {iconRight}
    </>
  )
}

type ButtonProps = ButtonStyleProps & ComponentProps<'button'>

/** An action. For navigation use `ButtonLink`, which looks the same. */
export function Button({
  variant,
  size,
  iconLeft,
  iconRight,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...props}>
      <Content iconLeft={iconLeft} iconRight={iconRight}>
        {children}
      </Content>
    </button>
  )
}

type ButtonLinkProps = ButtonStyleProps &
  Omit<ComponentProps<'a'>, 'href'> & {
    /** A path inside the site (rendered as a router link) or an absolute URL. */
    to: string
  }

/** Navigation that looks like a button. */
export function ButtonLink({
  variant,
  size,
  iconLeft,
  iconRight,
  className,
  children,
  to,
  ...props
}: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className })
  const content = (
    <Content iconLeft={iconLeft} iconRight={iconRight}>
      {children}
    </Content>
  )
  if (/^(https?:|mailto:|tel:)/.test(to)) {
    return (
      <a href={to} className={classes} {...props}>
        {content}
      </a>
    )
  }
  return (
    <Link to={to} className={classes} {...props}>
      {content}
    </Link>
  )
}
