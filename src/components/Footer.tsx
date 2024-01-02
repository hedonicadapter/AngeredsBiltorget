import {
  WhileInViewTransitionWrapper,
  SCMotionDiv,
} from './MotionComponents.tsx';
import './styles/footer.css';

const HittaHit = (props) => {
  return (
    <section className='py-5'>
      <h4 className='text-sm text-on-bg-lightest'>Hitta hit</h4>
      <a
        target='_blank'
        // href={props?.companyInfo?.companyAddressGMapsLink}
        className='flex flex-row items-center gap-5'
      >
        <svg
          className='fill-text-on-bg shrink-0'
          xmlns='http://www.w3.org/2000/svg'
          width='22'
          height='22'
          fill='currentColor'
          className='bi bi-geo-alt-fill'
          viewBox='0 0 16 16'
        >
          <p
            className='text-on-bg-medium'
            ath
            d='M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z'
          ></p>
        </svg>

        <span>
          <div>{props?.companyInfo?.address?.street}</div>
          <div>
            {props?.companyInfo?.address?.zip}
            {props?.companyInfo?.address?.city}
          </div>
        </span>
      </a>
    </section>
  );
};

const OppetTider = (props) => {
  return (
    <section className='footer-section'>
      <h4 className='text-sm text-on-bg-lightest'>Öppettider</h4>
      <p className='text-on-bg-medium'>
        {props?.googleInfo?.regularOpeningHours.weekdayDescriptions.map(
          (desc: string) => (
            <>
              {desc}
              <br />
            </>
          )
        )}
      </p>
    </section>
  );
};

const Logo = () => {
  return (
    <SCMotionDiv
      transition={{
        delay: 0.15,
        duration: 0.25,
        type: 'spring',
        damping: 6,
        mass: 0.45,
        stiffness: 100,
      }}
      initial={{ scale: 0.86, opacity: 0.6 }}
      whileInView={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.86, opacity: 0.6 }}
      className='w-fit h-fit -mt-9 md:mt-0'
    >
      <img
        src={'/images/logo.svg'}
        alt={`Company logo`}
        width='80'
        height='80'
        className='min-w-fit min-h-fit'
      />
    </SCMotionDiv>
  );
};

const Info = () => {
  return (
    <section className='footer-section'>
      <h4 className='text-sm text-on-bg-lightest'>Information</h4>
      <div className='flex flex-col gap-3 list-none child:flex child:flex-row child:items-start child:gap-4'>
        <a target='_blank' href='/omoss' className='footer-anchor'>
          Om oss
        </a>
        <a target='_blank' href='/qanda' className='footer-anchor'>
          Vanliga frågor & svar
        </a>
      </div>
    </section>
  );
};

