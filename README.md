## DevBook
by Cristino Castro, Daniella Ferrufino, Esfandiar Behbehani, Dante Ramsey ![Github licence](http://img.shields.io/badge/license-MIT-yellowgreen.svg)

## Table of Contents
- [DevBook](#devbook)
- [Table of Contents](#table-of-contents)
- [Description](#description)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
  - [Routes](#routes)
- [License](#license)

## Description
DevBook is a collaborative platform designed to connect web developers and provide them with a space to showcase their projects, engage with fellow developers, and receive support from the community. With DevBook, users can easily create and share their projects, allowing them to highlight their skills and achievements in a professional and interactive manner. Users have the opportunity to browse through a diverse range of projects created by their peers and interact with other users through comments and feedback. In addition to project interactions, DevBook also offers a unique donation feature, enabling users to show their appreciation and support for their favorite projects by making financial contributions. This allows developers to receive financial backing for their work and helps them further refine and expand their projects.

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
This application will allow users to create an account, make a post, view posts and contributions by other users, and contribute to other users' projects. Users will be able to search for projects done by other web developers and interact with other users' posts by adding comments. Donors will be able to see a dashboard of the status of a project they contributed to by viewing milestones, dates, and budget. When a project is finished, the donors will be notified.

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

## License
This application is licensed under the MIT license.