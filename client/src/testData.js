const testProject = 
[
    {
        _id: '1',
        title: 'E-Commerce Website',
        description: `This website is a marketplace for guitars. You can buy or sell your guitars. Create an account
        and post your item. List the price and other information. You may also buy guitars from other users.`,
        fundingGoal: '1000',
        donations: '300',
        status: 'Pending Funding',
        milestones: [
            {
                date: '01/05/2024',
                description: 'Project Start',
                status: 'Completed',
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
        comments: [
            {
                id: '1',
                timestamp: '12/09/2023 06:06:06 PM',
                username: 'ckarline',
                content: 'This project is cool' 
            },
            {
                id: '2',
                timestamp: '12/11/2023 06:06:06 PM',
                username: 'darkwaters',
                content: 'This project is NOT cool' 
            }
        ]
    },
    {
        id: '2',
        title: 'Tutoring Exchange',
        description: `With over 4500 tutors available, the Tutoring Exchange provides a forum for tutoring on various college subjects`,
        fundingGoal: '50000',
        donations: '50000',
        status: 'Active',
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
        comments: [
            {
                id: '1',
                timestamp: '03/10/2024 06:06:06 PM',
                username: 'robpaste',
                content: 'I have finished the code for this project' 
            },
            {
                id: '2',
                timestamp: '12/11/2024 06:06:06 PM',
                username: 'darkwaters',
                content: 'This is the best website in the world' 
            }
        ]
    }
]

export default testProject