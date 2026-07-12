
/* ---------- Simple inline icon set (no external icon deps) ---------- */
const Icon = ({ path, size = 20, className = "", strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    {path}
  </svg>
);
const IClipboard = (p) => <Icon {...p} path={<>
  <rect x="6" y="4" width="12" height="16" rx="2"/><path d="M9 4V3a1 1 0 011-1h4a1 1 0 011 1v1"/><path d="M9 10h6M9 14h6"/>
</>}/>;
const IHome = (p) => <Icon {...p} path={<><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V9.5"/></>}/>;
const IList = (p) => <Icon {...p} path={<><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/></>}/>;
const IFlag = (p) => <Icon {...p} path={<><path d="M5 3v18"/><path d="M5 4h11l-2 4 2 4H5"/></>}/>;
const ICalendar = (p) => <Icon {...p} path={<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></>}/>;
const ISettings = (p) => <Icon {...p} path={<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.9 2.9l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.6V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.6 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.9-2.9l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.6-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.6-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.9-2.9l.1.1a1.7 1.7 0 001.9.3H9a1.7 1.7 0 001-1.6V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.6 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.9 2.9l-.1.1a1.7 1.7 0 00-.3 1.9V9a1.7 1.7 0 001.6 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.6 1z"/></>}/>;
const ISun = (p) => <Icon {...p} path={<><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>}/>;
const IMoon = (p) => <Icon {...p} path={<path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/>}/>;
const IUser = (p) => <Icon {...p} path={<><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-6 8-6s8 2 8 6"/></>}/>;
const IPlus = (p) => <Icon {...p} path={<path d="M12 5v14M5 12h14"/>}/>;
const IMore = (p) => <Icon {...p} path={<><circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/></>}/>;
const IX = (p) => <Icon {...p} path={<path d="M18 6 6 18M6 6l12 12"/>}/>;
const IChevronLeft = (p) => <Icon {...p} path={<path d="M15 18l-6-6 6-6"/>}/>;
const IChevronRight = (p) => <Icon {...p} path={<path d="M9 18l6-6-6-6"/>}/>;
const ICheckCircle = (p) => <Icon {...p} path={<><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></>}/>;
const ICircle = (p) => <Icon {...p} path={<circle cx="12" cy="12" r="9"/>}/>;
const IPencil = (p) => <Icon {...p} path={<><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/></>}/>;
const ITrash = (p) => <Icon {...p} path={<><path d="M3 6h18"/><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6"/><path d="M10 11v6M14 11v6"/></>}/>;
const IGrad = (p) => <Icon {...p} path={<><path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/></>}/>;
const IFileText = (p) => <Icon {...p} path={<><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/></>}/>;
const ITrash2Big = (p) => <Icon {...p} path={<><path d="M3 6h18"/><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6"/></>}/>;
const IBell = (p) => <Icon {...p} path={<><path d="M6 8a6 6 0 0112 0c0 4 1.5 5 1.5 6h-15S6 12 6 8z"/><path d="M10 20a2 2 0 004 0"/></>}/>;

