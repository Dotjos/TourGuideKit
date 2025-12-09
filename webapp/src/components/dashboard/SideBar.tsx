import { BarChart3, Code2, Home } from "lucide-react";
import React from "react";

export const Sidebar = ({ setCurrentView }: { setCurrentView: (view: string) => void }) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const [currentView, setCurrentViews] = React.useState("tours");

    const toggleCurrentView = (view: string) => {
        setCurrentViews(view);
        setCurrentView(view);
    };

    return (
        <div
            className={`${sidebarOpen ? "w-64" : "w-0"
                } transition-all duration-300 bg-gray-900 text-white flex flex-col overflow-hidden`}
        >
            <div className="p-6 border-b border-gray-800">
                <h1 className="text-xl font-bold">Tour Builder</h1>
                <p className="text-sm text-gray-400 mt-1">Onboarding Platform</p>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                <button
                    onClick={() => toggleCurrentView("tours")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${currentView === "tours" ? "bg-blue-600" : "hover:bg-gray-800"
                        }`}
                >
                    <Home size={20} />
                    <span>Tours</span>
                </button>

                <button
                    onClick={() => toggleCurrentView("analytics")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${currentView === "analytics" ? "bg-blue-600" : "hover:bg-gray-800"
                        }`}
                >
                    <BarChart3 size={20} />
                    <span>Analytics</span>
                </button>

                <button
                    onClick={() => toggleCurrentView("embed")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${currentView === "embed" ? "bg-blue-600" : "hover:bg-gray-800"
                        }`}
                >
                    <Code2 size={20} />
                    <span>Embed Code</span>
                </button>
            </nav>

            <div className="p-4 border-t border-gray-800">
                <div className="flex items-center gap-3 px-4 py-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">JD</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-gray-400">john@example.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
