import "./nav-menu.css";

const bookingLink = "john-rodrigues-rqt2lg/15min";
const bookingNamespace = "15min";
const bookingUrl = `https://cal.com/${bookingLink}`;
const bookingConfig = {
  layout: "month_view",
  useSlotsViewOnSmallScreen: "true"
};
const bookingAttributes = {
  "data-cal-link": bookingLink,
  "data-cal-namespace": bookingNamespace,
  "data-cal-config": JSON.stringify(bookingConfig)
};

const academyUrl = "/academy";
const studioUrl = "/";

function openBookingModal(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const calApi = window.Cal?.ns?.[bookingNamespace] || window.Cal;
  if (!calApi) return;

  event.preventDefault();
  calApi("modal", {
    calLink: bookingLink,
    config: bookingConfig
  });
}

export function NavMenu() {
  return (
    <nav className="nav-direct" aria-label="Site navigation">
      <a className="nav-direct-link" href={studioUrl}>
        Studio
      </a>
      <a className="nav-direct-link" href={academyUrl}>
        Academy
      </a>
      <a
        className="nav-direct-book"
        href={bookingUrl}
        {...bookingAttributes}
        onClick={openBookingModal}
      >
        Book a call
      </a>
    </nav>
  );
}
