import { Link, useLocation } from 'react-router'
import { images } from '@/assets/images'
import { LogoOutline } from '@/components/icons/LogoOutline'
import { SlashList } from '@/components/ui/SlashList'
import { contact, footerNav, socialLinks } from '@/data/navigation'
import { cn } from '@/lib/cn'
import { Container } from './Container'
import { isActive } from './isActive'

const photo = images.footerVillaWaterfront

/**
 * Footer component set (14988). Photo 779 px tall with the "Lets Talk !" wordmark on its lower edge,
 * then the link list. Tablet and mobile stack everything centred, 100 px apart; desktop (from xl, where
 * the three blocks fit) puts contact left, links right and the social row near the middle, as placed
 * absolutely in the design (x 550 of 1400).
 */
export function Footer() {
  const { pathname } = useLocation()
  return (
    <footer className="flex flex-col gap-25 pb-25">
      <div className="relative h-194.75">
        <img
          src={photo.src}
          srcSet={photo.srcSet}
          sizes="(min-width: 768px) 100vw, 1168px"
          width={photo.width}
          height={photo.height}
          alt=""
          loading="lazy"
          className="size-full object-cover"
        />
        {/* The photo area clips the wordmark as it rises from the photo's lower edge. */}
        <div data-reveal="wordmark" className="absolute inset-0 overflow-hidden">
          {/* Copy as designed, spacing included (design-notes G7). Baseline 3 px below the photo. */}
          <p className="absolute inset-x-0 -bottom-0.75 text-center font-gloock text-wordmark leading-none text-neutral-white lg:text-wordmark-lg">
            Lets Talk !
          </p>
        </div>
      </div>

      <Container layout="full">
        <div className="relative flex flex-col items-center gap-25 xl:h-102 xl:flex-row xl:items-start xl:justify-between">
          <nav aria-label="Footer" className="xl:order-last">
            <ul className="flex flex-col items-center gap-6 xl:items-end">
              {footerNav.map((item) => {
                const active = isActive(item, pathname)
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      aria-current={active ? 'page' : undefined}
                      data-design-contrast
                      className={cn(
                        // block: the cap-height trim must use the link's own 48/64 px font, not the li's.
                        'block font-gloock text-header-sm uppercase transition-colors duration-200 ease-out md:text-header-md',
                        active ? 'text-gray-950' : 'text-gray-100 hover:text-gray-950',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex flex-col items-center gap-25 xl:h-full xl:items-start xl:gap-58">
            <Link to="/" aria-label="Bumi home" className="text-gray-950">
              <LogoOutline className="h-12 w-15.75" />
            </Link>
            <address
              data-design-contrast
              className="flex w-58 flex-col items-center gap-6 text-center text-body-xs-regular text-gray-200 not-italic xl:items-start xl:text-left"
            >
              <a
                href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
                className="hover:text-gray-950"
              >
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="hover:text-gray-950">
                {contact.email}
              </a>
              <span>{contact.address}</span>
            </address>
          </div>

          <SlashList
            aria-label="Social media"
            data-design-contrast
            className="gap-2 text-body-xs-regular text-gray-200 xl:absolute xl:bottom-0 xl:left-[39.2857%]"
            slashClassName="text-gray-200"
            items={socialLinks.map((s) => (
              <a key={s.label} href={s.to} className="hover:text-gray-950">
                {s.label}
              </a>
            ))}
          />
        </div>
      </Container>
    </footer>
  )
}
