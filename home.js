let currentTab = "all";
const tabActive = ["btn-primary"];
const tabInactive = ["btn-outline", "border-slate-300", "text-slate-600", "bg-transparent"];

const issueCount = document.getElementById("issue-count");

const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("issues-container").classList.add("hidden");
    } else {
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("issues-container").classList.remove("hidden");
    }

}

function switchTab(tab) {
    
    const tabs = ["all", "open", "closed"];
    currentTab = tab;

    for (const t of tabs) {
        const tabName = document.getElementById("tab-" + t);
        if (t === tab) {
            tabName.classList.remove(...tabInactive);
            tabName.classList.add(...tabActive);
        } else {
            tabName.classList.remove(...tabActive);
            tabName.classList.add(...tabInactive);
        }
    }

    const allCards = document.querySelectorAll(".issue-card");
    for (const card of allCards) {
        const cardStatus = card.getAttribute("data-status");
        if (tab === "all" || cardStatus === tab) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    }
    updateStat();
}


function updateStat() {

    const allCardsList = document.querySelectorAll(".issue-card");
    const openCardsList = document.querySelectorAll('.issue-card[data-status="open"]');
    const closedCardsList = document.querySelectorAll('.issue-card[data-status="closed"]');

    const counts = {
        all: allCardsList.length,
        open: openCardsList.length,
        closed: closedCardsList.length,
    };

    issueCount.innerText = counts[currentTab];
}


const loadIssues = () => {
    manageSpinner(true);
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


        const priority = issue.priority ? issue.priority.toLowerCase() : 'high';

        let priorityBg = 'bg-[#FEECEC] text-[#EF4444]';
        if (priority === 'medium') priorityBg = 'bg-[#FFF6D1] text-[#F59E0B]';
        if (priority === 'low') priorityBg = 'bg-[#EEEFF2] text-[#9CA3AF]';

        const issueDiv = document.createElement('div');
        issueDiv.className = "issue-card";
        issueDiv.setAttribute("data-status", status);

        issueDiv.innerHTML = `
        <div class="bg-white rounded-xl border border-slate-200 border-t-4 ${borderColor} shadow-sm flex flex-col p-5 h-full">
            
            <div class="flex justify-between items-start mb-3">
                <span class="px-2 py-1 rounded-full text-[10px] font-bold uppercase ${priorityBg}">
                    ${issue.priority}
                </span>
            </div>

            <h2 class="text-[16px] font-semibold text-[#1F2937] mb-2">${issue.title ? issue.title : "No Title Available"}</h2>
            <p class="text-[#64748B] text-[12px]  h-full mb-4">${issue.description ? issue.description : "No description provided."}</p>

            <div class=" flex flex-wrap gap-2 mb-4">
                <span class="px-2 py-1 rounded-full bg-[#FECACA] border border-[#FEECEC] text-[#EF4444] text-[12px] font-medium flex items-center gap-1">
                    <i class="fa-solid fa-bug"></i> BUG
                </span>
                <span class="px-2 py-1 rounded-full bg-[#FFF8DB] border border-[#FDE68A] text-[#D97706] text-[12px] font-medium flex items-center gap-1">
                    <i class="fa-solid fa-hand-holding-heart"></i> HELP WANTED
                </span>
            </div>

            <div class="mt-auto border-t border-slate-100 pt-3 text-[12px] text-[#64748B] ">
                <p>#${issue.id} by ${issue.author}</p>
                <p>${issue.createdAt}</p>
            </div>
            
        </div>
        `;

        issuesContainer.appendChild(issueDiv);
    });
    
    switchTab(currentTab);
    manageSpinner(false);
    
};

loadIssues();


document.getElementById("btn-search").addEventListener('click', () => {
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
        .then(res => res.json())
        .then(data => {
            const searchedIssues = data.data;
            const matchedWord = searchedIssues.filter(issue => issue.title.toLowerCase().includes(searchValue));
            displayIssues(matchedWord);
        });
});