const projects = 
[
    {
        _id: '6484003059041faece332709',
        createdAt: '5/4/2021, 10:53:19 PM',
        ownerUsername: "ckarline",
        title: 'E-Commerce Website',
        description: `This website is a marketplace for guitars. You can buy or sell your guitars. Create an account
        and post your item. List the price and other information. You may also buy guitars from other users.`,
        fundingGoal: 10000,
        status: 'Pending Funding',
        donations: ['6484003059041faece332700','6484003059041faece332701'],
        comments: ['6484003059041faece3326fb'],
        milestones: [
            {
                date: '01/05/2024',
                description: 'Project Start',
                status: 'Pending',
            },
            {
                date: '01/10/2024',
                description: 'Code done',
                status: 'Pending',
            },
            {
                date: '01/20/2024',
                description: 'Testing done',
                status: 'Pending',
            },
            {
                date: '01/28/2024',
                description: 'Project finish',
                status: 'Pending',
            }
        ],
    },
    {
        _id: '6484003059041faece33270e',
        createdAt: '5/4/2021, 10:53:19 PM',
        ownerUsername: 'docBrown',
        title: 'Tutoring Exchange',
        description: `With over 4500 tutors available, the Tutoring Exchange provides a forum for tutoring on various college subjects`,
        fundingGoal: 20000,
        status: 'Active',
        donations: ['6484003059041faece332702','6484003059041faece332703'],
        comments: ['6484003059041faece3326f9','6484003059041faece3326fc','6484003059041faece3326fe'],
        milestones: [
            {
                date: '01/05/2024',
                description: 'Project Start',
                status: 'Completed',
            },
            {
                date: '03/10/2024',
                description: 'Code done',
                status: 'Completed',
            },
            {
                date: '03/20/2024',
                description: 'Testing done',
                status: 'Pending',
            },
            {
                date: '03/28/2024',
                description: 'Project finish',
                status: 'Pending',
            }
        ],
    },
    {
        _id: '6484003059041faece332713',
        createdAt: '5/4/2021, 10:53:19 PM',
        ownerUsername: 'danBrown',
        title: 'Bitcoin Plus',
        description: `Bitcoin Plus is an improvement of Bitcoin. It provides unlimited and worthless digital currency to everybody on earth`,
        fundingGoal: 300000,
        status: 'In Progress',
        donations: [],
        comments: ['6484003059041faece3326fa','6484003059041faece3326fd'],
        milestones: [
            {
                date: '01/05/2024',
                description: 'Project Start',
                status: 'Completed',
            },
            {
                date: '03/10/2024',
                description: 'Code done',
                status: 'Completed',
            },
            {
                date: '03/20/2024',
                description: 'Testing done',
                status: 'In Progress',
            },
            {
                date: '03/28/2024',
                description: 'Project finish',
                status: 'In Progress',
            }
        ],
    }
]


module.exports = projects;