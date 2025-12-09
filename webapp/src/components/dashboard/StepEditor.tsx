import { Plus, X } from "lucide-react";

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
export const StepEditor = ({ tour, onClose }) => {
    const steps = mockSteps[tour._id] || [];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">{tour.name}</h3>
                        <p className="text-gray-600 mt-1">Manage tour steps (min. 5 required)</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-4">
                        {steps.map((step, idx) => (
                            <div key={step._id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold shrink-0">
                                        {idx + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                                        <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                                        <div className="flex gap-4 text-xs text-gray-500">
                                            <span>Target: <code className="bg-gray-200 px-2 py-0.5 rounded">{step.targetElement}</code></span>
                                            <span>Position: <span className="font-medium">{step.position}</span></span>
                                            <span>ID: <code className="bg-gray-200 px-2 py-0.5 rounded">{step.stepId}</code></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {steps.length < 5 && (
                        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-sm text-yellow-800">
                                ⚠️ You need at least 5 steps. Currently have {steps.length}.
                            </p>
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <div className="flex gap-3">
                        <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
                            <Plus size={20} />
                            Add Step
                        </button>
                        <button
                            onClick={onClose}
                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};