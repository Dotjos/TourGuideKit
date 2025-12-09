import { Copy, Edit, Eye, Plus, Trash2 } from "lucide-react";
import React from "react";
import { StepEditor } from "./StepEditor";

const mockTours = [
    {
        _id: "tour1",
        name: "Product Onboarding",
        description: "Guide users through main features",
        isActive: true,
        createdAt: Date.now() - 86400000 * 7,
        updatedAt: Date.now() - 86400000 * 2,
    },
    {
        _id: "tour2",
        name: "Dashboard Walkthrough",
        description: "Introduction to dashboard features",
        isActive: true,
        createdAt: Date.now() - 86400000 * 3,
        updatedAt: Date.now() - 86400000,
    }
];

const mockSteps = {
    tour1: [
        { _id: "step1", stepId: "welcome", title: "Welcome!", description: "Welcome to our platform", targetElement: "#hero", position: "bottom", order: 0 },
        { _id: "step2", stepId: "features", title: "Key Features", description: "Explore our main features", targetElement: "#features", position: "top", order: 1 },
        { _id: "step3", stepId: "dashboard", title: "Your Dashboard", description: "Access your personal dashboard", targetElement: "#dashboard", position: "right", order: 2 },
        { _id: "step4", stepId: "settings", title: "Settings", description: "Customize your experience", targetElement: "#settings", position: "left", order: 3 },
        { _id: "step5", stepId: "complete", title: "You're Ready!", description: "Start exploring on your own", targetElement: "#cta", position: "bottom", order: 4 },
    ],
    tour2: [
        { _id: "step6", stepId: "nav", title: "Navigation", description: "Use the sidebar to navigate", targetElement: "#sidebar", position: "right", order: 0 },
        { _id: "step7", stepId: "analytics", title: "Analytics", description: "View your tour statistics", targetElement: "#analytics", position: "bottom", order: 1 },
        { _id: "step8", stepId: "create", title: "Create Tours", description: "Click here to create new tours", targetElement: "#create-btn", position: "bottom", order: 2 },
        { _id: "step9", stepId: "embed", title: "Get Embed Code", description: "Copy code to embed tours", targetElement: "#embed", position: "left", order: 3 },
        { _id: "step10", stepId: "help", title: "Need Help?", description: "Access documentation anytime", targetElement: "#help", position: "top", order: 4 },
    ]
};

const mockAnalytics = {
    totalSessions: 342,
    completedSessions: 289,
    completionRate: 84.5,
    skippedCount: 23,
    stepBreakdown: {
        welcome: { started: 342, completed: 335, skipped: 7 },
        features: { started: 335, completed: 320, skipped: 15 },
        dashboard: { started: 320, completed: 310, skipped: 10 },
        settings: { started: 310, completed: 295, skipped: 15 },
        complete: { started: 295, completed: 289, skipped: 6 },
    }
};

interface Tour {
    _id: string;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: number;
    updatedAt: number;
}

interface TourViewProps {
    tour: Tour;
    isCreatingTour: boolean;
    setIsCreatingTour: React.Dispatch<React.SetStateAction<boolean>>;
    newTour: { name: string; description: string };
    setNewTour: React.Dispatch<React.SetStateAction<{ name: string; description: string }>>;
    isEditingSteps: boolean;
    setIsEditingSteps: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ToursView = () => {
    const [selectedTour, setSelectedTour] = React.useState(null);
    const [isCreatingTour, setIsCreatingTour] = React.useState(false);
    const [newTour, setNewTour] = React.useState({ name: '', description: '' });
    const [tours, setTours] = React.useState(mockTours);
    const [isEditingSteps, setIsEditingSteps] = React.useState(false);

    const handleCreateTour = () => {
        if (!newTour.name) return;
        const tour = {
            _id: `tour${Date.now()}`,
            ...newTour,
            isActive: true,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        setTours([...tours, tour]);
        setNewTour({ name: '', description: '' });
        setIsCreatingTour(false);
    };
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Your Tours</h2>
                    <p className="text-gray-600 mt-1">Create and manage onboarding tours</p>
                </div>
                <button
                    onClick={() => setIsCreatingTour(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    <Plus size={20} />
                    Create Tour
                </button>
            </div>

            {isCreatingTour && (
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                    <h3 className="text-xl font-semibold mb-4">Create New Tour</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tour Name
                            </label>
                            <input
                                type="text"
                                value={newTour.name}
                                onChange={(e) => setNewTour({ ...newTour, name: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., Product Onboarding"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={newTour.description}
                                onChange={(e) => setNewTour({ ...newTour, description: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={3}
                                placeholder="Describe what this tour guides users through..."
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleCreateTour}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Create Tour
                            </button>
                            <button
                                onClick={() => {
                                    setIsCreatingTour(false);
                                    setNewTour({ name: '', description: '' });
                                }}
                                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid gap-4">
                {tours.map(tour => (
                    <div key={tour._id} className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:shadow-lg transition">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-semibold text-gray-900">{tour.name}</h3>
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${tour.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {tour.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-4">{tour.description}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span>Created {new Date(tour.createdAt).toISOString().split("T")[0]}</span>
                                    <span>•</span>
                                    <span>{mockSteps[tour._id]?.length || 0} steps</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        setSelectedTour(tour);
                                        setIsEditingSteps(true);
                                    }}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                    title="Edit Steps"
                                >
                                    <Edit size={18} />
                                </button>
                                <button
                                    onClick={() => copyEmbedCode(tour._id)}
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                                    title="Copy Embed Code"
                                >
                                    <Copy size={18} />
                                </button>
                                <button
                                    onClick={() => handleToggleActive(tour._id)}
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                                    title="Toggle Active"
                                >
                                    <Eye size={18} />
                                </button>
                                <button
                                    onClick={() => handleDeleteTour(tour._id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                    title="Delete Tour"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isEditingSteps && selectedTour && (
                <StepEditor
                    tour={selectedTour}
                    onClose={() => {
                        setIsEditingSteps(false);
                        setSelectedTour(null);
                    }}
                />
            )}
        </div>
    )
};