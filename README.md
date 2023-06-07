## DevBook
by Cristino Castro, Daniella Ferrufino, Esfandiar Behbehani, Dante Ramsey ![Github licence](http://img.shields.io/badge/license-MIT-yellowgreen.svg)

## Description
DevBook is an application that allows users to post their projects and interact with other users projects, you may also show your support by donating to your favorite users.

## Table of Contents
- [DevBook](#devbook)
- [Description](#description)
- [Table of Contents](#table-of-contents)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
  - [Routes](#routes)

## Technologies Used
*Express JS
*Node JS
*GraphQL
*MongoDB
*Heroku
*JSON
*React
*Ant Design
*Stripe

## Installation
Simply click on the following link to be redirected to the deployed page: [Click Here]()

## Usage
This application will allow users to create an account, make a post, view posts and contributions by other users, and contribute to other users projects. Users will be able to search for projects done by other web developers, and interact with other user's posts by adding comments. Donors will be able to see a dashboard of the status of a project they contributed to by viewing milestones, dates, and budget. When a project is finished, the donors will be notified.

## License
This application is licensed under the MIT license.


### Routes

GET - /api/project/
List of projects

GET = /api/donate/:project_id
Get all donations for a specific project

POST - /api/project/
Create a project
Keys: title,description, goal :number , picture, completion :date

POST = /api/donate/
Keys: amount :number, name, comment, project_id



