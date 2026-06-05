'use client';
import Image from "next/image";
import { useState, useEffect } from "react";

type SubLink = {
  label: string;
  image: string;
};

type NavLink = {
  label: string;
  hasDropdown: boolean;
  subLinks?: SubLink[];
};

const NAV_LINKS: NavLink[] = [
  {
    label: 'Services', hasDropdown: true,
    subLinks: [
      { label: 'Search & Growth Strategy', image: 'https://images.unsplash.com/photo-1553013746-013d9c76dfa2?w=600&auto=format&fit=crop' },
      { label: 'Onsite SEO', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop' },
      { label: 'Content Experience', image: 'https://images.unsplash.com/photo-1778071073381-1a4dc5650727?w=600&auto=format&fit=crop' },
      { label: 'B2B Marketing', image: 'https://images.unsplash.com/photo-1777266450837-94423d75af89?w=600&auto=format&fit=crop' },
      { label: 'Digital PR', image: 'https://images.unsplash.com/photo-1553013746-013d9c76dfa2?w=600&auto=format&fit=crop' },
      { label: 'Social Media & Campaigns', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop' },
      { label: 'Data & Insights', image: 'https://images.unsplash.com/photo-1778071073381-1a4dc5650727?w=600&auto=format&fit=crop' },
      { label: 'Social SEO/Search', image: 'https://images.unsplash.com/photo-1777266450837-94423d75af89?w=600&auto=format&fit=crop' },
    ],
  },
  {
    label: 'Industries', hasDropdown: true,
    subLinks: [
      { label: 'eCommerce', image: 'https://images.unsplash.com/photo-1553013746-013d9c76dfa2?w=600&auto=format&fit=crop' },
      { label: 'Finance', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop' },
      { label: 'Travel', image: 'https://images.unsplash.com/photo-1778071073381-1a4dc5650727?w=600&auto=format&fit=crop' },
      { label: 'Technology', image: 'https://images.unsplash.com/photo-1777266450837-94423d75af89?w=600&auto=format&fit=crop' },
    ],
  },
  {
    label: 'International', hasDropdown: true,
    subLinks: [
      { label: 'UK', image: 'https://images.unsplash.com/photo-1553013746-013d9c76dfa2?w=600&auto=format&fit=crop' },
      { label: 'USA', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop' },
      { label: 'Europe', image: 'https://images.unsplash.com/photo-1778071073381-1a4dc5650727?w=600&auto=format&fit=crop' },
    ],
  },
  {
    label: 'About', hasDropdown: true,
    subLinks: [
      { label: 'Our Story', image: 'https://images.unsplash.com/photo-1553013746-013d9c76dfa2?w=600&auto=format&fit=crop' },
      { label: 'Team', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop' },
      { label: 'Culture', image: 'https://images.unsplash.com/photo-1778071073381-1a4dc5650727?w=600&auto=format&fit=crop' },
    ],
  },
  { label: 'Work', hasDropdown: false },
  { label: 'Careers', hasDropdown: false },
  {
    label: 'Blog & Resources', hasDropdown: true,
    subLinks: [
      { label: 'Blog', image: 'https://images.unsplash.com/photo-1553013746-013d9c76dfa2?w=600&auto=format&fit=crop' },
      { label: 'Case Studies', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop' },
      { label: 'Guides', image: 'https://images.unsplash.com/photo-1778071073381-1a4dc5650727?w=600&auto=format&fit=crop' },
    ],
  },
  { label: 'Webinar', hasDropdown: false },
];

function SubLinkItem({ label, image, onHover }: { label: string; image: string; onHover: (img: string) => void }) {
  return (
    <a
      href="#"
      onMouseEnter={() => onHover(image)}
      className="relative font-semibold text-[15px] text-black whitespace-nowrap overflow-hidden group flex items-center py-0.5"
    >
      <div className="relative overflow-hidden flex items-center h-[1.3em]">
        <span className="absolute inset-0 flex items-center transition-all duration-500 ease-[cubic-bezier(0.2,0.9,0.4,1.1)] group-hover:-translate-y-[140%]">
          {label}
        </span>
        <span className="invisible flex items-center">{label}</span>
        <span className="absolute inset-0 flex items-center translate-y-[140%] transition-all duration-500 ease-[cubic-bezier(0.2,0.9,0.4,1.1)] group-hover:translate-y-0">
          {label}
        </span>
      </div>
    </a>
  );
}

function DropdownPanel({ subLinks }: { subLinks: SubLink[] }) {
  const [activeImage, setActiveImage] = useState(subLinks[0].image);
  const [blurred, setBlurred] = useState(false);

  const handleHover = (image: string) => {
    if (image === activeImage) return;
    setBlurred(true);
    setTimeout(() => {
      setActiveImage(image);
      setBlurred(false);
    }, 150);
  };

  const half = Math.ceil(subLinks.length / 2);
  const col1 = subLinks.slice(0, half);
  const col2 = subLinks.slice(half);

  return (
    <div className="fixed left-1/2 transition-all duration-500 -translate-x-1/2 mt-8 h-[280px] w-[min(850px,92vw)] bg-white rounded-2xl shadow-2xl p-6 flex gap-6 z-50">
      {/* Links */}
      <div className="flex gap-10 lg:gap-18 flex-10 justify-center">
        <p className="absolute left-15 mt-6 scale-95 text-slate-500 font-sans hidden lg:block">core services</p>
        <div className="justify-center flex flex-col gap-1">
          {col1.map((sub) => (
            <SubLinkItem key={sub.label} label={sub.label} image={sub.image} onHover={handleHover} />
          ))}
        </div>
        {col2.length > 0 && (
          <div className="justify-center flex flex-col gap-1">
            {col2.map((sub) => (
              <SubLinkItem key={sub.label} label={sub.label} image={sub.image} onHover={handleHover} />
            ))}
          </div>
        )}
      </div>

      {/* Image */}
      <div className="w-[180px] lg:w-[220px] h-[232px] rounded-xl overflow-hidden flex-shrink-0 relative hidden md:block">
        <Image
          src={activeImage}
          alt="preview"
          fill
          className={`object-cover transition-all duration-300 ${blurred ? 'blur-sm' : 'blur-0'}`}
        />
        <div className="absolute bottom-1 left-1">
          <button className="relative bg-black text-white text-[13px] font-semibold px-3.5 py-3 transition-all duration-500 rounded-[25px] hover:rounded-xl w-full overflow-hidden group">
            <div className="relative overflow-hidden flex items-center justify-between h-[1.2em]">
              <span className="absolute inset-0 flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.2,0.9,0.4,1.1)] group-hover:-translate-y-[140%]">
                View All Services<span>↗</span>
              </span>
              <span className="invisible flex items-center justify-between w-full">View All Services <span> ↗</span></span>
              <span className="absolute inset-0 flex items-center justify-between translate-y-[140%] transition-all duration-500 ease-[cubic-bezier(0.2,0.9,0.4,1.1)] group-hover:translate-y-0">
                View All Services<span> ↗</span>
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// Mobile menu drawer
function MobileMenu({ open, onClose, isAtTop }: { open: boolean; onClose: () => void; isAtTop: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-[998] bg-white flex flex-col transition-transform duration-500 ${open ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex items-center justify-between px-6 pt-8 pb-4 border-b border-black/10">
        <span className="text-[24px] font-semibold font-sans text-black">Rise at Seven</span>
        <button onClick={onClose} className="text-black text-3xl leading-none">&times;</button>
      </div>
      <nav className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-1">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href="#"
            onClick={onClose}
            className="text-black font-semibold text-[22px] py-3 border-b border-black/10 flex items-center justify-between"
          >
            {link.label}
            {link.hasDropdown && <span className="text-lg">+</span>}
          </a>
        ))}
      </nav>
      <div className="px-6 pb-8">
        <button className="w-full bg-black text-white font-semibold text-[16px] py-4 rounded-[25px]">
          Get In Touch ↗
        </button>
      </div>
    </div>
  );
}

export default function Navbar({ onMenuChange }: { onMenuChange?: (open: boolean) => void }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const setMenu = (val: string | null) => {
    setOpenMenu(val);
    onMenuChange?.(val !== null);
  };

  const toggleMobile = () => {
    const next = !mobileOpen;
    setMobileOpen(next);
    onMenuChange?.(next);
  };

  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsAtTop(currentScrollY < 10);
      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <MobileMenu open={mobileOpen} onClose={toggleMobile} isAtTop={isAtTop} />
      <nav
        className={`fixed top-4 sm:top-12 left-0 right-0 z-[999] mx-auto mt-4 w-[96%] sm:w-[98%]
          rounded-full px-4 sm:px-5 py-2.5 flex items-center justify-between
          transition-transform transition-colors duration-500 ease-in-out
          ${isVisible ? 'translate-y-0' : '-translate-y-[140%]'}
          ${isAtTop ? 'bg-transparent' : 'bg-white/30 backdrop-blur-md shadow-lg'}`}
        onMouseLeave={() => setMenu(null)}
      >
        {/* Logo */}
        <div className={`flex text-[20px] sm:text-[26px] z-10 transition-colors duration-500 ${isAtTop ? 'text-white' : 'text-black'}`}>
          <p>Rise at Seve</p>
          <Image
            src="https://res.cloudinary.com/diasvvkil/image/upload/v1778521606/Screenshot_11-5-2026_22421_riseatseven.com-removebg-preview_e66fcw.png"
            alt="logo"
            width={181}
            height={151}
            className="object-fill mt-3 h-5 w-5"
          />
        </div>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center z-50 relative">
          {NAV_LINKS.map((link) => (
            <li
              key={link.label}
              className="relative"
              onMouseEnter={() => link.hasDropdown ? setMenu(link.label) : setMenu(null)}
            >
              <a
                href="#"
                className={`font-semibold py-0.5 px-3 xl:px-4 text-[13px] xl:text-[15px] rounded-full whitespace-nowrap flex items-center transition-[background-color,color] duration-300 ${
                  isAtTop
                    ? 'text-white hover:bg-white hover:text-black'
                    : 'text-black hover:bg-black hover:text-white'
                }`}
              >
                {link.label}{link.hasDropdown && <span className="text-[16px] ml-0.5">+</span>}
              </a>

              {link.hasDropdown && link.subLinks && openMenu === link.label && (
                <DropdownPanel subLinks={link.subLinks} />
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <button className={`hidden lg:block relative font-sans text-[15px] font-semibold px-6 py-3 rounded-[25px] hover:rounded-lg duration-500 transition-all whitespace-nowrap overflow-hidden group ${
          isAtTop ? 'bg-white text-black' : 'bg-black text-white'
        }`}>
          <div className="relative overflow-hidden flex items-center gap-1">
            <span className="flex items-center gap-1 transition-all duration-500 ease-[cubic-bezier(0.2,0.9,0.4,1.1)] group-hover:-translate-y-[140%]">
              Get In Touch <span className="text-[15px]">↗</span>
            </span>
            <span className="absolute inset-0 flex items-center gap-1 translate-y-[140%] transition-all duration-500 ease-[cubic-bezier(0.2,0.9,0.4,1.1)] group-hover:translate-y-0">
              Get In Touch <span className="text-[15px]">↗</span>
            </span>
          </div>
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={toggleMobile}
          className={`lg:hidden flex flex-col gap-1.5 p-2 ${isAtTop ? 'text-white' : 'text-black'}`}
          aria-label="Open menu"
        >
          <span className={`block w-6 h-0.5 ${isAtTop ? 'bg-white' : 'bg-black'} transition-all`} />
          <span className={`block w-6 h-0.5 ${isAtTop ? 'bg-white' : 'bg-black'} transition-all`} />
          <span className={`block w-4 h-0.5 ${isAtTop ? 'bg-white' : 'bg-black'} transition-all`} />
        </button>
      </nav>
    </>
  );
}
