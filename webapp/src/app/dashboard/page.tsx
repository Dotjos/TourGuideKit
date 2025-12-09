'use client';
import React from 'react';
import { BarChart3, Plus, Edit, Trash2, Copy, Eye, Activity, Home, LayoutDashboard, Code2, Settings, Menu, X } from 'lucide-react';
import { Sidebar } from '@/components/dashboard/SideBar';
import { ToursView } from '@/components/dashboard/TourView';
import { AnalyticsView } from '@/components/dashboard/Analytics';
import { EmbedView } from '@/components/dashboard/EmbedCode';

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

export default function Dashboard() {
    const [currentView, setCurrentView] = React.useState('tours');
    const [selectedTour, setSelectedTour] = React.useState(null);
    const [isEditingSteps, setIsEditingSteps] = React.useState(false);
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const [tours, setTours] = React.useState(mockTours);
    const [newTour, setNewTour] = React.useState({ name: '', description: '' });
    const [editingStep, setEditingStep] = React.useState(null);


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

    const handleDeleteTour = (tourId) => {
        if (confirm('Delete this tour? All steps will also be deleted.')) {
            setTours(tours.filter(t => t._id !== tourId));
            if (selectedTour?._id === tourId) setSelectedTour(null);
        }
    };

    const handleToggleActive = (tourId) => {
        setTours(tours.map(t =>
            t._id === tourId ? { ...t, isActive: !t.isActive } : t
        ));
    };

    const getEmbedCode = (tourId) => {
        return `<script src="https://cdn.yourdomain.com/tour-widget.js"></script>
<script>
  TourWidget.init({
    tourId: "${tourId}",
    apiKey: "YOUR_API_KEY"
  });
</script>`;
    };

    const copyEmbedCode = (tourId) => {
        navigator.clipboard.writeText(getEmbedCode(tourId));
        alert('Embed code copied to clipboard!');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar setCurrentView={setCurrentView} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition"
                        >
                            <Menu size={24} />
                        </button>
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {currentView === 'tours' && 'Tours'}
                                {currentView === 'analytics' && 'Analytics'}
                                {currentView === 'embed' && 'Embed Code'}
                            </h1>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6">
                    {currentView === 'tours' && <ToursView />}
                    {currentView === 'analytics' && <AnalyticsView />}
                    {currentView === 'embed' && <EmbedView />}
                </main>
            </div>
        </div>
    )
}