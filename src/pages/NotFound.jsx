import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="m-auto text-center">
      <p className="text-4xl">404</p>
      <p className="text-5xl">Page not found</p>
      <div className="text-3xl mt-4">
        <span className="text-gray-500">Go </span>
        <Link to="/" className="text-[#800000] hover:underline cursor-pointer">
          Home
        </Link>
      </div>
    </div>
  );
}
