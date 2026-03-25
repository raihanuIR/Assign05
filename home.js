const loadIssues = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then(response => response.json())
        .then(json => {
            const issuesArray = json.data || json;
            displayIssues(issuesArray);
        })
        .catch(error => console.error(error));
};

const displayIssues = (issues) => {
    const issuesContainer = document.getElementById('issues-container');
    issuesContainer.innerHTML = "";

    if (issues.length === 0) {
        issuesContainer.innerHTML = `
        <div class="text-center col-span-full bg-white rounded-xl py-10 shadow-sm space-y-5">
            <p class="font-medium text-[#79716B]">No issues found.</p>
        </div>
        `;
        return;
    }

    issues.forEach(issue => {
        const status = issue.status ? issue.status.toLowerCase() : 'open';
        const isClosed = status === 'closed';

        const borderColor = isClosed ? 'border-t-purple-400' : 'border-t-green-400';
        const iconColor = isClosed ? 'text-purple-500' : 'text-green-500';
        const iconClass = isClosed ? 'fa-circle-check' : 'fa-circle-notch';

        const priority = issue.priority ? issue.priority.toLowerCase() : 'high';

        let priorityBg = 'bg-red-50 text-red-500';
        if (priority === 'medium') priorityBg = 'bg-orange-50 text-orange-500';
        if (priority === 'low') priorityBg = 'bg-slate-100 text-slate-500';

        const issueDiv = document.createElement('div');

        issueDiv.innerHTML = `
        <div class="bg-white rounded-xl border border-slate-200 border-t-4 ${borderColor} shadow-sm flex flex-col p-5 h-full">
            
            <div class="flex justify-between items-start mb-3">
                
                <span class="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${priorityBg}">
                    ${issue.priority ? issue.priority : 'High'}
                </span>
            </div>

            <h2 class="text-[16px] font-bold text-slate-800 leading-snug mb-2">${issue.title ? issue.title : "No Title Available"}</h2>
            <p class="text-slate-500 text-[13px] line-clamp-3 mb-4">${issue.description ? issue.description : "No description provided."}</p>

            <div class="flex flex-wrap gap-2 mb-4">
                <span class="px-2 py-1 rounded-full border border-red-200 text-red-500 text-[10px] font-bold flex items-center gap-1">
                    <i class="fa-solid fa-bug"></i> BUG
                </span>
                <span class="px-2 py-1 rounded-full border border-orange-200 text-orange-500 text-[10px] font-bold flex items-center gap-1">
                    <i class="fa-solid fa-hand-holding-heart"></i> HELP WANTED
                </span>
            </div>

            <div class="mt-auto border-t border-slate-100 pt-3 text-[12px] text-slate-400 font-medium">
                <p>#${issue.id ? issue.id : '000'} by ${issue.author ? issue.author : 'admin'}</p>
                <p>${issue.date ? issue.date : '1/15/2024'}</p>
            </div>
            
        </div>
        `;

        issuesContainer.appendChild(issueDiv);
    });
};

loadIssues();