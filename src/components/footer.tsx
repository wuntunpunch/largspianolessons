interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  return (
    <footer
      className={`bg-[#f6f6f6] border-t border-black/5 py-5 text-center ${className}`}
    >
      <small className="opacity-50">
        &copy; {new Date().getFullYear()} Largs Piano Lessons. All rights
        reserved.
      </small>
    </footer>
  );
}