const SocialMedia = (props) => {
  return (
    <section className='footer-section'>
      <h4 className='text-sm text-on-bg-lightest mb-2'>Social media</h4>
      <div className='flex flex-row gap-5 list-none child:flex child:flex-row child:items-center child:gap-4'>
        <a
          target='_blank'
          href={props?.companyInfo?.facebook}
          className='footer-anchor'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='22'
            height='22'
            fill='currentColor'
            className='fill-text-on-bg bi bi-facebook'
            viewBox='0 0 16 16'
          >
            <p
              className='text-on-bg-medium'
              ath
              d='M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z'
            ></p>
          </svg>
        </a>
        <a
          target='_blank'
          href={props?.companyInfo?.instagram}
          className='footer-anchor'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='22'
            height='22'
            fill='currentColor'
            className='fill-text-on-bg bi bi-instagram'
            viewBox='0 0 16 16'
          >
            <p
              className='text-on-bg-medium'
              ath
              d='M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z'
            ></p>
          </svg>
        </a>
        <a
          target='_blank'
          href={props?.companyInfo?.twitter}
          className='footer-anchor'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='22'
            height='22'
            fill='currentColor'
            className='fill-text-on-bg bi bi-twitter-x'
            viewBox='0 0 16 16'
          >
            <p
              className='text-on-bg-medium'
              ath
              d='M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z'
            ></p>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default function Footer({
  companyInfo,
  googleInfo,
  placesApiKey,
}: {
  companyInfo?: any;
  googleInfo?: any;
  placesApiKey?: string;
}) {
  return (
    <footer className='z-40 relative flex flex-col justify-between mb-0 mt-auto text-on-bg bg-bg pt-7'>
      <WhileInViewTransitionWrapper>
        <div className='flex flex-row justify-center md:w-full lg:w-grp-half-7 md:mx-auto md:block pt-6 pb-8'>
          <div
            className={`flex flex-row justify-evenly items-start child:mx-4`}
          >
            <Logo />
            <div className='flex flex-col gap-4'>
              <Info />
              <SocialMedia companyInfo={companyInfo} />
            </div>
            <OppetTider googleInfo={googleInfo} />
            <div className='flex flex-row lg:gap-7 md:gap-2'>
              <SCMotionDiv
                transition={{
                  duration: 0.2,
                  type: 'spring',
                  damping: 6,
                  mass: 0.45,
                  stiffness: 100,
                }}
                initial={{ scale: 0.86, opacity: 0.6 }}
                whileInView={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.86, opacity: 0.6 }}
                id='map'
                className='w-fit h-fit rounded-[100%] md:rounded-none overflow-hidden relative shrink-0'
              >
                <img
                  src={`https://maps.googleapis.com/maps/api/staticmap?center=${
                    googleInfo?.location.latitude
                  },${
                    googleInfo?.location.longitude
                  }&zoom=15&size=220x220&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=${
                    import.meta.env.PUBLIC_PLACES_API_KEY
                  }&map_id=footer_map_pastel`}
                  className='m-auto md:w-[90%] md:h-[90%] md:squircle-sm '
                />
              </SCMotionDiv>
              <HittaHit companyInfo={companyInfo} />
            </div>
          </div>
          <div
            className={`flex md:hidden flex-col gap-8 child:flex child:flex-row child:items-center child:shrink-0 child:xs:gap-4`}
          >
            <div className='gap-6 justify-end px-8'>
              <div>
                <div className='flex flex-col mr-0 ml-auto w-fit'>
                  <HittaHit companyInfo={companyInfo} />
                  <OppetTider googleInfo={googleInfo} />
                </div>
              </div>
              <div className=''>
                <SCMotionDiv
                  transition={{
                    duration: 0.2,
                    type: 'spring',
                    damping: 6,
                    mass: 0.45,
                    stiffness: 100,
                  }}
                  initial={{ scale: 0.86, opacity: 0.6 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.86, opacity: 0.6 }}
                  id='map'
                  className='w-fit h-fit rounded-[100%] overflow-hidden aspect-square'
                >
                  <img
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=${googleInfo?.location.latitude},${googleInfo?.location.longitude}&zoom=15&size=220x220&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=${placesApiKey}&map_id=footer_map_pastel`}
                    width='184'
                    height='184'
                    className='object-cover min-w-[184px] min-h-[184px]'
                  />
                </SCMotionDiv>
              </div>
            </div>
            <div className='gap-8 px-8 justify-center shrink-0'>
              <div className='flex flex-row justify-end'>
                <Logo companyInfo={companyInfo} />
              </div>
              <div>
                <Info />
                <SocialMedia companyInfo={companyInfo} />
              </div>
            </div>
          </div>
        </div>
      </WhileInViewTransitionWrapper>

      <div className='flex flex-col h-9 justify-evenly mt-7 '>
        <hr className='border-surface-variant' />
        <div className='text-sm text-on-bg-light flex flex-col-reverse justify-between gap-2 px-7 lg:sides md:sides sm:flex-row md:flex-row lg:flex-row'>
          <div>
            © {new Date().getFullYear()}&nbsp;{companyInfo?.name}
          </div>
          <div className='flex flex-row gap-4 uppercase sm:gap-6 md:gap-6 lg:gap-6'>
            <a href='/privacyPolicy'>Privacy Policy</a>
            <a href='/cookiePolicy'>Cookie Policy</a>
            <a href='/terms'>Terms</a>
            <a href='/sitemap'>Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}