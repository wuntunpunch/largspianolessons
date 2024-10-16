export default function Footer() {
  return (
    <footer className="bg-[#f6f6f6] border-t border-black/5 py-5 text-center">
      <small className="opacity-50">
        &copy; {new Date().getFullYear()} Largs Piano Lessons. All rights
        reserved.
      </small>
    </footer>
  );
}
