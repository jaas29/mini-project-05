import { Link } from "react-router";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#031926] text-center px-6">
            <h1 className="text-8xl font-bold text-[#77ACA2]">404</h1>
            <h2 className="text-2xl font-semibold text-[#F4E9CD] mt-4">Page Not Found</h2>
            <div className="mt-8">
                <Link
                    to="/dashboard"
                    className="px-6 py-2 rounded-full font-semibold bg-[#77ACA2] text-[#031926] hover:bg-[#9DBEBB] transition-colors"
                >
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
