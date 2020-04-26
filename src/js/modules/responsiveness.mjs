const isDesktop = matchMedia('(min-width: 1000px) and (pointer: fine').matches;
const isMobile = matchMedia('(max-width: 599px)').matches;

export { isDesktop, isMobile };
