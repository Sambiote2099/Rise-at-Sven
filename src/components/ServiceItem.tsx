'use client';

interface ServiceItemProps {
  label: string;
  image: string;
  showDivider?: boolean;
  paddingClass?: string;
}

export default function ServiceItem({ label, image, showDivider = true, paddingClass = '' }: ServiceItemProps) {
  return (
    <div className={`pt-2 pb-3 ${paddingClass} cursor-pointer group`}>
      <div className="relative flex items-center gap-3 overflow-hidden py-5 rounded-full w-full">
        {/* Background image */}
        <div
          className="absolute inset-0 rounded-full group-hover:scale-105 opacity-0 group-hover:opacity-100 transition-transform duration-300 ease-[cubic-bezier(0.2,0.9,0.4,1.1)] origin-left"
          style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Arrow — hidden below, slides up on hover */}
        <div className="ml-4 relative overflow-hidden w-7 sm:w-10 flex-shrink-0" style={{ height: '1em', fontSize: '30px' }}>
          <span className="absolute inset-0 flex items-center justify-center text-white font-semibold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.2,0.9,0.4,1.1)]" style={{ fontSize: '30px' }}>
            ↗
          </span>
        </div>

        {/* Label */}
        <p className="relative text-black group-hover:text-white font-semibold font-sans text-[20px] sm:text-[28px] md:text-[40px] leading-none py-1 transition-all duration-500 group-hover:translate-x-6">
          {label}
        </p>
      </div>

      {showDivider && <div className="h-px bg-black/20 ml-6" />}
    </div>
  );
}
