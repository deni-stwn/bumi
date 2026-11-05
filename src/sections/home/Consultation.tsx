import { useId } from 'react'
import { images } from '@/assets/images'
import { ArrowUpRightCircleIcon } from '@/components/icons/ArrowUpRightCircleIcon'
import { Container } from '@/components/layout/Container'
import { ButtonLink } from '@/components/ui/Button'

const photo = images.aboutConsultationClients

/**
 * "Your Partner in Every Step of the Journey" (About Section on desktop, Consultation Section on
 * tablet/mobile): photo above the text, beside it on desktop (552 + 40 + 690 of 1282).
 */
export function Consultation() {
  const titleId = useId()
  return (
    <section aria-labelledby={titleId}>
      <Container className="flex flex-col py-25">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[552fr_690fr]">
          <div
            data-reveal="media"
            className="h-101.75 overflow-hidden md:max-lg:rounded-corner-m lg:order-last"
          >
            <img
              src={photo.src}
              srcSet={photo.srcSet}
              sizes="(min-width: 1024px) 48vw, 100vw"
              width={photo.width}
              height={photo.height}
              alt="Two professionals reviewing a property plan on a laptop"
              loading="lazy"
              className="size-full object-cover"
            />
          </div>
          <div className="flex flex-col items-start gap-25 lg:h-101.75 lg:justify-between lg:gap-0">
            <div className="flex flex-col gap-8">
              <h2
                id={titleId}
                data-reveal="lines"
                className="font-gloock text-header-sm text-gray-950"
              >
                Your Partner in Every Step of the Journey
              </h2>
              <p data-reveal="up" data-design-contrast className="text-body-xs-light text-gray-400">
                We are a trusted property agency connecting you with the best opportunities in the
                market. With years of experience, we are ready to guide you through every step of
                buying, selling, or investing in real estate.
              </p>
            </div>
            <ButtonLink
              to="/about"
              variant="ghost"
              size="lg"
              iconRight={<ArrowUpRightCircleIcon />}
              data-reveal="up"
            >
              Learn More
            </ButtonLink>
          </div>
        </div>
        <hr className="mt-25 hidden border-gray-300 lg:block" />
      </Container>
    </section>
  )
}
