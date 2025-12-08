import PersonalKanban from '../../components/dashboard/manager/PersonalKanban';
import TeamTaskKanban from '../../components/dashboard/manager/TeamTaskKanban';
import CollaborationPortal from '../../components/dashboard/manager/CollaborationPortal';

const ManagerDashboard = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Manager Workspace</h2>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium">
                        Daily Standup View
                    </button>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors text-sm font-medium shadow-lg shadow-purple-500/20">
                        + New Task
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
                {/* Left Column: Personal Kanban (Takes up 2/3 width on large screens) */}
                <div className="lg:col-span-2 h-full">
                    <PersonalKanban />
                </div>

                {/* Right Column: Team & Handoffs */}
                <div className="space-y-6 h-full flex flex-col">
                    <div className="flex-1">
                        <CollaborationPortal />
                    </div>
                    <div className="flex-1">
                        <TeamTaskKanban />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;
